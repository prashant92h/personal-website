import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum([
      "Azure",
      "Cloud Architecture",
      "Kubernetes",
      "DevOps",
      "Linux",
      "AI Infrastructure",
      "Personal",
    ]),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    cover: z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

export const collections = { blog };
