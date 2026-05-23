# 💻 NavGurukul 1-Year Impact Presentation Website

A high-fidelity, interactive, and beautifully animated web-based presentation showcasing **1 Year of Learning, Building & Student Impact at NavGurukul (2024-25)**.

This project converts a standard PowerPoint deck into a breathtaking, state-of-the-art interactive experience, optimized for live presenter delivery and standalone report reading.

---

## ✨ Features & Visual Excellence

- **Dual-Mode Experience**:
  - **Slideshow Mode**: Keyboard-controlled (`Arrow Keys`, `Spacebar`, `PageUp/Down`), touch-swipe gesture-enabled, elegant slide-by-slide view with fluid zoom/fade transitions.
  - **Scroll Report Mode**: Seamless transition to a single continuous executive report page with beautiful scroll-driven entry animations—perfect for self-paced reading.
- **Presenter Reference Speaker Drawer**: Built-in side drawer populated dynamically with helpful speaker notes, statistics, and references for the presenter to deliver a flawless pitch.
- **Live-Typing IDE Mockup**: An animated, syntax-highlighted coding IDE simulating a custom logic loop for confidence building in Data Structures and Algorithms.
- **Interactive SVG Reach Map**: A custom-designed, lightweight world map featuring pulsing hotspots (*Pune*, *Dantewada*, *Online*, *Global*) that reveal localized stats and campus narratives on hover or click.
- **Glassmorphic Styling**: Elegant semi-transparent components, fuzzy glowing backdrop decorations, Outfit & Inter typography, and premium dark/light mode toggles.

---

## 🎹 Keyboard Controls

| Key | Action |
| --- | --- |
| `→` or `Space` or `PageDown` | Next Slide |
| `←` or `PageUp` | Previous Slide |
| `Home` | Jump to First Slide |
| `End` | Jump to Last Slide |
| `Click on Timeline Indicator` | Jump directly to target Slide |

---

## 🚀 Step-by-Step GitHub Pages Deployment

To host this presentation live on your custom GitHub Pages link (e.g. `https://surajsahani.github.io/impact-report/`), follow these simple steps:

1. **Verify Git Remote**:
   Ensure your local repository has your GitHub remote added as `origin`:
   ```bash
   git remote add origin git@github.com:surajsahani/impact-report.git
   ```

2. **Commit and Push to GitHub**:
   Add all files, commit them, and push your main branch:
   ```bash
   git add .
   git commit -m "feat: launch premium interactive impact presentation website"
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub: `https://github.com/surajsahani/impact-report`
   - Click on the **Settings** tab.
   - On the left sidebar under the "Code and automation" section, click on **Pages**.
   - Under **Build and deployment** -> **Source**, select **Deploy from a branch**.
   - Under **Branch**, select `main` and select `/ (root)` folder, then click **Save**.
   - Wait 1-2 minutes! GitHub will build and publish your site.
   - Your live link will be shown at the top of the Pages section (e.g. `https://surajsahani.github.io/impact-report/`).

Presenter tip: Open the live URL, click on **Slideshow**, hit the **Fullscreen** button on the top-right header, and you are ready to show a flawless live deck to your audience! 🎉
