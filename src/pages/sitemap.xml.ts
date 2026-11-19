import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

const staticPages = ["/", "/projects/", "/lab/", "/blog/", "/photography/", "/about/", "/contact/"];

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("Astro site URL is not configured.");
  }

  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const entries = [
    ...staticPages.map((path) => ({ loc: new URL(path, site).href })),
    ...posts.map((post) => ({
      loc: new URL(`/blog/${post.id}/`, site).href,
      lastmod: (post.data.updatedDate ?? post.data.pubDate).toISOString().slice(0, 10),
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url><loc>${e.loc}</loc>${"lastmod" in e ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
