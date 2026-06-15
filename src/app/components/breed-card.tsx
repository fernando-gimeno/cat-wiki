import Image from "next/image";
import Link from "next/link";
import { BreedResponse } from "../details/interfaces/details-interfaces";
import { breedPath } from "../libs/site";
import { parseTemperament } from "../libs/breed";

export default function BreedCard({
  image,
  index,
}: {
  image: BreedResponse;
  index: number;
}) {
  const breed = image.breeds[0];

  const traits = parseTemperament(breed?.temperament).slice(0, 3);

  return (
    <Link
      href={breedPath(breed?.reference_image_id)}
      aria-label={`Discover the ${breed?.name} breed`}
      className="group animate-rise relative block overflow-hidden rounded-2xl bg-espresso ring-1 ring-bark/25 shadow-[0_12px_32px_-16px_rgba(21,10,2,0.55)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-20px_rgba(21,10,2,0.65)] focus-visible:-translate-y-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* The photograph — slow zoom on approach */}
        <Image
          src={image.url}
          alt={breed?.name ? `A ${breed.name} cat` : "A cat"}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.12]"
        />

        {/* Editorial wash — ink rises from the base */}
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/35 to-transparent transition-opacity duration-500 group-hover:from-ink/95" />

        {/* Film grain for tactile depth */}
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.05]" />

        {/* Plate number */}
        <span className="absolute left-3.5 top-3 font-sans text-[10px] font-semibold tracking-[0.32em] text-amber-soft/75">
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Origin pin */}
        {breed?.origin && (
          <span className="absolute right-3 top-3 rounded-full bg-ink/55 px-2.5 py-1 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-cream shadow-[0_2px_8px_-2px_rgba(21,10,2,0.6)] ring-1 ring-cream/20 backdrop-blur-md">
            {breed.origin}
          </span>
        )}

        {/* Caption plate */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="flex items-end justify-between gap-2">
            <h4 className="font-display text-xl font-medium leading-tight text-cream drop-shadow-sm">
              {breed?.name}
            </h4>
            <span
              aria-hidden
              className="mb-1 translate-x-1 text-amber opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </div>

          {breed?.life_span && (
            <p className="mt-1 font-sans text-[11px] text-cream/55">
              Lives {breed.life_span} years
            </p>
          )}

          {/* Temperament tags — unfurl on approach */}
          {traits.length > 0 && (
            <div className="mt-2.5 grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100">
              <div className="flex flex-wrap gap-1.5 overflow-hidden">
                {traits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-full bg-amber/15 px-2 py-0.5 font-sans text-[10px] font-medium text-amber-soft ring-1 ring-amber/25"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
