# ORVAS — Premium Photography Website
## Reference Reverse Engineering, Brand Research & Production Implementation

You are a senior creative developer, digital art director, motion designer, and frontend architect. Your task is to study an existing website in depth, understand how its complete experience is constructed, research the ORVAS brand, and build a highly polished, production-ready website that recreates the reference experience as faithfully as possible while transforming it into a bespoke digital identity for ORVAS.

This is not a generic website redesign. It is a **reference-driven reconstruction and brand adaptation project**.

The finished website should feel intentional, editorial, cinematic, premium, fluid, and technically excellent. It should be good enough to replace ORVAS's existing portfolio website.

Do not begin by writing components. First understand the reference, its behavior, the available brand material, and the overall design system. Work systematically, document your findings, and then implement and validate the experience.

---

# 1. Project Sources

### Primary reference website
https://offform.net/

### Reference screen recording
`/Users/neil/Media/Screenshots/Screen Recording 2026-10-15 at 1.48.20 AM.mov`

This recording is an important reference for observing the website's actual interactions, transitions, scrolling behavior, animations, and overall experience. Inspect it alongside the live website.

### ORVAS Instagram
https://www.instagram.com/orvas__/

This is a primary source for ORVAS's real brand identity, photography, services, visual style, and publicly available business information.

### Existing ORVAS portfolio
https://orvas.myportfolio.com/

### Existing contact page
https://orvas.myportfolio.com/contact

Use the existing portfolio as an additional source of authentic content and as a baseline for understanding the current brand. The new website should be a substantial improvement in presentation, interaction, structure, and perceived quality.

### Brand context

ORVAS is a photographer and retoucher specializing in boudoir and fashion photography.

His work celebrates individual beauty, confidence, self-expression, and personal identity. His photography ranges from elegant and sensual imagery to bold, playful, fashion-oriented portraits.

His approach emphasizes meticulous retouching, attention to detail, personalized sessions, and creating an environment where clients can feel confident, glamorous, and comfortable.

The website must communicate these qualities through its imagery, art direction, copy, interactions, and overall presentation—not merely through descriptive text.

Treat this description as initial context, not the complete brand specification. Research the actual ORVAS brand before deciding on the final direction.

---

# 2. Mandatory Workflow

Follow these phases in order.

Do not skip research, documentation, or browser-based validation. Do not prematurely settle on a design direction before understanding the reference.

## Phase 1 — Thoroughly reverse-engineer Offform

Your first task is to inspect the complete reference website and understand how the experience works.

Do not simply look at the homepage screenshot and reproduce its general appearance.

Study the live website, navigate through its accessible pages, interact with its elements, and inspect the supplied screen recording.

If browser automation, browser developer tools, or other inspection capabilities are available, use them. Inspect the actual implementation and computed styles where possible. Do not assume a particular framework, animation library, or implementation technique without evidence.

### A. Overall structure and information architecture

Identify and document:

- Every relevant page, route, and section.
- The complete page hierarchy and section order.
- Header, navigation, footer, overlays, menus, and floating elements.
- Hero composition and initial viewport.
- Content grids, image galleries, cards, text blocks, and calls to action.
- Full-screen sections, pinned sections, sticky elements, and horizontal scrolling.
- Transitions between sections and pages.
- Desktop, tablet, and mobile layout differences.
- Loading states, introductory sequences, and any preloader.
- How the experience starts, progresses, and ends.

Explore the entire experience, not just the first viewport.

### B. Visual design system

Analyze and record the reference's:

- Typography, font categories, weights, sizes, line heights, and letter spacing.
- Color palette, backgrounds, contrast, and accent colors.
- Spacing scale, margins, padding, and content widths.
- Grid systems, alignment, aspect ratios, and proportions.
- Image crops, object positioning, overlays, and transitions.
- Borders, dividers, corner treatments, and other visual details.
- Cursor treatments, hover states, and interactive affordances.
- Responsive typography and layout behavior.
- Relationship between whitespace, text, and imagery.

Pay particular attention to small details that contribute to the site's premium feel.

