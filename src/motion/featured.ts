import { clamp, easeCurtain, motion, phase } from "./config";
import { env, onResize, onScroll, pageTop } from "./runtime";
import { attachWave } from "./wave";

const wait = (ms: number) => new Promise<void>((r) => window.setTimeout(r, ms));

function animateClip(el: HTMLElement, from: number, to: number, ms: number) {
  return new Promise<void>((resolve) => {
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      el.style.setProperty("--clip", `${from + (to - from) * easeCurtain(t)}%`);
      if (t < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}

/**
 * Featured series (reference §6 "Selected campaigns"): timed gallery —
 * hold 2300ms, current card clips shut upward (950ms), next opens downward (950ms).
 * Paused while hovered; runs only while visible; resets when fully off-screen.
 */
export function initFeatured() {
  const section = document.querySelector<HTMLElement>("[data-featured]");
  if (!section) return;
  const cards = Array.from(section.querySelectorAll<HTMLElement>("[data-featured-card]"));
  const texts = Array.from(section.querySelectorAll<HTMLElement>("[data-featured-text]"));
  const dot = section.querySelector<HTMLElement>("[data-featured-dot]");
  const line = section.querySelector<HTMLElement>("[data-sline]");
  section.querySelectorAll<HTMLElement>("[data-wave]").forEach((w) => attachWave(w));
  if (cards.length < 2) return;

  let index = 0;
  const setActive = (i: number) => {
    index = i;
    texts.forEach((t, k) => (t.hidden = k !== i));
    cards.forEach((c, k) => {
      if (k === i) c.removeAttribute("aria-hidden");
      else c.setAttribute("aria-hidden", "true");
      c.style.zIndex = k === i ? "2" : "1";
    });
    dot?.style.setProperty("--at", String(i / (cards.length - 1)));
  };
  setActive(0);

  // Reduced motion: the first series stays in place; no timer.
  if (env.reduced) return;

  let running = false;
  let paused = false;
  let session = 0;

  async function loop(id: number) {
    while (running && id === session) {
      await wait(motion.featured.holdMs);
      while (paused && running && id === session) await wait(80);
      if (!running || id !== session) return;
      const current = cards[index]!;
      const nextIndex = (index + 1) % cards.length;
      const next = cards[nextIndex]!;
      await animateClip(current, 0, 100, motion.featured.closeMs);
      next.style.setProperty("--clip", "100%");
      setActive(nextIndex);
      await animateClip(next, 100, 0, motion.featured.openMs);
    }
  }

  const frames = section.querySelector<HTMLElement>("[data-featured-frames]");
  frames?.addEventListener("pointerenter", () => (paused = true));
  frames?.addEventListener("pointerleave", () => (paused = false));

  new IntersectionObserver(
    ([e]) => {
      if (e?.isIntersecting && !running) {
        running = true;
        loop(++session);
      } else if (!e?.isIntersecting && running) {
        running = false;
        session++;
        cards.forEach((c, k) => c.style.setProperty("--clip", k === 0 ? "0%" : "100%"));
        setActive(0);
      }
    },
    { threshold: 0.25 },
  ).observe(section.querySelector(".featured-stage") ?? section);

  // Section line draws while pinned.
  let top = 0;
  let travel = 1;
  const measure = () => {
    top = pageTop(section);
    travel = Math.max(1, section.offsetHeight - window.innerHeight);
  };
  measure();
  onResize(measure);
  onScroll((y) => line?.style.setProperty("--p", phase(clamp((y - top) / travel), 0.02, 0.5).toFixed(3)));
}
