/**
 * ORVAS — single source of editable website content.
 *
 * Every string, link and photograph shown on the site lives here.
 * Image `src` values are paths relative to `src/assets/` (see src/lib/images.ts).
 * Sources and verification notes: docs/orvas-brand-research.md.
 *
 * To add a series: drop JPEGs into src/assets/work/<slug>/ and add an entry to `series`.
 * To activate email or booking CTAs: set `contact.email` / `contact.booking.url`.
 */

export type Category = "boudoir" | "fashion";

export interface ImageRef {
  /** Path relative to src/assets, e.g. "work/sun-shine/01.jpg". */
  src: string;
  alt: string;
  /** CSS object-position for crops, e.g. "50% 30%". Defaults to centre. */
  focus?: string;
}

export interface Series {
  slug: string;
  title: string;
  category: Category;
  year: number;
  /** The series page on the previous portfolio (provenance). */
  sourceUrl: string;
  description?: string;
  /** Index into `images` used as the series cover. Defaults to 0. */
  cover?: number;
  images: ImageRef[];
}

export interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SessionItem {
  title: string;
  /** Rendered as separate lines either side of the image. */
  copy: string[];
  image: ImageRef;
}

export interface FeaturedItem {
  series: string;
  /** Shown as a diptych: two native 3:4 frames from the same series. */
  images: [ImageRef, ImageRef];
}

export interface OrvasContent {
  brand: {
    name: string;
    profession: string;
    specialities: string;
    instagramHandle: string;
    instagramUrl: string;
    previousPortfolioUrl: string;
  };
  header: { discipline: [string, string]; meta: [string, string]; nav: LinkItem[]; menuLabel: string; skipLink: string };
  loader: { label: string };
  hero: {
    images: [ImageRef, ImageRef, ImageRef];
    markers: [string, string, string, string, string, string];
    progressLabel: string;
    statement: string;
    list: string[];
    cta: LinkItem;
  };
  about: {
    id: string;
    label: [string, string];
    statement: string;
    body: string;
    list: string[];
    meta: [string, string][];
  };
  strip: { label: [string, string]; items: { series: string; image: ImageRef }[]; dragHint: string };
  index: {
    id: string;
    label: [string, string];
    intro: string;
    taxonomy: string;
    filters: { category: Category; label: string; series: string[] }[];
    archiveCta: LinkItem;
  };
  sessions: { id: string; label: string; image: ImageRef; items: SessionItem[] };
  latest: { label: [string, string]; statement: string; series: string[]; metaLabels: [string, string, string] };
  featured: { label: [string, string]; intro: string; statement: string; taxonomy: string; meta: [string, string][]; items: FeaturedItem[]; viewLabel: string };
  contact: {
    id: string;
    label: [string, string];
    statement: string;
    intro: string;
    instagramDm: string;
    inquiryFormUrl: string;
    /** Not publicly listed anywhere ORVAS publishes. Set to enable a mailto CTA. */
    email: string | null;
    booking: { url: string | null; label: string };
    cta: string;
  };
  footer: {
    label: [string, string];
    columns: { title: string; links: LinkItem[] }[];
    wordmark: string;
    copyright: string;
  };
  workPage: { title: string; intro: string; backLabel: string; nextLabel: string; framesLabel: string; sourceLabel: string };
  seo: {
    title: string;
    description: string;
    /** Production origin, e.g. "https://orvas.com". Null until the domain is decided. */
    siteUrl: string | null;
    ogImage: ImageRef;
    locale: string;
  };
}

const IG = "https://www.instagram.com/orvas__/";

