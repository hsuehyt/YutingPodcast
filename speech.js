import {
    logToggleStart,
    logCancelSpeech,
    logFetchingFile,
    logTextFetched,
    logCleanedText,
    logVoiceInfo,
    logSpeechStarted,
    logSpeechEnded,
    logError
} from './debugLogger.js';

import { cleanTextForSpeech } from './utils.js';

const synth = window.speechSynthesis;
let voices = [];
let currentUtterance = null;
let isPlaying = false;
let currentButton = null;
const voiceSelect = document.getElementById('voiceSelect');

// Resume speech synthesis engine on desktop or mobile user interaction
function unlockAudioContext() {
    if (synth && synth.paused) {
        synth.resume();
        console.log("speechSynthesis resumed");
    }
}
window.addEventListener('click', unlockAudioContext, { once: true });
window.addEventListener('touchstart', unlockAudioContext, { once: true });

function populateVoiceList() {
    voices = synth.getVoices().filter(voice =>
        voice.lang.startsWith('en') &&
        !['zira', 'mark', 'david', 'hong kong', 'hongkong', 'india', 'kenya', 'nigeria', 'philippines', 'singapore', 'south africa', 'tanzania']
            .some(bad => voice.name.toLowerCase().includes(bad))
    );

    voiceSelect.innerHTML = '';

    if (voices.length === 0) {
        const option = document.createElement('option');
        option.disabled = true;
        option.selected = true;
        option.textContent = 'No voices available';
        voiceSelect.appendChild(option);
        return;
    }

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})${voice.default ? ' [default]' : ''}`;
        option.setAttribute('data-name', voice.name);
        option.setAttribute('data-lang', voice.lang);
        voiceSelect.appendChild(option);
    });

    const savedVoiceName = localStorage.getItem('selectedVoiceName');
    if (savedVoiceName) {
        for (let i = 0; i < voiceSelect.options.length; i++) {
            if (voiceSelect.options[i].getAttribute('data-name') === savedVoiceName) {
                voiceSelect.selectedIndex = i;
                break;
            }
        }
    }
}

voiceSelect.addEventListener('change', () => {
    const selectedOption = voiceSelect.selectedOptions[0];
    if (selectedOption) {
        const name = selectedOption.getAttribute('data-name');
        localStorage.setItem('selectedVoiceName', name);
    }
});

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
}
populateVoiceList();

export async function toggleRead(filePath, button) {
    logToggleStart();

    if (isPlaying) {
        logCancelSpeech();
        synth.cancel();
        isPlaying = false;
        if (currentButton) currentButton.textContent = '▶️ Play';
        return;
    }

    try {
        logFetchingFile(filePath);
        const response = await fetch(filePath);
        let text = await response.text();
        logTextFetched(text);

        text = cleanTextForSpeech(text);
        logCleanedText(text);

        currentUtterance = new SpeechSynthesisUtterance(text);

        const selectedOption = voiceSelect.selectedOptions[0];
        if (selectedOption) {
            const selectedName = selectedOption.getAttribute('data-name');
            const selectedVoice = voices.find(voice => voice.name === selectedName);
            if (selectedVoice) {
                currentUtterance.voice = selectedVoice;
                logVoiceInfo(selectedVoice);
            } else {
                console.warn("Voice not found in current voice list.");
            }
        }

        currentUtterance.onend = () => {
            logSpeechEnded();
            isPlaying = false;
            if (currentButton) currentButton.textContent = '▶️ Play';
        };

        logSpeechStarted();
        synth.speak(currentUtterance);
        isPlaying = true;
        button.textContent = '⏸ Pause';
        currentButton = button;
    } catch (error) {
        logError(error);
        alert('Failed to load article: ' + error);
    }
}
