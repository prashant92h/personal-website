// Sätteri (Astro 7's Markdown processor) mdast plugin: turns a standalone Markdown image that
// points at a diagram SVG into the shared accessible <figure> markup, so Field Notes stay plain
// Markdown (no MDX conversion).
//
//   ![Meaningful alt text](/diagrams/<slug>/<slug>.svg "Caption shown under the diagram")
//
// The image title becomes the caption. Alt text is required.
import { diagramHtml } from "../components/diagrams/diagram-html.mjs";

const DIAGRAM_SVG = /^\/diagrams\/[^?#]+\.svg$/;

export default {
  name: "diagram-figure",
  paragraph(node, ctx) {
    const children = node.children ?? [];
    if (children.length !== 1 || children[0].type !== "image") return;
    const { url, alt, title } = children[0];
    if (!DIAGRAM_SVG.test(url)) return;
    if (!alt || !alt.trim()) {
      throw new Error(`Diagram ${url} needs meaningful alt text.`);
    }
    ctx.replaceNode(node, {
      type: "html",
      value: diagramHtml({
        src: url,
        pngSrc: url.replace(/\.svg$/, ".png"),
        alt,
        caption: title ?? undefined,
      }),
    });
  },
};
