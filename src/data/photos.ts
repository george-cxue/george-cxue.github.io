/**
 * Exhibit data is driven by the folder structure under public/media/photos/.
 *
 * To add a new exhibit:
 *   1. Create public/media/photos/<slug>/
 *   2. Add images (jpg, jpeg, png, webp) — sorted alphabetically by filename
 *   3. Create meta.json (see below)
 *
 * meta.json shape:
 * {
 *   "title": "Philadelphia",
 *   "date": "2024-06-15",          // ISO date string
 *   "description": "...",           // optional
 *   "cover": "philly.jpg",          // optional — defaults to first image
 *   "photos": [                     // optional — omit to auto-discover images
 *     { "file": "philly.jpg", "alt": "skyline", "caption": "South Street Bridge" },
 *     { "file": "friends.jpg" }     // alt defaults to filename, caption is optional
 *   ]
 * }
 *
 * Paths in "file" and "cover" can be:
 *   - Relative: "philly.jpg"         → resolves to /media/photos/<slug>/philly.jpg
 *   - Absolute: "/media/home/foo.jpg" → used as-is (useful for transitional setups)
 */

import fs from 'fs';
import path from 'path';

export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

export interface Exhibit {
  slug: string;
  title: string;
  date: string;
  description?: string;
  cover: string;
  photos: Photo[];
}

interface PhotoEntry {
  file: string;
  alt?: string;
  caption?: string;
}

interface ExhibitMeta {
  title: string;
  date: string;
  description?: string;
  cover?: string;
  photos?: PhotoEntry[];
}

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

function isImage(filename: string): boolean {
  return IMAGE_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

function fileToAlt(filename: string): string {
  return path.basename(filename, path.extname(filename)).replace(/[-_]/g, ' ');
}

function resolveSrc(slug: string, file: string): string {
  if (file.startsWith('/')) return file;
  return `/media/photos/${slug}/${file}`;
}

function loadExhibits(): Exhibit[] {
  const photosDir = path.join(process.cwd(), 'public', 'media', 'photos');
  if (!fs.existsSync(photosDir)) return [];

  const slugs = fs
    .readdirSync(photosDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const exhibits: Exhibit[] = [];

  for (const slug of slugs) {
    const exhibitDir = path.join(photosDir, slug);
    const metaPath = path.join(exhibitDir, 'meta.json');
    if (!fs.existsSync(metaPath)) continue;

    const meta: ExhibitMeta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));

    // Use explicit photo list if provided, otherwise auto-discover images in folder
    const photoEntries: PhotoEntry[] = meta.photos
      ? meta.photos
      : fs
          .readdirSync(exhibitDir)
          .filter(isImage)
          .sort()
          .map((file) => ({ file }));

    const photos: Photo[] = photoEntries.map((entry) => ({
      src: resolveSrc(slug, entry.file),
      alt: entry.alt ?? fileToAlt(entry.file),
      ...(entry.caption ? { caption: entry.caption } : {}),
    }));

    const coverFile = meta.cover ?? photoEntries[0]?.file ?? '';
    const cover = resolveSrc(slug, coverFile);

    exhibits.push({
      slug,
      title: meta.title,
      date: meta.date,
      ...(meta.description ? { description: meta.description } : {}),
      cover,
      photos,
    });
  }

  return exhibits.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export const EXHIBITS: Exhibit[] = loadExhibits();
