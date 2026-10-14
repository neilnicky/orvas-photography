import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { orvasContent, series, type ImageRef } from "@/content/orvas-content";
import { getSeries } from "@/lib/content";

const assets = fileURLToPath(new URL("../../src/assets/", import.meta.url));

function collectImages(value: unknown, out: ImageRef[] = []): ImageRef[] {
  if (Array.isArray(value)) value.forEach((v) => collectImages(v, out));
  else if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    if (typeof o.src === "string" && typeof o.alt === "string") out.push(o as unknown as ImageRef);
    else Object.values(o).forEach((v) => collectImages(v, out));
  }
  return out;
}

describe("orvas-content", () => {
  const images = [...collectImages(orvasContent), ...collectImages(series)];

  it("references only images that exist in src/assets", () => {
    const missing = images.filter((i) => !existsSync(assets + i.src)).map((i) => i.src);
    expect(missing).toEqual([]);
  });

  it("gives every image meaningful alt text", () => {
    expect(images.filter((i) => i.alt.trim().length < 8)).toEqual([]);
  });

  it("has unique series slugs with at least one image", () => {
    const slugs = series.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(series.every((s) => s.images.length > 0)).toBe(true);
    expect(series).toHaveLength(52);
  });

  it("only references series that exist", () => {
    const refs = [
      ...orvasContent.strip.items.map((i) => i.series),
      ...orvasContent.index.filters.flatMap((f) => f.series),
      ...orvasContent.featured.items.map((i) => i.series),
      ...orvasContent.latest.series,
    ];
    refs.forEach((slug) => expect(() => getSeries(slug)).not.toThrow());
  });

  it("filters list only series of their own category", () => {
    orvasContent.index.filters.forEach((f) => f.series.forEach((slug) => expect(getSeries(slug).category).toBe(f.category)));
  });

  it("lists only 2025 series under Latest 2025", () => {
    orvasContent.latest.series.forEach((slug) => expect(getSeries(slug).year).toBe(2025));
  });

  it("states counts that match the data", () => {
    const meta = Object.fromEntries(orvasContent.about.meta);
    expect(meta.Series).toBe(String(series.length));
  });

  it("does not ship placeholder copy", () => {
    const text = JSON.stringify(orvasContent);
    expect(text).not.toMatch(/lorem|ipsum|TODO|placeholder|example\.com|offform/i);
  });

  it("keeps unverified contact fields empty", () => {
    expect(orvasContent.contact.email).toBeNull();
    expect(orvasContent.contact.booking.url).toBeNull();
  });
});
