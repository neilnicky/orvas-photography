import { clamp, easeCurtain, motion, phase } from "./config";
import { env, onFrame, onResize, onScroll, pageTop } from "./runtime";
import { attachWave } from "./wave";

interface Item {
  el: HTMLElement;
  crop: number;
  strength: number;
  exit: number;
  /** 0 = scroll crop applied, 1 = fully revealed by hover. */
  reveal: number;
  baseTop: number;
  baseBottom: number;
}

/**
 * About + strip:
 * - stage pins for 200vh; the About line draws (0→.35), then the strip line (.35→.7)
 * - each image has its own crop; after a short hold the crop morphs from
 *   top-aligned to bottom-aligned with scroll
 * - images enter with +strength parallax and exit with −strength×exitSpeed
 * - endless 150px/s marquee with pointer/touch drag on the same offset
 * - hover opens the crop like a curtain (650ms, Easing B)
 */
export function initAbout() {
  const section = document.querySelector<HTMLElement>("[data-about]");
  const strip = section?.querySelector<HTMLElement>("[data-strip]");
  const track = section?.querySelector<HTMLElement>("[data-strip-track]");
  if (!section || !strip || !track) return;
  const [aboutLine, stripLine] = Array.from(section.querySelectorAll<HTMLElement>("[data-sline]"));

  const items: Item[] = Array.from(track.querySelectorAll<HTMLElement>("[data-strip-item]")).map((el) => ({
    el,
    crop: parseFloat(el.dataset.crop ?? "0"),
    strength: parseFloat(el.dataset.parallax ?? "40"),
    exit: parseFloat(el.dataset.exit ?? "1"),
    reveal: 0,
    baseTop: 0,
    baseBottom: 0,
  }));
  items.forEach((it) => attachWave(it.el.querySelector<HTMLElement>("[data-wave]")!));

  if (env.reduced) return;

  // ---------- scroll timeline ----------
  let top = 0;
  let travel = 1;
  let stripH = 0;
  const measure = () => {
    top = pageTop(section);
    travel = Math.max(1, section.offsetHeight - window.innerHeight);
    stripH = strip.offsetHeight;
  };
  measure();
  onResize(measure);

  const applyClip = (it: Item) => {
    const k = 1 - it.reveal;
    it.el.style.setProperty("--ct", `${(it.baseTop * k).toFixed(2)}px`);
    it.el.style.setProperty("--cb", `${(it.baseBottom * k).toFixed(2)}px`);
  };

  onScroll((y) => {
    const vh = window.innerHeight;
    const p = clamp((y - top) / travel); // sticky progress
    const entry = clamp((y - (top - vh)) / vh); // stage entering
    const exit = clamp((y - (top + travel)) / vh); // stage leaving
    aboutLine?.style.setProperty("--p", phase(p, 0.02, 0.35).toFixed(3));
    stripLine?.style.setProperty("--p", phase(p, 0.35, 0.7).toFixed(3));
    const morph = phase(p, 0.2, 1);
    items.forEach((it) => {
      const hidden = it.crop * stripH;
      it.baseTop = hidden * morph;
      it.baseBottom = hidden * (1 - morph);
      const py = (1 - entry) * it.strength - exit * it.strength * it.exit;
      it.el.style.setProperty("--py", `${py.toFixed(2)}px`);
      applyClip(it);
    });
  });

  // ---------- hover curtain ----------
  if (env.finePointer) {
    items.forEach((it) => {
      let from = 0;
      let to = 0;
      let start = 0;
      let raf = 0;
      const run = (target: number) => {
        from = it.reveal;
        to = target;
        start = performance.now();
        cancelAnimationFrame(raf);
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / motion.strip.curtainMs);
          it.reveal = from + (to - from) * easeCurtain(t);
          applyClip(it);
          if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      };
      it.el.addEventListener("pointerenter", () => run(1));
      it.el.addEventListener("pointerleave", () => run(0));
    });
  }

  // ---------- marquee + drag ----------
  let offset = 0;
  let loopWidth = 0;
  const measureLoop = () => {
    loopWidth = track.scrollWidth / 2;
  };
  measureLoop();
  onResize(measureLoop);

  let visible = false;
  new IntersectionObserver(([e]) => (visible = !!e?.isIntersecting)).observe(strip);

  let dragging = false;
  let pointerId: number | null = null;
  let lastX = 0;
  let startX = 0;
  let startY = 0;
  let axis: "x" | "y" | null = null;
  let moved = false;

  onFrame((_, dt) => {
    if (!visible || loopWidth <= 0) return;
    if (!dragging && !document.hidden) offset += (motion.strip.speedPxPerSecond * dt) / 1000;
    offset = ((offset % loopWidth) + loopWidth) % loopWidth;
    track.style.transform = `translate3d(${-offset}px,0,0)`;
  });

  strip.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    pointerId = e.pointerId;
    lastX = startX = e.clientX;
    startY = e.clientY;
    axis = e.pointerType === "mouse" ? "x" : null;
    moved = false;
  });
  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!axis) {
        if (Math.abs(dy) > 10) axis = "y";
        else if (Math.abs(dx) > motion.strip.touchAxisLock) axis = "x";
      }
      if (axis !== "x") return;
      if (!dragging && Math.abs(dx) > motion.strip.dragThreshold) {
        dragging = moved = true;
        strip.classList.add("is-dragging");
        try {
          strip.setPointerCapture(e.pointerId);
        } catch {}
      }
      if (dragging) {
        offset -= e.clientX - lastX;
        lastX = e.clientX;
      }
    },
    { passive: true },
  );
  const end = (e: PointerEvent) => {
    if (e.pointerId !== pointerId) return;
    pointerId = null;
    dragging = false;
    axis = null;
    strip.classList.remove("is-dragging");
  };
  window.addEventListener("pointerup", end);
  window.addEventListener("pointercancel", end);
  // A drag must not navigate.
  strip.addEventListener(
    "click",
    (e) => {
      if (moved) {
        e.preventDefault();
        moved = false;
      }
    },
    true,
  );
  strip.addEventListener("dragstart", (e) => e.preventDefault());

  // Keyboard focus brings the focused frame into view.
  strip.addEventListener("focusin", (e) => {
    const item = (e.target as HTMLElement).closest<HTMLElement>("[data-strip-item]");
    if (!item) return;
    offset = item.offsetLeft - strip.clientWidth / 2 + item.offsetWidth / 2;
    strip.scrollLeft = 0;
  });
}
