import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';

const THOUGHTS_DIR = path.join(process.cwd(), 'content', 'thoughts');

export interface ThoughtMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export interface Thought extends ThoughtMeta {
  content: string;
}

export function getAllThoughts(): ThoughtMeta[] {
  if (!fs.existsSync(THOUGHTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(THOUGHTS_DIR).filter((f) => f.endsWith('.md'));

  const thoughts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    const filePath = path.join(THOUGHTS_DIR, filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      description: data.description || '',
    };
  });

  return thoughts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getThoughtBySlug(
  slug: string
): Promise<Thought | null> {
  const filePath = path.join(THOUGHTS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const { data, content: rawContent } = matter(fileContents);

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(rawContent);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description || '',
    content: result.toString(),
  };
}
