import { initAbout } from "./about";
import { initCursor } from "./cursor";
import { initFeatured } from "./featured";
import { initFinal } from "./final";
import { initHero, runLoader } from "./hero";
import { initIndex } from "./index-list";
import { initLines } from "./lines";
import { initNav } from "./nav";
import { startRuntime, remeasure } from "./runtime";
import { initSessions } from "./sessions";
import { attachWave } from "./wave";
import { initWordmark } from "./wordmark";

async function boot() {
  startRuntime();
  initNav();
  initCursor();
  initLines();
  initWordmark();

  // Home page choreography (each init is a no-op when its section is absent).
  initAbout();
  initIndex();
  initSessions();
  initFeatured();
  initFinal();

  // Series pages: wave on gallery frames.
  document.querySelectorAll<HTMLElement>("[data-series-frame]").forEach((f) => attachWave(f));

  await runLoader();
  initHero();
  remeasure();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
else boot();
