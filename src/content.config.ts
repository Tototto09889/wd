import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: async ({ glob }) => {
    const posts = await glob("./src/content/blog/**/*.{md,mdx}");
    const nestedPosts = await glob("./src/content/blog/*/*/*.{md,mdx}");
    return [...posts, ...nestedPosts];
  },
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    isNested: z.boolean().optional(),
  }),
});

export const collections = { blog };
