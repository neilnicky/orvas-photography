import { clamp, phase, smoothstep } from "./config";
import { env, onResize, onScroll, pageTop } from "./runtime";
import { attachWave } from "./wave";

/**
 * Sessions (reference §5 "Services"): pinned full-bleed image splits open from
 * the centre, a small portrait reveals top→bottom in the gap, session copy scrolls
 * through and splits around the small image, small image crossfades per session,
 * then everything reverses.
 */
export function initSessions() {
  const section = document.querySelector<HTMLElement>("[data-sessions]");
  if (!section || env.reduced) return;
  const stage = section.querySelector<HTMLElement>("[data-sessions-stage]")!;
  const halves = Array.from(section.querySelectorAll<HTMLElement>("[data-half]"));
  const center = section.querySelector<HTMLElement>("[data-sessions-center]")!;
  const small = section.querySelector<HTMLElement>("[data-sessions-small]")!;
  const smallImgs = Array.from(small.querySelectorAll("img"));
  const column = section.querySelector<HTMLElement>("[data-sessions-column]")!;
  const lines = Array.from(column.querySelectorAll<HTMLElement>("[data-split-line]"));
  const visuals = Array.from(column.querySelectorAll<HTMLElement>(".session-visual"));

  let active = 0;
  attachWave(small, () => smallImgs[active] ?? null);

  let top = 0;
  let travel = 1;
  let halfW = 0;
  let edge = 0;
  let colH = 0;
  let vh = 0;
  let band = { top: 0, bottom: 0, half: 0 };
  let lineTops: { top: number; h: number }[] = [];
  let visualCenters: number[] = [];

  const measure = () => {
    vh = window.innerHeight;
    top = pageTop(section);
    travel = Math.max(1, section.offsetHeight - vh);
    const large = halves[0]?.parentElement;
    halfW = (large?.clientWidth ?? 0) / 2;
    const vw = window.innerWidth;
    edge = vw <= 767 ? 40 : vw <= 1024 ? 120 : Math.round(vw * 0.174);
    colH = column.offsetHeight;
    const s = stage.getBoundingClientRect();
    const c = small.getBoundingClientRect();
    band = { top: c.top - s.top, bottom: c.bottom - s.top, half: c.width / 2 };
    lineTops = lines.map((l) => ({ top: l.offsetTop, h: l.offsetHeight }));
    visualCenters = visuals.map((v) => v.offsetTop + v.offsetHeight / 2);
  };
  measure();
  onResize(measure);

  let lastActive = -1;
  onScroll((y) => {
    const p = clamp((y - top) / travel);
    if (y < top - vh || y > top + travel + vh) return;

    // 1 — split open / close
    const open = smoothstep(phase(p, 0.03, 0.13)) * (1 - smoothstep(phase(p, 0.9, 0.98)));
    const dx = Math.max(0, halfW - edge) * open;
    halves[0]?.style.setProperty("--x", `${-dx}px`);
    halves[1]?.style.setProperty("--x", `${dx}px`);

    // 2 — small image: reveal top→bottom, hide bottom→top (exact reverse)
    const reveal = phase(p, 0.11, 0.17);
    const hide = phase(p, 0.85, 0.9);
    small.style.setProperty("--st", "0%");
    small.style.setProperty("--sb", `${((1 - reveal) + hide) * 100}%`);
    center.style.setProperty("--label-o", String(Math.min(reveal, 1 - hide)));

    // 3 — copy scrolls from below the fold to above the top
    const tp = phase(p, 0.15, 0.86);
    const ty = vh - tp * (colH + vh);
    column.style.setProperty("--ty", `${ty.toFixed(1)}px`);

    // 4 — crossfade: the session whose centre is nearest the image wins
    const mid = (band.top + band.bottom) / 2;
    const centers = visualCenters.map((c) => ty + c);
    let f = 0;
    if (mid >= (centers[centers.length - 1] ?? 0)) f = centers.length - 1;
    else {
      for (let i = 0; i < centers.length - 1; i++) {
        const a = centers[i] ?? 0;
        const b = centers[i + 1] ?? 0;
        if (mid >= a && mid < b) {
          // swap within the middle 30% of the distance between two sessions
          f = i + smoothstep(phase((mid - a) / (b - a), 0.35, 0.65));
          break;
        }
      }
    }
    smallImgs.forEach((img, i) => {
      img.style.opacity = clamp(1 - Math.abs(f - i)).toFixed(3);
    });
    active = Math.round(f);
    if (active !== lastActive) {
      lastActive = active;
      small.dispatchEvent(new Event("wave:invalidate"));
    }

    // 5 — split each copy line around the image band
    const gapMax = band.half + 18;
    lines.forEach((l, i) => {
      const t = lineTops[i];
      if (!t) return;
      const lt = ty + t.top;
      const lb = lt + t.h;
      const dist = Math.max(0, band.top - lb, lt - band.bottom);
      const g = smoothstep(clamp(1 - dist / 36)) * gapMax * reveal * (1 - hide);
      l.style.setProperty("--gap", `${g.toFixed(1)}px`);
    });
  });
}
