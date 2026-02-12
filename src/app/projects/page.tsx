import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - George Xue',
  description: 'Projects I have worked on',
};

const PROJECTS = [
  {
    name: 'Flit',
    url: '#',
    description:
      'A financial literacy app designed to help people learn about personal finance through interactive lessons and challenges.',
  },
];

export default function ProjectsPage() {
  return (
    <article className="space-y-4">
      <h1 className="mb-8 font-medium text-neutral-900">Projects</h1>
      <p>
        I&apos;ve had the pleasure of working on great projects with great people. I
        owe so much of my personal and professional growth to the teams I&apos;ve been
        a part of.
      </p>

      {PROJECTS.map((project) => (
        <div key={project.name} className="mt-12 space-y-4">
          <h2 className="font-medium text-neutral-900">{project.name}</h2>
          <p>
            {project.url !== '#' ? (
              <>
                I built{' '}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-black"
                >
                  {project.name}
                </a>
                {' '}&mdash; {project.description}
              </>
            ) : (
              <>{project.description}</>
            )}
          </p>
        </div>
      ))}
    </article>
  );
}
