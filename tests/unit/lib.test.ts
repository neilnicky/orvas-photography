import { describe, expect, it } from "vitest";
import { orvasContent, series } from "@/content/orvas-content";
import { archiveOrder, contactChannels, coverOf, pad2, splitLine } from "@/lib/content";
import { cubicBezier, phase, clamp } from "@/motion/config";

describe("splitLine", () => {
  it("splits titles at the character midpoint", () => {
    expect(splitLine("BOUDOIR", "chars")).toEqual(["BOUD", "OIR", false]);
  });
  it("splits sentences at the space nearest the middle", () => {
    expect(splitLine("Elegant and sensual,", "words")).toEqual(["Elegant and", "sensual,", true]);
  });
  it("falls back to characters for single words", () => {
    expect(splitLine("Radiant.", "words")[2]).toBe(false);
  });
});

describe("contactChannels", () => {
  it("lists only verified channels by default", () => {
    const labels = contactChannels().map((c) => c.label);
    expect(labels).toEqual(["Direct message", "Instagram", "Inquiry form"]);
  });
  it("adds email and booking when configured", () => {
    const contact = { ...orvasContent.contact, email: "studio@orvas.test", booking: { url: "https://cal.test/orvas", label: "Book" } };
    const channels = contactChannels(contact);
    expect(channels.find((c) => c.label === "Email")?.href).toBe("mailto:studio@orvas.test");
    expect(channels.find((c) => c.label === "Book")?.href).toBe("https://cal.test/orvas");
  });
});

describe("helpers", () => {
  it("orders the archive newest first and keeps source order within a year", () => {
    const ordered = archiveOrder();
    expect(ordered).toHaveLength(series.length);
    for (let i = 1; i < ordered.length; i++) expect(ordered[i - 1]!.year).toBeGreaterThanOrEqual(ordered[i]!.year);
  });
  it("uses the first image as cover unless configured", () => {
    expect(coverOf(series[0]!)).toBe(series[0]!.images[0]);
  });
  it("pads numbers", () => {
    expect(pad2(3)).toBe("03");
    expect(pad2(12)).toBe("12");
  });
});

describe("motion math", () => {
  it("cubic-bezier hits its endpoints and is monotonic for the curtain curve", () => {
    const ease = cubicBezier(0.76, 0, 0.24, 1);
    expect(ease(0)).toBeCloseTo(0, 3);
    expect(ease(1)).toBeCloseTo(1, 3);
    expect(ease(0.5)).toBeCloseTo(0.5, 2);
    let prev = 0;
    for (let x = 0; x <= 1; x += 0.05) {
      const y = ease(x);
      expect(y).toBeGreaterThanOrEqual(prev - 1e-6);
      prev = y;
    }
  });
  it("phase and clamp stay within 0..1", () => {
    expect(phase(5, 0, 10)).toBe(0.5);
    expect(phase(-5, 0, 10)).toBe(0);
    expect(phase(50, 0, 10)).toBe(1);
    expect(clamp(2)).toBe(1);
  });
});
