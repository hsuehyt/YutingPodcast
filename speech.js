// speech.js
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

let voices = [];
let currentUtterance = null;
let isPlaying = false;
let currentButton = null;
const voiceSelect = document.getElementById('voiceSelect');

// Populate available speech synthesis voices
function populateVoices() {
    voices = speechSynthesis.getVoices()
        .filter(voice =>
            voice.lang.startsWith('en') &&
            !['zira', 'mark', 'david', 'hong kong', 'hongkong', 'india', 'kenya', 'nigeria', 'philippines', 'singapore', 'south africa', 'tanzania']
                .some(bad => voice.name.toLowerCase().includes(bad))
        );

    voiceSelect.innerHTML = '';

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

speechSynthesis.onvoiceschanged = populateVoices;
populateVoices();

// Toggle reading of article text
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
