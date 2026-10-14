import { clamp, phase } from "./config";
import { env, onResize, onScroll, pageTop } from "./runtime";
import { attachWave } from "./wave";

/**
 * Latest + contact (reference §7 "Partners + Contact"): hovering or focusing a
 * row swaps the aside image and meta immediately; the Latest line builds in the
 * first half of the pin, the Contact line in the second.
 */
export function initFinal() {
  const section = document.querySelector<HTMLElement>("[data-final]");
  if (!section) return;
  const frame = section.querySelector<HTMLElement>("[data-latest-frame]");
  const frames = Array.from(section.querySelectorAll<HTMLElement>("[data-frame]"));
  const meta = {
    title: section.querySelector<HTMLElement>('[data-meta="title"]'),
    category: section.querySelector<HTMLElement>('[data-meta="category"]'),
    year: section.querySelector<HTMLElement>('[data-meta="year"]'),
  };
  if (frame) attachWave(frame, () => frame.querySelector<HTMLImageElement>(".is-active img"));

  const activate = (a: HTMLElement) => {
    const key = a.dataset.latest;
    frames.forEach((f) => f.classList.toggle("is-active", f.dataset.frame === key));
    if (meta.title) meta.title.textContent = a.dataset.title ?? "";
    if (meta.category) meta.category.textContent = a.dataset.category ?? "";
    if (meta.year) meta.year.textContent = a.dataset.year ?? "";
    frame?.dispatchEvent(new Event("wave:invalidate"));
  };
  section.querySelectorAll<HTMLElement>("[data-latest]").forEach((a) => {
    a.addEventListener("pointerenter", () => activate(a));
    a.addEventListener("focus", () => activate(a));
  });

  if (env.reduced) return;
  const [latestLine, contactLine] = Array.from(section.querySelectorAll<HTMLElement>("[data-sline]"));
  let top = 0;
  let travel = 1;
  const measure = () => {
    top = pageTop(section);
    travel = Math.max(1, section.offsetHeight - window.innerHeight);
  };
  measure();
  onResize(measure);
  onScroll((y) => {
    // Mobile: section is not pinned; draw by viewport position instead.
    const p = window.innerWidth <= 767 ? clamp((y - top + window.innerHeight * 0.6) / section.offsetHeight) : clamp((y - top) / travel);
    latestLine?.style.setProperty("--p", phase(p, 0.0, 0.45).toFixed(3));
    contactLine?.style.setProperty("--p", phase(p, 0.45, 0.95).toFixed(3));
  });
}
