// Imports ORVAS's portfolio originals into src/assets/work/<slug>/NN.jpg.
//
// Usage: node scripts/build-assets.mjs <dir-with-original-downloads>
//
// Input:  scripts/portfolio-crawl.json (crawl of orvas.myportfolio.com, 2026-10-15)
//         + the original files downloaded from those exact CDN URLs.
// Output: resized (max 2000px long edge, 2600px for landscapes), metadata-stripped
//         JPEGs. Astro generates AVIF/WebP + srcset from these at build time.
import { readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const sourceDir = process.argv[2];
if (!sourceDir || !existsSync(sourceDir)) {
  console.error("Pass the directory containing the downloaded originals.");
  process.exit(1);
}

const crawl = JSON.parse(await readFile(path.join(root, "scripts/portfolio-crawl.json"), "utf8"));

export const slugFromHref = (href) => new URL(href).pathname.replace(/^\/|\/$/g, "");

let written = 0;
for (const series of crawl) {
  const slug = slugFromHref(series.href);
  const outDir = path.join(root, "src/assets/work", slug);
  await mkdir(outDir, { recursive: true });
  for (const [index, image] of series.images.entries()) {
    const out = path.join(outDir, `${String(index + 1).padStart(2, "0")}.jpg`);
    if (existsSync(out)) continue;
    const landscape = image.w > image.h;
    await sharp(path.join(sourceDir, image.file))
      .rotate()
      .resize({ width: landscape ? 2600 : undefined, height: landscape ? undefined : 2000, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(out); // sharp drops EXIF/GPS unless withMetadata() is called
    written++;
  }
}
console.log(`wrote ${written} images`);
