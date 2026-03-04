"use client";
import { useRef, useState, useEffect } from "react";
import { FaCompactDisc } from "react-icons/fa";

const TRACKS = [
  { title: "TRIPPIN", artist: "Bunt., Maipei", src: "/music/TRIPPIN.mp3" },
  { title: "ten", artist: "Fred again.., Jozzy", src: "/music/ten.mp3" },
];

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.5;
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;
    if (isPlayingRef.current) {
      audioRef.current.pause();
      isPlayingRef.current = false;
    } else {
      audioRef.current.play().catch(() => {});
      isPlayingRef.current = true;
    }
    setIsPlaying(isPlayingRef.current);
  };

  const goTo = (delta: number) => {
    setCurrentIndex((i) => (i + delta + TRACKS.length) % TRACKS.length);
  };

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.load();
    if (isPlayingRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [currentIndex]);

  const track = TRACKS[currentIndex];

  return (
    <div className="fixed bottom-6 right-6 z-50 w-56 select-none rounded-lg bg-[#FAF9F6]/90 px-4 py-3 text-sm backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate font-medium text-neutral-800">{track.title}</p>
          {track.artist && (
            <p className="truncate mt-0.5 text-neutral-400">{track.artist}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-3 text-neutral-400">
          <button
            onClick={() => goTo(-1)}
            aria-label="Previous track"
            className="text-lg transition-colors hover:text-neutral-800"
          >
            «
          </button>
          <button
            onClick={toggle}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="text-neutral-500 transition-colors hover:text-neutral-600"
          >
            <FaCompactDisc
              className="vinyl text-2xl"
              style={{ animationPlayState: isPlaying ? "running" : "paused" }}
            />
          </button>
          <button
            onClick={() => goTo(1)}
            aria-label="Next track"
            className="text-lg transition-colors hover:text-neutral-800"
          >
            »
          </button>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={track.src}
        loop={TRACKS.length === 1}
        onEnded={() => TRACKS.length > 1 && goTo(1)}
      />
    </div>
  );
}
