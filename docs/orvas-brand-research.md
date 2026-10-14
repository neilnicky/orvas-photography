# ORVAS — Brand Research

Researched 2026-10-15. Legend: **[V]** verified at source · **[I]** interpretation · **[—]** not available.

## Sources inspected

| Source | Access | Notes |
|---|---|---|
| https://orvas.myportfolio.com/ (Boudoir index) | ✅ full | 22 boudoir projects |
| https://orvas.myportfolio.com/work (Fashion index) | ✅ full | 30 fashion projects |
| https://orvas.myportfolio.com/about | ✅ full | single about paragraph |
| https://orvas.myportfolio.com/contact | ✅ full | Adobe Portfolio form only (Name / Email / Message) |
| All 52 project pages | ✅ full | 218 project images (original resolution, many 3840×5120; Sony ILCE-7RM5 EXIF) |
| https://www.instagram.com/orvas__/ | ⚠️ partial | logged-out page is **age-restricted** ("You must be 17 years old or over… Log in"). Only OpenGraph metadata readable. Claude-in-Chrome (signed-in browser) was not connected. Bio, captions and posts **not inspected**. |
| Web search ("orvas__", "ORVAS photographer retoucher") | ✅ | no ORVAS-related results |

## Verified information

- **Name / brand**: ORVAS (also styled "O R V A S") [V portfolio + IG og:title "ORVAS (@orvas__)"]
- **Profession**: "photographer and retoucher" [V about]
- **Specialisations**: boudoir and fashion photography [V about, nav: BOUDOIR / FASHION]
- **Meta description** (existing site): "I am a fashon and boudoir photogrpher" (sic) [V]; meta keywords: fashion, high fashion, styling, retoucher, photographer, boudoir, fine arts, nude, sensual [V]
- **Instagram**: @orvas__ — https://www.instagram.com/orvas__/ [V]. Follower/post counts exist in OG data but are deliberately not used.
- **About copy** [V, verbatim source of all philosophy copy]:
  > Orvas is a photographer and retoucher. He is dedicated to celebrating the unique beauty and confidence of every individual. Specializing in boudoir and fashion photography, his work captures intimate, stylish, and empowering moments that highlight your true essence. With a meticulous eye for detail and a passion for creating breathtaking imagery, he crafts personalized experiences designed to make you feel glamorous, self-assured, and radiant. Whether it's an elegant, sensual look or something bold and playful, each session is tailored to reveal your personality and create timeless, captivating portraits.
- **Projects**: 52 titled series, 2023–2025, each with year [V]. Two titles are duplicated in the source with distinct galleries (e.g. "BRUNETTE BOMBSHELL" ×2, "MEMORIES OF A GEISHA" ×2, "BLACK IS MY NEW AESTHETIC." ×3) — kept distinct by slug. "Blood of Love" exists in both categories. Original typos ("BEATUY SHOOT", "RED EVEIL") are corrected only in display where unambiguous (Beauty Shoot); poetic titles are preserved.
- **Captions / project descriptions**: none, except "Black Bride By ORVAS" [V].
- **Locations**: project titles reference Bali ("BALI", "AMORA BALI SERIES", "BALI AMORA SERIES", "ISLAND MOMENTS"). This shows **some work was shot in Bali**; it does **not** establish a studio location. No city/base is claimed on the site.

## Missing information [—]

- Contact email, phone, studio address, base city
- Booking/scheduling URL, prices, packages, session durations
- Client names, collaborators (models, MUAs, stylists), publications, awards, testimonials
- Instagram bio and captions (age gate)

→ All of these are **omitted** on the site. The content model has optional `email` and `bookingUrl` fields (null) that the contact UI handles gracefully; filling them in config activates the corresponding CTAs with no component change.

## Working contact paths (verified)

1. Instagram profile — https://www.instagram.com/orvas__/
2. Instagram direct message — `https://ig.me/m/orvas__` (Instagram's official DM short-link format for a public handle)
3. Existing inquiry form — https://orvas.myportfolio.com/contact (functional Adobe Portfolio form; retained as the written-inquiry path until an email is configured)

## Visual findings (from all 218 images)

- **Lighting**: hard studio colour gels (saturated red, orange, cyan, magenta), deep low-key with single rim/spot, high-key white seamless; natural-light jungle/forest sets (Sun Shine) and Bali villa/pool sets.
- **Palette clusters**: (a) blood red / black (Dark Bunny Red Eveil, Love Me Like My Demons Do, Black Bride, Take Me To Hell); (b) monochrome B&W (Curves, Pleasure and Pain…, Black and White, Black Is My New Aesthetic, Brunette Bombshell white set); (c) electric colour (Springbreakers pink, Hot Pink magenta, Hues of Blue, Blood of Love red/blue, Exploring the Colors); (d) warm skin/gold (Gold, Her Aura…, I Chill Harder… yellow).
- **Styling**: fetish/latex/bunny masks, balaclavas, mirror visor sunglasses, chrome tops, veils, war-bonnet headdresses, geisha fans — bold, costume-driven fashion; boudoir is sculptural, body-as-form, often silhouette or high-contrast.
- **Composition**: almost entirely **portrait 3:4** (3840×5120); a few 4:3 landscapes (Blood of Love). Central subject, generous negative space on seamless backdrops.
- **Retouching**: glossy, high-end skin finish; heavy colour grading — a genuine differentiator ("EXPLORING THE COLORS HIGH END RETOUCH").
- **Watermark**: small "ORVAS" mark bottom-right of most frames — kept (authentic, brand-owned).
- **Voice**: titles are lyrical, provocative, first-person, sometimes signed "~A" ("Her aura smells like warm honey", "Pleasure and pain move through the same portal", "A woman who resembles tides"). This is the strongest available evidence of the photographer's voice, and is used as display typography.

## Content sensitivity & curation policy

The work includes artistic nudity (boudoir). The site is a professional adult-portrait portfolio, so sensual imagery is on-brand. Policy:
- Public-facing first impressions (hero, OG/social image, strip) use **fashion/styled** frames or **implied/silhouette** boudoir frames.
- Explicitly nude frames are **excluded** from the curated set; they remain accessible via the existing portfolio if ORVAS chooses.
- Faces are not identified by name (no model credits available).

## Selected images

See `src/content/orvas-content.ts` (`images`) for the authoritative list with alt text, focal points and placements. Summary:

| Placement | Image (project · file) | Why |
|---|---|---|
| Hero L | I Chill Harder Than You Party · gold visor | warm colour, centred face, iconic |
| Hero C | Dark Bunny Red Eveil · red silhouette | saturated red middle column, mirrors reference rhythm |
| Hero R | Curves · B&W torso study | dark monochrome right column (white-backdrop and explicit candidates rejected in validation) |
| Split (sessions) | Blood of Love · landscape 4:3 | only true landscape; strong, symmetrical-ish |
| Session: Boudoir | Hues of Blue · cyan bikini study | graphic, non-explicit |
| Session: Fashion | Brunette Bombshell · orange visor | bold, playful |
| Session: Retouch | Exploring The Colors High End Retouch | literally the retouch showcase |
| Strip / featured / index | project covers across both categories | breadth without repetition |

## Brand direction rationale

Offform's language — near-black canvas, monospace micro-type, hairlines, photography carrying all colour — suits ORVAS unusually well: his images are saturated and graphic, and need a silent, dark frame. The reference's hot-pink accent `#ff4fd8` is replaced by a **blood red** drawn from the recurring red-gel work, so the accent feels like it came out of his photographs rather than an agency template. The lyrical series titles become the editorial voice, replacing agency marketing copy.
