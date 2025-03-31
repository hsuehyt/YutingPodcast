# 🎙️ Yuting's Podcast

A simple, self-hosted podcast reader that converts text articles into spoken voice using the browser's built-in Text-to-Speech (TTS) engine.

## 🌐 Live Site

Access it on GitHub Pages:  
**https://hsuehyt.github.io/YutingPodcast/**

---

## 📁 Project Structure

```
.
├── index.html         # Main HTML file
├── articles/          # .txt files (podcast scripts)
├── utils.js           # Shared utility functions
├── speech.js          # Voice setup and speech logic
├── articles.js        # Auto-loads and displays articles
```

---

## ✅ Compatibility

| Platform      | Supported | Notes                                |
|---------------|-----------|--------------------------------------|
| Windows       | ✅ Yes    | Use Chrome, Edge, or Firefox         |
| macOS         | ✅ Yes    | Works on Safari and Chrome           |
| iPhone / iPad | ✅ Yes    | Best in Safari                       |
| Android       | ✅ Yes    | Use Chrome for full voice support    |

> 🔉 Note: Available voices depend on device + browser.

---

### 📱 Samsung/Android Setup Tip (Recommended)

If you're on a Samsung phone and the voices sound robotic or don't work well, switch to Google's speech engine:

```
Settings → Accessibility → TalkBack → Settings → Text-to-speech → Preferred engine → 
✔️ Speech Recognition and Synthesis from Google
```

This gives you more natural-sounding voices when using the podcast player.

---

## 🚫 No Installation Required

Just open the `index.html` in any modern browser that supports speech synthesis.

---

## 🛠️ For Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/hsuehyt/YutingPodcast.git
   cd YutingPodcast
   ```

2. Run a local web server:
   ```bash
   # For Python 3
   python -m http.server
   ```

3. Open your browser at:
   ```
   http://localhost:8000
   ```

---

## ➕ How to Add New Articles

1. Place a new `.txt` file into the `articles/` folder.
2. Name it like:
   ```
   2025_0401_01_Episode_Title.txt
   ```
3. Commit and push to the `main` branch.
4. It will show up on the homepage automatically.

---

## 💬 Tech Used

- JavaScript + Web Speech API
- GitHub Pages (for free hosting)
- GitHub REST API (to fetch article list)

---

## 🧑‍💻 Author

**Yuting Hsueh**  
GitHub: [@hsuehyt](https://github.com/hsuehyt)
