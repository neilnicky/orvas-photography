import { motion } from "./config";
import { env, onFrame, onResize } from "./runtime";

const NS = "http://www.w3.org/2000/svg";
const VB_W = 1600;
const BIG_FONT = '"Arial Black", "Helvetica Neue", Arial, sans-serif';
const MICRO_FONT = '"Courier Prime", "Courier New", monospace';

interface Row {
  y: number;
  left: SVGTextElement;
  right: SVGTextElement;
  clipL: SVGRectElement;
  clipR: SVGRectElement;
  shift: number;
}
interface Letter {
  x0: number;
  x1: number;
  rows: Row[];
}

function el<K extends keyof SVGElementTagNameMap>(name: K, attrs: Record<string, string | number> = {}) {
  const node = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

/**
 * Footer wordmark (reference §8): each giant letter is a mask filled with rows
 * of tiny repeated brand text. Under the pointer, rows near the cursor split at
 * the cursor X and part left/right, opening only the hovered letter.
 * Static on touch devices and under reduced motion.
 */
export function initWordmark() {
  const host = document.querySelector<HTMLElement>("[data-wordmark]");
  if (!host) return;
  const word = host.dataset.text ?? "ORVAS";
  const W = motion.wordmark;
  let letters: Letter[] = [];
  let svg: SVGSVGElement | null = null;
  let vbH = 0;
  let scale = 1;

  function build() {
    svg?.remove();
    letters = [];
    const width = host!.clientWidth - 2 * parseFloat(getComputedStyle(host!).paddingLeft || "0");
    if (width <= 0) return;
    scale = VB_W / width;
    // Measure the word at a reference size, fit it to the viewBox width.
    const probe = el("svg", { width: 0, height: 0, style: "position:absolute;visibility:hidden" });
    const ptext = el("text", { "font-family": BIG_FONT, "font-weight": 900, "font-size": 400 });
    ptext.textContent = word;
    probe.appendChild(ptext);
    host!.appendChild(probe);
    const bbox = ptext.getBBox();
    const fontSize = (400 * VB_W) / bbox.width;
    probe.remove();

    vbH = Math.round(fontSize * 0.74);
    const baseline = Math.round(fontSize * 0.72);
    svg = el("svg", { viewBox: `0 0 ${VB_W} ${vbH}`, role: "presentation", focusable: "false" });
    const defs = el("defs");
    svg.appendChild(defs);

    const full = el("text", { "font-family": BIG_FONT, "font-weight": 900, "font-size": fontSize, x: 0, y: baseline });
    full.textContent = word;
    svg.appendChild(full); // measured, then removed
    host!.appendChild(svg);
    const extents = Array.from(word).map((_, i) => {
      const r = full.getExtentOfChar(i);
      return { x: r.x, w: r.width };
    });
    full.remove();

    const micro = (width < 768 ? 5 : width < 1100 ? 8 : W.microSize) * scale;
    const charW = micro * 0.6;
    const wordW = charW * word.length + W.gapX * scale;
    const stepY = micro + W.gapY * scale;
    const chunk = `${word} `.repeat(Math.ceil((VB_W + 400) / wordW) + 2);

    extents.forEach((ext, i) => {
      const id = `wm-${i}-${Math.random().toString(36).slice(2, 7)}`;
      const mask = el("mask", { id, maskUnits: "userSpaceOnUse", x: 0, y: 0, width: VB_W, height: vbH });
      const glyph = el("text", { "font-family": BIG_FONT, "font-weight": 900, "font-size": fontSize, x: 0, y: baseline, fill: "#fff" });
      glyph.textContent = word;
      // Keep only this letter: hide others with black rectangles outside its zone.
      mask.appendChild(glyph);
      mask.appendChild(el("rect", { x: -10, y: 0, width: Math.max(0, ext.x + 10), height: vbH, fill: "#000" }));
      mask.appendChild(el("rect", { x: ext.x + ext.w, y: 0, width: VB_W, height: vbH, fill: "#000" }));
      defs.appendChild(mask);

      const g = el("g", { mask: `url(#${id})`, fill: "currentColor", "font-family": MICRO_FONT, "font-size": micro });
      const rows: Row[] = [];
      let r = 0;
      for (let y = -stepY; y <= vbH + stepY; y += stepY, r++) {
        const offset = r % 2 ? -wordW / 2 : 0;
        const cid = `${id}-r${r}`;
        const clipL = el("rect", { x: -400, y: y - micro, width: VB_W + 800, height: stepY + 2 });
        const clipR = el("rect", { x: VB_W, y: y - micro, width: 0, height: stepY + 2 });
        const cl = el("clipPath", { id: `${cid}l` });
        const cr = el("clipPath", { id: `${cid}r` });
        cl.appendChild(clipL);
        cr.appendChild(clipR);
        defs.append(cl, cr);
        // Clip on an untransformed wrapper so the split point stays put while the text moves.
        const gl = el("g", { "clip-path": `url(#${cid}l)` });
        const gr = el("g", { "clip-path": `url(#${cid}r)` });
        const left = el("text", { x: ext.x - 200 + offset, y });
        const right = el("text", { x: ext.x - 200 + offset, y });
        left.textContent = right.textContent = chunk;
        gl.appendChild(left);
        gr.appendChild(right);
        g.append(gl, gr);
        rows.push({ y: y - micro / 2, left, right, clipL, clipR, shift: 0 });
      }
      svg!.appendChild(g);
      letters.push({ x0: ext.x, x1: ext.x + ext.w, rows });
    });
    host!.classList.add("is-built");
  }

  const ready = document.fonts ? document.fonts.ready : Promise.resolve();
  ready.then(() => {
    build();
    onResize(build);
  });

  if (env.reduced || !env.finePointer) return;

  let mx = -1;
  let my = -1;
  let inside = false;
  host.addEventListener("pointermove", (e) => {
    if (!svg) return;
    const r = svg.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width) * VB_W;
    my = ((e.clientY - r.top) / r.height) * vbH;
    inside = true;
  });
  host.addEventListener("pointerleave", () => (inside = false));

  onFrame(() => {
    if (!letters.length) return;
    const active = inside ? letters.find((l) => mx >= l.x0 && mx <= l.x1) : undefined;
    const reach = W.activeRowDistance * scale;
    const gap = W.cursorGap * scale;
    letters.forEach((l) => {
      l.rows.forEach((row) => {
        const d = Math.abs(row.y - my);
        const target = l === active && d < reach ? gap * (1 - d / reach) ** 0.6 : 0;
        if (Math.abs(target - row.shift) < 0.05 && target === 0 && row.shift === 0) return;
        row.shift += (target - row.shift) * W.mouseEase;
        if (Math.abs(row.shift) < 0.05 && target === 0) row.shift = 0;
        const split = l === active ? mx : (l.x0 + l.x1) / 2;
        row.clipL.setAttribute("width", String(split + 400));
        row.clipR.setAttribute("x", String(split));
        row.clipR.setAttribute("width", String(VB_W + 400 - split));
        row.left.setAttribute("transform", `translate(${-row.shift} 0)`);
        row.right.setAttribute("transform", `translate(${row.shift} 0)`);
      });
    });
  });
}
