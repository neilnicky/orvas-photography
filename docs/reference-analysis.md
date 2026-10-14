# Offform — Reference Analysis

Reference: https://offform.net/ (inspected 2026-10-15)
Recording: `~/Media/Screenshots/Screen Recording 2026-10-15 at 1.48.20 AM.mov` (66.4 s, 3600×2260 @120fps, desktop Chrome).

## Method & legend

- **[V] Verified** — observed in the live DOM, computed styles, shipped CSS/JS, or the recording.
- **[I] Inferred** — reasoned from behaviour, not confirmed in source.
- Sources used: Playwright (Chromium) at 1440×900 and iPhone 15 emulation; computed styles via `getComputedStyle`; the downloaded HTML (277 KB, inline `<style>` blocks with author comments) and the SiteGround combined JS bundle (747 KB, custom code carries labelled comment banners); 133 frames sampled at 2 fps from the recording plus 34 desktop / 16 mobile scroll-stop screenshots. Working files are in the session scratchpad (not committed).

## Stack [V]

- WordPress + Elementor 4.3.4 (Hello Elementor theme). All bespoke behaviour is **hand-written vanilla JS** inside Elementor HTML widgets, ~40 IIFEs, each driven by `requestAnimationFrame` + passive scroll listeners.
- **Lenis** smooth scroll, desktop only: `lerp: 0.08, wheelMultiplier: 0.9, smoothWheel: true, syncTouch: false, anchors: true`. Mobile keeps native scroll.
- No GSAP, no ScrollTrigger, no WebGL. "Wave" image distortions are **Canvas 2D** strip-shifting. Footer wordmark is **SVG masks**.
- Sticky/pinned sections are CSS `position: sticky` stages inside tall sections, with JS reading section progress.

## 1. Site map [V]

One page, anchor navigation (`#about`, `#talents`, `#services`, `#contact`). Legal pages (privacy / terms / cookies / accessibility) are separate WP pages linked from the footer. Desktop page height at 1440×900: **18 293 px**.

| # | Section (DOM) | Top | Height | Role |
|---|---|---|---|---|
| 0 | Preloader `#offform-loader` | fixed | 100vh | progress line + % counter |
| 1 | Header `.offform-header` | fixed | 56 | logo, discipline, decorative squares, nav, roster years |
| 2 | Hero `.offform-hero` | 0 | 100vh | 3-column image triptych + central marker line + copy |
| 3 | About + Selected/Featured talent `#about-selected-work` | 900 | 300vh | about copy, then sticky infinite horizontal image strip |
| 4 | Talents `#talents` | 3600 | 240vh | sticky roster list with hover image + Women/Men/New Face switch |
| 5 | Services `#services` | 5760 | 780vh | pinned full-bleed image that splits open; centred small image + 3 services |
| 6 | Selected Campaigns `#selected-campaigns` | 12780 | 240vh | sticky timed gallery (clip transitions) + progress bar |
| 7 | Final `.offform-final` (Partners + Contact) | 14940 | 300vh | sticky partner list w/ hover image, then inline contact form |
| 8 | Footer `#clients` | 17640 | 653 | 4-column directory + giant micro-text OFFFORM wordmark |

Floating: custom cursor (desktop), Awwwards "Nominee" badge (right edge; third-party, not to be reproduced).

## 2. Design tokens [V]

| Token | Value |
|---|---|
| Background | `#0b0b0b` (hero container `#000`) |
| Text | `#ffffff`; secondary text `rgba(255,255,255,.58)` |
| Accent | `#ff4fd8` (hot pink) — active nav item, roster hover, progress bar dot, pressed states |
| Font | `"Courier New", Courier, monospace` (Courier Prime is loaded but the computed family is Courier New), weight **500**, `text-transform: uppercase` |
| Sizes | body micro-type **10px / 14px**, header 12px/12px, labels 9px; letter-spacing **0.045em** (0.42–0.45px) |
| Header | fixed, padding `28px 20px 0`, height 56, transparent, no blend |
| Side gutters | 20px desktop, 16px tablet/mobile |
| Lines | 1px white hairlines, used as section dividers that **draw in** with scroll |
| Squares | 6–8px solid white squares as bullets / button affordances / cursor |
| Corners | none — everything is square |
| Easing A (UI) | `cubic-bezier(0.22, 1, 0.36, 1)` 0.35s — underline widths, translate on hover |
| Easing B (reveals) | `cubic-bezier(0.76, 0, 0.24, 1)` 0.65s — clip-path curtains |
| Fades | 0.18–0.25s `ease` |

