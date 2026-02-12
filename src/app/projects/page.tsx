import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Projects - George",
  description: "Projects I have worked on",
};

interface Project {
  name: string;
  url: string;
  logo?: string;
  description: string;
}

const PROJECTS: Project[] = [
  {
    name: "Paradigm",
    url: "#",
    logo: "/media/icons/paradigm.svg",
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
          {project.logo && (
            <div className="mb-4 flex">
              <Image
                src={project.logo}
                alt={`${project.name} logo`}
                width={32}
                height={32}
                className="w-8 grayscale"
              />
            </div>
          )}
          {project.url !== "#" ? (
            <h2>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-neutral-900 underline decoration-neutral-300 transition-colors hover:text-neutral-600 hover:decoration-neutral-400"
              >
                {project.name}
              </a>
            </h2>
          ) : (
            <h2 className="font-medium text-neutral-900">{project.name}</h2>
          )}
          <p>{project.description}</p>
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
