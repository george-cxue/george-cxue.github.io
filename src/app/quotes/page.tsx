import type { Metadata } from "next";
import BlockQuote from "@/components/BlockQuote";

export const metadata: Metadata = {
  title: "Quotes - George",
  description: "A collection of quotes I find meaningful",
};

const QUOTES = [
  {
    quote:
      "Always remember that to argue, and win, is to break down the reality of the person you are arguing against. It is painful to lose your reality, so be kind, even if you are right.",
    author: "Haruki Murakami",
  },
  {
    quote: "Health is a crown that the healthy wear, but only the sick can see",
    author: "Imam Al Shafi'i",
  },
  {
    quote:
      "If you can't explain it to a six year old, you don't understand it yourself.",
    author: "Albert Einstein",
  },
  {
    quote:
      "Every day the clock resets. Your wins don't matter. Your failures don't matter. Don't stress on what was, fight for what could be.",
    author: "Sean Higgins",
  },
  {
    quote:
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Will Durant",
    source: "The Story of Philosophy",
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