### C. Interaction and motion audit

Reproduce the reference's observable interaction patterns as closely as possible.

Inspect:

- Navigation opening and closing behavior.
- Hover and pointer interactions.
- Custom cursor behavior, if present.
- Scroll-triggered reveals and transitions.
- Image scaling, clipping, masking, and crossfades.
- Text animations and staggered entrances.
- Parallax, inertia, smooth scrolling, and pinned content.
- Page transitions and route changes.
- Menu overlays and modal interactions.
- Intro animations and loading transitions.
- Physics-based movement, spring behavior, easing, and momentum.
- Keyboard interactions, focus states, and reduced-motion behavior.

For every significant animation, document:

1. What triggers it.
2. What visual properties change.
3. Its approximate duration and easing.
4. Whether it responds to scroll, pointer movement, or user input.
5. How it behaves on different viewport sizes.
6. What happens when the interaction is interrupted or reversed.

Do not add motion simply because it looks impressive. Understand the purpose and behavior of the reference motion before recreating it.

### D. Create a reference specification

Save the findings in:

`docs/reference-analysis.md`

Include:

- Site map and section hierarchy.
- Page-by-page observations.
- Design tokens and layout rules.
- Interaction inventory.
- Animation and transition specifications.
- Responsive behavior.
- Important screenshots or frame references, if available.
- Implementation hypotheses, clearly distinguished from verified facts.
- Uncertainties or elements that could not be inspected.

Create a section-by-section implementation checklist from this document.

**Phase 1 is complete only when you understand the reference as a complete experience, not merely a visual style.**

---

## Phase 2 — Research ORVAS and consolidate brand content

After understanding the reference, investigate ORVAS's actual online presence.

Prioritize the Instagram account, then the existing portfolio and contact page. Use other publicly available sources only when they clearly relate to ORVAS.

Do not invent client names, achievements, locations, prices, testimonials, services, awards, or business details.

If Instagram is inaccessible or restricts content, use the existing portfolio and any locally available assets. Record missing information instead of fabricating it.

### A. Instagram research

Examine the publicly accessible profile and posts to identify:

- Display name and professional identity.
- Bio, positioning, and relevant contact information.
- Primary photography specializations.
- Recurring visual themes and photographic styles.
- Fashion, boudoir, portrait, editorial, and other relevant categories.
- Recurring color palettes, lighting, compositions, and moods.
- The types of clients or subjects featured, where publicly evident.
- Locations and collaborators, but only when explicitly supported.
- Publicly stated services, booking instructions, and business links.
- Strong images suitable for the website.
- Existing captions that reveal the photographer's voice, philosophy, or approach.

Distinguish clearly between confirmed information and reasonable creative interpretations.

Do not assume that a like count, follower count, or popularity metric is important to the brand.

### B. Existing portfolio research

Inspect the complete existing website, including its contact page.

Identify:

- Existing portfolio images and categories.
- Authentic copy and professional details.
- Existing contact methods and calls to action.
- Useful content worth preserving.
- Weaknesses in the current presentation that the new site should address.
- Available image URLs, downloadable assets, and image files, where access permits.

Preserve the authenticity of the original brand while substantially upgrading the presentation.

### C. Create a single source of truth

Create:

`src/content/orvas-content.ts`

This must be the central source of editable website content.

Use a clean, strongly typed, structured content model. Include the fields required by the actual site, such as:

- Brand name and professional title.
- Hero headline, supporting copy, and primary CTA.
- About copy and brand philosophy.
- Photography categories and portfolio collections.
- Image sources, alt text, and focal positions.
- Project titles, captions, and credits when verified.
- Services and session information when verified.
- Contact details and social links.
- Booking or consultation CTA labels.
- Footer content.
- SEO title, description, and social-sharing metadata.

Example structure (adapt it to the real findings):

