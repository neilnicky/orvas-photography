# ORVAS — Design Direction

Decisions for translating Offform (see `reference-analysis.md`) into ORVAS (see `orvas-brand-research.md`).

## Principle

Keep Offform's **frame** (near-black canvas, mono micro-type, hairlines, square bullets, scroll choreography) and its **rhythm** (triptych → about + moving strip → index → pinned split → timed feature → list + contact → wordmark). Replace everything inside the frame with ORVAS's photographs and words. The photographs carry all colour; the UI stays silent.

## Stack decision

The repository was empty (brief + empty `docs/`, no git). Chosen: **Astro 5 + TypeScript (strict)**, static output.
- Offform itself is server-rendered HTML + vanilla RAF modules; Astro gives the same model with zero framework runtime, typed content, and built-in image optimisation (`astro:assets` → AVIF/WebP, responsive `srcset`, metadata stripped).
- Motion is written as small, typed vanilla modules (one per behaviour), each with setup/teardown and reduced-motion handling.
- **Lenis** (desktop only, same params as reference: lerp 0.08, wheelMultiplier 0.9) is the only motion dependency.
- **String Tune** evaluated (`@fiddle-digital/string-tune`, attribute-driven scroll/cursor/split-text/progress). Not adopted: it would duplicate Lenis and none of its documented modules implements the reference's canvas strip-wave, split-image pin or micro-text wordmark, which need custom code anyway. Fewer moving parts wins.
- No GSAP/Framer: the reference uses none, and every effect is scroll-progress or lerp math.

## Identity

| | Offform | ORVAS | Why |
|---|---|---|---|
| Background | #0b0b0b | #0b0b0b | same silent frame |
| Text | #fff / 58% | #f4f1ee / 56% | slightly warm white flatters skin-toned work |
| Accent | #ff4fd8 pink | **#ff3344 gel red** | red is the recurring gel in ORVAS's studio work (Dark Bunny, Demons, Black Bride, Take Me To Hell) |
| Type | Courier New 500 | **Courier Prime** (self-hosted, OFL) 400/700 | same typewriter voice; self-hosted so Android/Windows render it identically |
| Wordmark | "OFFFORM" micro-text | "ORVAS" micro-text | 5 letters fill the width with larger glyphs, stronger than 7 |

Micro-type: 10px/14px uppercase, 0.045em tracking (as reference). Labels 9px. Display: series titles at 10px in lists; no large headlines anywhere except the footer wordmark — the photographs are the headlines.

## Section mapping

| Offform | ORVAS | Content |
|---|---|---|
| Header: logo · discipline · ■■ · nav · roster years | ORVAS · PHOTOGRAPHER & RETOUCHER / BOUDOIR · FASHION · ■■ · ABOUT WORK SESSIONS CONTACT · ARCHIVE 2023 — 2025 | verified |
| Hero triptych (colour / red / B&W) | gold visor (I Chill Harder…) / red bunny silhouette (Dark Bunny Red Eveil) / B&W torso study (Curves) | same colour rhythm; right column must be dark so the white UI stays legible (a white-backdrop B&W frame was tried and rejected in validation) |
| Hero markers (FACES…MOTION) | BOUDOIR · SENSUAL · FASHION · EDITORIAL · PORTRAIT · RETOUCH | taken from his meta keywords + about |
| Hero bottom-right 01 WOMEN / 02 MEN / 03 NEW FACE · VIEW ALL TALENTS | 01 BOUDOIR / 02 FASHION / 03 RETOUCH · VIEW THE INDEX | |
| About + featured talents strip | About (verbatim about text, split across columns) + "SELECTED — FRAMES" infinite strip of 12 covers | |
| Talents roster + WOMEN/MEN/NEW FACE | **Index** of series: number · title · year · category, with FASHION / BOUDOIR switch, cursor preview | 52 real series |
| Services split (3 services) | **Sessions** split: BOUDOIR / FASHION / RETOUCH, copy paraphrased from about | no prices/durations invented |
| Selected campaigns (timed) | **Featured series** timed gallery: each slide is a **diptych of two native 3:4 frames** filling the reference's landscape box (5 series, category / year / frames) | no fabricated client credits; faces never cropped to 16:9 |
| Partners list (hover image) | **Latest — 2025**: 10 real 2025 series, hover/focus swaps the aside image + meta | ORVAS has no published partners; the list keeps the interaction with real content |
| Contact form row | **Contact row** in the same 4-column geometry: statement · channels as underline 'fields' (Direct message, Instagram, Inquiry form; Email/Booking appear when configured) · START AN INQUIRY ■ | no demo form (reference form is non-functional); every element is a working link |
| Footer directory + OFFFORM wordmark | Directory (Social / Work / Contact / Navigation) + ORVAS micro-text wordmark | |
| — | `/work/[slug]` series pages | photographer needs galleries; reference had none. Built in the same language (header, hairline row, 4-col meta, image column) |

