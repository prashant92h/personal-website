# Reusable architecture diagram system

One editable SVG per diagram is the **master**. Article, Open Graph and LinkedIn images are
**generated outputs**. PNG is never a source: never edit a PNG, and never create a new diagram from one.

## Layout

```
public/diagrams/<slug>/
  <slug>.svg            master, article, 16:9, 1200x675   -> <slug>.png           (generated)
  <slug>-og.svg         master, Open Graph, 1200x630      -> <slug>-og.png        (generated)
  <slug>-linkedin.svg   master, LinkedIn, square 1200x1200 -> <slug>-linkedin.png (generated)

src/components/diagrams/ArchitectureDiagram.astro   component (pages, MDX)
src/components/diagrams/diagram-html.mjs            the markup, shared by the component and the plugin
src/plugins/diagram-figure.mjs                      Markdown plugin (Sätteri mdast) used by Field Notes
src/styles/diagrams.css                             presentation, imported once in BaseLayout.astro
scripts/build-diagrams.mjs                          SVG -> PNG export + SVG safety check
```

Each format is its **own SVG composition**: same content, tokens, type, primitives and footer, but laid
out for its aspect ratio. Do not stretch or crop the article artwork to make an OG or LinkedIn image.

## Rules

- One primary message per diagram. At most 7–10 primary nodes.
- Node text is 1–3 short lines. If it does not fit, remove words or split the diagram. Do not shrink text.
- Mark anything planned as `FUTURE — NOT YET IMPLEMENTED`, with a dashed boundary.
- Do not add unverified hardware, products, capacities, IP addresses, hostnames, services, client names or metrics.
- Keep claims exactly as in the article (for example `$1M+ cumulative contribution`, not "I saved $1M+").
- Meaningful alt text describes the information, not the appearance. The caption adds something; it never repeats the title.

## Colours and type (match the site's dark theme tokens in `src/styles/global.css`)

| Role | Value | Site token (dark) |
| --- | --- | --- |
| Canvas | `#060E0A` | `--bg` |
| Node surface | `#0D1913` | `--surface` |
| Emphasised surface | `#12211A` | `--surface-2` |
| Text | `#E8F2EC` | `--text` |
| Muted text | `#9DB3A7` | `--muted` |
| Accent | `#34D399` | `--accent` |
| Border | `#3D4943` | `--text` at ~22% over the canvas (`--border-strong`) |

SVG cannot read CSS variables once it is loaded through `<img>`, so these are literal values. If a token in
`global.css` changes, update the masters and re-export. Do not introduce a second green.

Geometry: node radius 14, large container radius 18, node border 1.4–1.6, connector 2.
Fonts: Arial for labels (always available when rasterising), a monospace stack for section labels.
Minimum text size is about 10.5px at 1200 wide for the article master; OG and LinkedIn use larger sizes.

## Create a new diagram

1. Copy the nearest SVG master folder to `public/diagrams/<new-slug>/` and rename the three files.
2. Keep the canvas, header, type styles, node geometry, connectors and footer.
3. Replace the title, subtitle, nodes and outcomes. Keep every label inside its box (check the measurements below).
4. Re-flow the content into `-og.svg` (1200x630) and `-linkedin.svg` (1200x1200).
5. Write alt text and a caption.
6. Export: `npm run diagrams:build`.
7. Embed it (below).
8. Run `npx astro check` and `npm run build`.
9. Check the article at 1440, 1024, 768, 430, 390 and 375px, in both themes: no horizontal scroll, caption readable,
   the full-size link works, keyboard focus is visible.

## Embed

Field Notes are plain Markdown. A standalone image whose URL is a diagram SVG becomes the accessible figure.
The image **title** is the caption, and the alt text is required (the build fails without it):

```md
![Alt text describing the information.](/diagrams/<slug>/<slug>.svg "Caption that adds something.")
```

Place it after the introduction and before the first `##` heading.

In an `.astro` page or MDX file use the component:

```astro
---
import ArchitectureDiagram from "../components/diagrams/ArchitectureDiagram.astro";
---
<ArchitectureDiagram
  src="/diagrams/<slug>/<slug>.svg"
  pngSrc="/diagrams/<slug>/<slug>.png"
  alt="…"
  caption="…"
/>
```

Options: `lightSrc` (an SVG for the light theme), `eager` (above the fold), `expandable` (default `true`),
`downloadable` and `downloadSrc`, `width` and `height` (default 1200x675), `class`, `id`.

Behaviour: semantic `<figure>`/`<figcaption>`, full width with a fixed 16:9 ratio and explicit size (no layout shift),
`loading="lazy"` and `decoding="async"` by default, and a keyboard-accessible link that opens the full-size SVG in a
new tab. On narrow screens a visible "Tap to open full size" hint appears. No JavaScript, no lightbox, no hydration.

## Safety

SVG masters are trusted, local, static assets. `npm run diagrams:build` refuses a master that contains a `script`,
an event handler, `foreignObject`, an embedded or remote image, a remote reference or `@import`. Do not add an SVG
upload feature and do not paste SVG from an untrusted source.
