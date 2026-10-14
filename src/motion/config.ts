/**
 * Motion constants. Values measured from the Offform source/recording
 * (docs/reference-analysis.md §3–4) unless marked "ORVAS".
 */
export const motion = {
  lenis: { lerp: 0.08, wheelMultiplier: 0.9 },

  loader: {
    /** ORVAS: reference uses 1500ms; shortened so the portfolio is never held back. */
    minDuration: 900,
    maxDuration: 3000,
    smoothing: 0.12,
    leaveMs: 230,
  },

  hero: {
    revealStaggerMs: 80,
    parallax: [0, 0.12, 0.24] as const,
    lineReleaseGap: 80,
    /** Mobile: each image ~3s in a 9s crossfade loop (CSS). */
  },

  wave: {
    distortion: 4.5,
    frequency: 0.045,
    speed: 0.13,
    organic: 0.65,
    fade: 0.14,
    moveTimeoutMs: 70,
    rise: 0.45,
    stripHeight: 2,
  },

  strip: {
    speedPxPerSecond: 150,
    dragThreshold: 3,
    touchAxisLock: 4,
    curtainMs: 650,
    /** Per-image parallax strength (px) and exit speed; cycled over items. */
    parallax: [32, 64, 42, 76, 50, 34, 68, 46, 72, 40],
    exitSpeed: [0.82, 1.05, 0.92, 1.12, 0.86, 1.0, 0.78, 1.08, 0.9, 1.04],
    /** ORVAS: per-image crop fraction (share of height hidden) creating the uneven skyline. */
    crop: [0.0, 0.32, 0.12, 0.42, 0.22, 0.05, 0.36, 0.18, 0.28, 0.08],
  },

  featured: {
    holdMs: 2300,
    closeMs: 950,
    openMs: 950,
  },

  wordmark: {
    mouseEase: 0.16,
    microSize: 12,
    gapX: 3,
    gapY: 1,
    cursorGap: 26,
    activeRowDistance: 70,
  },

  nav: { scrollMs: 900 },
} as const;

/** CSS cubic-bezier(.76,0,.24,1) as a JS function (Offform "Easing B"). */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number): (x: number) => number {
  const sx = (t: number) => 3 * (1 - t) ** 2 * t * x1 + 3 * (1 - t) * t * t * x2 + t ** 3;
  const sy = (t: number) => 3 * (1 - t) ** 2 * t * y1 + 3 * (1 - t) * t * t * y2 + t ** 3;
  return (x: number) => {
    const v = Math.min(1, Math.max(0, x));
    let lo = 0;
    let hi = 1;
    let t = v;
    for (let i = 0; i < 18; i++) {
      t = (lo + hi) / 2;
      if (sx(t) < v) lo = t;
      else hi = t;
    }
    return sy(t);
  };
}

export const easeCurtain = cubicBezier(0.76, 0, 0.24, 1);
export const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
/** Progress of `v` within [start, end], clamped to 0..1. */
export const phase = (v: number, start: number, end: number) => clamp((v - start) / (end - start));
export const smoothstep = (t: number) => t * t * (3 - 2 * t);
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