```ts
export const orvasContent = {
  brand: {
    name: "ORVAS",
    profession: "Photographer & Retoucher",
    instagram: "https://www.instagram.com/orvas__/",
    website: "https://orvas.myportfolio.com/",
  },

  hero: {
    eyebrow: "",
    headline: "",
    description: "",
    ctaLabel: "",
  },

  about: {
    heading: "",
    body: "",
  },

  portfolio: {
    heading: "",
    categories: [],
    projects: [],
  },

  contact: {
    heading: "",
    description: "",
    email: "",
    bookingUrl: "",
  },

  seo: {
    title: "",
    description: "",
  },
} as const;
```

This is only an illustrative starting point. Implement an appropriate type model for the actual content, including image metadata, galleries, and reusable content blocks. Do not leave fields as empty placeholders in the finished site when the information is publicly available.

The example above may need adjustment to accommodate editable content, so avoid making the entire configuration immutable if that prevents practical editing.

### Content architecture requirements

- Components must not contain hardcoded editorial copy.
- Portfolio entries must be driven by the content source.
- Navigation labels and CTA text must come from the content configuration wherever appropriate.
- Social links, contact details, image paths, and SEO metadata must be centralized.
- Repeated content structures must be represented as arrays of typed objects.
- Layout and styling must remain independent of the actual portfolio content.
- Replacing a photograph, changing a title, or adding a new project should not require editing a component.
- Animation configuration may remain in dedicated design or motion configuration files rather than being mixed into editorial content.

Create:

`docs/orvas-brand-research.md`

Document the source URLs inspected, verified information, selected images, visual findings, missing information, and the rationale for the proposed brand direction.

Keep the content source and the research document consistent.

**Phase 2 is complete when the available authentic brand material has been researched, documented, and organized into a maintainable content model.**

---

## Phase 3 — Define the adaptation strategy

Before implementation, decide how the reference experience should translate into ORVAS's photography brand.

The objective is to preserve the reference's underlying visual and interaction logic while making the content, imagery, tone, and art direction unmistakably ORVAS.

### Preserve from Offform

Reproduce the relevant characteristics of the reference, including:

- Overall composition and section sequencing.
- Layout proportions and grid behavior.
- Typography hierarchy and text placement.
- Image-to-text relationships.
- Navigation patterns.
- Scroll choreography.
- Transition timing and animation behavior.
- Hover interactions and interactive states.
- Responsive composition.
- The overall rhythm of the experience.

Do not replace a distinctive interaction with a generic alternative simply because the alternative is easier to implement.

### Adapt for ORVAS

Replace reference-specific material with authentic ORVAS content:

- Photography and portfolio projects.
- Text, titles, labels, and descriptions.
- Brand identity and social links.
- Editorial tone and positioning.
- Contact and booking functionality.
- Portfolio categories and project details.
- SEO and social-sharing metadata.

Use ORVAS's actual photography as the primary visual asset. Select images based on composition, subject, lighting, color, resolution, and suitability for each section.

Do not blindly copy the reference's imagery, logos, text, or proprietary brand assets. Recreate its experience using ORVAS's content and original implementation.

### Establish an art direction

Determine whether the original reference's visual language suits the actual ORVAS imagery. Preserve its recognizable experience, but make deliberate, documented adaptations where necessary.

The final result should feel like the same quality of digital experience designed specifically for a photographer—not a template with the brand name replaced.

Create:

`docs/design-direction.md`

Document the decisions concerning visual identity, image selection, typography, color, content hierarchy, and any intentional departures from the reference.

---

## Phase 4 — Implement the website

Only begin the primary implementation after the reference and brand research phases have been completed.

First inspect the existing repository and understand its structure, framework, dependencies, routing, build process, and current implementation.

Do not overwrite working infrastructure or replace the existing stack without a concrete reason.

### Technical standards

- Use the repository's existing framework and conventions unless there is a strong technical justification to change them.
- If the project is Next.js, use the App Router and appropriate Server/Client Component boundaries.
- Use TypeScript and maintain strict, meaningful types.
- Build reusable components with clear responsibilities.
- Separate content, layout, interaction logic, and animation configuration.
- Use semantic HTML and accessible interactive elements.
- Optimize images, fonts, loading behavior, and rendering performance.
- Ensure direct navigation and page refreshes work correctly.
- Avoid unnecessary client-side JavaScript.
- Avoid adding libraries that duplicate capabilities already present in the project.
- Keep dependencies and configuration maintainable.
- Ensure the website builds cleanly and passes available linting and type checks.

