import { phase } from "./config";
import { env, onScroll } from "./runtime";

/** Unmanaged section lines draw as they travel from 90% to 35% of the viewport. */
export function initLines() {
  if (env.reduced) return;
  const lines = Array.from(document.querySelectorAll<HTMLElement>("[data-sline]:not([data-managed])"));
  if (!lines.length) return;
  const last = new Map<HTMLElement, number>();
  onScroll(() => {
    const vh = window.innerHeight;
    const tops = lines.map((l) => l.getBoundingClientRect().top); // batch reads
    lines.forEach((l, i) => {
      const p = Math.round(phase(vh * 0.9 - (tops[i] ?? 0), 0, vh * 0.55) * 1000) / 1000;
      if (last.get(l) === p) return;
      last.set(l, p);
      l.style.setProperty("--p", String(p));
    });
  });
}
