import type { ImageMetadata } from "astro";

// Every JPEG under src/assets is available to the content file by relative path.
const modules = import.meta.glob<ImageMetadata>("/src/assets/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const byPath = new Map<string, ImageMetadata>(
  Object.entries(modules).map(([key, meta]) => [key.replace("/src/assets/", ""), meta]),
);

export function resolveImage(src: string): ImageMetadata {
  const meta = byPath.get(src);
  if (!meta) throw new Error(`Image not found in src/assets: "${src}" (check src/content/orvas-content.ts)`);
  return meta;
}

export function hasImage(src: string): boolean {
  return byPath.has(src);
}