export const orvasContent: OrvasContent = {
  brand: {
    name: "ORVAS",
    profession: "Photographer & Retoucher",
    specialities: "Boudoir · Fashion",
    instagramHandle: "@orvas__",
    instagramUrl: IG,
    previousPortfolioUrl: "https://orvas.myportfolio.com/",
  },

  header: {
    discipline: ["Photographer & retoucher", "Boudoir / Fashion"],
    meta: ["Archive", "2023 — 2025"],
    nav: [
      { label: "About", href: "/#about" },
      { label: "Work", href: "/#work" },
      { label: "Sessions", href: "/#sessions" },
      { label: "Contact", href: "/#contact" },
    ],
    menuLabel: "Menu",
    skipLink: "Skip to content",
  },

  loader: { label: "Loading ORVAS" },

  hero: {
    images: [
      { src: "work/i-chill-harder-than-you-party/03.jpg", alt: "Woman in a black visor and braided collar against mustard yellow", focus: "50% 30%" },
      { src: "work/orvas-dark-bunny-red-eveil/01.jpg", alt: "Silhouette in a bunny mask crouched under red stage light", focus: "50% 60%" },
      { src: "work/curves/02.jpg", alt: "Black-and-white study of a torso in window light", focus: "45% 50%" },
    ],
    markers: ["Boudoir", "Sensual", "Fashion", "Editorial", "Portrait", "Retouch"],
    progressLabel: "100%",
    statement: "Celebrating the unique beauty and confidence of every individual.",
    list: ["Boudoir", "Fashion", "Retouch"],
    cta: { label: "View the index", href: "/#work" },
  },

  about: {
    id: "about",
    label: ["About", "ORVAS"],
    statement: "Photographer and retoucher. Boudoir and fashion.",
    body:
      "ORVAS is a photographer and retoucher dedicated to the unique beauty and confidence of every individual. His work captures intimate, stylish and empowering moments, finished with a meticulous eye for detail.",
    list: ["Personal sessions", "High-end retouch", "Timeless portraits"],
    meta: [
      ["Boudoir", "Fashion"],
      ["Series", "52"],
      ["Archive", "2023—25"],
    ],
  },

  strip: {
    label: ["Selected", "Frames"],
    dragHint: "Drag",
    items: [
      { series: "too-chic-to-care-2", image: { src: "work/too-chic-to-care-2/01.jpg", alt: "Woman in oversized sunglasses and a chrome top under leaves" } },
      { series: "springbreakers", image: { src: "work/springbreakers/05.jpg", alt: "Woman in a pink balaclava and crop top on a pink backdrop" } },
      { series: "memories-of-a-geisha", image: { src: "work/memories-of-a-geisha/01.jpg", alt: "Woman in geisha styling framed by an open fan", focus: "50% 35%" } },
      { series: "sun-shine", image: { src: "work/sun-shine/05.jpg", alt: "Woman in a white gown standing in sunlight between jungle trees" } },
      { series: "orvas-dark-bunny", image: { src: "work/orvas-dark-bunny/02.jpg", alt: "Figure in a black latex bunny mask standing on white" } },
      { series: "black-bride-by-orvas", image: { src: "work/black-bride-by-orvas/13.jpg", alt: "Woman in a black veil and pearls against red" } },
      { series: "too-chic-to-care", image: { src: "work/too-chic-to-care/02.jpg", alt: "Close portrait in mirror sunglasses and a chrome hood" } },
      { series: "beatuy-shoot", image: { src: "work/beatuy-shoot/01.jpg", alt: "Beauty close-up with lipstick and dramatic eye make-up", focus: "50% 30%" } },
      { series: "hot-pink", image: { src: "work/hot-pink/02.jpg", alt: "Woman in a pink suit under magenta light" } },
      { series: "the-idiots", image: { src: "work/the-idiots/08.jpg", alt: "Masked figure in a black corset on teal", focus: "50% 30%" } },
      { series: "the-beauty", image: { src: "work/the-beauty/02.jpg", alt: "Woman in a black bikini seated by a dark pool" } },
      { series: "black-is-my-new-aesthetic-2", image: { src: "work/black-is-my-new-aesthetic-2/03.jpg", alt: "Black-and-white portrait in a visor and braided collar" } },
    ],
  },

  index: {
    id: "work",
    label: ["Index", "Series"],
    intro: "Series names",
    taxonomy: "Boudoir / Fashion / Retouch",
    filters: [
      {
        category: "fashion",
        label: "Fashion",
        series: [
          "sun-shine",
          "too-chic-to-care",
          "orvas-dark-bunny-red-eveil",
          "brunette-bombshell-1",
          "black-bride-by-orvas",
          "the-idiots",
          "springbreakers",
          "memories-of-a-geisha-1",
          "exploring-the-colors-high-end-retouch",
          "hot-pink",
        ],
      },
      {
        category: "boudoir",
        label: "Boudoir",
        series: [
          "a-woman-who-resembles-tides",
          "island-moments",
          "amora-bali-series",
          "the-beauty",
          "hues-of-blue",
          "blood-of-love-1",
          "bali",
          "pleasure-and-pain-move-through-the-same-portal",
          "diamond-shine",
          "iced-1",
        ],
      },
    ],
    archiveCta: { label: "Full archive", href: "/work/" },
  },

  sessions: {
    id: "sessions",
    label: "Sessions",
    image: { src: "work/blood-of-love-1/02.jpg", alt: "Body-painted figure lit in red and electric blue, reclining", focus: "42% 50%" },
    items: [
      {
        title: "Boudoir",
        copy: ["Elegant and sensual,", "or bold and playful.", "Each session is tailored", "to reveal your personality."],
        image: { src: "work/hues-of-blue/02.jpg", alt: "Figure in a black bikini washed in cyan light against white" },
      },
      {
        title: "Fashion",
        copy: ["Intimate, stylish", "and empowering images", "that highlight", "your true essence."],
        image: { src: "work/brunette-bombshell-1/08.jpg", alt: "Woman holding a chrome visor in orange and red light" },
      },
      {
        title: "Retouch",
        copy: ["A meticulous eye", "for detail, carried", "into every final frame.", "Glamorous. Radiant."],
        image: { src: "work/exploring-the-colors-high-end-retouch/02.jpg", alt: "Woman in rainbow fishnet and tinted glasses before silver tinsel" },
      },
    ],
  },

  featured: {
    label: ["Selected", "Series"],
    intro: "Five series from the archive",
    statement: "Fashion and editorial series from 2023 to 2025, chosen from the archive.",
    taxonomy: "Fashion / Editorial",
    meta: [
      ["Fashion", "2025"],
      ["Editorial", "2023"],
      ["Selected", "05"],
    ],
    viewLabel: "View series",
    items: [
      { series: "sun-shine", images: [{ src: "work/sun-shine/09.jpg", alt: "Woman in a white gown seated on mossy rocks in a jungle", focus: "50% 45%" }, { src: "work/sun-shine/02.jpg", alt: "Woman in a white gown among jungle leaves" }] },
      { series: "too-chic-to-care", images: [{ src: "work/too-chic-to-care/06.jpg", alt: "Woman in a chrome top crouched in a white skate bowl", focus: "50% 30%" }, { src: "work/too-chic-to-care/02.jpg", alt: "Close portrait in mirror sunglasses and a chrome hood" }] },
      { series: "black-bride-by-orvas", images: [{ src: "work/black-bride-by-orvas/07.jpg", alt: "Woman in a black veil and jewellery against a dark backdrop", focus: "50% 30%" }, { src: "work/black-bride-by-orvas/11.jpg", alt: "Woman in a black veil and lingerie against red" }] },
      { series: "orvas-dark-bunny-2", images: [{ src: "work/orvas-dark-bunny-2/02.jpg", alt: "Figure in a bunny mask crouched in a pool of white light" }, { src: "work/orvas-dark-bunny-2/04.jpg", alt: "Figure in a bunny mask seated in a pool of white light" }] },
      { series: "springbreakers", images: [{ src: "work/springbreakers/03.jpg", alt: "Woman in a red balaclava under neon light", focus: "50% 30%" }, { src: "work/springbreakers/09.jpg", alt: "Woman in a pink balaclava crouched on a pink backdrop" }] },
    ],
  },

  latest: {
    label: ["Latest", "2025"],
    statement: "Series published in 2025, fashion and boudoir.",
    metaLabels: ["Series", "Category", "Year"],
    series: [
      "sun-shine",
      "too-chic-to-care-2",
      "orvas-dark-bunny-2",
      "the-idiots",
      "island-moments",
      "a-woman-who-resembles-tides",
      "orvas-dark-bunny",
      "hues-of-blue",
      "the-beauty",
      "amora-bali-series",
    ],
  },

  contact: {
    id: "contact",
    label: ["Contact", "Let's begin"],
    statement: "Tell ORVAS what you have in mind.",
    intro: "Boudoir, fashion or retouch. Every inquiry starts with a message.",
    instagramDm: "https://ig.me/m/orvas__",
    inquiryFormUrl: "https://orvas.myportfolio.com/contact",
    email: null,
    booking: { url: null, label: "Book a consultation" },
    cta: "Start an inquiry",
  },

  footer: {
    label: ["ORVAS", "Directory"],
    columns: [
      { title: "Social", links: [{ label: "Instagram", href: IG, external: true }] },
      {
        title: "Work",
        links: [
          { label: "Fashion", href: "/work/#fashion" },
          { label: "Boudoir", href: "/work/#boudoir" },
          { label: "Full archive", href: "/work/" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Direct message", href: "https://ig.me/m/orvas__", external: true },
          { label: "Inquiry form", href: "https://orvas.myportfolio.com/contact", external: true },
        ],
      },
      {
        title: "Navigation",
        links: [
          { label: "About", href: "/#about" },
          { label: "Work", href: "/#work" },
          { label: "Sessions", href: "/#sessions" },
          { label: "Contact", href: "/#contact" },
        ],
      },
    ],
    wordmark: "ORVAS",
    copyright: "© 2026 ORVAS",
  },

  workPage: {
    title: "Archive",
    intro: "Every series, 2023 to 2025.",
    backLabel: "Index",
    nextLabel: "Next series",
    framesLabel: "Frames",
    sourceLabel: "Series",
  },

  seo: {
    title: "ORVAS — Boudoir & Fashion Photographer and Retoucher",
    description:
      "ORVAS is a photographer and retoucher specialising in boudoir and fashion photography: intimate, stylish and empowering portraits finished with a meticulous eye for detail.",
    siteUrl: null,
    ogImage: { src: "work/brunette-bombshell/05.jpg", alt: "Black-and-white portrait of a woman holding a mirror visor" },
    locale: "en",
  },
};

/** All series, in the order they appeared on the previous portfolio. */
export const series: Series[] = [
  {
    slug: "island-moments",
    title: "ISLAND MOMENTS",
    category: "boudoir",
    year: 2025,
    sourceUrl: "https://orvas.myportfolio.com/island-moments",
    images: [
      { src: "work/island-moments/01.jpg", alt: "Woman in a black bikini posed on a stone ledge among tropical plants" },
      { src: "work/island-moments/02.jpg", alt: "Woman in a black bikini posed on a stone ledge among tropical plants, frame 2" },
      { src: "work/island-moments/03.jpg", alt: "Woman in a black bikini posed on a stone ledge among tropical plants, frame 3" },
    ],
  },
  {
    slug: "amora-bali-series",
    title: "AMORA BALI SERIES",
    category: "boudoir",
    year: 2025,
    sourceUrl: "https://orvas.myportfolio.com/amora-bali-series",
    images: [
      { src: "work/amora-bali-series/01.jpg", alt: "Woman in nude lingerie kneeling on a white sofa" },
      { src: "work/amora-bali-series/02.jpg", alt: "Woman in nude lingerie kneeling on a white sofa, frame 2" },
      { src: "work/amora-bali-series/03.jpg", alt: "Woman in nude lingerie kneeling on a white sofa, frame 3" },
      { src: "work/amora-bali-series/04.jpg", alt: "Woman in nude lingerie kneeling on a white sofa, frame 4" },
    ],
  },
  {
    slug: "the-beauty",
    title: "THE BEAUTY",
    category: "boudoir",
    year: 2025,
    sourceUrl: "https://orvas.myportfolio.com/the-beauty",
    images: [
      { src: "work/the-beauty/01.jpg", alt: "Woman in a black bikini beside a dark pool on a timber deck" },
      { src: "work/the-beauty/02.jpg", alt: "Woman in a black bikini beside a dark pool on a timber deck, frame 2" },
      { src: "work/the-beauty/03.jpg", alt: "Woman in a black bikini beside a dark pool on a timber deck, frame 3" },
      { src: "work/the-beauty/04.jpg", alt: "Woman in a black bikini beside a dark pool on a timber deck, frame 4" },
      { src: "work/the-beauty/05.jpg", alt: "Woman in a black bikini beside a dark pool on a timber deck, frame 5" },
    ],
  },
  {
    slug: "island-girl-2",
    title: "ISLAND GIRL 2",
    category: "boudoir",
    year: 2025,
    sourceUrl: "https://orvas.myportfolio.com/island-girl-2",
    images: [
      { src: "work/island-girl-2/01.jpg", alt: "Woman with a shaved head in a black bikini on stone steps among palms" },
      { src: "work/island-girl-2/02.jpg", alt: "Woman with a shaved head in a black bikini on stone steps among palms, frame 2" },
      { src: "work/island-girl-2/03.jpg", alt: "Woman with a shaved head in a black bikini on stone steps among palms, frame 3" },
    ],
  },
  {
    slug: "bali",
    title: "BALI",
    category: "boudoir",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/bali",
    images: [
      { src: "work/bali/01.jpg", alt: "Woman in a sea cave and at the shoreline beneath cliffs" },
      { src: "work/bali/02.jpg", alt: "Woman in a sea cave and at the shoreline beneath cliffs, frame 2" },
    ],
  },
  {
    slug: "bali-amora-series",
    title: "BALI AMORA SERIES",
    category: "boudoir",
    year: 2025,
    sourceUrl: "https://orvas.myportfolio.com/bali-amora-series",
    images: [
      { src: "work/bali-amora-series/01.jpg", alt: "Tattooed woman in a black bikini on a rattan chair by a pool" },
      { src: "work/bali-amora-series/02.jpg", alt: "Tattooed woman in a black bikini on a rattan chair by a pool, frame 2" },
      { src: "work/bali-amora-series/03.jpg", alt: "Tattooed woman in a black bikini on a rattan chair by a pool, frame 3" },
      { src: "work/bali-amora-series/04.jpg", alt: "Tattooed woman in a black bikini on a rattan chair by a pool, frame 4" },
    ],
  },
  {
    slug: "blood-of-love-1",
    title: "BLOOD OF LOVE",
    category: "boudoir",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/blood-of-love-1",
    images: [
      { src: "work/blood-of-love-1/01.jpg", alt: "Body-painted figure lit in red and electric blue" },
      { src: "work/blood-of-love-1/02.jpg", alt: "Body-painted figure lit in red and electric blue, frame 2" },
      { src: "work/blood-of-love-1/03.jpg", alt: "Body-painted figure lit in red and electric blue, frame 3" },
      { src: "work/blood-of-love-1/04.jpg", alt: "Body-painted figure lit in red and electric blue, frame 4" },
      { src: "work/blood-of-love-1/05.jpg", alt: "Body-painted figure lit in red and electric blue, frame 5" },
      { src: "work/blood-of-love-1/06.jpg", alt: "Body-painted figure lit in red and electric blue, frame 6" },
    ],
  },
  {
    slug: "curves",
    title: "CURVES",
    category: "boudoir",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/curves",
    images: [
      { src: "work/curves/01.jpg", alt: "Black-and-white silhouette of a torso against window light" },
      { src: "work/curves/02.jpg", alt: "Black-and-white silhouette of a torso against window light, frame 2" },
    ],
  },
  {
    slug: "gold",
    title: "GOLD",
    category: "boudoir",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/gold",
    images: [
      { src: "work/gold/01.jpg", alt: "Figure covered in gold leaf against a warm brown backdrop" },
      { src: "work/gold/02.jpg", alt: "Figure covered in gold leaf against a warm brown backdrop, frame 2" },
      { src: "work/gold/03.jpg", alt: "Figure covered in gold leaf against a warm brown backdrop, frame 3" },
      { src: "work/gold/04.jpg", alt: "Figure covered in gold leaf against a warm brown backdrop, frame 4" },
    ],
  },
  {
    slug: "bw-sensual",
    title: "B/W SENSUAL",
    category: "boudoir",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/bw-sensual",
    images: [
      { src: "work/bw-sensual/01.jpg", alt: "Black-and-white study of a figure in soft shadow" },
    ],
  },
  {
    slug: "her-aura-smells-like-warm-honey-a",
    title: "HER AURA SMELLS LIKE WARM HONEY ~A",
    category: "boudoir",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/her-aura-smells-like-warm-honey-a",
    images: [
      { src: "work/her-aura-smells-like-warm-honey-a/01.jpg", alt: "Figure draped in honey-coloured liquid on dark satin" },
      { src: "work/her-aura-smells-like-warm-honey-a/02.jpg", alt: "Figure draped in honey-coloured liquid on dark satin, frame 2" },
      { src: "work/her-aura-smells-like-warm-honey-a/03.jpg", alt: "Figure draped in honey-coloured liquid on dark satin, frame 3" },
    ],
  },
  {
    slug: "take-me-to-hell-i-will-show-you-the-real-pain",
    title: "TAKE ME TO HELL I WILL SHOW YOU THE REAL PAIN",
    category: "boudoir",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/take-me-to-hell-i-will-show-you-the-real-pain",
    images: [
      { src: "work/take-me-to-hell-i-will-show-you-the-real-pain/01.jpg", alt: "Torso painted glossy red with black veins" },
    ],
  },
  {
    slug: "summer-is-on-its-way",
    title: "SUMMER IS ON ITS WAY",
    category: "boudoir",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/summer-is-on-its-way",
    images: [
      { src: "work/summer-is-on-its-way/01.jpg", alt: "High-key black-and-white silhouette in sheer tights" },
      { src: "work/summer-is-on-its-way/02.jpg", alt: "High-key black-and-white silhouette in sheer tights, frame 2" },
    ],
  },
  {
    slug: "hues-of-blue",
    title: "HUES OF BLUE",
    category: "boudoir",
    year: 2025,
    sourceUrl: "https://orvas.myportfolio.com/hues-of-blue",
    images: [
      { src: "work/hues-of-blue/01.jpg", alt: "Figure in a black bikini washed in cyan light against white" },
      { src: "work/hues-of-blue/02.jpg", alt: "Figure in a black bikini washed in cyan light against white, frame 2" },
      { src: "work/hues-of-blue/03.jpg", alt: "Figure in a black bikini washed in cyan light against white, frame 3" },
      { src: "work/hues-of-blue/04.jpg", alt: "Figure in a black bikini washed in cyan light against white, frame 4" },
    ],
  },
  {
    slug: "diamond-shine",
    title: "DIAMOND SHINE",
    category: "boudoir",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/diamond-shine",
    images: [
      { src: "work/diamond-shine/01.jpg", alt: "Figure on deep red and in black and white, scattered with crystals" },
      { src: "work/diamond-shine/02.jpg", alt: "Figure on deep red and in black and white, scattered with crystals, frame 2" },
      { src: "work/diamond-shine/03.jpg", alt: "Figure on deep red and in black and white, scattered with crystals, frame 3" },
      { src: "work/diamond-shine/04.jpg", alt: "Figure on deep red and in black and white, scattered with crystals, frame 4" },
    ],
  },
  {
    slug: "iced-1",
    title: "ICED",
    category: "boudoir",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/iced-1",
    images: [
      { src: "work/iced-1/01.jpg", alt: "Waist in a red two-piece with crystal body jewellery" },
    ],
  },
  {
    slug: "a-woman-who-resembles-tides",
    title: "A WOMAN WHO RESEMBLES TIDES",
    category: "boudoir",
    year: 2025,
    sourceUrl: "https://orvas.myportfolio.com/a-woman-who-resembles-tides",
    images: [
      { src: "work/a-woman-who-resembles-tides/01.jpg", alt: "Black-and-white figure veiled in flowing white fabric" },
      { src: "work/a-woman-who-resembles-tides/02.jpg", alt: "Black-and-white figure veiled in flowing white fabric, frame 2" },
      { src: "work/a-woman-who-resembles-tides/03.jpg", alt: "Black-and-white figure veiled in flowing white fabric, frame 3" },
    ],
  },
  {
    slug: "iced-2",
    title: "ICED 2",
    category: "boudoir",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/iced-2",
    images: [
      { src: "work/iced-2/01.jpg", alt: "Crystals along a back in cool blue-grey light" },
    ],
  },
  {
    slug: "hide",
    title: "HIDE",
    category: "boudoir",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/hide",
    images: [
      { src: "work/hide/01.jpg", alt: "Gloved hands across a torso against a red backdrop" },
    ],
  },
  {
    slug: "pleasure-and-pain-move-through-the-same-portal",
    title: "PLEASURE AND PAIN MOVE THROUGH THE SAME PORTAL",
    category: "boudoir",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/pleasure-and-pain-move-through-the-same-portal",
    images: [
      { src: "work/pleasure-and-pain-move-through-the-same-portal/01.jpg", alt: "Black-and-white figure wrapped in black straps" },
      { src: "work/pleasure-and-pain-move-through-the-same-portal/02.jpg", alt: "Black-and-white figure wrapped in black straps, frame 2" },
      { src: "work/pleasure-and-pain-move-through-the-same-portal/03.jpg", alt: "Black-and-white figure wrapped in black straps, frame 3" },
      { src: "work/pleasure-and-pain-move-through-the-same-portal/04.jpg", alt: "Black-and-white figure wrapped in black straps, frame 4" },
      { src: "work/pleasure-and-pain-move-through-the-same-portal/05.jpg", alt: "Black-and-white figure wrapped in black straps, frame 5" },
    ],
  },
  {
    slug: "get-wet",
    title: "GET WET",
    category: "boudoir",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/get-wet",
    images: [
      { src: "work/get-wet/01.jpg", alt: "Skin and leather harness in warm low light" },
      { src: "work/get-wet/02.jpg", alt: "Skin and leather harness in warm low light, frame 2" },
    ],
  },
  {
    slug: "blossom",
    title: "BLOSSOM",
    category: "boudoir",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/blossom",
    images: [
      { src: "work/blossom/01.jpg", alt: "Figure holding white lilies against a red backdrop" },
      { src: "work/blossom/02.jpg", alt: "Figure holding white lilies against a red backdrop, frame 2" },
    ],
  },
  {
    slug: "sun-shine",
    title: "SUN SHINE",
    category: "fashion",
    year: 2025,
    sourceUrl: "https://orvas.myportfolio.com/sun-shine",
    images: [
      { src: "work/sun-shine/01.jpg", alt: "Woman in a white gown in a sunlit jungle" },
      { src: "work/sun-shine/02.jpg", alt: "Woman in a white gown in a sunlit jungle, frame 2" },
      { src: "work/sun-shine/03.jpg", alt: "Woman in a white gown in a sunlit jungle, frame 3" },
      { src: "work/sun-shine/04.jpg", alt: "Woman in a white gown in a sunlit jungle, frame 4" },
      { src: "work/sun-shine/05.jpg", alt: "Woman in a white gown in a sunlit jungle, frame 5" },
      { src: "work/sun-shine/06.jpg", alt: "Woman in a white gown in a sunlit jungle, frame 6" },
      { src: "work/sun-shine/07.jpg", alt: "Woman in a white gown in a sunlit jungle, frame 7" },
      { src: "work/sun-shine/08.jpg", alt: "Woman in a white gown in a sunlit jungle, frame 8" },
      { src: "work/sun-shine/09.jpg", alt: "Woman in a white gown in a sunlit jungle, frame 9" },
      { src: "work/sun-shine/10.jpg", alt: "Woman in a white gown in a sunlit jungle, frame 10" },
      { src: "work/sun-shine/11.jpg", alt: "Woman in a white gown in a sunlit jungle, frame 11" },
      { src: "work/sun-shine/12.jpg", alt: "Woman in a white gown in a sunlit jungle, frame 12" },
    ],
  },
  {
    slug: "brunette-bombshell",
    title: "BRUNETTE BOMBSHELL",
    category: "fashion",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/brunette-bombshell",
    images: [
      { src: "work/brunette-bombshell/01.jpg", alt: "Woman in a sheer black gown and mirror visor on white" },
      { src: "work/brunette-bombshell/02.jpg", alt: "Woman in a sheer black gown and mirror visor on white, frame 2" },
      { src: "work/brunette-bombshell/03.jpg", alt: "Woman in a sheer black gown and mirror visor on white, frame 3" },
      { src: "work/brunette-bombshell/04.jpg", alt: "Woman in a sheer black gown and mirror visor on white, frame 4" },
      { src: "work/brunette-bombshell/05.jpg", alt: "Woman in a sheer black gown and mirror visor on white, frame 5" },
      { src: "work/brunette-bombshell/06.jpg", alt: "Woman in a sheer black gown and mirror visor on white, frame 6" },
      { src: "work/brunette-bombshell/07.jpg", alt: "Woman in a sheer black gown and mirror visor on white, frame 7" },
    ],
  },
  {
    slug: "orvas-dark-bunny-red-eveil",
    title: "ORVAS : DARK BUNNY RED EVEIL",
    category: "fashion",
    year: 2025,
    sourceUrl: "https://orvas.myportfolio.com/orvas-dark-bunny-red-eveil",
    images: [
      { src: "work/orvas-dark-bunny-red-eveil/01.jpg", alt: "Silhouette in a bunny mask under red stage light" },
      { src: "work/orvas-dark-bunny-red-eveil/02.jpg", alt: "Silhouette in a bunny mask under red stage light, frame 2" },
      { src: "work/orvas-dark-bunny-red-eveil/03.jpg", alt: "Silhouette in a bunny mask under red stage light, frame 3" },
      { src: "work/orvas-dark-bunny-red-eveil/04.jpg", alt: "Silhouette in a bunny mask under red stage light, frame 4" },
      { src: "work/orvas-dark-bunny-red-eveil/05.jpg", alt: "Silhouette in a bunny mask under red stage light, frame 5" },
      { src: "work/orvas-dark-bunny-red-eveil/06.jpg", alt: "Silhouette in a bunny mask under red stage light, frame 6" },
      { src: "work/orvas-dark-bunny-red-eveil/07.jpg", alt: "Silhouette in a bunny mask under red stage light, frame 7" },
    ],
  },
  {
    slug: "brunette-bombshell-1",
    title: "BRUNETTE BOMBSHELL",
    category: "fashion",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/brunette-bombshell-1",
    images: [
      { src: "work/brunette-bombshell-1/01.jpg", alt: "Woman in a chrome visor washed in orange and red light" },
      { src: "work/brunette-bombshell-1/02.jpg", alt: "Woman in a chrome visor washed in orange and red light, frame 2" },
      { src: "work/brunette-bombshell-1/03.jpg", alt: "Woman in a chrome visor washed in orange and red light, frame 3" },
      { src: "work/brunette-bombshell-1/04.jpg", alt: "Woman in a chrome visor washed in orange and red light, frame 4" },
      { src: "work/brunette-bombshell-1/05.jpg", alt: "Woman in a chrome visor washed in orange and red light, frame 5" },
      { src: "work/brunette-bombshell-1/06.jpg", alt: "Woman in a chrome visor washed in orange and red light, frame 6" },
      { src: "work/brunette-bombshell-1/07.jpg", alt: "Woman in a chrome visor washed in orange and red light, frame 7" },
      { src: "work/brunette-bombshell-1/08.jpg", alt: "Woman in a chrome visor washed in orange and red light, frame 8" },
      { src: "work/brunette-bombshell-1/09.jpg", alt: "Woman in a chrome visor washed in orange and red light, frame 9" },
      { src: "work/brunette-bombshell-1/10.jpg", alt: "Woman in a chrome visor washed in orange and red light, frame 10" },
      { src: "work/brunette-bombshell-1/11.jpg", alt: "Woman in a chrome visor washed in orange and red light, frame 11" },
    ],
  },
  {
    slug: "blood-of-love",
    title: "BLOOD OF LOVE",
    category: "fashion",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/blood-of-love",
    images: [
      { src: "work/blood-of-love/01.jpg", alt: "Woman covered in glossy red paint on red plastic" },
      { src: "work/blood-of-love/02.jpg", alt: "Woman covered in glossy red paint on red plastic, frame 2" },
      { src: "work/blood-of-love/03.jpg", alt: "Woman covered in glossy red paint on red plastic, frame 3" },
    ],
  },
  {
    slug: "too-chic-to-care",
    title: "TOO CHIC TO CARE",
    category: "fashion",
    year: 2025,
    sourceUrl: "https://orvas.myportfolio.com/too-chic-to-care",
    images: [
      { src: "work/too-chic-to-care/01.jpg", alt: "Woman in a chrome hood and mirror sunglasses in a white skate bowl" },
      { src: "work/too-chic-to-care/02.jpg", alt: "Woman in a chrome hood and mirror sunglasses in a white skate bowl, frame 2" },
      { src: "work/too-chic-to-care/03.jpg", alt: "Woman in a chrome hood and mirror sunglasses in a white skate bowl, frame 3" },
      { src: "work/too-chic-to-care/04.jpg", alt: "Woman in a chrome hood and mirror sunglasses in a white skate bowl, frame 4" },
      { src: "work/too-chic-to-care/05.jpg", alt: "Woman in a chrome hood and mirror sunglasses in a white skate bowl, frame 5" },
      { src: "work/too-chic-to-care/06.jpg", alt: "Woman in a chrome hood and mirror sunglasses in a white skate bowl, frame 6" },
      { src: "work/too-chic-to-care/07.jpg", alt: "Woman in a chrome hood and mirror sunglasses in a white skate bowl, frame 7" },
      { src: "work/too-chic-to-care/08.jpg", alt: "Woman in a chrome hood and mirror sunglasses in a white skate bowl, frame 8" },
      { src: "work/too-chic-to-care/09.jpg", alt: "Woman in a chrome hood and mirror sunglasses in a white skate bowl, frame 9" },
      { src: "work/too-chic-to-care/10.jpg", alt: "Woman in a chrome hood and mirror sunglasses in a white skate bowl, frame 10" },
    ],
  },
  {
    slug: "orvas-dark-bunny",
    title: "ORVAS : DARK BUNNY",
    category: "fashion",
    year: 2025,
    sourceUrl: "https://orvas.myportfolio.com/orvas-dark-bunny",
    images: [
      { src: "work/orvas-dark-bunny/01.jpg", alt: "Figure in a black latex bunny mask on a white backdrop" },
      { src: "work/orvas-dark-bunny/02.jpg", alt: "Figure in a black latex bunny mask on a white backdrop, frame 2" },
      { src: "work/orvas-dark-bunny/03.jpg", alt: "Figure in a black latex bunny mask on a white backdrop, frame 3" },
      { src: "work/orvas-dark-bunny/04.jpg", alt: "Figure in a black latex bunny mask on a white backdrop, frame 4" },
    ],
  },
  {
    slug: "sexy-war-bonnet-look",
    title: "SEXY WAR BONNET LOOK",
    category: "fashion",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/sexy-war-bonnet-look",
    images: [
      { src: "work/sexy-war-bonnet-look/01.jpg", alt: "Woman in an orange swimsuit and feathered headdress on white sand" },
      { src: "work/sexy-war-bonnet-look/02.jpg", alt: "Woman in an orange swimsuit and feathered headdress on white sand, frame 2" },
      { src: "work/sexy-war-bonnet-look/03.jpg", alt: "Woman in an orange swimsuit and feathered headdress on white sand, frame 3" },
    ],
  },
  {
    slug: "too-chic-to-care-2",
    title: "TOO CHIC TO CARE 2",
    category: "fashion",
    year: 2025,
    sourceUrl: "https://orvas.myportfolio.com/too-chic-to-care-2",
    images: [
      { src: "work/too-chic-to-care-2/01.jpg", alt: "Woman in a chrome top and oversized sunglasses by a graffiti wall" },
      { src: "work/too-chic-to-care-2/02.jpg", alt: "Woman in a chrome top and oversized sunglasses by a graffiti wall, frame 2" },
      { src: "work/too-chic-to-care-2/03.jpg", alt: "Woman in a chrome top and oversized sunglasses by a graffiti wall, frame 3" },
      { src: "work/too-chic-to-care-2/04.jpg", alt: "Woman in a chrome top and oversized sunglasses by a graffiti wall, frame 4" },
      { src: "work/too-chic-to-care-2/05.jpg", alt: "Woman in a chrome top and oversized sunglasses by a graffiti wall, frame 5" },
      { src: "work/too-chic-to-care-2/06.jpg", alt: "Woman in a chrome top and oversized sunglasses by a graffiti wall, frame 6" },
      { src: "work/too-chic-to-care-2/07.jpg", alt: "Woman in a chrome top and oversized sunglasses by a graffiti wall, frame 7" },
      { src: "work/too-chic-to-care-2/08.jpg", alt: "Woman in a chrome top and oversized sunglasses by a graffiti wall, frame 8" },
    ],
  },
  {
    slug: "orvas-dark-bunny-2",
    title: "ORVAS : DARK BUNNY 2",
    category: "fashion",
    year: 2025,
    sourceUrl: "https://orvas.myportfolio.com/orvas-dark-bunny-2",
    images: [
      { src: "work/orvas-dark-bunny-2/01.jpg", alt: "Figure in a bunny mask crouched in a pool of white light" },
      { src: "work/orvas-dark-bunny-2/02.jpg", alt: "Figure in a bunny mask crouched in a pool of white light, frame 2" },
      { src: "work/orvas-dark-bunny-2/03.jpg", alt: "Figure in a bunny mask crouched in a pool of white light, frame 3" },
      { src: "work/orvas-dark-bunny-2/04.jpg", alt: "Figure in a bunny mask crouched in a pool of white light, frame 4" },
      { src: "work/orvas-dark-bunny-2/05.jpg", alt: "Figure in a bunny mask crouched in a pool of white light, frame 5" },
    ],
  },
  {
    slug: "the-idiots",
    title: "THE IDIOTS",
    category: "fashion",
    year: 2025,
    sourceUrl: "https://orvas.myportfolio.com/the-idiots",
    images: [
      { src: "work/the-idiots/01.jpg", alt: "Masked figure in black boots on a teal backdrop" },
      { src: "work/the-idiots/02.jpg", alt: "Masked figure in black boots on a teal backdrop, frame 2" },
      { src: "work/the-idiots/03.jpg", alt: "Masked figure in black boots on a teal backdrop, frame 3" },
      { src: "work/the-idiots/04.jpg", alt: "Masked figure in black boots on a teal backdrop, frame 4" },
      { src: "work/the-idiots/05.jpg", alt: "Masked figure in black boots on a teal backdrop, frame 5" },
      { src: "work/the-idiots/06.jpg", alt: "Masked figure in black boots on a teal backdrop, frame 6" },
      { src: "work/the-idiots/07.jpg", alt: "Masked figure in black boots on a teal backdrop, frame 7" },
      { src: "work/the-idiots/08.jpg", alt: "Masked figure in black boots on a teal backdrop, frame 8" },
    ],
  },
  {
    slug: "memories-of-a-geisha",
    title: "MEMORIES OF A GEISHA",
    category: "fashion",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/memories-of-a-geisha",
    images: [
      { src: "work/memories-of-a-geisha/01.jpg", alt: "Woman in geisha styling framed by an open fan" },
    ],
  },
  {
    slug: "veil-of-mystery",
    title: "VEIL OF MYSTERY",
    category: "fashion",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/veil-of-mystery",
    images: [
      { src: "work/veil-of-mystery/01.jpg", alt: "Masked figure in black lingerie and thigh-high boots on grey" },
      { src: "work/veil-of-mystery/02.jpg", alt: "Masked figure in black lingerie and thigh-high boots on grey, frame 2" },
      { src: "work/veil-of-mystery/03.jpg", alt: "Masked figure in black lingerie and thigh-high boots on grey, frame 3" },
      { src: "work/veil-of-mystery/04.jpg", alt: "Masked figure in black lingerie and thigh-high boots on grey, frame 4" },
      { src: "work/veil-of-mystery/05.jpg", alt: "Masked figure in black lingerie and thigh-high boots on grey, frame 5" },
    ],
  },
  {
    slug: "black-is-my-new-aesthetic",
    title: "BLACK IS MY NEW AESTHETIC.",
    category: "fashion",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/black-is-my-new-aesthetic",
    images: [
      { src: "work/black-is-my-new-aesthetic/01.jpg", alt: "Black-and-white figure in a mask with a long braided whip" },
    ],
  },
  {
    slug: "black-bride-by-orvas",
    title: "BLACK BRIDE BY ORVAS",
    category: "fashion",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/black-bride-by-orvas",
    description: "Black Bride by ORVAS.",
    images: [
      { src: "work/black-bride-by-orvas/01.jpg", alt: "Woman in a black bridal veil and lingerie on red" },
      { src: "work/black-bride-by-orvas/02.jpg", alt: "Woman in a black bridal veil and lingerie on red, frame 2" },
      { src: "work/black-bride-by-orvas/03.jpg", alt: "Woman in a black bridal veil and lingerie on red, frame 3" },
      { src: "work/black-bride-by-orvas/04.jpg", alt: "Woman in a black bridal veil and lingerie on red, frame 4" },
      { src: "work/black-bride-by-orvas/05.jpg", alt: "Woman in a black bridal veil and lingerie on red, frame 5" },
      { src: "work/black-bride-by-orvas/06.jpg", alt: "Woman in a black bridal veil and lingerie on red, frame 6" },
      { src: "work/black-bride-by-orvas/07.jpg", alt: "Woman in a black bridal veil and lingerie on red, frame 7" },
      { src: "work/black-bride-by-orvas/08.jpg", alt: "Woman in a black bridal veil and lingerie on red, frame 8" },
      { src: "work/black-bride-by-orvas/09.jpg", alt: "Woman in a black bridal veil and lingerie on red, frame 9" },
      { src: "work/black-bride-by-orvas/10.jpg", alt: "Woman in a black bridal veil and lingerie on red, frame 10" },
      { src: "work/black-bride-by-orvas/11.jpg", alt: "Woman in a black bridal veil and lingerie on red, frame 11" },
      { src: "work/black-bride-by-orvas/12.jpg", alt: "Woman in a black bridal veil and lingerie on red, frame 12" },
      { src: "work/black-bride-by-orvas/13.jpg", alt: "Woman in a black bridal veil and lingerie on red, frame 13" },
      { src: "work/black-bride-by-orvas/14.jpg", alt: "Woman in a black bridal veil and lingerie on red, frame 14" },
    ],
  },
  {
    slug: "love-me-like-my-demons-do-a",
    title: "LOVE ME LIKE MY DEMONS DO. ~A",
    category: "fashion",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/love-me-like-my-demons-do-a",
    images: [
      { src: "work/love-me-like-my-demons-do-a/01.jpg", alt: "Masked figure in a black bodysuit on deep red" },
      { src: "work/love-me-like-my-demons-do-a/02.jpg", alt: "Masked figure in a black bodysuit on deep red, frame 2" },
      { src: "work/love-me-like-my-demons-do-a/03.jpg", alt: "Masked figure in a black bodysuit on deep red, frame 3" },
      { src: "work/love-me-like-my-demons-do-a/04.jpg", alt: "Masked figure in a black bodysuit on deep red, frame 4" },
      { src: "work/love-me-like-my-demons-do-a/05.jpg", alt: "Masked figure in a black bodysuit on deep red, frame 5" },
      { src: "work/love-me-like-my-demons-do-a/06.jpg", alt: "Masked figure in a black bodysuit on deep red, frame 6" },
      { src: "work/love-me-like-my-demons-do-a/07.jpg", alt: "Masked figure in a black bodysuit on deep red, frame 7" },
      { src: "work/love-me-like-my-demons-do-a/08.jpg", alt: "Masked figure in a black bodysuit on deep red, frame 8" },
    ],
  },
  {
    slug: "springbreakers",
    title: "SPRINGBREAKERS",
    category: "fashion",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/springbreakers",
    images: [
      { src: "work/springbreakers/01.jpg", alt: "Woman in a pink balaclava on a pink backdrop" },
      { src: "work/springbreakers/02.jpg", alt: "Woman in a pink balaclava on a pink backdrop, frame 2" },
      { src: "work/springbreakers/03.jpg", alt: "Woman in a pink balaclava on a pink backdrop, frame 3" },
      { src: "work/springbreakers/04.jpg", alt: "Woman in a pink balaclava on a pink backdrop, frame 4" },
      { src: "work/springbreakers/05.jpg", alt: "Woman in a pink balaclava on a pink backdrop, frame 5" },
      { src: "work/springbreakers/06.jpg", alt: "Woman in a pink balaclava on a pink backdrop, frame 6" },
      { src: "work/springbreakers/07.jpg", alt: "Woman in a pink balaclava on a pink backdrop, frame 7" },
      { src: "work/springbreakers/08.jpg", alt: "Woman in a pink balaclava on a pink backdrop, frame 8" },
      { src: "work/springbreakers/09.jpg", alt: "Woman in a pink balaclava on a pink backdrop, frame 9" },
    ],
  },
  {
    slug: "exploring-the-colors-high-end-retouch",
    title: "EXPLORING THE COLORS HIGH END RETOUCH",
    category: "fashion",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/exploring-the-colors-high-end-retouch",
    images: [
      { src: "work/exploring-the-colors-high-end-retouch/01.jpg", alt: "Woman in rainbow fishnet and tinted glasses before silver tinsel" },
      { src: "work/exploring-the-colors-high-end-retouch/02.jpg", alt: "Woman in rainbow fishnet and tinted glasses before silver tinsel, frame 2" },
    ],
  },
  {
    slug: "hot-pink",
    title: "HOT PINK",
    category: "fashion",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/hot-pink",
    images: [
      { src: "work/hot-pink/01.jpg", alt: "Woman in a pink suit under magenta light" },
      { src: "work/hot-pink/02.jpg", alt: "Woman in a pink suit under magenta light, frame 2" },
      { src: "work/hot-pink/03.jpg", alt: "Woman in a pink suit under magenta light, frame 3" },
      { src: "work/hot-pink/04.jpg", alt: "Woman in a pink suit under magenta light, frame 4" },
    ],
  },
  {
    slug: "all-these-butterflies-all-because-of-you-a",
    title: "ALL THESE BUTTERFLIES.. ALL BECAUSE OF YOU. ~A",
    category: "fashion",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/all-these-butterflies-all-because-of-you-a",
    images: [
      { src: "work/all-these-butterflies-all-because-of-you-a/01.jpg", alt: "Figure with white butterflies across the body" },
      { src: "work/all-these-butterflies-all-because-of-you-a/02.jpg", alt: "Figure with white butterflies across the body, frame 2" },
      { src: "work/all-these-butterflies-all-because-of-you-a/03.jpg", alt: "Figure with white butterflies across the body, frame 3" },
    ],
  },
  {
    slug: "memories-of-a-geisha-1",
    title: "MEMORIES OF A GEISHA",
    category: "fashion",
    year: 2024,
    sourceUrl: "https://orvas.myportfolio.com/memories-of-a-geisha-1",
    images: [
      { src: "work/memories-of-a-geisha-1/01.jpg", alt: "Woman with a black fan before a red sun" },
      { src: "work/memories-of-a-geisha-1/02.jpg", alt: "Woman with a black fan before a red sun, frame 2" },
      { src: "work/memories-of-a-geisha-1/03.jpg", alt: "Woman with a black fan before a red sun, frame 3" },
    ],
  },
  {
    slug: "sexy-war-bonnet-look-2",
    title: "SEXY WAR BONNET LOOK 2",
    category: "fashion",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/sexy-war-bonnet-look-2",
    images: [
      { src: "work/sexy-war-bonnet-look-2/01.jpg", alt: "Woman in a feathered headdress and orange swimsuit" },
      { src: "work/sexy-war-bonnet-look-2/02.jpg", alt: "Woman in a feathered headdress and orange swimsuit, frame 2" },
      { src: "work/sexy-war-bonnet-look-2/03.jpg", alt: "Woman in a feathered headdress and orange swimsuit, frame 3" },
    ],
  },
  {
    slug: "black-and-white",
    title: "BLACK AND WHITE",
    category: "fashion",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/black-and-white",
    images: [
      { src: "work/black-and-white/01.jpg", alt: "Woman in a fishnet bodysuit posed on white, in black and white" },
      { src: "work/black-and-white/02.jpg", alt: "Woman in a fishnet bodysuit posed on white, in black and white, frame 2" },
      { src: "work/black-and-white/03.jpg", alt: "Woman in a fishnet bodysuit posed on white, in black and white, frame 3" },
      { src: "work/black-and-white/04.jpg", alt: "Woman in a fishnet bodysuit posed on white, in black and white, frame 4" },
      { src: "work/black-and-white/05.jpg", alt: "Woman in a fishnet bodysuit posed on white, in black and white, frame 5" },
      { src: "work/black-and-white/06.jpg", alt: "Woman in a fishnet bodysuit posed on white, in black and white, frame 6" },
      { src: "work/black-and-white/07.jpg", alt: "Woman in a fishnet bodysuit posed on white, in black and white, frame 7" },
    ],
  },
  {
    slug: "beatuy-shoot",
    title: "BEAUTY SHOOT",
    category: "fashion",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/beatuy-shoot",
    images: [
      { src: "work/beatuy-shoot/01.jpg", alt: "Beauty close-up with lipstick and dramatic eye make-up" },
    ],
  },
  {
    slug: "futuristic-fashion-silver-style",
    title: "FUTURISTIC FASHION SILVER STYLE",
    category: "fashion",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/futuristic-fashion-silver-style",
    images: [
      { src: "work/futuristic-fashion-silver-style/01.jpg", alt: "Woman wrapped in silver foil with a chrome visor" },
    ],
  },
  {
    slug: "i-chill-harder-than-you-party",
    title: "I CHILL HARDER THAN YOU PARTY",
    category: "fashion",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/i-chill-harder-than-you-party",
    images: [
      { src: "work/i-chill-harder-than-you-party/01.jpg", alt: "Woman in a black visor and braided collar against mustard yellow" },
      { src: "work/i-chill-harder-than-you-party/02.jpg", alt: "Woman in a black visor and braided collar against mustard yellow, frame 2" },
      { src: "work/i-chill-harder-than-you-party/03.jpg", alt: "Woman in a black visor and braided collar against mustard yellow, frame 3" },
    ],
  },
  {
    slug: "black-is-my-new-aesthetic-2",
    title: "BLACK IS MY NEW AESTHETIC.",
    category: "fashion",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/black-is-my-new-aesthetic-2",
    images: [
      { src: "work/black-is-my-new-aesthetic-2/01.jpg", alt: "Black-and-white portrait in a visor and braided collar" },
      { src: "work/black-is-my-new-aesthetic-2/02.jpg", alt: "Black-and-white portrait in a visor and braided collar, frame 2" },
      { src: "work/black-is-my-new-aesthetic-2/03.jpg", alt: "Black-and-white portrait in a visor and braided collar, frame 3" },
    ],
  },
  {
    slug: "black-is-my-new-aesthetic-1",
    title: "BLACK IS MY NEW AESTHETIC.",
    category: "fashion",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/black-is-my-new-aesthetic-1",
    images: [
      { src: "work/black-is-my-new-aesthetic-1/01.jpg", alt: "Black-and-white figure in a visor holding a long braid" },
    ],
  },
  {
    slug: "warbonnet-look-3",
    title: "WARBONNET LOOK 3",
    category: "fashion",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/warbonnet-look-3",
    images: [
      { src: "work/warbonnet-look-3/01.jpg", alt: "Woman in an orange swimsuit lying on wet sand" },
      { src: "work/warbonnet-look-3/02.jpg", alt: "Woman in an orange swimsuit lying on wet sand, frame 2" },
      { src: "work/warbonnet-look-3/03.jpg", alt: "Woman in an orange swimsuit lying on wet sand, frame 3" },
      { src: "work/warbonnet-look-3/04.jpg", alt: "Woman in an orange swimsuit lying on wet sand, frame 4" },
    ],
  },
  {
    slug: "wet",
    title: "WET",
    category: "fashion",
    year: 2023,
    sourceUrl: "https://orvas.myportfolio.com/wet",
    images: [
      { src: "work/wet/01.jpg", alt: "Woman in a yellow lace swimsuit among tropical leaves and by a pool" },
      { src: "work/wet/02.jpg", alt: "Woman in a yellow lace swimsuit among tropical leaves and by a pool, frame 2" },
      { src: "work/wet/03.jpg", alt: "Woman in a yellow lace swimsuit among tropical leaves and by a pool, frame 3" },
      { src: "work/wet/04.jpg", alt: "Woman in a yellow lace swimsuit among tropical leaves and by a pool, frame 4" },
    ],
  },
];
