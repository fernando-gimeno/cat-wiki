import { BreedResponse } from "../details/interfaces/details-interfaces";
import { getRandomImages } from "../libs/the-cat-api";
import BreedCard from "../components/breed-card";

export default async function Discover() {
  const randomImages = await getRandomImages(8);

  return (
    <section
      id="discover"
      className="relative isolate scroll-mt-24 overflow-hidden rounded-b-3xl bg-sand px-7 pb-16 pt-12 sm:px-14 sm:pb-20 md:px-20"
    >
      {/* Warm radial glow seeping up from the hero above */}
      <div className="pointer-events-none absolute -top-24 left-1/4 -z-10 h-72 w-72 rounded-full bg-amber/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 right-0 -z-10 h-64 w-64 rounded-full bg-bark/10 blur-3xl" />

      {/* Section header */}
      <header className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-bark/50" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-bark">
              Most Searched Breeds
            </span>
          </div>
          <h2 className="max-w-xl font-display text-3xl font-light leading-[1.1] text-ink sm:text-4xl">
            {randomImages.length}+ breeds for you to{" "}
            <em className="font-medium italic text-bark">discover</em>
          </h2>
        </div>

        <p className="max-w-xs font-sans text-sm leading-relaxed text-espresso/70">
          A fresh selection of feline portraits, drawn at random. Hover any plate
          to glimpse its temperament.
        </p>
      </header>

      {/* Gallery of plates */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {randomImages.map((image: BreedResponse, index: number) => (
          <BreedCard key={image.id} image={image} index={index} />
        ))}
      </div>
    </section>
  );
}
