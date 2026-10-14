import { expect, test, type Page } from "@playwright/test";

const skipLoader = async (page: Page) => {
  await page.addInitScript(() => sessionStorage.setItem("orvas-loaded", "1"));
};

const collectErrors = (page: Page) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  return errors;
};

test.describe("home", () => {
  test("renders without console errors and with one h1", async ({ page }) => {
    const errors = collectErrors(page);
    await skipLoader(page);
    await page.goto("/");
    await expect(page).toHaveTitle(/ORVAS/);
    await expect(page.locator("h1")).toHaveCount(1);
    await page.waitForTimeout(1000);
    expect(errors).toEqual([]);
  });

  test("loader runs once per session and hands off to the hero", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveClass(/is-loading/, { timeout: 5000 });
    await expect(page.locator("[data-loader]")).toHaveCount(0);
    await page.reload();
    await expect(page.locator("html")).not.toHaveClass(/is-loading/);
  });

  test("every image on the page resolves", async ({ page, request }) => {
    await skipLoader(page);
    await page.goto("/");
    const srcs = await page.$$eval("img", (imgs) => [...new Set(imgs.map((i) => i.getAttribute("src")).filter(Boolean))] as string[]);
    expect(srcs.length).toBeGreaterThan(20);
    for (const src of srcs) expect((await request.get(src)).status(), src).toBe(200);
  });

  test("contact offers only working, verified channels", async ({ page }) => {
    await skipLoader(page);
    await page.goto("/");
    const contact = page.locator("#contact");
    await expect(contact.locator('a[href="https://ig.me/m/orvas__"]').first()).toBeAttached();
    await expect(contact.locator('a[href="https://www.instagram.com/orvas__/"]')).toBeAttached();
    await expect(contact.locator('a[href="https://orvas.myportfolio.com/contact"]')).toBeAttached();
    await expect(contact.locator('a[href^="mailto:"]')).toHaveCount(0);
    const externals = await page.$$eval('a[target="_blank"]', (as) => as.map((a) => a.getAttribute("rel")));
    externals.forEach((rel) => expect(rel).toContain("noopener"));
  });

  test("index filter swaps the list", async ({ page }) => {
    await skipLoader(page);
    await page.goto("/");
    const boudoir = page.locator('[data-filter="boudoir"]');
    await boudoir.scrollIntoViewIfNeeded();
    await boudoir.click();
    await expect(boudoir).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#index-boudoir")).toBeVisible();
    await expect(page.locator("#index-fashion")).toBeHidden();
  });

  test("no horizontal overflow", async ({ page }) => {
    await skipLoader(page);
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});

test.describe("navigation", () => {
  test("desktop nav scrolls to sections", async ({ page, isMobile }) => {
    test.skip(isMobile, "desktop nav");
    await skipLoader(page);
    await page.goto("/");
    await page.locator(".nav a", { hasText: "Sessions" }).click();
    await expect(page).toHaveURL(/#sessions$/);
    await expect.poll(() => page.evaluate(() => Math.abs(document.getElementById("sessions")!.getBoundingClientRect().top))).toBeLessThan(4);
  });

  test("mobile menu opens, closes on Escape and returns focus", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile menu");
    await skipLoader(page);
    await page.goto("/");
    const button = page.locator("[data-menu-button]");
    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator("#mobile-menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await expect(button).toBeFocused();
    await expect(page.locator("#mobile-menu")).toBeHidden();
  });

  test("mobile menu link navigates and closes", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile menu");
    await skipLoader(page);
    await page.goto("/");
    await page.locator("[data-menu-button]").click();
    await page.locator("#mobile-menu a", { hasText: "Contact" }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("[data-menu-button]")).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("work pages", () => {
  test("archive lists every series", async ({ page }) => {
    await page.goto("/work/");
    await expect(page.locator(".archive-card")).toHaveCount(52);
  });

  test("series page renders directly and links onward", async ({ page }) => {
    const res = await page.goto("/work/sun-shine/");
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText("SUN SHINE");
    await expect(page.locator(".series-frame")).toHaveCount(12);
    const next = page.locator(".series-nav a").last();
    const href = await next.getAttribute("href");
    await next.click();
    await expect(page).toHaveURL(new RegExp(`${href}$`));
  });

  test("unknown route serves the 404 page", async ({ page }) => {
    const res = await page.goto("/work/does-not-exist/");
    expect(res?.status()).toBe(404);
    await expect(page.locator("h1")).toContainText("404");
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("skips the loader and unpins choreographed sections", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/reduced/);
    await expect(page.locator("html")).not.toHaveClass(/is-loading/);
    const stage = await page.evaluate(() => getComputedStyle(document.querySelector(".sessions-stage")!).position);
    expect(stage).not.toBe("sticky");
    const ratio = await page.evaluate(() => document.getElementById("sessions")!.offsetHeight / window.innerHeight);
    expect(ratio).toBeLessThan(6.8); // the choreographed pin is 6.8 viewports
    await expect(page.locator(".sessions-list h3")).toHaveCount(3);
    await expect(page.locator(".sessions-list h3").first()).toBeVisible();
  });
});
