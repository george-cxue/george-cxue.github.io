import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EXHIBITS } from "@/data/photos";
import { ExhibitViewer } from "./ExhibitViewer";

export function generateStaticParams() {
  return EXHIBITS.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const exhibit = EXHIBITS.find((e) => e.slug === slug);
  if (!exhibit) return {};

  return {
    title: `${exhibit.title} - George`,
    description: exhibit.description || `Photos from ${exhibit.title}`,
  };
}

export default async function ExhibitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exhibit = EXHIBITS.find((e) => e.slug === slug);

  if (!exhibit) {
    notFound();
  }

  return <ExhibitViewer exhibit={exhibit} />;
}
