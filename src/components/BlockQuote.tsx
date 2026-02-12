interface BlockQuoteProps {
  quote: string;
  author: string;
  source?: string;
}

export default function BlockQuote({ quote, author, source }: BlockQuoteProps) {
  return (
    <blockquote className="-ml-4 my-8 space-y-4 border-l border-neutral-900 pl-4 font-serif text-base text-neutral-900 italic xs:-ml-6 xs:pl-6 sm:-ml-8 sm:pl-8 md:-ml-12 md:pl-12">
      <p>{quote}</p>
      <footer className="font-sans text-xs text-neutral-500 not-italic">
        &mdash; {author}
        {source && <cite>, {source}</cite>}
      </footer>
    </blockquote>
  );
}
