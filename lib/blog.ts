// Blog posts live as Markdown files in content/blog/<slug>.md and are read at build time.
// See content/blog/_template.md for the fields each post needs.
import fs from 'node:fs';
import path from 'node:path';
import { Marked, type Tokens } from 'marked';

const DIR = path.join(process.cwd(), 'content', 'blog');
const WORDS_PER_MINUTE = 200;

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;          // YYYY-MM-DD
  updated?: string;      // YYYY-MM-DD
  category: string;
  image: string;         // path under /public, e.g. /blog/first-day.jpg
  imageAlt: string;
  author: string;
  minutes: number;
  html: string;
  toc: { id: string; text: string }[];
};

const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

/** `key: value` lines between the opening and closing `---`. */
function parseFrontmatter(raw: string, file: string) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing the --- frontmatter block at the top`);
  const data: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^(['"])(.*)\1$/, '$2');
  }
  return { data, body: m[2] };
}

function render(body: string) {
  const toc: Post['toc'] = [];
  const used = new Set<string>();
  const marked = new Marked({
    gfm: true,
    renderer: {
      // Headings get an id so the table of contents (h2 only) and shared links can jump to them.
      heading(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { tokens, depth, text }: Tokens.Heading) {
        let id = slugify(text) || 'section';
        while (used.has(id)) id += '-2';
        used.add(id);
        if (depth === 2) toc.push({ id, text });
        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}</h${depth}>\n`;
      },
      image({ href, title, text }: Tokens.Image) {
        const t = title ? ` title="${attr(title)}"` : '';
        return `<img src="${attr(href)}" alt="${attr(text)}"${t} loading="lazy" decoding="async">`;
      },
      // Links to other sites open in a new tab; links inside the site stay put.
      link(this: { parser: { parseInline: (t: Tokens.Generic[]) => string } }, { href, title, tokens }: Tokens.Link) {
        const ext = /^https?:\/\//.test(href) && !href.includes('mirabilia.com.au');
        const t = title ? ` title="${attr(title)}"` : '';
        const attrs = ext ? ' target="_blank" rel="noopener"' : '';
        return `<a href="${attr(href)}"${t}${attrs}>${this.parser.parseInline(tokens)}</a>`;
      },
    },
  });
  const html = marked.parse(body, { async: false }) as string;
  return { html, toc };
}

function load(file: string): Post & { draft: boolean } {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const { data, body } = parseFrontmatter(raw, file);
  for (const key of ['title', 'description', 'date', 'image', 'imageAlt']) {
    if (!data[key]) throw new Error(`content/blog/${file}: "${key}" is required in the frontmatter`);
  }
  const { html, toc } = render(body);
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.md$/, ''),
    title: data.title,
    description: data.description,
    date: data.date,
    updated: data.updated || undefined,
    category: data.category || 'Parenting',
    image: data.image,
    imageAlt: data.imageAlt,
    author: data.author || 'The Mirabilia team',
    minutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
    html,
    toc,
    draft: data.draft === 'true',
  };
}

let cache: Post[] | undefined;

/** Published posts, newest first. Files starting with "_" and `draft: true` posts are skipped. */
export function getPosts(): Post[] {
  if (cache && process.env.NODE_ENV === 'production') return cache;
  const files = fs.existsSync(DIR) ? fs.readdirSync(DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_')) : [];
  cache = files
    .map(load)
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
  return cache;
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

/** Up to `n` other posts, same category first, then the newest. */
export function relatedPosts(post: Post, n = 3) {
  const others = getPosts().filter((p) => p.slug !== post.slug);
  return [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, n);
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
