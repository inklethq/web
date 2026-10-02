"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";

export type TourStop = {
  id: string;
  label: string;
  caption: string;
  src: string;
  alt: string;
};

/**
 * One screenshot at a time, chosen by tab. Every stop shares the same pixel
 * size, so the frame never changes height when the tab does; the images sit
 * on top of each other and cross-fade.
 */
export default function PortalTour({
  stops,
  width,
  height,
}: {
  stops: TourStop[];
  width: number;
  height: number;
}) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const base = useId();

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = stops.length - 1;
    let next: number;
    if (event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  const current = stops[active];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Parts of inklet Portal"
        className="flex flex-wrap justify-center gap-2 mb-6"
      >
        {stops.map((stop, index) => {
          const selected = index === active;
          return (
            <button
              key={stop.id}
              ref={(element) => {
                tabs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`${base}-tab-${stop.id}`}
              aria-selected={selected}
              aria-controls={`${base}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5f3ed] ${
                selected
                  ? "bg-[#f5f3ed] text-[#1a1a1a]"
                  : "border border-[#333] text-[#888] hover:border-[#555] hover:text-[#f5f3ed]"
              }`}
            >
              {stop.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${base}-panel`}
        aria-labelledby={`${base}-tab-${current.id}`}
      >
        {/* Above the screenshot so it stays in view when the tab changes. */}
        <p className="text-[#888] leading-relaxed text-center max-w-2xl mx-auto mb-8 min-h-[6.5rem] md:min-h-[3.25rem]">
          {current.caption}
        </p>
        <div
          className="relative mx-auto max-w-4xl"
          style={{ aspectRatio: `${width} / ${height}` }}
        >
          {stops.map((stop, index) => (
            <Image
              key={stop.id}
              src={stop.src}
              alt={index === active ? stop.alt : ""}
              aria-hidden={index !== active}
              fill
              sizes="(min-width: 1024px) 896px, calc(100vw - 48px)"
              className={`object-contain transition-opacity duration-300 motion-reduce:transition-none ${
                index === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