Do not sacrifice fidelity to the reference for the sake of a superficially simple implementation.

### Component architecture

Create components based on actual patterns observed in the reference.

Potential components include:

- Navigation and menu overlay.
- Hero composition.
- Animated typography.
- Portfolio galleries.
- Project cards.
- Image reveal components.
- Editorial text sections.
- About or philosophy section.
- Services or session information.
- Contact and booking section.
- Footer.
- Reusable motion wrappers.

These are suggestions, not a mandatory component list. The final architecture must follow the actual website structure.

Do not build one enormous page component. Equally, do not create unnecessary abstractions for elements that are used only once and have no meaningful independent responsibility.

### Content integration

All editorial content must originate from `src/content/orvas-content.ts`.

Build reusable components that consume this data.

Do not allow reference-specific text, dummy portfolio entries, or placeholder assets to leak into the final experience.

Where information is unavailable, omit the field or use an intentional fallback. Do not publish fabricated business details.

---

## Phase 5 — Motion, physics, and interaction fidelity

Motion is a core part of this project, not a finishing touch.

First identify the actual animation patterns in the reference. Then choose the simplest reliable implementation that reproduces their behavior.

### Required investigation

Evaluate existing project dependencies before selecting additional libraries.

Use the following resources where relevant:

- **Stop Slop:** Investigate the available Stop Slop skill or guidance and apply its principles to avoid generic, repetitive, overproduced design choices. Do not invent an installation or API if the resource is not available.
- **Image-to-code:** Use an available image-to-code workflow when it can help reconstruct complex layouts from screenshots or recorded frames. Treat generated code as a starting point and verify it against the actual reference.
- **String Tune:** https://string-tune.fiddle.digital/

Investigate String Tune's capabilities, documentation, and integration requirements before deciding whether it is suitable for any physics-driven interactions.

Do not assume String Tune is compatible with the project's framework or that it directly implements the required effects.

If the reference uses spring physics, inertia, cursor-driven movement, or elastic interactions, evaluate whether these can be reproduced using the existing animation stack, a suitable motion library, or a custom implementation.

### Motion implementation rules

- Reproduce the actual trigger and behavior of each important interaction.
- Use consistent timing, easing, and spring parameters.
- Avoid layout thrashing and unnecessary React renders during pointer movement.
- Keep high-frequency animation work performant.
- Use transforms and opacity where appropriate.
- Clean up event listeners, observers, animation frames, and subscriptions.
- Prevent animations from causing accidental horizontal overflow.
- Handle route changes, interrupted animations, and reduced-motion preferences.
- Preserve keyboard access and usable focus states.
- Avoid loading screens that unnecessarily delay access to the portfolio.
- Ensure motion works on touch devices without depending on hover.

Do not add random parallax, excessive cursor effects, or decorative animations that were not part of the reference or do not strengthen the ORVAS experience.

The objective is **high-fidelity motion with a clear design purpose**, not maximum animation density.

---

## Phase 6 — Minimal but useful contact and booking

The existing ORVAS contact page is deliberately minimal. Preserve that simplicity.

Do not turn it into a generic corporate contact page with unnecessary fields, long forms, or sales-oriented sections.

The new contact experience should feel like a natural continuation of the portfolio.

### Contact requirements

- Keep the presentation minimal and editorial.
- Display only verified contact information.
- Include an obvious, well-designed way to initiate an inquiry.
- Provide a direct email link when a verified email address is available.
- Retain the Instagram link.
- Use concise copy consistent with the photographer's brand.
- Work properly on desktop and mobile.

### Calendar scheduling

Investigate whether a real scheduling workflow would be useful for ORVAS.

Prefer a practical, low-friction option, such as a link to a scheduling service that supports consultation bookings.

However:

