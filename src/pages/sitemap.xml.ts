
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";

const staticPages = [
  "/",
  "/projects/",
  "/blog/",
  "/photography/",
  "/about/",
  "/contact/",
];

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("Astro site URL is not configured.");
  }

  const posts = await getCollection(
    "blog",
    ({ data }) => !data.draft
  );

  const urls = [
    ...staticPages.map((path) => new URL(path, site).href),
    ...posts.map(
      (post) => new URL(`/blog/${post.id}/`, site).href
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};

