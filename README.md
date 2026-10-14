# ORVAS

Portfolio site for ORVAS, a photographer and retoucher who shoots boudoir and fashion. Its interaction design and scroll choreography are modelled on offform.net, adapted to ORVAS's own photography and words.

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

## Docs

- `docs/reference-analysis.md`: how offform.net is built (structure, tokens, motion specs, checklist).
- `docs/orvas-brand-research.md`: sources, verified facts, what is missing, curation policy.
- `docs/design-direction.md`: adaptation decisions, departures and validation log.
