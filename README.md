# 🎂 Birthday Surprise Experience

A cinematic, mobile-first birthday website — designed with deliberate art direction, spatial composition, and emotional storytelling.

---

## 🚀 How to Run

Simply open `index.html` in any modern browser, or run a local HTTP server:

```bash
# Using Python
python -m http.server 8080
```
Open `http://localhost:8080` in your browser.

---

## 📁 Modular Project Structure

```
Birthday-Surprise/
├── index.html                  ← Main HTML entry shell
├── README.md                   ← You're reading this
├── assets/
│   ├── images/                 ← Photos & posters
│   │   ├── hero.jpg            → Hero & video poster
│   │   ├── photo-main.jpg      → Main portrait photo
│   │   ├── photo-float-1.jpg   → Floating moment 1
│   │   ├── photo-float-2.jpg   → Floating moment 2
│   │   ├── memory-1.jpg        → Memory moment 1
│   │   ├── memory-2.jpg        → Memory moment 2
│   │   └── memory-3.jpg        → Memory moment 3
│   ├── videos/                 ← Put your video here (birthday-video.mp4)
│   └── music/                  ← Put your music here (background.mp3)
└── src/
    ├── main.js                 ← Application orchestrator & replay flow
    ├── content/
    │   └── birthdayContent.js  ← ⭐ EDIT THIS FILE TO PERSONALIZE EVERYTHING ⭐
    ├── sections/               ← Modular section components
    │   ├── Opening.js          → Specular pearl/glass orb & pointer tracking
    │   ├── Traits.js           → Asymmetric spatial trait cards & focus blur
    │   ├── Gallery.js          → Editorial spatial photo collage & lightbox
    │   ├── Video.js            → Widescreen cinema theater frame
    │   ├── Secret.js           → Dusk mood shift & full-bleed canvas bloom
    │   ├── Letter.js           → Keepsake stationery with fold & wax seal
    │   └── Finale.js           → Staged emotional reveal climax
    ├── styles/                 ← Modular styling
    │   ├── global.css          → Design tokens & atmospheric background depth
    │   ├── cursor.css          → Smooth desktop cursor with "VIEW" badge
    │   ├── components.css      → Glass surfaces, equalizer, lightbox modal
    │   ├── sections.css        → Section art direction & keyframes
    │   └── responsive.css      → Mobile-first & wide-display rules
    ├── systems/                ← Interactive background systems
    │   ├── Cursor.js           → Desktop dual-ring lerp cursor
    │   ├── MusicPlayer.js      → Floating audio control & equalizer
    │   ├── ScrollReveal.js     → IntersectionObserver animations
    │   └── TouchFeedback.js    → Mobile tactile feedback & ripple
    └── utils/
        ├── dom.js              → Declarative DOM helpers
        └── math.js             → Interpolation & clamping
```

---

## ✏️ How to Personalize

To personalize the entire website, you only need to edit **one single file**:

👉 **[`src/content/birthdayContent.js`](file:///c:/Users/harsh/Desktop/Birthday-Surprise/src/content/birthdayContent.js)**

| Content | What to edit in `src/content/birthdayContent.js` |
|---|---|
| **Opening Greeting** | `content.hero.greeting` and `subtitle` |
| **Traits ("About You")** | `content.traits` array (titles, descriptions, tags) |
| **Photos & Captions** | `content.photos` array (sources, titles, dates) |
| **Video** | `content.video.src` (place in `assets/videos/birthday-video.mp4`) |
| **Secret Message** | `content.secret` (trigger line, reveal title, message) |
| **Personal Letter** | `content.letter.paragraphs`, `signoff`, `senderName` |
| **Final Climax** | `content.finale.birthdayText`, `closingLine` |
| **Background Music** | `content.music.src` (place in `assets/music/background.mp3`) |

---

## 📱 Designed for All Screens

- **Desktop (1024px+)**: Spatial, asymmetrical compositions with 3D tilt physics and dynamic "VIEW" cursor states.
- **Mobile & Tablets**: Immersive vertical rhythm, full-bleed visual anchors, and touch-optimized gestures.
- **Accessibility**: Built-in support for `prefers-reduced-motion` and keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight` in Lightbox).

---

Made with ❤️
