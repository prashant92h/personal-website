
# Prashant Hegde — Personal Website

Personal website, professional portfolio, technical blog and photography of Prashant Hegde.

**Website:** https://prashanthegde.in

## Technology

- Astro (static output)
- TypeScript
- Hand-written CSS design system with light/dark themes
- Self-hosted fonts (Manrope, Inter, JetBrains Mono via Fontsource)
- Markdown content collections
- Cloudflare Pages (hosting)

## Development

Requirements: Node.js >= 22.23.4

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Type-check the project:

```bash
npm run check
```

## Project Structure

- `src/config.ts` — Site name, URL, social links and navigation (single source of truth)
- `src/data/` — Project and photography data
- `src/pages/` — Website pages and routes (home, projects, lab, blog, photography, about, contact, RSS, sitemap)
- `src/components/` — Shared components
- `src/layouts/` — Page layout, SEO metadata and theme bootstrap
- `src/content/blog/` — Blog articles (set `draft: false` to publish)
- `src/styles/global.css` — Design tokens, themes and shared UI primitives
- `public/` — Static assets and Cloudflare `_headers`

## Adding photographs

Add optimised images under `public/photos/` and register them in `src/data/photos.ts`
with `title`, `category`, `alt`, `width` and `height`. The gallery filter and lightbox
pick them up automatically.

## Deployment

Hosted on Cloudflare Pages, with GitHub as the source repository.

