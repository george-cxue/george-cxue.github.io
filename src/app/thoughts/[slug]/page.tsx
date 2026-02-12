import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllThoughts, getThoughtBySlug } from '@/lib/thoughts';

export function generateStaticParams() {
  const thoughts = getAllThoughts();
  return thoughts.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const thought = await getThoughtBySlug(slug);
  if (!thought) return {};

  return {
    title: `${thought.title} - George Xue`,
    description: thought.description,
  };
}

function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function ThoughtPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const thought = await getThoughtBySlug(slug);

  if (!thought) {
    notFound();
  }

  return (
    <article className="relative">
      <header className="mb-8">
        <div className="flex items-baseline justify-between">
          <h1 className="mb-0 font-medium text-neutral-900">{thought.title}</h1>
          <time className="ml-2 whitespace-nowrap text-neutral-500">
            {formatDate(thought.date)}
          </time>
        </div>
      </header>
      <div
        className="prose space-y-4"
        dangerouslySetInnerHTML={{ __html: thought.content }}
      />
    </article>
  );
}
