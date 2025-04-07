# Yuting's Podcast

📰 A web-based text-to-speech (TTS) player for reading articles aloud.

## 🎧 How to Use

1. Visit the site: [https://hsuehyt.github.io/YutingPodcast/](https://hsuehyt.github.io/YutingPodcast/)
2. Select a voice from the dropdown (available voices may vary by device/browser).
3. Click ▶️ Play next to any article to start reading aloud.
4. Click ⏸ Pause to stop or resume.

---

## 🖥 Recommended Platforms

For the best experience and full voice compatibility:

- ✅ **Microsoft Edge** on Windows 10+ (desktop)
- ✅ **Microsoft Edge** (mobile app on Android)

---

## ⚙️ Extra Setup for Edge Mobile

If you don’t hear any voice output on mobile Edge, enable **Read Aloud mode** manually:

### Step-by-step:

1. Tap the **menu** (bottom-right “⋮” icon)  
   ![Step 1](https://github.com/hsuehyt/YutingPodcast/blob/main/images/01.png)

2. Tap **Read aloud** from the options  
   ![Step 2](https://github.com/hsuehyt/YutingPodcast/blob/main/images/02.png)

3. TTS controls will appear at the top of the screen  
   ![Step 3](https://github.com/hsuehyt/YutingPodcast/blob/main/images/03.png)

This activates Microsoft Edge’s built-in TTS engine, which works even when JavaScript-based voices are unavailable.

---

## 🧠 Tech

- Uses the Web Speech API (`speechSynthesis`)
- Written in HTML + modern JavaScript (ES Modules)
- Auto-fetches articles from `articles/` directory via GitHub API

---

## 🛠 To Do / Future Ideas

- [ ] Offline voice fallback
- [ ] Save playback progress
- [ ] Dark mode / theme switch
- [ ] Auto-play next article