- Do not invent a booking URL.
- Do not imply that availability is real-time unless a real calendar integration supports it.
- Do not implement a nonfunctional calendar UI.
- Do not expose private calendar information.
- Do not assume that every photography session should be booked without an initial inquiry.

If an actual scheduling service is not available, implement a clean CTA that can be connected later, alongside working email and Instagram contact options.

Keep scheduling configuration centralized so it can be added or changed without modifying the contact component.

---

# 3. Portfolio Image Strategy

Photography is the primary product of this website. Image selection and presentation will have a disproportionate impact on the final result.

### Asset discovery

Investigate all available sources:

1. Publicly accessible ORVAS Instagram posts.
2. The existing ORVAS portfolio.
3. Images and media already present in the repository.
4. Other verified public ORVAS sources, if necessary.

When technically and legally appropriate, identify the original image assets rather than using low-resolution screenshots or thumbnails.

Keep track of each asset's source and intended usage.

Create a centralized asset manifest if useful, including:

- Local path or source URL.
- Associated project or category.
- Alt text.
- Aspect ratio.
- Preferred crop and focal position.
- Intended placement in the design.

### Asset rules

- Prioritize high-quality, authentic ORVAS photography.
- Use the right image for the right composition rather than repeating the same few images throughout the website.
- Preserve image quality and aspect ratios where appropriate.
- Use intentional object positioning for desktop and mobile.
- Avoid stretching, accidental cropping, and blurry images.
- Avoid broken external image URLs and unreliable hotlinking.
- Prefer local, optimized assets for the finished deployment when their use and download are permitted.
- Never invent portfolio projects, client names, or credits.

If the reference requires a particular image count or composition, curate enough authentic images to reproduce that composition where the source material allows it.

If assets are inaccessible or insufficient, document the limitation and use only verified, clearly identified fallbacks during development.

---

# 4. Production Quality and Accessibility

The finished website must be more than a visually impressive demo.

### Performance

- Optimize images and font loading.
- Minimize unnecessary JavaScript.
- Avoid excessive animation libraries.
- Prevent layout shifts.
- Use lazy loading where appropriate.
- Prioritize the actual above-the-fold experience.
- Keep image decoding, transitions, and loading states smooth.
- Test performance under realistic mobile network and hardware constraints.

### Accessibility

- Use semantic page structure.
- Support keyboard navigation.
- Provide visible focus indicators.
- Use appropriate alt text.
- Maintain readable contrast.
- Ensure menus and overlays can be opened and dismissed accessibly.
- Respect `prefers-reduced-motion`.
- Do not make important content dependent on animation.
- Ensure touch targets and mobile navigation are usable.

### Responsiveness

Test at minimum:

- Desktop: approximately 1440px wide.
- Laptop: approximately 1280px wide.
- Tablet: approximately 768px wide.
- Mobile: approximately 390px wide.
- Narrow mobile: approximately 320px wide.

These are test viewports, not hardcoded design dimensions.

Check for clipping, overflowing text, awkward image crops, broken grids, oversized typography, inaccessible controls, and motion that behaves differently from the intended experience.

---

# 5. Visual Validation and Iteration

Do not consider the project complete simply because the page renders.

Use browser automation or the available browser tooling to compare the implementation against the reference.

### Validation process

For every major section:

1. Capture or inspect the corresponding reference state.
2. Capture the implementation at the same viewport size.
3. Compare section dimensions, composition, spacing, typography, image crops, and alignment.
4. Exercise the same interactions.
5. Compare transition behavior and scrolling.
6. Identify the largest visual or behavioral differences.
7. Fix those differences.
8. Repeat the comparison.

Prioritize discrepancies in this order:

1. Overall composition and section geometry.
2. Typography and spacing.
3. Image selection, cropping, and scale.
4. Navigation and interactive behavior.
5. Animation timing and transitions.
6. Fine details such as borders, cursor styling, and micro-interactions.

The order is a prioritization framework, not permission to omit important motion or interaction details.

Do not rely exclusively on your memory of the reference. Use the screen recording, screenshots, browser inspection, and written specification.

### Functional validation

Verify that:

