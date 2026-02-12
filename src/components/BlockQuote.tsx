interface BlockQuoteProps {
  quote: string;
  author: string;
  source?: string;
}

export default function BlockQuote({ quote, author, source }: BlockQuoteProps) {
  return (
    <blockquote className="-ml-4 my-8 space-y-4 border-l border-neutral-900 pl-4 font-serif text-base text-neutral-900 italic xs:-ml-[calc(2rem+1px)] xs:pl-8 sm:-ml-[calc(2.5rem+1px)] sm:pl-10 md:-ml-[calc(3.5rem+1px)] md:pl-14">
      <p>{quote}</p>
      <footer className="font-sans text-xs text-neutral-500 not-italic">
        &mdash; {author}
        {source && <cite>, {source}</cite>}
      </footer>
    </blockquote>
  );
}
