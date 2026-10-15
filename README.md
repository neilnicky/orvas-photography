# ORVAS

Portfolio site for ORVAS, a photographer and retoucher who shoots boudoir and fashion. The site is a dark, type-led frame with scroll choreography built around ORVAS's own photography and words.

```sh
pnpm install
pnpm dev          # http://127.0.0.1:4321
pnpm build        # type-check + static build to dist/
pnpm test         # unit tests
pnpm test:e2e     # browser tests (run after build)
```

## Editing content

Edit `src/content/orvas-content.ts`. It holds every label, paragraph, link, image path, alt text, focal point and SEO field.

- **Swap a photograph:** change its `src`, a path under `src/assets/`.
- **Add a series:** put JPEGs in `src/assets/work/<slug>/` and add an entry to `series`. It appears in the archive and gets its own page at `/work/<slug>/`.
- **Add an email or booking link:** set `contact.email` or `contact.booking.url`. The contact row and channels update by themselves.
- **Set the production domain:** set `seo.siteUrl`. This turns on canonical URLs.
