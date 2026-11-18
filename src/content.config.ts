import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const md = (folder: string) => glob({ pattern: '**/*.md', base: `./src/content/${folder}` });

// Portfolio case studies
const work = defineCollection({
  loader: md('work'),
  schema: z.object({
    title: z.string(),
    client: z.string().optional(),
    year: z.number(),
    category: z.string(), // e.g. Creative Direction, Branding, Web Development, Digital Media
    role: z.string().optional(),
    services: z.array(z.string()).default([]),
    summary: z.string(),
    cover: z.string().optional(),
    gallery: z.array(z.object({ image: z.string(), caption: z.string().optional() })).default([]),
    link: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

// Long-form journal writing
const essays = defineCollection({
  loader: md('essays'),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Quick daily entries
const notes = defineCollection({
  loader: md('notes'),
  schema: z.object({
    title: z.string().optional(),
    date: z.coerce.date(),
    image: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Sketches, experiments, work in development
const process = defineCollection({
  loader: md('process'),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    status: z.enum(['In progress', 'Exploration', 'Archived']).default('In progress'),
    summary: z.string(),
    cover: z.string().optional(),
    images: z.array(z.object({ image: z.string(), caption: z.string().optional() })).default([]),
    draft: z.boolean().default(false),
  }),
});

// Editable single pages (About)
const pages = defineCollection({
  loader: md('pages'),
  schema: z.object({
    title: z.string(),
    intro: z.string(),
    services: z.array(z.object({ title: z.string(), description: z.string() })).default([]),
    experience: z.array(z.object({ role: z.string(), org: z.string(), years: z.string(), description: z.array(z.string()).default([]) })).default([]),
    clients: z.array(z.string()).default([]),
    resume: z.string().optional(),
  }),
});

export const collections = { work, essays, notes, process, pages };