Layout grid: header splits into 5 anchor points (logo 20px · discipline ~23% · squares at 50% · nav ~65% · meta right-aligned). Content rows reuse a **4-column text grid**: col 1 at 20px (label + short statement), col 2 ~23% (taxonomy), col 3 ~50% (main paragraph), col 4 right-aligned (meta pairs). Text never exceeds ~60ch.

Image treatment: full-bleed or column-filling, `object-fit: cover`, square edges, no shadows, no overlays; the photography carries all colour against a near-black UI.

## 3. Section-by-section

### 0. Preloader [V]
- Black screen; a horizontal line at the **same Y as the hero's centre line** (desktop) or 50vh (mobile). Left: `%` counter; a growing "progress zone" line; a small square at the leading edge.
- Progress = min(asset progress, time progress) with 0.12 lerp smoothing; **minimum 1500 ms**; waits for the hero + key images to load *and decode*; 6 s safety fallback.
- On 100%: `is-leaving` class, removed after 230 ms, fires `offform-loader-complete`. The loader's line then *is* the hero's line (seamless hand-off).

### 2. Hero [V]
- Three equal columns, each a portrait image (left colour, centre saturated red, right B&W), 100vh.
- **Intro**: each column reveals with `clip-path: inset(0 0 100% 0) → inset(0)` over 0.65s `cubic-bezier(.76,0,.24,1)`, staggered 80/160/240 ms; UI fades in after.
- **Centre line system**: "100%" label, full-width hairline, 6 tick markers at 1/9, 2/9, 4/9, 5/9, 7/9, 8/9 of width (two per image) with labels (FACES, TALENT, FASHION, BEAUTY, EDITORIAL, MOTION).
- Bottom-left: 3-line statement. Bottom-right: numbered list 01/02/03 with category labels, then "VIEW ALL TALENTS ■" with underline.
- **Scroll — parallax exit**: columns translate by scroll × [0, 0.12, 0.24] so left leaves first, right slowest.
- **Scroll — line hold**: the centre line is held in place (translated down) while the hero scrolls away, released 80px before the first gallery row arrives.
- **Hover — image wave** (desktop, fine pointer, ≥1025px): Canvas 2D redraw of the image in 2px horizontal strips, each shifted by `(sin(y·0.045+φ) + 0.65·sin(y·0.021−1.7φ) + 0.35·sin((y−mouseY)·0.018+0.65φ)) × 4.5px × movement`. `movement` eases to 1 (×0.45/frame) while the pointer moves, decays ×0.86/frame 70 ms after it stops; φ += 0.13/frame. Edge gaps filled by stretching the edge column. Effect: a subtle liquid ripple that only exists while the mouse moves.
- **Mobile**: hero becomes a single full-screen frame; the three images crossfade in a 9 s loop (each ~3 s, 4% fade); mobile stacked parallax factor 0.32.

### 3. About + Featured strip [V]
- About row (4-col grid): "ABOUT — OFFFORM ■" label line that draws across; statement; main paragraph; meta grid; a numbered list "01 REPRESENTATION / 02 TALENT DEVELOPMENT / 03 CASTING".
- Then "FEATURED — TALENTS" label line, and an **infinite horizontal strip** of ~10 portrait images (5 visible at 1440, 3 on tablet), each cell 50vh tall.
- **Strip motion**: autoplay at ~150 px/s (`data-speed`), pointer drag (3px threshold) and touch drag with axis lock (4px / 10px); the same `loopOffset` drives both so there is no jump.
- **Image clip morph**: each image has an individual vertical clip (`--clip-top/bottom`) so heights differ; when the stage becomes sticky, after a 1 s hold, the clip morphs from top-aligned to bottom-aligned with scroll.
- **Per-image parallax**: entry +strength→0, exit 0→−strength×exitSpeed (strength 32–76px, exitSpeed 0.78–1.12).
- **Hover**: the curtain opens the cropped image to full height (650 ms, Easing B), direction depends on crop position; the same canvas wave runs on hover; image numbers (01, 02…) at bottom-left.

### 4. Talents roster [V]
- Sticky 100vh composition. Top: "CURRENT ROSTER — TALENTS ■" line, taxonomy (FASHION / BEAUTY / EDITORIAL), filter buttons **WOMEN ■ / MEN ■ / NEW FACE ■** with underline, meta.
- List of 10 rows: number · name · city (right), 1px dividers.
- **Row hover**: text rolls vertically (masked duplicate slides up) and turns `#ff4fd8`; a ~100×130 portrait appears **at the pointer position** (follows cursor, crossfades between rows). Stays in sync while scrolling with a stationary pointer.
- WOMEN/MEN switch swaps the list (rows animate out/in with tiny stagger).
- Keyboard: rows are focusable; focus mirrors hover.

### 5. Services (pinned split) [V]
- One full-bleed image (inset 20px, under header) enters with parallax, pins, then **splits vertically down the centre** — the two halves slide apart to the edges, leaving ~1/6 of the image visible at each side.
- In the opened gap: a small centred portrait (≈ 70×90 vw-scaled) reveals top→bottom; label "SERVICES" above it.
- Three services scroll through: title (e.g. REPRESENTATION) + 3-line copy that **splits into two halves either side of the small image** as it passes, then scrolls on. The small image **crossfades** between three images (scroll-linked, no movement); the wave effect also runs on hover.
- Exit: last image hides bottom→top (exact reverse), halves close back together, the full image scrolls out.
- Section is 780vh — the slowest, most cinematic beat of the page.

### 6. Selected campaigns [V]
- Header row (4-col): "SELECTED — CAMPAIGNS ■" line, text, meta (CAMPAIGN 2026 / EDITORIAL 2025 / SELECTED 05).
- Left column: "■ TALENT — NAME", 3-line description, client / campaign / year.
- Right: large landscape image (~60% width). **Timed gallery**: hold 2300 ms → current image clips closed (950 ms) → next opens (950 ms); paused on hover; resets when off-screen.
- Bottom-left: progress bar "0.1 ———•——— 0.5" with a pink dot marking the active index.

### 7. Partners + Contact [V]
- "SELECTED — PARTNERS ■" line draws across; left: statement + B&W image (changes on row hover), talent/project/year meta; right: 10 numbered partner rows with hairlines; hover = pink text roll + image swap.
- Second half of the sticky: "CONTACT — LET'S WORK TOGETHER ■" line builds; one-row form: intro copy · NAME/EMAIL (underline inputs) · AGENCY/PROJECT · "SUBMIT INQUIRY ■". Demo submit states: SENDING… (650 ms) → INQUIRY SENT (1800 ms); validation labels COMPLETE FIELDS / CHECK EMAIL.

### 8. Footer [V]
- "OFFFORM ——— DIRECTORY ■" line. 4 columns: SOCIAL, LEGAL, CITIES, NAVIGATION, each headed with a ■.
- Giant "OFFFORM" wordmark, full width, built as one SVG mask per letter filled with rows of 12px micro "OFFFORM" text. **Hover**: rows within a fixed distance of the cursor split exactly at the cursor X — left words push left, right words push right (mouse lerp 0.16) — opening only the letter under the pointer. Mobile: static, tap = pink press.
- "© 2026" bottom right.

### Header & navigation [V]
- Desktop nav: 4 anchors, 12px. Active section label turns pink (IntersectionObserver-style active state). Click → custom smooth scroll 900 ms `easeInOutCubic`, header-offset aware, focus moved to target.
- Mobile (<768): logo + squares + hamburger (3 lines → X). Menu: right-aligned vertical list dropping below the header, no backdrop, `opacity/transform 0.22s`. Escape closes; keyboard support.

### Cursor [V]
- Native cursor hidden on `(hover:hover) and (pointer:fine)`; a **12×12 white square**, `mix-blend-mode: difference`, centred on the pointer, fade-in 0.15s. Hidden on touch; native cursor restored under `forced-colors: active`.

## 4. Interaction & animation inventory

