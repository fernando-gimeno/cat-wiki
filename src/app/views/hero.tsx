import Image from "next/image";
import Search from "../components/search";
import { getBreeds } from "../libs/the-cat-api";
import heroImage from "../../../public/img/HeroImagelg.png";

export default async function Hero() {
  const breeds = await getBreeds();

  return (
    <section className="relative isolate overflow-hidden rounded-t-3xl bg-ink">
      {/* The cat — slow drifting ken-burns */}
      <Image
        src={heroImage}
        alt="A tabby cat in profile, lit against the dark"
        fill
        priority
        sizes="100vw"
        placeholder="blur"
        className="absolute inset-0 -z-20 object-cover object-right animate-drift"
      />

      {/* Legibility wash — ink fades from the left and bottom */}
      <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink via-ink/85 to-transparent" />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/80 via-transparent to-transparent" />

      {/* Film grain */}
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" />

      <div className="relative flex min-h-115 max-w-2xl flex-col justify-center gap-7 px-7 py-14 sm:min-h-125 sm:px-14 sm:py-16 md:px-20">
        {/* Eyebrow */}
        <div
          className="animate-rise flex items-center gap-3"
          style={{ animationDelay: "60ms" }}
        >
          <span className="animate-pulse-glow size-2 rounded-full bg-amber" />
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-amber-soft">
            The Feline Encyclopedia
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-rise font-display text-4xl font-light leading-[1.05] text-cream sm:text-5xl md:text-6xl"
          style={{ animationDelay: "140ms" }}
        >
          Get to know more about
          <br className="hidden sm:block" /> your{" "}
          <em className="font-medium italic text-amber">cat</em> breed
        </h1>

        {/* Search */}
        <div
          className="animate-rise w-full"
          style={{ animationDelay: "240ms" }}
        >
          <Search breeds={breeds} />
        </div>

        <p
          className="animate-rise flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-sm text-cream/55"
          style={{ animationDelay: "340ms" }}
        >
          <span>
            Browse{" "}
            <span className="font-semibold text-amber-soft">
              {breeds.length}+
            </span>{" "}
            documented breeds
          </span>
        </p>
      </div>
    </section>
  );
}
