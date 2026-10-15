import { env } from "./runtime";

/** 12px white square, mix-blend difference, follows the pointer 1:1. */
export function initCursor() {
  if (!env.finePointer || window.matchMedia("(forced-colors: active)").matches) return;
  const el = document.createElement("div");
  el.className = "cursor";
  el.setAttribute("aria-hidden", "true");
  document.body.appendChild(el);
  document.documentElement.classList.add("has-cursor");

  let x = 0;
  let y = 0;
  let queued = false;
  const paint = () => {
    queued = false;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  };
  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      el.classList.add("is-visible");
      if (!queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
    },
    { passive: true },
  );
  document.documentElement.addEventListener("pointerleave", () => el.classList.remove("is-visible"));
  window.addEventListener("blur", () => el.classList.remove("is-visible"));
}
