import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { EXHIBITS } from '@/data/photos';

export function generateStaticParams() {
  return EXHIBITS.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exhibit = EXHIBITS.find((e) => e.slug === slug);
  if (!exhibit) return {};

  return {
    title: `${exhibit.title} - George Xue`,
    description: exhibit.description || `Photos from ${exhibit.title}`,
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

export default async function ExhibitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exhibit = EXHIBITS.find((e) => e.slug === slug);

  if (!exhibit) {
    notFound();
  }

  return (
    <article>
      <header className="mb-8">
        <div className="flex items-baseline justify-between">
          <h1 className="mb-0 font-medium text-neutral-900">
            {exhibit.title}
          </h1>
          <time className="ml-2 whitespace-nowrap text-neutral-500">
            {formatDate(exhibit.date)}
          </time>
        </div>
        {exhibit.description && (
          <p className="mt-2 text-neutral-500">{exhibit.description}</p>
        )}
      </header>

      <div className="space-y-8">
        {exhibit.photos.map((photo, i) => (
          <figure key={i}>
            <Image
              src={photo.src}
              alt={photo.alt}
              width={672}
              height={448}
              className="w-full object-cover"
            />
            {photo.caption && (
              <figcaption className="mt-2 font-serif text-xs italic text-neutral-500">
                {photo.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </article>
  );
}
