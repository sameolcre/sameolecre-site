import { getCollection, type CollectionEntry } from 'astro:content';

const live = <T extends { data: { draft?: boolean } }>(e: T) => import.meta.env.DEV || !e.data.draft;

export async function getWork() {
  const all = await getCollection('work', live);
  return all.sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year);
}

export async function getEssays() {
  const all = await getCollection('essays', live);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getNotes() {
  const all = await getCollection('notes', live);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getProcess() {
  const all = await getCollection('process', live);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export type JournalItem =
  | { kind: 'essay'; date: Date; entry: CollectionEntry<'essays'> }
  | { kind: 'note'; date: Date; entry: CollectionEntry<'notes'> };

export async function getJournal(): Promise<JournalItem[]> {
  const [essays, notes] = await Promise.all([getEssays(), getNotes()]);
  const items: JournalItem[] = [
    ...essays.map((entry) => ({ kind: 'essay' as const, date: entry.data.date, entry })),
    ...notes.map((entry) => ({ kind: 'note' as const, date: entry.data.date, entry })),
  ];
  return items.sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' }).toUpperCase();

export const pad = (n: number) => String(n).padStart(2, '0');

export const readingTime = (text = '') => Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 230));

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
