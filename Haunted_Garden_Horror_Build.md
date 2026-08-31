# The Haunted Garden — Complete Horror Website Build Documentation & One-Shot Rebuild Prompt


> **Last updated:** May 2026 
> **Status:** Production-ready horror redesign specification (local dev) 
> **Style reference:** A24 horror cinema / gothic editorial / dark cinematic games scroll experiences


---


## TABLE OF CONTENTS


1. [Project Overview](#1-project-overview)
2. [Horror Creative Direction](#2-horror-creative-direction)
3. [Tech Stack & Dependencies](#3-tech-stack--dependencies)
4. [Design System](#4-design-system)
4. [File Structure](#4-file-structure)
5. [Architecture: How the Site Works](#5-architecture-how-the-site-works)
6. [The Video Scrubbing System (Hero)](#6-the-video-scrubbing-system-hero)
7. [⚠️ VIDEO SEGMENTS — MUST CLARIFY PER VIDEO](#7-️-video-segments--must-clarify-per-video)
8. [Component-by-Component Reference](#8-component-by-component-reference)
9. [Performance Rules (Non-Negotiable)](#9-performance-rules-non-negotiable)
10. [Known Issues & Fixes Applied](#10-known-issues--fixes-applied)
11. [ONE-SHOT REBUILD PROMPT](#11-one-shot-rebuild-prompt)


---


## 1. PROJECT OVERVIEW


**The Haunted Garden** is a dark scroll-driven cinematic horror website. When the user lands, a looping intro video plays. As they scroll, a 55-second experience video is scrubbed frame-by-frame, revealing 6 individual fragrance scenes. Each scene has a product info panel (left: title/subtitle, right: price/notes/CTA). When the user pauses mid-scroll, the video ambient-loops in a short window for that scene. A fully custom navbar, cursor, story section, catalog, and footer complete the site.


**Brand:** The Haunted Garden 
**Logo:** "IF" monogram — circular gold seal with Cinzel initials 
**Tagline:** Scents From Beyond 
**6 Fragrances:** The White Widow · The Crimson Offering · She Who Waits in Darkness · The Burning Goddess · The Forest That Breathes · The Frozen Silence


---


## 2. HORROR CREATIVE DIRECTION

### Core concept

**The Haunted Garden** is an immersive supernatural horror experience disguised as a premium dark-art fragrance house. The site should feel beautiful first and unsettling second: restrained typography, cinematic darkness, slow movement, negative space, fog, distant silhouettes, subtle film grain, crimson accents, and moments of visual uncertainty.

### Horror rules

- **Never use cheap horror tropes** such as constant jump scares, cartoon blood, skull-heavy decoration, or excessive gore.
- Horror should come from **anticipation, isolation, ambiguity, and things that move when the user is not looking directly at them**.
- Keep the visual language premium and editorial rather than game-like.
- Use crimson sparingly; most of the screen should remain near-black.
- Add very subtle film grain and atmospheric particles.
- Use slow opacity/flicker transitions rather than aggressive flashing.
- Respect `prefers-reduced-motion`.
- Keep all existing video-performance constraints unchanged.

### Visual atmosphere

- Near-black void background
- Deep blood-crimson highlights
- Pale corpse-like ivory typography
- Fog and volumetric haze
- Fine film grain
- Faint dust/ash particles
- Occasional shadow silhouettes
- Distorted reflections
- Hairline cracks in glass surfaces
- Subtle vignette and edge falloff
- Rare, controlled red light blooms

### Horror interaction language

| Normal action | Horror presentation |
|---|---|
| Scroll | **DESCEND** |
| Discover | **INVESTIGATE** |
| Shop Now | **ENTER** |
| Collection | **THE SIX ENTITIES** |
| Story | **CASE FILES** |
| Chapter | **CASE / ENTITY** |
| Return to beginning | **RETURN TO THE THRESHOLD** |

### Audio direction

Audio is optional but recommended:
- low sub-bass room tone
- distant wind
- barely audible whispers
- slow heartbeat at key transitions
- reversed/reverberated metallic textures
- no sudden high-volume jump scares

All audio must begin muted unless browser/user interaction permits playback.

---

## 2. TECH STACK & DEPENDENCIES


### Framework
- **Next.js 14** — Pages Router (not App Router), TypeScript


### Styling
- **TailwindCSS v3** — utility classes for layout
- **Inline styles** — all dynamic/animated values use inline React styles (not Tailwind) to avoid hydration issues and allow JS-driven values


### Animation
- **`motion` v12** — imported as `motion/react` (NOT `framer-motion`). Used for `motion.div`, `AnimatePresence`, `whileHover`, `whileTap`.
- **GSAP** (`gsap`, `gsap/DescendTrigger`, `gsap/DescendToPlugin`) — drives the scroll-pin, progress tracking, and auto-reset scroll animation. All GSAP imports are **dynamic** (`await import("gsap")`) inside `useEffect` to prevent SSR errors.


### Smooth Descend
- **`lenis`** — the bare package (not `@studio-freight/lenis`). Drives buttery scroll inertia. Wired into GSAP ticker. Duration 1.6s.


### Other
- `clsx` + `tailwind-merge` → `lib/utils.ts` → `cn()` helper
- `lucide-react` — icons
- Google Fonts: **Cinzel** (300/400/500/600 + italic) + **Inter** (300/400/500)


### Install command
```bash
npm install motion clsx tailwind-merge lucide-react lenis gsap
```


---


## 3. DESIGN SYSTEM


### Color tokens (CSS variables in `:root`)
```css
--bg:        #030305   /* near-black void background */
--crimson: #8B0E1A   /* blood-crimson accent — primary horror color */
--ivory:     #E8E3DF   /* off-white text */
--grey:      #77747A   /* secondary text */
```


### Typography
| Class | Font | Size | Weight | Tracking | Case |
|---|---|---|---|---|---|
| `.display-heading` | Cinzel | — | 400 | 0.04em | — |
| `.label-small` | Inter | 0.65rem | 400 | 0.25em | UPPER |
| `.body-copy` | Inter | 0.85rem | 300 | — | — |


### Buttons
- `.btn-outline` — pill, transparent fill, crimson border, hover subtle bg
- `.btn-solid` — pill, crimson fill, dark text, hover darkens


### Descendbar
- Width: 3px, track: `#030305`, thumb: `rgba(139,14,26,0.3)`, borderRadius 2px


### Cursor
- Gold dot (8px) + trailing ring (36px, 1px border). Both start `opacity:0`, reveal on first `mousemove`. Ring lerps at `t=0.12`.


### Selection
```css
::selection { background: rgba(139,14,26,0.22); color: #E8E3DF; }
```


---


## 4. FILE STRUCTURE


```
IndianFragrances/
├── pages/
│   ├── _app.tsx          ← Lenis + GSAP init + global <Header />
│   └── index.tsx         ← CustomCursor + Hero + Catalog + Story + Footer
│
├── sections/
│   ├── Hero.tsx          ← Descend-driven video scrubber (MAIN SECTION)
│   ├── Catalog.tsx       ← 6-card fragrance product grid
│   ├── Story.tsx         ← 2-panel editorial layout with Unsplash images
│   └── Footer.tsx        ← Minimal gold footer
│
├── components/
│   ├── Header.tsx        ← Fixed pill navbar with IF monogram logo
│   ├── FrameText.tsx     ← Left glass panel (scene title + subtitle)
│   ├── AwakenCard.tsx       ← Right glass panel (product info + price + CTA)
│   ├── CustomCursor.tsx  ← Custom gold cursor (dot + ring)
│   └── ui/
│       └── liquid-weather-glass.tsx  ← LiquidGlassCard component
│
├── config/
│   └── frames.ts         ← Frame/scene data for all 6 fragrances
│
├── lib/
│   └── utils.ts          ← cn() utility (clsx + tailwind-merge)
│
├── styles/
│   └── globals.css       ← Base styles, typography helpers, keyframes, Lenis classes
│
├── public/
│   └── video/            ← (local fallback only — live site uses Cloudinary)
│
└── INSTRUCTIONS.md       ← This file
```


---


## 5. ARCHITECTURE: HOW THE SITE WORKS


### Page load sequence
1. `_app.tsx` mounts → Lenis initialised async → GSAP ticker wired → `<Header />` rendered globally
2. `index.tsx` renders all sections via `dynamic()` with `ssr: false` (prevents hydration mismatches)
3. Hero mounts → experience video begins preloading → DescendTrigger waits for `loadedmetadata`


### Descend flow
```
User scrolls ─────────────────────────────────────────────────►
               │
               ▼
       Lenis intercepts wheel event
               │ inertia (duration: 1.6s)
               ▼
       lenis.on("scroll") fires
               │
               ▼
       DescendTrigger.update() called
               │
               ▼
       onUpdate(self) → self.progress (0 → 1)
               │
               ▼
       targetTimeRef.current = progress * 55
               │
               ▼
       RAF loop reads target → lerps smoothed → throttled video.currentTime seek
```


### Mode state machine
```
        ┌──────────────────────────────────────┐
        │                                      │
   p < 0.004                               auto-reset
        │                                      │
        ▼                                      │
     [IDLE] ──── first scroll ───► [SCRUB] ──── p > 0.98 ──►─┘
        ▲                            │
        └── reset complete           │ paused 550ms
                                     ▼
                                  [LOOP]
                                     │
                                     └── scroll resumes ──► [SCRUB]
```


---


## 6. THE VIDEO SCRUBBING SYSTEM (HERO)


### Two videos
| Variable | Role | State |
|---|---|---|
| `idleVidRef` | Intro / ambient loop | `autoPlay loop muted`, opacity 1 in IDLE, 0 otherwise |
| `expVidRef` | Main experience video | Seeked via scroll, opacity 0 in IDLE, 1 otherwise |


### Current Cloudinary sources
```ts
const INTRO_VIDEO =
 "https://res.cloudinary.com/drql9cjic/video/upload/v1779364541/Fairy_plain_with_fireflies_and_202605201940_yc5vnp.mp4";


const EXPERIENCE_VIDEO =
 "https://res.cloudinary.com/drql9cjic/video/upload/v1779365073/Descend_based_website_1_j5b72d.mp4";
```


### Lerp + throttled seek pattern
```ts
// RAF loop (runs every frame at ~60fps)
const delta = targetTimeRef.current - smoothedTimeRef.current;
if (Math.abs(delta) > 0.0005) {
 smoothedTimeRef.current += delta * 0.08; // LERP_FACTOR
}


// But only actually seek the video at 24fps MAX
if (
 timestamp - lastSeekMsRef.current >= 41.67 &&   // 24fps cap
 video.readyState >= 2 &&                          // browser has data
 Math.abs(smoothedTimeRef.current - video.currentTime) > 0.04  // meaningful jump
) {
 video.currentTime     = smoothedTimeRef.current;
 lastSeekMsRef.current = timestamp;
}
```


### LOOP ambient detection
```ts
// Track real scroll stops — NOT every onUpdate tick (Lenis inertia fires ticks
// long after user stops scrolling, which would prevent LOOP from ever firing)
if (Math.abs(p - lastProgressRef.current) > 0.0008) {
 lastProgressRef.current   = p;
 lastProgressMsRef.current = Date.now();
}


// In RAF: SCRUB → LOOP after 550ms of no progress change
if (modeRef.current === "SCRUB" && Date.now() - lastProgressMsRef.current > 550) {
 // switch to LOOP, video.play() in segment's loopStart..loopEnd window
}
```


### Panel visibility
- `FrameText` + `AwakenCard` only show when `!isIdle && !NO_PANEL_FRAMES.has(currentFrame.id)`
- `NO_PANEL_FRAMES = new Set(["entry", "loop-complete"])` — these frames have no product info


---


## 7. ⚠️ VIDEO SEGMENTS — MUST CLARIFY PER VIDEO


> **THIS IS THE MOST IMPORTANT SECTION FOR FUTURE REBUILDS.**


The segment timeline below was written for a specific 55-second experience video. **If you replace the video with a new one, you MUST re-map every timestamp.** The numbers represent seconds into the video file.


```ts
const SEGMENTS = [
 {
   id: "entry",
   frameId: "entry",
   transitionStart: 0,   // video starts here for this segment
   transitionEnd:   2,   // scene has fully loaded/transitioned by this point
   loopStart:       2,   // ambient loop start (when user pauses in this scene)
   loopEnd:         3,   // ambient loop end
   scrollResume:    3,   // furthest point scroll will seek to in this segment
 },
 { id: "maheshwari",       frameId: "maheshwari",       transitionStart:  3, transitionEnd:  6, loopStart:  6, loopEnd:  8, scrollResume:  8 },
 { id: "mahalakshmi",      frameId: "mahalakshmi",      transitionStart:  8, transitionEnd: 12, loopStart: 12, loopEnd: 16, scrollResume: 16 },
 { id: "mahakali",         frameId: "mahakali",         transitionStart: 16, transitionEnd: 21, loopStart: 21, loopEnd: 24, scrollResume: 24 },
 { id: "mahashakti",       frameId: "mahashakti",       transitionStart: 24, transitionEnd: 28, loopStart: 28, loopEnd: 32, scrollResume: 32 },
 { id: "jungle-essence",   frameId: "jungle-essence",   transitionStart: 32, transitionEnd: 36, loopStart: 36, loopEnd: 40, scrollResume: 40 },
 { id: "himalaya-essence", frameId: "himalaya-essence", transitionStart: 40, transitionEnd: 45, loopStart: 45, loopEnd: 50, scrollResume: 50 },
 { id: "outro",            frameId: "loop-complete",    transitionStart: 50, transitionEnd: 55, loopStart: 50, loopEnd: 55, scrollResume: 55 },
];


const TOTAL_VIDEO_DURATION = 55; // seconds — change if video is different length
const PX_PER_SECOND        = 200; // scroll pixels per second of video
```


### How to re-map for a new video


1. Open the video in QuickTime or VLC
2. For each fragrance scene, find:
  - **`transitionStart`**: the exact second the scene begins (fade/transition from previous)
  - **`transitionEnd`**: when the scene is fully visible (transition complete)
  - **`loopStart`**: the best "hold" frame for ambient looping (usually a calm part of the scene)
  - **`loopEnd`**: where the loop should snap back to `loopStart` (2–5 seconds after loopStart)
  - **`scrollResume`**: the last useful frame of the scene before the next scene starts
3. Update `TOTAL_VIDEO_DURATION` to the actual video length in seconds
4. Update `TOTAL_SCROLL_PX` = `TOTAL_VIDEO_DURATION * PX_PER_SECOND` (keep PX_PER_SECOND at 200 for consistent pacing)


### Why loopStart/loopEnd matter
When the user stops scrolling mid-scene, the video plays between `loopStart` and `loopEnd` on repeat — like a micro ambient clip. If these are poorly chosen (e.g., crossing a cut or transition), you'll see a jarring jump. Always choose a calm, visually stable 2–4 second window within each scene.


---


## 8. COMPONENT-BY-COMPONENT REFERENCE


### `_app.tsx`
- Async imports Lenis, GSAP, DescendTrigger inside `useEffect` (avoids SSR)
- Creates Lenis instance: `duration: 1.6`, `easing: t => Math.min(1, 1.001 - 2^(-10t))`, `smoothWheel: true`, `touchMultiplier: 1.2`
- Wires: `lenis.on("scroll", DescendTrigger.update)` + `gsap.ticker.add(t => lenis.raf(t * 1000))` + `gsap.ticker.lagSmoothing(0)`
- Renders `<Header />` globally above all pages
- `<Component />` receives all page props normally


### `Header.tsx`
- `position: fixed`, top-center pill shape
- `backdropFilter: blur(24px)` + `background: rgba(5,5,9,0.45→0.8 on scroll)`
- Contains: `IFLogo` component → divider → Experience dropdown → Collection → Story → divider → Shop Now
- `IFLogo`: SVG circle (r=18.5, stroke gold 0.7px) + diamond ornaments at 12/6 o'clock + horizontal tick marks at 3/9 o'clock + "IF" text in Cinzel 15px + "Fragrances" subtext in Inter 6.5px
- Experience dropdown uses `AnimatePresence`, `backdropFilter: blur(24px)`, staggered `motion.a` items


### `Hero.tsx`
- Section with `minHeight: calc(100vh + 11000px)` to accommodate full scroll distance
- Sticky stage div (`position: sticky, top: 0, height: 100vh`) pinned by DescendTrigger
- Two video elements (intro + experience) with GPU compositing hints
- One radial vignette overlay
- AnimatePresence scroll-hint (IDLE only): animated gold line + "SCROLL" label, no headline text
- 3-column panel grid (SCRUB/LOOP + non-entry frames only): FrameText left, AwakenCard right
- Chapter dots row at bottom-center (SCRUB/LOOP only, excludes entry/outro segments)


### `FrameText.tsx`
- Props: `frame: Frame`, `visible: boolean`
- AnimatePresence `mode="wait"` keyed on `frame.id`
- LiquidGlassCard wrapper (blurIntensity "lg", bg-black/25, border-white/10, borderRadius 20px, maxWidth 300px)
- enter: `opacity 0→1, x -20→0` / exit: `opacity 1→0, x 0→-12` (duration 0.55s)
- Renders: chapter label (crimson) → title (Cormorant, clamp 24–40px) → subtitle (Inter 13px, 300, 1.75 lh)


### `AwakenCard.tsx`
- Props: `frame: Frame`, `visible: boolean`
- Only renders when `frame.price` is truthy
- AnimatePresence `mode="wait"` keyed on `frame.id`
- LiquidGlassCard wrapper (same settings, maxWidth 280px)
- enter: `opacity 0→1, x 20→0` / exit: `opacity 1→0, x 0→12`
- Renders: "ENTITY" label → frame title → notes list (◆ diamond bullet, gold) → price (Cormorant 28px) → primary CTA pill button → secondary text link


### `LiquidGlassCard` (`components/ui/liquid-weather-glass.tsx`)
- SVG filter with `feTurbulence` (baseFrequency 0.003 0.007, type fractalNoise) + `feDisplacementMap` (scale 200) for liquid glass distortion
- `backdrop-blur-{intensity}` inner div
- Inset box-shadow for glass rim lighting (top-left light source)
- Outer box-shadow for ambient glow
- `motion.div` wrapper: `whileHover={{ scale: 1.01 }}`, `whileTap={{ scale: 0.98 }}`
- Props: `borderRadius`, `blurIntensity ("sm"|"md"|"lg"|"xl")`, `shadowIntensity`, `glowIntensity`, `draggable`, `className`, `style`, `children`


### `CustomCursor.tsx`
- Two refs: `dotRef` (`.cursor-dot`) and `ringRef` (`.cursor-ring`)
- Both rendered with `style={{ opacity: 0 }}` — stay invisible until first `mousemove`
- `onMouseMove`: sets dot position directly + reveals both via `opacity = "1"`
- RAF tick: lerps ring toward mouse at `t = 0.12`
- MutationObserver re-attaches hover listeners as new interactive elements appear
- `body.cursor-hovering` class: dot shrinks to 4px, ring expands to 52px (via CSS)


### `Catalog.tsx`
- 3-column grid (mobile: 1-col, tablet: 2-col) of 6 cards
- Each card: dark glass-like border card, chapter label, fragrance name, price, "Investigate →" link
- Hover: border brightens, card lifts with `translateY(-4px)`
- Fade-in on scroll using IntersectionObserver


### `Story.tsx`
- Two alternating panels (text-left/image-right, then image-left/text-right) via CSS `order`
- Text: LiquidGlassCard with chapter label, large display heading (white-space: pre-line), thin accent rule, body copy
- Image: 420px height, `object-fit: cover`, borderRadius 4px, dark overlay, micro caption
- GSAP `fromTo` on IntersectionObserver: `{ opacity: 0, x: ±32, scale: 1.04 }` → `{ opacity: 1, x: 0, scale: 1 }` duration 1.1s
- Images: Unsplash (landscape + distillation)
- Pull quote between gold horizontal rules


### `Footer.tsx`
- IF logo seal centered
- "THE HAUNTED GARDEN" heading + tagline
- Thin gold rule
- 3-column link grid: Experience / Navigate / House
- Bottom bar: copyright + "Crafted with intention"


---


## 9. PERFORMANCE RULES (NON-NEGOTIABLE)


These were arrived at through debugging real choppiness. Do not change them.


| Rule | Value | Reason |
|---|---|---|
| Seek cap | 24fps (`1000/24 = 41.67ms`) | Video decoder overwhelmed at 60fps seeks |
| Seek threshold | `> 0.04s delta` | Skip near-zero seeks that waste decoder cycles |
| readyState guard | `>= 2` (HAVE_CURRENT_DATA) | Never seek when buffer isn't ready |
| LERP factor | `0.08` | Cinematic weight, not too laggy |
| Descend stop threshold | `< 0.0008` progress delta | Filters Lenis inertia ticks from real stops |
| LOOP trigger delay | `550ms` | Balances responsiveness vs false triggers |
| Lenis duration | `1.6s` | Cinematic inertia without excessive delay |
| lagSmoothing | `0` | Prevents GSAP compensating for tab-switch spikes |
| GPU compositing | `willChange: "transform"` + `translateZ(0)` + `backfaceVisibility: "hidden"` | Forces GPU layer for both video elements |


---


## 10. KNOWN ISSUES & FIXES APPLIED


| Issue | Root Cause | Fix Applied |
|---|---|---|
| Choppy video scrub | Seeking 60×/sec overwhelmed decoder | 24fps seek cap + readyState guard |
| Ambient LOOP never fired | Lenis inertia kept firing `onUpdate` after user stopped scrolling | Track progress delta, not time since last onUpdate |
| Duplicate idle overlay | `FrameText` showing entry frame "Enter the Forgotten Garden" text on top of idle overlay | `NO_PANEL_FRAMES` set excludes `entry` and `loop-complete` |
| Static cursor dot in corner | Cursor elements render at `(0,0)` before first mousemove | Start `opacity: 0`, reveal on first mousemove |
| Black side gradients on video | Old gradient divs masking left/right edges | Removed — single centered radial vignette only |
| Navbar stacked/broken | Used LiquidGlassCard in nav (caused layout reflows) | Replaced with plain `backdropFilter: blur(24px)` |
| Descend too fast (teleporting) | `end: +=3000` was too short for 55s video | `PX_PER_SECOND = 200`, `TOTAL_SCROLL_PX = 11000` |
| 25 console errors on load | Missing local video files, motion hydration | Moved to Cloudinary CDN, all sections `ssr: false` |


---


## 11. ONE-SHOT REBUILD PROMPT


> Copy everything from the line below to the end of this file and paste into any coding agent to rebuild this site from scratch.


---


```
You are a senior creative frontend engineer. Build a complete, production-ready cinematic supernatural horror website called "The Haunted Garden" — a scroll-driven cinematic video experience styled after A24 horror cinema, gothic editorial, and dark cinematic games. Implement every detail below in one complete pass. Do not skip anything. Do not add placeholder text. Do not abbreviate any component.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


- Next.js 14, Pages Router, TypeScript
- TailwindCSS v3 (utility layout only; all animated/dynamic values use inline React styles)
- motion v12 — import as `motion/react` (not framer-motion)
- GSAP: `gsap`, `gsap/DescendTrigger`, `gsap/DescendToPlugin`
 → ALL GSAP imports must be DYNAMIC inside useEffect (`await import("gsap")`)
- lenis (bare package, not @studio-freight/lenis)
- clsx + tailwind-merge → lib/utils.ts → cn() helper
- lucide-react
- Google Fonts in globals.css: Cinzel (ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500) + Inter (wght@300;400;500)


Install: npm install motion clsx tailwind-merge lucide-react lenis gsap


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DESIGN SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


CSS variables:
 --bg:        #030305
 --crimson: #8B0E1A
 --ivory:     #E8E3DF
 --grey:      #77747A


Typography helpers (CSS classes):
 .display-heading → Cinzel, weight 400, tracking 0.04em, line-height 1.05, color ivory
 .label-small     → Inter, 0.65rem, weight 400, tracking 0.25em, UPPERCASE, color grey
 .body-copy       → Inter, 0.85rem, weight 300, line-height 1.8, color grey


Descendbar: width 3px, track #030305, thumb rgba(139,14,26,0.3), radius 2px
Selection: background rgba(139,14,26,0.22), color #E8E3DF
Cursor: none on body


Keyframes needed:
 @keyframes scrollLine {
   0%   { transform: scaleY(0); transform-origin: top; }
   50%  { transform: scaleY(1); transform-origin: top; }
   51%  { transform: scaleY(1); transform-origin: bottom; }
   100% { transform: scaleY(0); transform-origin: bottom; }
 }


Lenis CSS classes (required):
 html.lenis, html.lenis body { height: auto; }
 .lenis.lenis-smooth { scroll-behavior: auto !important; }
 .lenis.lenis-stopped { overflow: hidden; }
 html { scroll-behavior: auto !important; }


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VIDEO SOURCES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


INTRO_VIDEO (idle loop):
 https://res.cloudinary.com/drql9cjic/video/upload/v1779364541/Fairy_plain_with_fireflies_and_202605201940_yc5vnp.mp4


EXPERIENCE_VIDEO (scroll-scrubbed, 55 seconds):
 https://res.cloudinary.com/drql9cjic/video/upload/v1779365073/Descend_based_website_1_j5b72d.mp4


Both videos: crossOrigin="anonymous", preload="auto", muted, playsInline
GPU hints on both: willChange:"transform", transform:"translateZ(0)", backfaceVisibility:"hidden", WebkitBackfaceVisibility:"hidden"


⚠️ IF THE VIDEO IS REPLACED: The segment timestamps below are specific to the current 55-second video. If the video changes, every timestamp (transitionStart, transitionEnd, loopStart, loopEnd, scrollResume) must be re-measured by scrubbing the new video in a player and finding the exact second each fragrance scene starts, fully transitions, has a good ambient loop window, and ends. TOTAL_VIDEO_DURATION must also be updated.


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FRAME CONFIG: config/frames.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


export interface Frame {
 id: string;
 title: string;
 subtitle: string;
 chapter?: string;
 notes?: string[];
 price?: string | null;
 ctaPrimary?: string;
 ctaSecondary?: string;
}


export const frames: Frame[] = [
 { id:"entry",            chapter:"The Threshold",   title:"Enter the Forgotten Garden",        subtitle:"A dead garden beneath bruised skies. Follow the path. Descend to awaken what should remain buried.", price:null },
 { id:"maheshwari",       chapter:"Chapter I",    title:"The White Widow",              subtitle:"Stillness before death. White sand, black water, and a lotus blooming where no living hand should reach.",         price:"₹18,000", notes:["Ghost lotus","Cold skin accord","Grave-sand accord"],    ctaPrimary:"Awaken The White Widow — ₹18,000",       ctaSecondary:"Investigate The White Widow" },
 { id:"mahalakshmi",      chapter:"Chapter II",   title:"The Crimson Offering",             subtitle:"Abundance in bloom. Velvet rose petals and crimson gold light.",                           price:"₹18,000", notes:["Black rose","Blood pear","Funeral amber"],  ctaPrimary:"Awaken The Crimson Offering — ₹18,000",      ctaSecondary:"Investigate The Crimson Offering" },
 { id:"mahakali",         chapter:"Chapter III",  title:"She Who Waits in Darkness",                subtitle:"Black stone, dying embers, and a presence watching from just outside the light.",                                      price:"₹20,000", notes:["Burnt oud","Ash pepper","Obsidian amber"],          ctaPrimary:"Awaken She Who Waits in Darkness — ₹20,000",         ctaSecondary:"Investigate She Who Waits in Darkness" },
 { id:"mahashakti",       chapter:"Chapter IV",   title:"The Burning Goddess",              subtitle:"A column of unnatural fire; something ancient moving beneath the skin of the world.",                               price:"₹22,000", notes:["Burnt saffron","Charred vanilla","Blackened woods"],           ctaPrimary:"Awaken The Burning Goddess — ₹22,000",       ctaSecondary:"Investigate The Burning Goddess" },
 { id:"jungle-essence",   chapter:"Chapter V",    title:"The Forest That Breathes",          subtitle:"Wet earth, green thunder, and a forest that inhales when you stop moving.",                              price:"₹18,000", notes:["Rotting leaves","Wet roots","Stormwater accord"],            ctaPrimary:"Awaken The Forest That Breathes — ₹18,000",   ctaSecondary:"Investigate The Forest That Breathes" },
 { id:"himalaya-essence", chapter:"Chapter VI",   title:"The Frozen Silence",        subtitle:"Alpine darkness, frozen breath, and a silence that answers when you whisper.",                                   price:"₹20,000", notes:["Frozen citrus","Black juniper","Pale musk"],               ctaPrimary:"Awaken The Frozen Silence — ₹20,000", ctaSecondary:"Investigate The Frozen Silence" },
 { id:"loop-complete",    chapter:"The Return",   title:"You Were Never Alone.",      subtitle:"The circle is complete. But something followed you out. Descend again if you dare.",                          price:null, ctaPrimary:"Return to the Beginning" },
];


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
pages/_app.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


import type { AppProps } from "next/app";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import "@/styles/globals.css";


const Header = dynamic(() => import("@/components/Header"), { ssr: false });


export default function App({ Component, pageProps }: AppProps) {
 useEffect(() => {
   let cleanup: (() => void) | null = null;
   const init = async () => {
     const { default: Lenis }   = await import("lenis");
     const { gsap }             = await import("gsap");
     const { DescendTrigger }    = await import("gsap/DescendTrigger");
     gsap.registerPlugin(DescendTrigger);
     const lenis = new Lenis({
       duration: 1.6,
       easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
       smoothWheel: true,
       touchMultiplier: 1.2,
     });
     lenis.on("scroll", DescendTrigger.update);
     const onTick = (time: number) => lenis.raf(time * 1000);
     gsap.ticker.add(onTick);
     gsap.ticker.lagSmoothing(0);
     cleanup = () => { gsap.ticker.remove(onTick); lenis.destroy(); };
   };
   init();
   return () => { cleanup?.(); };
 }, []);
 return (
   <>
     <Header />
     <Component {...pageProps} />
   </>
 );
}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
pages/index.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


import dynamic from "next/dynamic";
import Head from "next/head";
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const Hero    = dynamic(() => import("@/sections/Hero"),    { ssr: false });
const Catalog = dynamic(() => import("@/sections/Catalog"), { ssr: false });
const Story   = dynamic(() => import("@/sections/Story"),   { ssr: false });
const Footer  = dynamic(() => import("@/sections/Footer"),  { ssr: false });


export default function Home() {
 return (
   <>
     <Head>
       <title>The Haunted Garden — Scents From Beyond</title>
       <meta name="description" content="A supernatural horror experience drawn from the sacred landscapes of India." />
       <meta name="viewport" content="width=device-width, initial-scale=1" />
     </Head>
     <CustomCursor />
     <main style={{ background: "#030305", cursor: "none" }}>
       <Hero />
       <Catalog />
       <Story />
       <Footer />
     </main>
   </>
 );
}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sections/Hero.tsx — FULL IMPLEMENTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


Constants:
 TOTAL_VIDEO_DURATION = 55  (UPDATE if video is different length)
 PX_PER_SECOND = 200
 TOTAL_SCROLL_PX = TOTAL_VIDEO_DURATION * PX_PER_SECOND  (= 11000)
 LERP_FACTOR = 0.08
 SEEK_INTERVAL_MS = 1000 / 24  (= 41.67ms — 24fps max seeks)
 NO_PANEL_FRAMES = new Set(["entry", "loop-complete"])


Refs (all useRef, no useState for performance-critical values):
 heroRef, stageRef, idleVidRef, expVidRef
 modeRef: "IDLE" | "SCRUB" | "LOOP"
 segmentRef: current Segment object
 lastProgressRef: last self.progress value
 lastProgressMsRef: timestamp of last real progress change
 isResettingRef: boolean
 rafRef: animation frame ID
 lastSeekMsRef: timestamp of last video.currentTime assignment
 targetTimeRef: desired video time (set by DescendTrigger)
 smoothedTimeRef: lerped video time (set by RAF)


State (useState — triggers re-renders for UI):
 mode: "IDLE" | "SCRUB" | "LOOP"
 currentFrame: Frame


RAF loop logic:
 1. Calculate delta = target - smoothed
 2. If |delta| > 0.0005: smoothed += delta * 0.08
 3. If (timestamp - lastSeekMs >= 41.67) AND (readyState >= 2) AND (|smoothed - video.currentTime| > 0.04):
      video.currentTime = smoothed; lastSeekMs = timestamp
 4. SCRUB→LOOP: if (Date.now() - lastProgressMs > 550) AND video.currentTime in [loopStart, loopEnd):
      modeRef = LOOP, setMode(LOOP), video.play()
 5. LOOP maintenance: if paused → play(); if currentTime >= loopEnd or < loopStart → currentTime = loopStart


DescendTrigger.create config:
 trigger: heroRef, start: "top top", end: `+=${TOTAL_SCROLL_PX}`
 pin: stageRef, pinSpacing: true, anticipatePin: 1
 onUpdate(self):
   p = self.progress
   if p < 0.004 → IDLE (pause exp, reset times, reset frame)
   if |p - lastProgress| > 0.0008 → update lastProgressMs (CRITICAL: filter Lenis inertia)
   if IDLE → SCRUB; if LOOP → SCRUB (resume from scrollResume time)
   next = p * TOTAL_VIDEO_DURATION
   seg = segmentFromTime(next) → clamp next to [transitionStart, scrollResume]
   targetTimeRef.current = next
   if p > 0.98 → setTimeout 1500ms → gsap.to(window, { scrollTo: 0, duration: 2.5 }) → reset all state


JSX structure:
 <section id="hero" ref={heroRef} style={{ position:"relative", background:"#030305", minHeight:`calc(100vh + ${TOTAL_SCROLL_PX}px)` }}>
   <div ref={stageRef} style={{ position:"sticky", top:0, width:"100%", height:"100vh", overflow:"hidden" }}>


     {/* Video 1: Intro loop (IDLE) */}
     <video ref={idleVidRef} autoPlay loop muted playsInline preload="auto" crossOrigin="anonymous"
       style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:1,
                willChange:"transform", transform:"translateZ(0)", backfaceVisibility:"hidden",
                opacity: isIdle ? 1 : 0, transition:"opacity 0.9s ease" }}>
       <source src={INTRO_VIDEO} type="video/mp4" />
     </video>


     {/* Video 2: Experience (scrubbed) */}
     <video ref={expVidRef} muted playsInline preload="auto" crossOrigin="anonymous"
       style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", zIndex:2,
                willChange:"transform", transform:"translateZ(0)", backfaceVisibility:"hidden",
                opacity: isIdle ? 0 : 1, transition:"opacity 0.9s ease" }}>
       <source src={EXPERIENCE_VIDEO} type="video/mp4" />
     </video>


     {/* Vignette (only centered radial — NO side gradients) */}
     <div style={{ position:"absolute", inset:0, zIndex:3, pointerEvents:"none",
                   background:"radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5,5,9,0.55) 100%)" }} />


     {/* Descend hint (IDLE only — NO text, NO headline, just line + "SCROLL") */}
     <AnimatePresence>
       {isIdle && (
         <motion.div key="scroll-hint"
           initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
           style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)",
                    zIndex:5, display:"flex", flexDirection:"column", alignItems:"center", gap:8, pointerEvents:"none" }}>
           <div style={{ width:1, height:44, background:"linear-gradient(to bottom, transparent, #8B0E1A)",
                          animation:"scrollLine 2s ease-in-out infinite" }} />
           <span style={{ fontFamily:'"Inter", sans-serif', fontSize:9, letterSpacing:"0.32em",
                           color:"rgba(139,14,26,0.65)", textTransform:"uppercase" }}>Descend</span>
         </motion.div>
       )}
     </AnimatePresence>


     {/* Product panels (SCRUB/LOOP + non-entry/outro frames only) */}
     {showPanels && (
       <div style={{ position:"absolute", inset:0, zIndex:4, display:"grid",
                      gridTemplateColumns:"minmax(280px,1fr) 2.4fr minmax(280px,1fr)", pointerEvents:"none" }}>
         <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-start",
                        padding:"80px 20px 80px 44px", pointerEvents:"auto" }}>
           <FrameText frame={currentFrame} visible={true} />
         </div>
         <div />
         <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end",
                        padding:"80px 44px 80px 20px", pointerEvents:"auto" }}>
           <AwakenCard frame={currentFrame} visible={true} />
         </div>
       </div>
     )}


     {/* Chapter dots (SCRUB/LOOP only, exclude entry+outro) */}
     {!isIdle && (
       <div style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)",
                      zIndex:6, display:"flex", gap:8 }}>
         {SEGMENTS.filter(s => s.id !== "entry" && s.id !== "outro").map(seg => (
           <div key={seg.id} title={seg.id}
             style={{ width: currentFrame.id === seg.frameId ? 24 : 6, height:6, borderRadius:3,
                       background: currentFrame.id === seg.frameId ? "#8B0E1A" : "rgba(232,227,223,0.22)",
                       transition:"all 0.4s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
         ))}
       </div>
     )}


   </div>
 </section>


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
components/Header.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


Fixed pill navbar, top-center, pointer-events: none on header (all on nav).
Nav: backdropFilter blur(24px), background rgba(5,5,9,0.45) → rgba(5,5,9,0.8) on scroll > 60px.


IF LOGO (left anchor):
 Circular SVG seal:
   <circle cx="20" cy="20" r="18.5" stroke="#8B0E1A" strokeWidth="0.7" strokeOpacity="0.65" />
   <polygon points="20,2 21.4,4.2 20,6.4 18.6,4.2" fill="#8B0E1A" fillOpacity="0.65" />   (top diamond)
   <polygon points="20,33.6 21.4,35.8 20,38 18.6,35.8" fill="#8B0E1A" fillOpacity="0.65" /> (bottom diamond)
   <line x1="1.5" y1="20" x2="4" y2="20" stroke="#8B0E1A" strokeWidth="0.7" strokeOpacity="0.4" /> (left tick)
   <line x1="36" y1="20" x2="38.5" y2="20" stroke="#8B0E1A" strokeWidth="0.7" strokeOpacity="0.4" /> (right tick)
 "IF" in Cinzel 15px centered over SVG
 "Fragrances" in Inter 6.5px, tracking 0.32em, UPPERCASE, 55% crimson opacity


Layout order: [IF logo] [divider] [Experience ▼] [Collection] [Story] [divider] [Shop Now pill]


Experience dropdown on hover (AnimatePresence):
 backdropFilter blur(24px), bg rgba(5,5,9,0.9), borderRadius 16px, border rgba(255,255,255,0.1)
 Staggered motion.a items (delay i*0.04s) in Cinzel 14px
 Hover each item: bg rgba(139,14,26,0.07), color #E8E3DF


Shop Now: pill button, border #8B0E1A, color #8B0E1A, hover bg rgba(139,14,26,0.1)


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
components/FrameText.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


Props: frame: Frame, visible: boolean


<AnimatePresence mode="wait">
 {visible && (
   <motion.div key={frame.id}
     initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-12 }}
     transition={{ duration:0.55, ease:[0.25,0.46,0.45,0.94] }}>
     <LiquidGlassCard borderRadius="20px" blurIntensity="lg" shadowIntensity="xs" glowIntensity="xs"
       draggable={false} className="p-7 bg-black/25 border border-white/10" style={{ maxWidth:300 }}>
       {frame.chapter && <p style={{fontSize:9,letterSpacing:"0.35em",textTransform:"uppercase",color:"#8B0E1A",marginBottom:14}}>{frame.chapter}</p>}
       <h2 style={{fontFamily:'"Cinzel",serif',fontSize:"clamp(24px,2.5vw,40px)",fontWeight:400,color:"#E8E3DF",letterSpacing:"0.04em",lineHeight:1.1,marginBottom:14}}>{frame.title}</h2>
       <p style={{fontFamily:'"Inter",sans-serif',fontSize:13,lineHeight:1.75,color:"rgba(232,227,223,0.62)",fontWeight:300}}>{frame.subtitle}</p>
     </LiquidGlassCard>
   </motion.div>
 )}
</AnimatePresence>


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
components/AwakenCard.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


Props: frame: Frame, visible: boolean
Only renders content when frame.price is truthy.


AnimatePresence mode="wait", key=frame.id
enter: opacity 0→1, x 20→0 / exit: opacity 1→0, x 0→12, duration 0.55s


LiquidGlassCard (same settings as FrameText, maxWidth 280px):
 "ENTITY" label (crimson, 9px, 0.35em tracking)
 frame.title (Cormorant 26px)
 notes list: map notes → <li> with ◆ gold bullet, Inter 12px, 60% ivory
 price: Cormorant 28px
 primary CTA: full-width pill button, border #8B0E1A, transparent bg, hover rgba(139,14,26,0.1)
 secondary CTA: text link, underline, 50% ivory, hover #E8E3DF


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
components/ui/liquid-weather-glass.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


Props: children, className, draggable, borderRadius, blurIntensity("sm"|"md"|"lg"|"xl"), shadowIntensity("none"|"xs"|"sm"|"md"|"lg"|"xl"), glowIntensity, style


Renders:
 1. Hidden SVG filter definition:
    <svg style={{position:"absolute",width:0,height:0}} aria-hidden>
      <defs>
        <filter id="glass-blur">
          <feTurbulence type="fractalNoise" baseFrequency="0.003 0.007" numOctaves="2" seed="2" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="200" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>
    </svg>
 2. motion.div wrapper: whileHover={{ scale:1.01 }}, whileTap={{ scale:0.98 }}
    Outer: rounded corners, glow box-shadow, filter:url(#glass-blur) on hover
    Inner: backdrop-blur Tailwind class, inset rim-light box-shadow, className passthrough


blurIntensity map: sm→blur-sm, md→blur-md, lg→blur-lg, xl→blur-xl
shadowIntensity: controls outer box-shadow rgba darkness
glowIntensity: controls ambient glow spread


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
components/CustomCursor.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


Two divs: .cursor-dot (8px) and .cursor-ring (36px)
Both rendered with style={{ opacity: 0 }} — MUST start invisible


useEffect:
 onMouseMove: set dot left/top directly, set opacity "1" on both dot and ring (first move reveals cursor)
 RAF tick: lerp ring toward mouse (t=0.12), ring.style.left/top
 attachListeners: querySelectorAll("a,button,[data-cursor-hover]") → add mouseenter/mouseleave
   mouseenter → document.body.classList.add("cursor-hovering")
   mouseleave → document.body.classList.remove("cursor-hovering")
 MutationObserver on document.body to re-attach as new elements appear


CSS (in globals.css):
 .cursor-dot { position:fixed; width:8px; height:8px; background:#8B0E1A; border-radius:50%; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); transition: width 0.2s, height 0.2s; mix-blend-mode:difference }
 .cursor-ring { position:fixed; width:36px; height:36px; border:1px solid rgba(139,14,26,0.5); border-radius:50%; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); transition: width 0.3s, height 0.3s, border-color 0.3s }
 body.cursor-hovering .cursor-dot { width:4px; height:4px }
 body.cursor-hovering .cursor-ring { width:52px; height:52px; border-color:rgba(139,14,26,0.9) }


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sections/Catalog.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


Section id="catalog", bg #030305, padding 8rem 2rem
Max-width 1100px centered
Header: "The Six Entities" label + large display heading + gold divider
3-col grid (responsive: 1→2→3 cols)
6 cards, one per fragrance:
 bg rgba(255,255,255,0.03), border 1px rgba(255,255,255,0.08), borderRadius 4px, padding 2rem
 hover: border rgba(139,14,26,0.2), translateY -4px (transition 0.3s)
 chapter label (label-small, crimson)
 title (display-heading, 2rem)
 thin gold rule
 notes as small pills or list
 price (Cormorant 1.6rem)
 "Investigate →" link (Inter small, crimson, underline on hover)
GSAP IntersectionObserver staggered fade-in (opacity 0→1, y 20→0) per card


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sections/Story.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


2 alternating panels (text↔image swapped via CSS order property):


Panel 1:
 label: "The Curse"
 title: "Born beneath\nforgotten skies"
 body: "Each entity is tied to a place where the boundary between the living and the dead feels thin. We do not create legends. We uncover them, record them, and leave before they notice us."
 image: https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&auto=format&fit=crop&q=80
 imageRight: true, accent: #8B0E1A


Panel 2:
 label: "The Ritual"
 title: "Extracted through\nforbidden ritual"
 body: "Every essence is prepared in darkness. Ingredients are gathered from places marked on no modern map. The result is not merely a scent—it is a memory that does not belong to you."
 image: https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&auto=format&fit=crop&q=80
 imageRight: false, accent: #d4a0a8


Each panel: 2-col grid, gap 4rem, alignItems center, marginBottom 7rem
Text col: label (accent color) → display heading (whiteSpace pre-line) → thin 32px accent rule → body copy
Image col: 420px height, objectFit cover, borderRadius 4px, dark gradient overlay (rgba(5,5,9,0.25)), micro caption absolute bottom-left
GSAP IntersectionObserver: fromTo({ opacity:0, x:±32, scale:1.04 }, { opacity:1, x:0, scale:1, duration:1.1, ease:"power3.out" })


Pull quote below both panels:
 Between two 1px border-top/bottom gold rules (rgba(139,14,26,0.1))
 "Some scents do not awaken memories. They awaken what is waiting behind them."
 Attribution: "— The Haunted Garden, Studio Notes"


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
sections/Footer.tsx
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


bg #030305, padding 5rem 2rem 3rem
Max-width 1100px centered


Top: IF logo seal (same SVG circle monogram as Header) centered, below it "THE HAUNTED GARDEN" in Cormorant 1.4rem tracking 0.3em UPPERCASE + "Scents From Beyond" in Inter 0.65rem grey


Thin gold rule (linear-gradient horizontal)


3-column link grid:
 Col 1 "Experience": The White Widow, The Crimson Offering, She Who Waits in Darkness, The Burning Goddess, The Forest That Breathes, The Frozen Silence
 Col 2 "Navigate": Collection, Story, Contact
 Col 3 "House": Philosophy, Craft, Sourcing


Bottom bar (border-top gold 0.1 opacity, padding-top 1.5rem, flex space-between):
 "© 2025 The Haunted Garden. All rights reserved."
 "Entered willingly."
 Both in Inter 0.65rem grey


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL CONSTRAINTS — DO NOT VIOLATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━


1. NO TEXT OVERLAYS on the hero during IDLE — zero headlines, zero sublines, zero buttons. Only the animated scroll-line + "SCROLL" label at the very bottom.


2. NO SIDE GRADIENT BARS on the video — one centered radial vignette only: radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(5,5,9,0.55) 100%).


3. SEEKS CAPPED AT 24fps — SEEK_INTERVAL_MS = 1000/24. Seek only when readyState >= 2 AND delta > 0.04. Non-negotiable.


4. SCROLL STOP DETECTION — update lastProgressMs only when |p - lastProgress| > 0.0008. Do NOT use time since last onUpdate tick (Lenis inertia fires ticks ~1.6s after user stops; this breaks LOOP activation).


5. NO_PANEL_FRAMES = Set(["entry","loop-complete"]) — FrameText and AwakenCard must not render for these frames.


6. LENIS WIRING — exactly three lines required:
  lenis.on("scroll", DescendTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)


7. ALL GSAP IMPORTS dynamic inside useEffect. Never at module level.


8. HEADER is in _app.tsx globally. Never put Navbar or Header in index.tsx.


9. BOTH VIDEOS use crossOrigin="anonymous" for Cloudinary CDN compatibility.


10. CUSTOMCURSOR starts opacity:0. Reveals on first mousemove only.


11. IF LOGO replaces all text wordmarks. "The Threshold" text must not appear in the navbar.


12. section#hero minHeight = calc(100vh + 11000px). Do not use a shorter value.


13. VIDEO TIMESTAMPS ARE SPECIFIC TO THE CURRENT 55-SECOND VIDEO. If the video is replaced, all SEGMENTS timestamps must be re-measured. TOTAL_VIDEO_DURATION must be updated. See the segment re-mapping instructions in INSTRUCTIONS.md.
```


---


*End of INSTRUCTIONS.md*



