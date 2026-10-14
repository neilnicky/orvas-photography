import { orvasContent, series, type Category, type ImageRef, type Series } from "@/content/orvas-content";

const bySlug = new Map(series.map((s) => [s.slug, s]));

export function getSeries(slug: string): Series {
  const found = bySlug.get(slug);
  if (!found) throw new Error(`Unknown series slug "${slug}" referenced in orvas-content.ts`);
  return found;
}

export function coverOf(s: Series): ImageRef {
  const image = s.images[s.cover ?? 0] ?? s.images[0];
  if (!image) throw new Error(`Series "${s.slug}" has no images`);
  return image;
}

export function seriesHref(slug: string): string {
  return `/work/${slug}/`;
}

export function seriesByCategory(category: Category): Series[] {
  return series.filter((s) => s.category === category);
}

export function categoryLabel(category: Category): string {
  return category === "boudoir" ? "Boudoir" : "Fashion";
}

/** Two-digit index label, e.g. 1 → "01". */
export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Series ordered for the archive: newest first, original order kept within a year. */
export function archiveOrder(list: Series[] = series): Series[] {
  return list
    .map((s, i) => ({ s, i }))
    .sort((a, b) => b.s.year - a.s.year || a.i - b.i)
    .map(({ s }) => s);
}

export interface Channel {
  label: string;
  detail: string;
  href: string;
  external: boolean;
}

/**
 * Contact channels in priority order. Email and booking appear only when
 * configured; Instagram and the existing inquiry form are verified live.
 */
export function contactChannels(contact = orvasContent.contact, brand = orvasContent.brand): Channel[] {
  const channels: Channel[] = [
    { label: "Direct message", detail: "Instagram", href: contact.instagramDm, external: true },
    { label: "Instagram", detail: brand.instagramHandle, href: brand.instagramUrl, external: true },
  ];
  if (contact.email) {
    channels.push({ label: "Email", detail: contact.email, href: `mailto:${contact.email}`, external: false });
  }
  if (contact.booking.url) {
    channels.push({ label: contact.booking.label, detail: "Consultation", href: contact.booking.url, external: true });
  }
  channels.push({ label: "Inquiry form", detail: "Name / Email / Message", href: contact.inquiryFormUrl, external: true });
  return channels;
}

/**
 * Split a line into two halves for the sessions "split around image" effect.
 * Titles split at the character midpoint; sentences at the space nearest the middle.
 */
export function splitLine(text: string, mode: "chars" | "words"): [string, string, boolean] {
  if (mode === "chars" || !text.includes(" ")) {
    const mid = Math.ceil(text.length / 2);
    return [text.slice(0, mid), text.slice(mid), false];
  }
  const mid = text.length / 2;
  let best = -1;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === " " && (best === -1 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
  }
  return [text.slice(0, best), text.slice(best + 1), true];
}
