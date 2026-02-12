import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { EXHIBITS } from '@/data/photos';

export const metadata: Metadata = {
  title: 'Photos - George Xue',
  description: 'Photography organized by exhibits and events',
};

function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export default function PhotosPage() {
  const exhibits = [...EXHIBITS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <article>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
        {exhibits.map((exhibit) => (
          <Link
            key={exhibit.slug}
            href={`/photos/${exhibit.slug}`}
            className="group block"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={exhibit.cover}
                alt={exhibit.title}
                fill
                sizes="(max-width: 640px) 45vw, 200px"
                className="object-cover"
              />
            </div>
            <div className="mt-2">
              <h2 className="text-xs font-medium text-neutral-800 transition-colors group-hover:text-neutral-900">
                {exhibit.title}
              </h2>
              <p className="mt-0.5 font-serif text-xs italic text-neutral-400">
                {formatDate(exhibit.date)}
                {exhibit.description && (
                  <span className="text-neutral-300"> &mdash; </span>
                )}
                {exhibit.description && (
                  <span>{exhibit.description}</span>
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
}
