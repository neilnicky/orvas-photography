import { defineConfig, devices } from "@playwright/test";

// E2E runs against the production build: `pnpm build && pnpm test:e2e`.
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:4322" },
  webServer: {
    command: "pnpm astro preview --port 4322 --host 127.0.0.1 --ignore-lock",
    url: "http://127.0.0.1:4322",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
});
