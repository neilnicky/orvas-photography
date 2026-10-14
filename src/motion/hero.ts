import { motion } from "./config";
import { env, onResize, onScroll, pageTop } from "./runtime";
import { attachWave } from "./wave";

/**
 * Loader → hero hand-off.
 * Progress = min(asset progress, time progress) eased by 0.12/frame (reference),
 * min 900ms, hard cap 3s. The loader line sits at 50vh, exactly where the hero
 * line is, so removing the loader leaves the line in place.
 */
export function runLoader(): Promise<void> {
  const root = document.documentElement;
  const loader = document.querySelector<HTMLElement>("[data-loader]");
  if (!loader || !root.classList.contains("is-loading")) return Promise.resolve();
  const count = loader.querySelector<HTMLElement>("[data-loader-count]");
  const zone = loader.querySelector<HTMLElement>("[data-loader-zone]");
  const line = loader.querySelector<HTMLElement>(".loader-line");
  const heroImgs = Array.from(document.querySelectorAll<HTMLImageElement>("[data-hero] img"));

  let loaded = 0;
  const total = heroImgs.length + 1;
  const bump = () => (loaded = Math.min(total, loaded + 1));
  heroImgs.forEach((img) => {
    if (img.complete) bump();
    else {
      img.addEventListener("load", bump, { once: true });
      img.addEventListener("error", bump, { once: true });
    }
  });
  document.fonts?.ready.then(bump).catch(bump) ?? bump();

  const start = performance.now();
  let shown = 0;
  return new Promise((resolve) => {
    const finish = () => {
      loader.classList.add("is-leaving");
      window.setTimeout(() => {
        root.classList.remove("is-loading");
        loader.remove();
        try {
          sessionStorage.setItem("orvas-loaded", "1");
        } catch {}
        resolve();
      }, motion.loader.leaveMs);
    };
    const step = () => {
      const elapsed = performance.now() - start;
      const assets = (loaded / total) * 100;
      const time = Math.min(100, (elapsed / motion.loader.minDuration) * 100);
      const capped = elapsed >= motion.loader.maxDuration;
      const target = capped ? 100 : Math.max(shown, Math.min(assets, time));
      shown += (target - shown) * motion.loader.smoothing;
      if (target === 100 && 100 - shown < 0.5) shown = 100;
      const width = line ? line.clientWidth - 31 - 7 - 20 : 0;
      if (zone) zone.style.width = `${(width * shown) / 100}px`;
      if (count) count.textContent = `${Math.round(shown)}%`;
      loader.setAttribute("aria-valuenow", String(Math.round(shown)));
      if (shown >= 100) finish();
      else requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

export function initHero() {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero) return;
  const cols = Array.from(hero.querySelectorAll<HTMLElement>(".hero-media"));
  const line = hero.querySelector<HTMLElement>("[data-hero-line]");

  // Intro: curtains (CSS) then UI.
  hero.classList.add("is-revealing");
  const reveal = env.reduced ? 0 : 650 + 240;
  window.setTimeout(() => hero.classList.add("is-ui"), reveal * 0.7);

  cols.forEach((c) => attachWave(c));

  if (env.reduced) return;

  // Parallax exit ×[0, .12, .24] and centre-line hold, desktop/tablet only.
  let heroTop = 0;
  let heroH = 0;
  let maxHold = 0;
  const next = hero.nextElementSibling as HTMLElement | null;
  const measure = () => {
    heroTop = pageTop(hero);
    heroH = hero.offsetHeight;
    const lineBottom = heroTop + heroH / 2 + 24;
    const nextTop = next ? pageTop(next) + motion.hero.lineReleaseGap + 100 : heroTop + heroH;
    maxHold = Math.max(0, nextTop - lineBottom - motion.hero.lineReleaseGap);
  };
  measure();
  onResize(measure);
  onScroll((y) => {
    if (y > heroTop + heroH + 200) return;
    const travelled = Math.min(heroH, Math.max(0, y - heroTop));
    if (window.innerWidth > 767) {
      cols.forEach((c, i) => c.style.setProperty("--py", `${travelled * (motion.hero.parallax[i] ?? 0)}px`));
    }
    line?.style.setProperty("--hold", `${Math.min(travelled, maxHold)}px`);
  });
}
