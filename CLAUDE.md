# ORVAS site

Astro 7 + TypeScript (strict), static output. Recreation of offform.net's experience for photographer/retoucher ORVAS. Spec: `ORVAS_PROJECT_BRIEF.md`; findings and decisions in `docs/`.

## Commands
- `pnpm dev` (port 4321) · `pnpm build` (runs `astro check` first) · `pnpm test` (Vitest) · `pnpm test:e2e` (Playwright, against `dist/` via preview on 4322; build first)
- `pnpm assets <dir>` re-imports originals listed in `scripts/portfolio-crawl.json` into `src/assets/work/<slug>/NN.jpg` (resized, metadata stripped). Skips files that exist.

## Rules
- All copy, links and image choices live in `src/content/orvas-content.ts`. Components never hardcode editorial text. Image `src` is a path relative to `src/assets/`, resolved by `src/lib/images.ts`.
- Never add unverified business details (email, prices, clients, location). `contact.email` / `contact.booking.url` stay `null` until ORVAS supplies them; the UI adds those CTAs automatically when set.
- Home-page placements (hero, strip, sessions, featured, OG) use fashion or implied/non-explicit frames only. The right hero column must be a dark image (white UI sits on it).
- Motion: one RAF loop in `src/motion/runtime.ts` (`onScroll`, `onFrame`, `onResize`). Modules write CSS variables/transforms only; no per-frame layout reads except batched rect reads in `lines.ts`. Every module must no-op under `env.reduced`. Timings live in `src/motion/config.ts` and come from the reference (see `docs/reference-analysis.md`).
- Pinned sections are gated by `.js:not(.reduced)` CSS so no-JS and reduced-motion get a static, readable layout.
- Astro 7 `preview` uses a lock file; the Playwright config passes `--ignore-lock`.
