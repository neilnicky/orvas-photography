import { motion } from "./config";
import { env, onFrame } from "./runtime";

/**
 * Offform "image wave": while the pointer moves over an image, a canvas copy is
 * redrawn in 2px horizontal strips, each shifted by a sum of sines. The effect
 * eases in while moving and decays ~70ms after the pointer stops.
 * Desktop + fine pointer only; never under reduced motion.
 */

const W = motion.wave;

function coverRect(img: HTMLImageElement, w: number, h: number) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const scale = Math.max(w / iw, h / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  const pos = getComputedStyle(img).objectPosition.split(" ");
  const px = parseFloat(pos[0] ?? "50") / 100;
  const py = parseFloat(pos[1] ?? "50") / 100;
  return { dx: (w - dw) * (Number.isNaN(px) ? 0.5 : px), dy: (h - dh) * (Number.isNaN(py) ? 0.5 : py), dw, dh };
}

export function attachWave(
  host: HTMLElement,
  pick: () => HTMLImageElement | null = () => host.querySelector("img"),
): () => void {
  if (env.reduced || !env.finePointer || !env.desktop) return () => {};
  if (!pick()) return () => {};

  const canvas = document.createElement("canvas");
  canvas.className = "wave-canvas";
  canvas.setAttribute("aria-hidden", "true");
  host.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  const source = document.createElement("canvas");
  const sctx = source.getContext("2d");
  if (!ctx || !sctx) return () => canvas.remove();

  let inside = false;
  let moving = false;
  let amount = 0;
  let wavePhase = 0;
  let mouseY: number | null = null;
  let prevX: number | null = null;
  let prevY: number | null = null;
  let timer = 0;
  let captured = false;

  const dpr = () => Math.min(2, window.devicePixelRatio || 1);

  function resize() {
    const r = host.getBoundingClientRect();
    const d = dpr();
    canvas.width = source.width = Math.max(1, Math.round(r.width * d));
    canvas.height = source.height = Math.max(1, Math.round(r.height * d));
    captured = false;
  }

  function capture(): boolean {
    if (captured) return true;
    const img = pick();
    if (!img || !img.complete || !img.naturalWidth || !sctx) return false;
    const { dx, dy, dw, dh } = coverRect(img, source.width, source.height);
    sctx.clearRect(0, 0, source.width, source.height);
    sctx.drawImage(img, dx, dy, dw, dh);
    captured = true;
    return true;
  }

  function draw() {
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    const d = dpr();
    const strip = W.stripHeight * d;
    const my = mouseY === null ? null : mouseY * d;
    ctx.clearRect(0, 0, width, height);
    for (let y = 0; y < height; y += strip) {
      const main = Math.sin((y / d) * W.frequency + wavePhase);
      const organic = Math.sin((y / d) * 0.021 - wavePhase * 1.7) * W.organic;
      const pointer = my !== null ? Math.sin(((y - my) / d) * 0.018 + wavePhase * 0.65) * 0.35 : 0;
      const shift = (main + organic + pointer) * W.distortion * amount * d;
      const h = Math.min(strip + 1, height - y);
      ctx.drawImage(source, 0, y, width, h, shift, y, width, h);
      // Stretch the edge column into the gap the shift opened.
      if (shift > 0) ctx.drawImage(source, 0, y, 1, h, 0, y, shift + 1, h);
      else if (shift < 0) ctx.drawImage(source, width - 1, y, 1, h, width + shift - 1, y, -shift + 1, h);
    }
  }

  const stopFrame = onFrame(() => {
    if (!inside && amount <= 0.001) return;
    if (moving) amount += (1 - amount) * W.rise;
    else {
      amount *= 1 - W.fade;
      if (amount < 0.01) amount = 0;
    }
    if (amount <= 0 || !capture()) {
      canvas.style.opacity = "0";
      return;
    }
    wavePhase += W.speed;
    draw();
    canvas.style.opacity = "1";
  });

  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    mouseY = y;
    if (prevX === null || prevY === null || Math.hypot(x - prevX, y - prevY) > 0.2) {
      moving = true;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => (moving = false), W.moveTimeoutMs);
    }
    prevX = x;
    prevY = y;
  };
  const onEnter = () => {
    inside = true;
    prevX = prevY = null;
    amount = 0;
    resize();
  };
  const onLeave = () => {
    inside = false;
    moving = false;
    mouseY = prevX = prevY = null;
    window.clearTimeout(timer);
  };
  /** Images that change src (crossfades) must be recaptured. */
  const invalidate = () => (captured = false);

  host.addEventListener("pointermove", onMove, { passive: true });
  host.addEventListener("pointerenter", onEnter);
  host.addEventListener("pointerleave", onLeave);
  host.addEventListener("wave:invalidate", invalidate);
  resize();

  return () => {
    stopFrame();
    host.removeEventListener("pointermove", onMove);
    host.removeEventListener("pointerenter", onEnter);
    host.removeEventListener("pointerleave", onLeave);
    host.removeEventListener("wave:invalidate", invalidate);
    canvas.remove();
  };
}
