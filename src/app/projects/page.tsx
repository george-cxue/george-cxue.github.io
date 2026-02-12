import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - George",
  description: "Projects I have worked on",
};

const PROJECTS = [
  {
    name: "Paradigm",
    url: "#",
    description:
      "Designed, built, and launched multiple features to reimagine the way people work with AI and spreadsheets.",
  },
];

export default function ProjectsPage() {
  return (
    <article className="relative">
      <h1 className="mb-8 font-medium text-neutral-900">Projects</h1>
      <p>
        Here are some of the projects I&apos;ve had the pleasure of working on.
      </p>

      {PROJECTS.map((project) => (
        <div key={project.name} className="mt-12 space-y-4">
          <h2 className="font-medium text-neutral-900">{project.name}</h2>
          <p>
            {project.url !== "#" ? (
              <>
                I built{" "}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline transition-colors hover:text-black"
                >
                  {project.name}
                </a>{" "}
                &mdash; {project.description}
              </>
            ) : (
              <>{project.description}</>
            )}
          </p>
        </div>
      ))}
      <hr className="my-8 border-neutral-200" />
      <p>My other side projects:</p>
      <ul className="my-2 ">
        <li>Flit</li>
        <li>Gacha</li>
        <li>Stryde</li>
        <li>Rewind</li>
        <li>VinoVoyage</li>
      </ul>
    </article>
  );
}
