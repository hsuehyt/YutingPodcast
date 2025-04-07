// utils.js

export function cleanTextForSpeech(text) {
    return text
        .replace(/`{1,3}[^`]*`{1,3}/g, '')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[.*?\]\(.*?\)/g, '')
        .replace(/[*_~`#>\[\]()\-]/g, '')
        .replace(/#+\s/g, '')
        .replace(/https?:\/\/\S+/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim();
}