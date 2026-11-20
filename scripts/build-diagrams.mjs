// Exports raster outputs from the editable SVG masters in public/diagrams/<slug>/.
//   <slug>.svg           master (article, 16:9)     -> <slug>.png           1200x675
//   <slug>-og.svg        master (Open Graph)        -> <slug>-og.png        1200x630
//   <slug>-linkedin.svg  master (LinkedIn, square)  -> <slug>-linkedin.png  1200x1200
// Each format is its own SVG composition. PNGs are generated outputs: never edit them by hand,
// and never stretch or crop one format to make another.
import sharp from "sharp";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/diagrams");

// SVG masters are trusted, local, static assets. Refuse anything that could execute or fetch.
const FORBIDDEN = [
  [/<script\b/i, "script element"],
  [/\son[a-z]+\s*=/i, "event handler attribute"],
  [/<foreignObject\b/i, "foreignObject"],
  [/<image\b/i, "embedded image"],
  [/data:image\//i, "embedded raster data"],
  [/<(?:use|a)\b[^>]*\bhref\s*=/i, "link or external reference"],
  [/@import\b/i, "@import"],
  [/url\(\s*(?!#)/i, "non-local url()"],
  [/(?:src|href)\s*=\s*["']?\s*(?:https?:)?\/\//i, "remote resource"],
];
function assertSafe(svg, file) {
  const text = svg.toString("utf8");
  for (const [pattern, label] of FORBIDDEN) {
    if (pattern.test(text)) throw new Error(`${file}: contains ${label}`);
  }
}
const FORMATS = [
  { suffix: "", width: 1200, height: 675 },
  { suffix: "-og", width: 1200, height: 630 },
  { suffix: "-linkedin", width: 1200, height: 1200 },
];

let failed = false;
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dir = path.join(root, entry.name);
  for (const { suffix, width, height } of FORMATS) {
    const source = path.join(dir, `${entry.name}${suffix}.svg`);
    let svg;
    try {
      svg = await readFile(source);
    } catch {
      console.error(`Missing SVG master: ${path.relative(process.cwd(), source)}`);
      failed = true;
      continue;
    }
    try {
      assertSafe(svg, path.relative(process.cwd(), source));
    } catch (error) {
      console.error(error.message);
      failed = true;
      continue;
    }
    const meta = await sharp(svg).metadata();
    if (meta.width !== width || meta.height !== height) {
      console.error(`${path.relative(process.cwd(), source)} is ${meta.width}x${meta.height}, expected ${width}x${height}`);
      failed = true;
      continue;
    }
    // Render the SVG at its native size so nothing is rescaled, stretched or cropped.
    const png = source.replace(/\.svg$/, ".png");
    await sharp(svg, { density: 72 }).png({ compressionLevel: 9 }).toFile(png);
    console.log(`Built ${path.relative(process.cwd(), png)} (${width}x${height})`);
  }
}
if (failed) process.exit(1);