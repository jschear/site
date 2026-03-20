import { defineCollection, } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod'

const blog = defineCollection({
	loader: glob({ base: './src/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
		heroImage: z.string().optional(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };
