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

interface SideProject {
  name: string;
  url?: string;
}

const SIDE_PROJECTS: SideProject[] = [
  { name: "Flit" },
  { name: "Gacha", url: "https://github.com/george-cxue/gacha" },
  { name: "Stryde", url: "https://github.com/zminsc/stryde" },
  { name: "Rewind", url: "https://github.com/george-cxue/Rewind" },
  { name: "VinoVoyage", url: "https://github.com/george-cxue/VinoVoyage" },
];

const PROJECTS: Project[] = [
  // {
  //   name: "",
  //   url: "https://store.google.com/category/phones?hl=en-US&pli=1",
  //   logo: "/media/icons/google-pixel.webp",
  //   description: "Built some cool phones.",
  // },
  {
    name: "",
    url: "https://www.paradigmai.com/",
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

      {PROJECTS.map((project, i) => (
        <div key={project.url + i} className="mt-12 space-y-4">
          {project.logo && (
            <div className="mb-4 flex">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-opacity hover:opacity-70"
              >
                <Image
                  src={project.logo}
                  alt={`${project.name} logo`}
                  width={120}
                  height={30}
                  className="h-6 w-auto grayscale"
                />
              </a>
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
      <ul className="my-2">
        {SIDE_PROJECTS.map((sp) => (
          <li key={sp.name}>
            {sp.url ? (
              <a
                href={sp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-neutral-300 transition-colors hover:text-neutral-900 hover:decoration-neutral-400"
              >
                {sp.name}
              </a>
            ) : (
              sp.name
            )}
          </li>
        ))}
      </ul>
    </article>
  );
}
