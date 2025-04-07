export function logToggleStart() {
    console.log('=== toggleRead called ===');
}
export function logCancelSpeech() {
    console.log('Speech is currently playing.');
    console.log('Cancelling current speech...');
}
export function logFetchingFile(filePath) {
    console.log('--- Fetching article ---');
    console.log('File path:', filePath);
}
export function logTextFetched(text) {
    console.log('Raw text fetched (first 100 chars):', text.substring(0, 100));
}
export function logCleanedText(text) {
    console.log('Cleaned text (first 100 chars):', text.substring(0, 100));
}
export function logVoiceInfo(voice) {
    if (voice) {
        console.log('Selected voice:', voice.name, `(${voice.lang})`);
    } else {
        console.log('⚠️ No voice selected');
    }
}
export function logSpeechStarted() {
    console.log('🗣 Speaking text...');
}
export function logSpeechEnded() {
    console.log('✅ Speech ended');
}
export function logError(error) {
    console.error('❌ Error loading article:', error);
}
