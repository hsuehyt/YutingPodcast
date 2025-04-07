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

let voices = [];
let currentUtterance = null;
let isPlaying = false;
let currentButton = null;
const voiceSelect = document.getElementById('voiceSelect');

// Resume speech synthesis engine on desktop or mobile user interaction
function unlockAudioContext() {
    if (speechSynthesis && speechSynthesis.paused) {
        speechSynthesis.resume();
        console.log("speechSynthesis resumed");
    }
}
window.addEventListener('click', unlockAudioContext, { once: true });
window.addEventListener('touchstart', unlockAudioContext, { once: true });
window.addEventListener('touchstart', () => {
    if (speechSynthesis && speechSynthesis.paused) {
        speechSynthesis.resume();
    }
}, { once: true });

function populateVoices(retries = 10) {
    const allVoices = speechSynthesis.getVoices();

    voices = allVoices.filter(voice =>
        voice.lang.startsWith('en') &&
        !['zira', 'mark', 'david', 'hong kong', 'hongkong', 'india', 'kenya', 'nigeria', 'philippines', 'singapore', 'south africa', 'tanzania']
            .some(bad => voice.name.toLowerCase().includes(bad))
    );

    voiceSelect.innerHTML = '';

    if (voices.length === 0) {
        if (retries > 0) {
            console.warn("No voices yet, retrying populateVoices...");
            return setTimeout(() => populateVoices(retries - 1), 200);
        }

        const option = document.createElement('option');
        option.disabled = true;
        option.selected = true;
        option.textContent = 'No voices available';
        voiceSelect.appendChild(option);
        return;
    }
    voices = speechSynthesis.getVoices()
        .filter(voice =>
            voice.lang.startsWith('en') &&
            !['zira', 'mark', 'david', 'hong kong', 'hongkong', 'india', 'kenya', 'nigeria', 'philippines', 'singapore', 'south africa', 'tanzania']
                .some(bad => voice.name.toLowerCase().includes(bad))
        );

    voiceSelect.innerHTML = '';

    if (voices.length === 0) {
        console.warn("No available voices — speechSynthesis may not be supported or initialized.");
        const option = document.createElement('option');
        option.disabled = true;
        option.selected = true;
        option.textContent = 'No voices available';
        voiceSelect.appendChild(option);
        return;
    }

    voices.forEach((voice, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})${voice.default ? ' [default]' : ''}`;
        voiceSelect.appendChild(option);
    });

    const savedVoiceIndex = localStorage.getItem('selectedVoiceIndex');
    if (savedVoiceIndex && voices[savedVoiceIndex]) {
        voiceSelect.value = savedVoiceIndex;
    }
}

voiceSelect.addEventListener('change', () => {
    localStorage.setItem('selectedVoiceIndex', voiceSelect.value);
});

if ('speechSynthesis' in window) {
    speechSynthesis.onvoiceschanged = populateVoices;
    populateVoices();
} else {
    console.warn("Speech synthesis not supported in this browser.");
}

export async function toggleRead(filePath, button) {
    logToggleStart();

    if (isPlaying) {
        logCancelSpeech();
        speechSynthesis.cancel();
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
        const selectedVoice = voices[voiceSelect.value];
        if (selectedVoice) {
            currentUtterance.voice = selectedVoice;
        }
        logVoiceInfo(selectedVoice);

        currentUtterance.onend = () => {
            logSpeechEnded();
            isPlaying = false;
            if (currentButton) currentButton.textContent = '▶️ Play';
        };

        logSpeechStarted();
        speechSynthesis.speak(currentUtterance);
        isPlaying = true;
        button.textContent = '⏸ Pause';
        currentButton = button;
    } catch (error) {
        logError(error);
        alert('Failed to load article: ' + error);
    }
}
