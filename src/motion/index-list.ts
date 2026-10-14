import { clamp, phase } from "./config";
import { env, onResize, onScroll, pageTop } from "./runtime";

/** Cursor-following preview for any list of [data-preview] links. */
export function initPreview(scope: HTMLElement, preview: HTMLElement) {
  if (!env.finePointer) return;
  const frames = new Map(
    Array.from(preview.querySelectorAll<HTMLElement>("[data-frame]")).map((f) => [f.dataset.frame ?? "", f]),
  );
  let active: HTMLElement | null = null;
  let x = 0;
  let y = 0;
  let queued = false;
  const paint = () => {
    queued = false;
    preview.style.transform = `translate3d(${x + 18}px, ${y - preview.offsetHeight / 2}px, 0)`;
  };
  const show = (key: string | undefined) => {
    const frame = key ? frames.get(key) : undefined;
    if (frame === active) return;
    active?.classList.remove("is-active");
    active = frame ?? null;
    active?.classList.add("is-active");
    preview.classList.toggle("is-visible", !!active);
  };
  scope.addEventListener(
    "pointermove",
    (e) => {
      x = e.clientX;
      y = e.clientY;
      const link = (e.target as HTMLElement).closest<HTMLElement>("[data-preview]");
      show(link?.dataset.preview);
      if (!queued) {
        queued = true;
        requestAnimationFrame(paint);
      }
    },
    { passive: true },
  );
  scope.addEventListener("pointerleave", () => show(undefined));
  // Keep the preview in sync when the page scrolls under a stationary pointer.
  onScroll(() => {
    if (!active) return;
    const el = document.elementFromPoint(x, y)?.closest<HTMLElement>("[data-preview]");
    show(el && scope.contains(el) ? el.dataset.preview : undefined);
  });
}

export function initIndex() {
  const section = document.querySelector<HTMLElement>("[data-index]");
  if (!section) return;
  const preview = section.querySelector<HTMLElement>("[data-index-preview]");
  const line = section.querySelector<HTMLElement>("[data-sline]");
  const buttons = Array.from(section.querySelectorAll<HTMLButtonElement>("[data-filter]"));
  const lists = Array.from(section.querySelectorAll<HTMLElement>("[data-list]"));

  lists.forEach((l) => l.querySelectorAll("li").forEach((li, i) => li.style.setProperty("--n", String(i))));
  buttons.forEach((b) =>
    b.addEventListener("click", () => {
      const cat = b.dataset.filter;
      buttons.forEach((o) => o.setAttribute("aria-pressed", String(o === b)));
      lists.forEach((l) => {
        const on = l.dataset.list === cat;
        l.hidden = !on;
        l.classList.toggle("is-entering", on && !env.reduced);
      });
    }),
  );

  if (preview) initPreview(section, preview);
  if (env.reduced || !line) return;

  let top = 0;
  let travel = 1;
  const measure = () => {
    top = pageTop(section);
    travel = Math.max(1, section.offsetHeight - window.innerHeight);
  };
  measure();
  onResize(measure);
  onScroll((y) => {
    const p = clamp((y - top) / travel);
    line.style.setProperty("--p", phase(p, 0.05, 0.6).toFixed(3));
  });
}