## Image direction

- Portrait 3:4 is native; layouts that need portrait (hero columns, strip, small session image, index preview) use it uncropped or lightly cropped with per-image `focus` (object-position) stored in content.
- Only landscape-native image (Blood of Love 4:3) takes the full-bleed split.
- Featured gallery uses portrait images in a 4:5 frame rather than the reference's landscape (forcing 3:4 work to 16:9 would cut faces).
- Explicit nude frames excluded (see research policy).

## Intentional departures

1. **Accent colour** pink → gel red (brand-derived).
2. **No demo contact form.** Offform's form fakes a submission. ORVAS gets real links only; an inquiry form remains one click away on the existing Adobe Portfolio form until an email/endpoint is configured.
3. **Series pages** added.
4. **Reduced motion honoured everywhere** (reference only on mobile hero): no Lenis, no wave, strip static and scrollable, pins collapse to plain stacked layout, timed gallery stops.
5. **Preloader** keeps the line/percentage hand-off, but capped: min 900 ms (reference 1500), hard cap 3 s, skipped entirely under reduced motion and on repeat visits in the same session.
6. **Awwwards badge** not reproduced (third-party award, not ORVAS's).
7. Featured gallery shows a diptych of two 3:4 frames inside the reference's landscape box.
8. Partners list → "Latest — 2025" series list (same interaction, real content).

## Copy voice

Short, declarative, built from ORVAS's own about text and series titles. No invented claims, numbers, clients or testimonials. Stop-Slop applied: no filler adverbs, no "not X but Y" constructions, no pull-quote slogans.

## Validation log (2026-10-15)

Compared against reference screenshots at matching scroll stops (1440×900) and the screen recording; Playwright at 1440, 768, 390, 320.

| Area | Finding | Fix |
|---|---|---|
| Hero right column | B&W white-backdrop frame made white nav/meta/index text invisible | swapped to dark B&W *Curves* frame |
| Hero right column (2nd pass) | candidate *Tides* frame showed explicit nudity | rejected per curation policy; *Curves* abstract torso used |
| Mobile hero | statement collided with "View the index" | widths rebalanced (56/44) |
| Mobile featured | pinned stage taller than viewport | unpinned ≤767px, 3:2 diptych |
| Tablet contact row | channels overlapped CTA | 2-column row ≤1024px |
| Footer wordmark | mobile micro-text too coarse to read as letters | micro size 5px mobile / 8px tablet / 12px desktop |
| About meta | dl stretched to row height | `align-content: start` |
| Reduced motion | session cards 2089px tall (img height attr beat aspect-ratio) | `height: auto` |
| Mobile menu | stayed visible after Escape (`display:flex` overrode `[hidden]`) | explicit `[hidden]{display:none}` |

Verified behaviours: loader → hero line hand-off; curtain stagger; parallax exit; centre-line hold; canvas wave (opacity 1 while moving); strip marquee/drag/crop morph/hover curtain; index row roll + cursor preview; filter switch; sessions split/reveal/crossfade/text split/reverse; timed diptych + progress; latest hover swap; line draws; wordmark cursor split; nav smooth scroll + active state; reduced-motion static layout; no horizontal overflow at 320–1440.

Known differences from the reference:
- Exact per-frame curves of the services split are approximated (phase windows), judged visually.
- Lenis runs only on desktop fine pointers (as reference); touch uses native scroll.
- Image weight: dist contains AVIF/WebP variants for 218 frames (~240 MB on disk); each page loads only the variants its `sizes` select.
