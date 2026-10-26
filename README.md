# Dear Zey — An Interactive Digital Confession Experience

A cinematic, interactive confession website designed as an intimate digital love letter dedicated to Zey.

Crafted with warm ivory tones, soft blush and dusty rose accents, elegant serif typography, sincere Taglish storytelling, smooth Framer Motion choreography, and romantic background music integration via the YouTube IFrame Player API.

---

## Visual & Emotional Aesthetics

- **Color Palette**: Warm ivory backgrounds (`#FAF7F2`), soft blush pink accents (`#E8B4B8`), dusty rose (`#C28285`), and gentle lavender gradients (`#EDE4F0`).
- **Typography**: 
  - Headlines: Cormorant Garamond (refined editorial serif)
  - Body: Plus Jakarta Sans (clean, highly readable sans-serif)
  - Handwritten Accents: Caveat (authentic personal stationery script)
- **Zero Emoji Rule**: Absolutely zero emojis across the entire website, preserving mature, sincere digital romantic stationery elegance. Decorative accents are crafted with custom SVG vector icons and subtle CSS microinteractions.
- **Tone**: Sincere, slightly shy, natural Taglish.

---

## Storyline & Experience Scenes

1. **Scene 1: Opening Scene — A Letter for Zey**
   - Cinematic letter presentation card with wax seal accent and animated Taglish greeting.
   - Primary action: "Open Your Letter" (unfolds letter and gracefully starts the soundtrack).
2. **Scene 2: Before We Start**
   - Lighthearted note with two choices ("I promise" and "No promises") providing tailored, charming responses.
3. **Scene 3: There's Something About You**
   - A sequential 5-card collection revealed with generous breathing space and smooth pagination.
4. **Scene 4: Three Little Letters**
   - Three interactive envelope cards ("Your Presence", "The Little Things", "Unexpected") that unfold into full paper letters.
5. **Scene 5: The Moment of Truth (The Confession)**
   - The emotional centerpiece of the experience.
   - Transitions into an intimate warm glow with sequential preludes, a deliberate pause, and the prominent confession reveal: *"I like you, Zey."*
6. **Scene 6: No Pressure, Zey**
   - Sincere, reassuring messaging eliminating pressure and prioritizing honesty.
7. **Scene 7: Can I Ask You Something?**
   - One dignified question with three functional buttons ("I'd love to", "Let me think about it", "Let's stay friends").
   - Includes subtle rose petal celebration (canvas-confetti using geometric pastel shapes, zero emojis).
8. **Scene 8: One Last Thing**
   - Final heartfelt closing letter signed *"Sincerely, someone who likes you."*
   - "Read It Again" button to revisit the letter without interrupting the music.
9. **Secret Detail**:
   - Hidden star-shaped SVG element that reveals an intimate secret easter egg message when discovered.

---

## Background Music Integration

- **Soundtrack**: Official YouTube video (`https://youtu.be/9mw3nfKl4eE`)
- **API**: YouTube IFrame Player API with strict ToS compliance (visible player widget, custom controls, live equalizer bars, mute/unmute, and fallback "Listen on YouTube" link).
- **Persistent Playback**: Remains playing seamlessly across all scene transitions.

---

## Tech Stack

- **React 18 / 19**
- **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**
- **Canvas-Confetti**

---

## Local Setup & Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. **Build for production**:
   ```bash
   npm run build
   ```

4. **Preview production build**:
   ```bash
   npm run preview
   ```

---

## Deployment Instructions

### Vercel
1. Push your repository to GitHub or GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**.

### Netlify
1. Connect your GitHub repository to [Netlify](https://www.netlify.com).
2. Set Build command: `npm run build`.
3. Set Publish directory: `dist`.
4. Deploy site.

### GitHub Pages
1. In `vite.config.js`, set `base: './'`.
2. Run `npm run build`.
3. Deploy the contents of the `dist/` directory to the `gh-pages` branch.

---

## Content Customization

All text and messages are cleanly separated and can be edited in [src/data/content.js](file:///c:/Users/John%20Caleb/OneDrive/Desktop/For%20zey/src/data/content.js).
