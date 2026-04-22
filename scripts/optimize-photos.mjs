#!/usr/bin/env node
// Optimize photos under public/media/photos/*/:
//   - Downsize originals in place (max 2560px long edge, JPEG q82 mozjpeg, strip EXIF)
//   - Generate <name>.thumb.webp (480w, q72) for filmstrip + grid
// Idempotent: already-small originals and existing thumb outputs are skipped.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PHOTOS_DIR = path.join(ROOT, 'public', 'media', 'photos');

const MAX_EDGE = 2560;
const FULL_QUALITY = 82;
const THUMB_WIDTH = 480;
const THUMB_QUALITY = 72;
const SOURCE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

function isSourceImage(filename) {
  if (filename.includes('.thumb.')) return false;
  return SOURCE_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function processImage(filePath) {
  const result = { resized: false, thumb: false };
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, path.extname(filePath));
  const thumbPath = path.join(dir, `${base}.thumb.webp`);

  const meta = await sharp(filePath).metadata();
  const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);

  // 1. Downsize original in place if oversized. Skip if already within budget.
  if (longEdge > MAX_EDGE) {
    const buf = await sharp(filePath)
      .rotate() // honor EXIF orientation before we strip it
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: FULL_QUALITY, mozjpeg: true })
      .toBuffer();
    await fs.writeFile(filePath, buf);
    result.resized = true;
  }

  // 2. Thumbnail
  if (!(await exists(thumbPath))) {
    await sharp(filePath)
      .rotate()
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY })
      .toFile(thumbPath);
    result.thumb = true;
  }

  return result;
}

async function run() {
  if (!(await exists(PHOTOS_DIR))) {
    console.log(`No photos directory at ${PHOTOS_DIR}, skipping.`);
    return;
  }

  const slugs = (await fs.readdir(PHOTOS_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  let total = 0;
  let processed = 0;
  let resized = 0;
  let thumbs = 0;

  for (const slug of slugs) {
    const exhibitDir = path.join(PHOTOS_DIR, slug);
    const files = (await fs.readdir(exhibitDir)).filter(isSourceImage);

    for (const file of files) {
      total += 1;
      const filePath = path.join(exhibitDir, file);
      try {
        const r = await processImage(filePath);
        if (r.resized || r.thumb) processed += 1;
        if (r.resized) resized += 1;
        if (r.thumb) thumbs += 1;
        const tags = [
          r.resized ? 'resized' : null,
          r.thumb ? 'thumb' : null,
        ].filter(Boolean);
        const label = tags.length ? tags.join('+') : 'skip';
        console.log(`  [${label}] ${slug}/${file}`);
      } catch (err) {
        console.error(`  [error] ${slug}/${file}: ${err.message}`);
        process.exitCode = 1;
      }
    }
  }

  console.log(
    `\nDone. ${total} images total; touched ${processed} (resized ${resized}, thumbs ${thumbs}).`,
  );
}

run();
