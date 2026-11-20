// Single source of truth for diagram markup.
// Used by ArchitectureDiagram.astro (pages / MDX) and by the remark plugin (plain Markdown articles).

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * @param {object} p
 * @param {string} p.src            Editable SVG master (shown, and opened full size)
 * @param {string} p.alt            Meaningful description of the information in the diagram
 * @param {string} [p.lightSrc]     Optional SVG for the light theme
 * @param {string} [p.pngSrc]       Optional generated PNG, used for the download link
 * @param {string} [p.caption]
 * @param {number} [p.width]
 * @param {number} [p.height]
 * @param {boolean} [p.eager]       Load eagerly (above the fold). Default is lazy.
 * @param {boolean} [p.expandable]  Wrap the image in a link to the full-size SVG. Default true.
 * @param {boolean} [p.downloadable]
 * @param {string} [p.downloadSrc]
 * @param {string} [p.class]
 * @param {string} [p.id]
 */
export function diagramHtml({
  src,
  alt,
  lightSrc,
  pngSrc,
  caption,
  width = 1200,
  height = 675,
  eager = false,
  expandable = true,
  downloadable = false,
  downloadSrc,
  class: className = "",
  id,
}) {
  if (!src || !alt) throw new Error("Diagram requires both src and meaningful alt text.");

  const img = (source, modifier) =>
    `<img class="architecture-diagram__image${modifier ? ` architecture-diagram__image--${modifier}` : ""}" ` +
    `src="${esc(source)}" alt="${esc(alt)}" width="${width}" height="${height}" ` +
    `loading="${eager ? "eager" : "lazy"}" decoding="async">`;

  const images = lightSrc ? img(src, "dark") + img(lightSrc, "light") : img(src);

  const image = expandable
    ? `<a class="architecture-diagram__image-link" href="${esc(src)}" target="_blank" rel="noopener">` +
      images +
      `<span class="sr-only"> (opens the full-size diagram in a new tab)</span>` +
      `<span class="architecture-diagram__open" aria-hidden="true">Tap to open full size ↗</span></a>`
    : `<div class="architecture-diagram__image-link">${images}</div>`;

  const download = downloadSrc ?? pngSrc ?? src;
  const figcaption =
    caption || downloadable
      ? `<figcaption class="architecture-diagram__caption">` +
        (caption ? `<span>${esc(caption)}</span>` : "") +
        (downloadable ? `<a href="${esc(download)}" download>Download diagram</a>` : "") +
        `</figcaption>`
      : "";

  const classes = ["architecture-diagram", className].filter(Boolean).join(" ");
  return `<figure class="${esc(classes)}"${id ? ` id="${esc(id)}"` : ""}>${image}${figcaption}</figure>`;
}
