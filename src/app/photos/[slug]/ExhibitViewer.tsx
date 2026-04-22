'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { HiArrowLeft, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import type { Exhibit } from '@/data/photos';

function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function ExhibitViewer({ exhibit }: { exhibit: Exhibit }) {
  const [idx, setIdx] = useState(0);
  const photos = exhibit.photos;
  const current = photos[idx];
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIdx((i) => Math.min(i + 1, photos.length - 1));
      if (e.key === 'ArrowLeft') setIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [photos.length]);

  // Warm the browser cache for adjacent photos so arrow/swipe nav is instant.
  useEffect(() => {
    const neighbors = [photos[idx + 1]?.src, photos[idx - 1]?.src].filter(Boolean) as string[];
    for (const src of neighbors) {
      const img = new window.Image();
      img.src = src;
    }
  }, [idx, photos]);

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-black">
      {/* Top bar */}
      <div className="flex shrink-0 items-center justify-between px-6 py-4">
        <Link href="/photos" className="text-white/50 transition-colors hover:text-white">
          <HiArrowLeft size={18} />
        </Link>
        <div className="text-center">
          <p className="text-sm font-medium text-white">{exhibit.title}</p>
          <p className="text-xs text-white/40">{formatDate(exhibit.date)}</p>
        </div>
        <span className="text-xs text-white/40">
          {idx + 1} / {photos.length}
        </span>
      </div>

      {/* Main photo area */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(dx) > 50) {
            if (dx < 0) setIdx((i) => Math.min(i + 1, photos.length - 1));
            else setIdx((i) => Math.max(i - 1, 0));
          }
          touchStartX.current = null;
        }}
      >
        <button
          onClick={() => setIdx((i) => Math.max(i - 1, 0))}
          disabled={idx === 0}
          className="absolute left-4 z-10 rounded-full p-2 text-white/30 transition-colors hover:text-white/80 disabled:pointer-events-none disabled:opacity-0"
          aria-label="Previous photo"
        >
          <HiChevronLeft size={28} />
        </button>

        <div className="relative h-full w-full">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-contain"
          />
        </div>

        <button
          onClick={() => setIdx((i) => Math.min(i + 1, photos.length - 1))}
          disabled={idx === photos.length - 1}
          className="absolute right-4 z-10 rounded-full p-2 text-white/30 transition-colors hover:text-white/80 disabled:pointer-events-none disabled:opacity-0"
          aria-label="Next photo"
        >
          <HiChevronRight size={28} />
        </button>
      </div>

      {/* Caption */}
      <div className="shrink-0 py-2 text-center">
        {current.caption ? (
          <p className="px-6 font-serif text-xs italic text-white/50">{current.caption}</p>
        ) : (
          <div className="h-4" />
        )}
      </div>

      {/* Filmstrip */}
      <div className="flex shrink-0 justify-center gap-1.5 overflow-x-auto px-6 pb-6 pt-2">
        {photos.map((photo, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`relative h-12 w-12 shrink-0 overflow-hidden transition-opacity ${
              i === idx
                ? 'opacity-100 ring-1 ring-white ring-offset-1 ring-offset-black'
                : 'opacity-35 hover:opacity-60'
            }`}
            aria-label={`View photo ${i + 1}`}
          >
            <Image
              src={photo.thumb}
              alt={photo.alt}
              fill
              sizes="48px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