- All navigation items work.
- All calls to action have meaningful destinations.
- Portfolio links and galleries behave correctly.
- Contact links work.
- External links use appropriate behavior.
- The booking CTA is functional or intentionally unavailable.
- No placeholder text or dead buttons remain.
- No broken image assets remain.
- There are no avoidable console errors.
- No major layout regressions occur between viewport sizes.
- Direct routes and refreshes work.
- Reduced-motion preferences are respected.

Run the repository's available type checks, linting, tests, and production build. Fix issues caused by the implementation rather than ignoring them.

If automated visual comparison is available, use it to identify regressions, but make the final assessment using both visual inspection and functional tests.

---

# 6. Working Method and Deliverables

Work autonomously through the project, using available tools and skills when they materially improve the result.

Do not stop after producing an analysis document or a rough prototype. The goal is to deliver the working website.

Create and maintain the following artifacts:

- `docs/reference-analysis.md` — complete reverse-engineering report.
- `docs/orvas-brand-research.md` — verified brand information and source references.
- `docs/design-direction.md` — adaptation decisions and art direction.
- `src/content/orvas-content.ts` — centralized, editable website content.
- A centralized asset manifest or equivalent asset organization, if useful.
- The fully implemented website and reusable components.

Adapt paths to the existing repository when necessary, while preserving these responsibilities.

### Progress and decision-making

Maintain a clear distinction between:

- Verified observations.
- Inferences about the reference implementation.
- Design decisions.
- Unresolved questions caused by inaccessible information.

When a resource is inaccessible, try reasonable alternatives before proceeding with an assumption.

Do not ask me to make decisions that can be resolved through the available reference material or reasonable professional judgment. Ask only when a missing decision materially affects the outcome and cannot be responsibly inferred.

Do not silently discard important requirements because they are difficult to implement.

If exact replication of a behavior is impossible due to technical limitations, identify the limitation, choose the closest practical implementation, and document the difference.

Keep the project runnable as you work. Do not destroy working functionality or make large, unnecessary architectural changes.

---

# 7. Definition of Done

The project is complete only when the following conditions are satisfied:

- [ ] The complete reference experience has been inspected and documented.
- [ ] The supplied screen recording has been inspected.
- [ ] Relevant page structures, animations, transitions, and interactions have been identified.
- [ ] ORVAS's publicly available brand material has been researched.
- [ ] Authentic content and photography have been curated.
- [ ] All editable editorial content is centralized in `src/content/orvas-content.ts`.
- [ ] The website reproduces the important visual and behavioral characteristics of Offform.
- [ ] Reference-specific branding and content have been replaced with ORVAS material.
- [ ] The result feels bespoke to ORVAS rather than like a generic template.
- [ ] The contact experience remains minimal and functional.
- [ ] The booking workflow is real or clearly configured for future integration.
- [ ] Desktop, tablet, and mobile layouts have been validated.
- [ ] Motion is smooth, purposeful, accessible, and performant.
- [ ] No fabricated business details or unverified claims have been introduced.
- [ ] Type checks, linting, and production build pass where supported.
- [ ] Major visual discrepancies have been corrected through iterative comparison.
- [ ] The repository contains the required research and implementation documentation.

---

# 8. Final Instructions

Start by inspecting the existing repository and confirming that you can access the reference website and the supplied screen recording.

Then follow the phases in order:

**Research Offform → Document the complete experience → Research ORVAS → Consolidate brand content → Define the adaptation → Implement → Validate → Refine.**

Do not start by immediately generating a hero section.

Do not replace thorough reference inspection with a screenshot-based approximation.

Do not invent content to fill gaps.

Do not stop at a beautiful first viewport while the rest of the website is unfinished.

Do not claim exact fidelity without comparing the implementation against the reference.

The final objective is a complete, polished, responsive, production-ready ORVAS photography website that captures the distinctive experience of Offform while presenting ORVAS's actual work, identity, and services with a significantly stronger digital presence.

**Begin with Phase 1. Inspect first, document what you learn, and proceed through the remaining phases until the implementation and validation are complete.**