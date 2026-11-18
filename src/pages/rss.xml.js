import rss from '@astrojs/rss';
import settings from '../data/settings.json';
import { getJournal } from '../lib/utils';

export async function GET(context) {
  const items = await getJournal();
  return rss({
    title: `${settings.siteName} — Journal`,
    description: settings.intro,
    site: context.site,
    items: items.map((it) =>
      it.kind === 'essay'
        ? {
            title: it.entry.data.title,
            pubDate: it.date,
            description: it.entry.data.summary,
            link: `/journal/${it.entry.id}/`,
          }
        : {
            title: it.entry.data.title ?? `Note — ${it.date.toISOString().slice(0, 10)}`,
            pubDate: it.date,
            description: (it.entry.body ?? '').slice(0, 280),
            link: `/journal/notes/${it.entry.id}/`,
          }
    ),
  });
}
