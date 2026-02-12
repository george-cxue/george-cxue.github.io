import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'People - George Xue',
  description: 'Thinkers, writers, and builders who have influenced me',
};

const PEOPLE = [
  { name: 'Paul Graham', url: 'http://paulgraham.com/' },
  { name: 'Patrick Collison', url: 'https://patrickcollison.com/' },
  { name: 'Richard Feynman', url: 'https://en.wikipedia.org/wiki/Richard_Feynman' },
];

export default function PeoplePage() {
  return (
    <article className="space-y-4">
      <h1 className="mb-8 font-medium text-neutral-900">People</h1>
      <p>
        A collection of the thinkers, writers, and builders who have had the
        greatest influence on how I see the world.
      </p>
      <ul className="list-disc space-y-1 pl-4">
        {PEOPLE.map(({ name, url }) => (
          <li key={name}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline transition-colors hover:text-black"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </article>
  );
}