| Animation | Trigger | Properties | Timing / easing | Input | Viewports | Interrupt / reverse |
|---|---|---|---|---|---|---|
| Preloader progress | load | width of progress line, % text | ≥1500 ms, lerp 0.12 | assets | all | n/a; 6 s fallback |
| Hero curtain reveal | loader complete | clip-path inset bottom→0 | 0.65s Easing B, +80 ms stagger | time | desktop; mobile loops crossfade | one-shot |
| Hero parallax exit | scroll | translateY ×[0,.12,.24] | linear to scroll | scroll | ≥768 | fully reversible |
| Centre line hold | scroll | translateY of line | linear | scroll | all (mobile own controller) | reversible |
| Image wave | pointer move over image | canvas strip offsets | ease-in ×0.45/frame, decay ×0.86 | pointer | ≥1025 fine pointer | stops 70 ms after pointer stops |
| Section line draw | scroll into view | width of hairline, label slides along | scroll-linked | scroll | all | reversible |
| Strip marquee | visible | translateX | 150 px/s | time + drag | all | drag takes over seamlessly |
| Strip clip morph | sticky progress | clip top/bottom | scroll-linked after 1 s hold | scroll | all | reversible |
| Strip hover curtain | hover image | clip → full | 650 ms Easing B | pointer | fine pointer | reverses from current value |
| Roster row roll | hover/focus | translateY of duplicated text, colour | 0.35s Easing A | pointer/keyboard | ≥1025 | reversible |
| Roster cursor image | hover row | position (follows pointer), image crossfade | opacity 0.22s | pointer | ≥1025 | fades out on leave |
| Services split | scroll | translateX of halves, clip of small image, opacity | scroll-linked | scroll | all (mobile pin engine) | exact reverse |
| Services text split | scroll | text halves offset around small image | scroll-linked | scroll | all | reversible |
| Campaign timed gallery | in view | clip-path | hold 2300, close 950, open 950 | time; pause on hover | all | finishes current transition, resets off-screen |
| Footer letter split | pointer over wordmark | translateX of micro-text rows | lerp 0.16 | pointer | ≥1025 | relaxes back |
| Nav smooth scroll | click | scroll position | 900 ms easeInOutCubic | click | all | new click cancels old |
| Mobile menu | tap | opacity, translateY | 0.22s ease | tap/Escape | <768 | reversible |

## 5. Responsive behaviour [V]

Breakpoints from CSS comments: mobile 0–767, tablet 768–1024, desktop 1025–1519, wide 1520+.
- **Mobile**: hamburger; hero crossfade loop; about copy stacks into 2 columns; strip remains horizontal (taller); roster rows full width with city on right; services keeps the split (narrower edges); campaigns stack (text, then image); partners list then contact form fields stacked; footer columns stack, wordmark static. Native scroll (no Lenis).
- **Tablet**: 16px gutters, 3 strip images across, no hover effects (tap = active row), services small images 120×160.

## 6. Uncertainties / not inspected

- Exact per-frame curve of the services split was read from code structure, not replicated numerically; reproduction will be judged visually.
- Legal sub-pages and the WOMEN/MEN data swap were not exhaustively exercised.
- Reduced motion: the reference only honours `prefers-reduced-motion` in the mobile hero; desktop motion is not reduced. **ORVAS will improve on this.**
- The contact form is a demo (no backend) on the reference.

## 7. Implementation checklist

All items implemented (see `design-direction.md` → Validation log). Component map: header `Header.astro` + `motion/nav.ts`; loader `Loader.astro` + `motion/hero.ts`; hero `Hero.astro`; strip `About.astro` + `motion/about.ts`; roster `IndexList.astro` + `motion/index-list.ts`; split `Sessions.astro` + `motion/sessions.ts`; timed gallery `Featured.astro` + `motion/featured.ts`; list + contact `Contact.astro` + `motion/final.ts`; footer `Footer.astro` + `motion/wordmark.ts`; cursor `motion/cursor.ts`; wave `motion/wave.ts`; shared loop `motion/runtime.ts`.


- [x] Fixed header with 5 anchor points, pink active state, mobile hamburger menu (Esc / focus handling)
- [x] Preloader: line + % + square, min duration, hand-off to hero line; skippable / short
- [x] Hero triptych: curtain intro, centre marker line with hold, parallax exit, canvas wave hover, mobile crossfade loop
- [x] About row (4-col grid) with drawing section line
- [x] Infinite draggable strip with per-image clip, parallax, hover curtain
- [x] Sticky list section with row roll + cursor-following image preview
- [x] Pinned split-image section with centred small image, scroll-linked crossfade, split text
- [x] Timed featured gallery with clip transitions, progress bar, pause on hover
- [x] Partner/credit list with hover image + contact block (minimal)
- [x] Footer directory + micro-text wordmark with cursor split
- [x] Custom difference-blend square cursor (fine pointers only)
- [x] Lenis desktop smooth scroll, native mobile
- [x] Reduced-motion: disable wave, marquee autoplay, pins collapse to static layout
