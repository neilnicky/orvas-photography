// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  trailingSlash: "ignore",
  devToolbar: { enabled: false },
  prefetch: { prefetchAll: false, defaultStrategy: "hover" },
  image: {
    responsiveStyles: false,
  },
  build: { inlineStylesheets: "auto" },
});
