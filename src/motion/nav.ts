import { easeInOutCubic, motion } from "./config";
import { onResize, onScroll, pageTop, scrollToY } from "./runtime";

/** Mobile menu: toggle, Escape, close on navigation, focus return. */
function initMenu() {
  const button = document.querySelector<HTMLButtonElement>("[data-menu-button]");
  const menu = document.querySelector<HTMLElement>("[data-menu]");
  if (!button || !menu) return;

  const open = () => {
    menu.hidden = false;
    button.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => menu.classList.add("is-open"));
    menu.querySelector("a")?.focus();
  };
  const close = (returnFocus = true) => {
    button.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    window.setTimeout(() => {
      if (button.getAttribute("aria-expanded") === "false") menu.hidden = true;
    }, 220);
    if (returnFocus) button.focus();
  };

  button.addEventListener("click", () => (button.getAttribute("aria-expanded") === "true" ? close() : open()));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && button.getAttribute("aria-expanded") === "true") close();
  });
  menu.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("a")) close(false);
  });
  document.addEventListener("click", (e) => {
    const t = e.target as Node;
    if (button.getAttribute("aria-expanded") === "true" && !menu.contains(t) && !button.contains(t)) close(false);
  });
}

/** Same-page anchors scroll smoothly (900ms easeInOutCubic) and move focus. */
function initAnchors() {
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    const y = Math.max(0, pageTop(target));
    scrollToY(y, motion.nav.scrollMs, easeInOutCubic, () => {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
    history.pushState(null, "", url.hash);
  });
}

/** Highlight the nav item for the section currently under the header. */
function initActive() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
  const ids = [...new Set(links.map((l) => new URL(l.href).hash.slice(1)).filter(Boolean))];
  const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
  if (!sections.length) return;
  let tops: { id: string; top: number; bottom: number }[] = [];
  const measure = () => {
    tops = sections.map((s) => ({ id: s.id, top: pageTop(s), bottom: pageTop(s) + s.offsetHeight }));
  };
  measure();
  onResize(measure);
  let current = "";
  onScroll((y) => {
    const probe = y + window.innerHeight * 0.35;
    const hit = tops.find((t) => probe >= t.top && probe < t.bottom)?.id ?? "";
    if (hit === current) return;
    current = hit;
    links.forEach((l) => {
      const on = new URL(l.href).hash.slice(1) === hit;
      if (on) l.setAttribute("aria-current", "true");
      else l.removeAttribute("aria-current");
    });
  });
}

export function initNav() {
  initMenu();
  initAnchors();
  initActive();
}
