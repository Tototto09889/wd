import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // Loader yang dimodifikasi:
  loader: async () => {
    const posts = await glob({
      base: "./src/content/blog",
      pattern: "**/*.{md,mdx}",  // Semua file .md dan .mdx di dalam blog/
    });

    const nestedPosts = await glob({
        base: "./src/content/blog",
        pattern: "*/*/*.{md,mdx}", // File di dalam  blog/judul/bagian/
      });

    return [...posts, ...nestedPosts];
  },

  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    // Anda mungkin ingin menambahkan properti untuk menunjukkan jenis struktur (opsional)
    isNested: z.boolean().optional(),
  }),
});

export const collections = { blog };

