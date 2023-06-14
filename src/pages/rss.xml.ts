import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';

const parser = new MarkdownIt();

export async function get(context: any) {
	const posts = await getCollection('blog');
	const notes = await getCollection('notes');

	const postItems = posts.map((post) => ({
		...post.data,
		// Note: this will not process components or JSX expressions in MDX files.
		content: sanitizeHtml(parser.render(post.body)),
		link: `/blog/${post.slug}/`,
	}));
	const noteItems = notes.map((note) => ({
		...note.data,
		content: sanitizeHtml(parser.render(note.body)),
		link: `/notes/${note.slug}/`,
	}));

	const items = [...postItems, ...noteItems].sort((a, b) => {
		return b.pubDate.getTime() - a.pubDate.getTime();
	});

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: items,
	});
}
