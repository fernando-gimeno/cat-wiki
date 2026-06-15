import Image from "next/image";
import { SearchResponse } from "../interfaces/details-interfaces";

export default function PhotosSection({
  photos,
}: {
  photos: SearchResponse[];
}) {
  if (!photos?.length) return null;

  return (
    <section className="relative isolate mt-6 overflow-hidden rounded-3xl bg-sand px-6 py-12 sm:px-10 sm:py-16 md:px-14">
      {/* Warm radial glow, echoing the discover gallery */}
      <div className="pointer-events-none absolute -top-20 right-1/4 -z-10 h-64 w-64 rounded-full bg-amber/15 blur-3xl" />

      <header className="mb-9 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="h-px w-10 bg-bark/50" />
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-bark">
            From the Archive
          </span>
        </div>
        <h2 className="font-display text-3xl font-light leading-[1.1] text-ink sm:text-4xl">
          More <em className="font-medium italic text-bark">portraits</em>
        </h2>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo: SearchResponse, index: number) => (
          <figure
            key={photo.id}
            className="group animate-rise relative aspect-square overflow-hidden rounded-2xl bg-espresso ring-1 ring-bark/25 shadow-[0_12px_32px_-16px_rgba(21,10,2,0.55)]"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <Image
              src={photo.url}
              width={photo.width}
              height={photo.height}
              alt="Portrait of the breed"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-full w-full object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.12]"
            />

            {/* Editorial wash */}
            <div className="absolute inset-0 bg-linear-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Film grain */}
            <div className="grain pointer-events-none absolute inset-0 opacity-[0.05]" />

            {/* Plate number */}
            <span className="absolute left-3 top-2.5 font-sans text-[10px] font-semibold tracking-[0.32em] text-amber-soft/75">
              {String(index + 1).padStart(2, "0")}
            </span>
          </figure>
        ))}
      </div>
    </section>
  );
}
