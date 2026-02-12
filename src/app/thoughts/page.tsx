import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import { getAllThoughts } from "@/lib/thoughts";

export const metadata: Metadata = {
  title: "Thoughts - George",
  description: "Blog posts and essays",
};

function formatDate(dateString: string): string {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ThoughtsPage() {
  const thoughts = getAllThoughts();

  return (
    <article>
      <div className="space-y-1">
        {thoughts.map(({ slug, title, date }) => (
          <Link
            key={slug}
            href={`/thoughts/${slug}`}
            className="group relative flex justify-between transition-colors hover:text-neutral-900"
          >
            <span className="absolute top-[10px] left-0 w-full border-t border-neutral-200 transition-colors group-hover:border-neutral-900" />
            <span className="relative block bg-page pr-2 text-left">
              {title}
            </span>
            <time className="relative ml-2 block whitespace-nowrap bg-page pl-2 text-neutral-500 transition-colors group-hover:text-neutral-900">
              {formatDate(date)}
            </time>
          </Link>
        ))}
      </div>
    </article>
  );
}
