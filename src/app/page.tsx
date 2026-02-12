import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "George Xue",
  description: "Personal portfolio of George Xue",
};

export default function AboutPage() {
  return (
    <article className="relative">
      <div className="space-y-4">
        <h1 className="mb-8 font-medium text-neutral-900">George Xue</h1>

        <p>
          I am a software engineer based in Philadelphia. I studied Computer
          Science at the University of Pennsylvania. I am passionate about
          building great software and solving interesting problems.
        </p>

        <p>
          Outside of work, I enjoy photography, music, and exploring new places.
          This site is a collection of my thoughts, projects, and things I find
          interesting.
        </p>
      </div>

      <hr className="my-8 border-neutral-200" />

      <div className="flex flex-wrap gap-4 text-xs">
        <a
          href="https://github.com/george-cxue"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors hover:text-black"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/george-xue/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors hover:text-black"
        >
          LinkedIn
        </a>
        <a
          href="https://open.spotify.com/user/8hpon00msyzahilm1d9jm8mwn"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors hover:text-black"
        >
          Spotify
        </a>
        <a
          href="https://www.instagram.com/george_x97/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors hover:text-black"
        >
          Instagram
        </a>
      </div>
    </article>
  );
}
