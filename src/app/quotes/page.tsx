import type { Metadata } from 'next';
import BlockQuote from '@/components/BlockQuote';

export const metadata: Metadata = {
  title: 'Quotes - George Xue',
  description: 'A collection of quotes I find meaningful',
};

const QUOTES = [
  {
    quote:
      'And this I believe: that the free, exploring mind of the individual human is the most valuable thing in the world.',
    author: 'John Steinbeck',
    source: 'East of Eden',
  },
  {
    quote:
      'Be humble for you are made of earth. Be noble for you are made of stars.',
    author: 'Serbian proverb',
  },
  {
    quote:
      'If you can\'t explain it to a six year old, you don\'t understand it yourself.',
    author: 'Albert Einstein',
  },
  {
    quote:
      'We are what we repeatedly do. Excellence, then, is not an act, but a habit.',
    author: 'Will Durant',
    source: 'The Story of Philosophy',
  },
];

export default function QuotesPage() {
  return (
    <article>
      {QUOTES.map((q, i) => (
        <BlockQuote key={i} {...q} />
      ))}
    </article>
  );
}
