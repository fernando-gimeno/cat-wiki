import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hability from "../components/hability";
import PhotosSection from "../components/photos-section";
import { getBreedById, getPhotosByBreed } from "@/app/libs/the-cat-api";
import { HabilityLevel } from "../interfaces/details-interfaces";
import {
  siteConfig,
  siteUrl,
  absoluteUrl,
  breedPath,
  pageTitle,
} from "@/app/libs/site";
import { parseTemperament } from "@/app/libs/breed";
import JsonLd from "@/app/components/json-ld";

/**
 * Build a concise, SEO-friendly meta description for a breed. The Cat API
 * descriptions can be long, so we trim to a sensible length on a word boundary.
 */
function breedSummary(name: string, description?: string, origin?: string) {
  const base =
    description?.trim() ||
    `Learn about the ${name} cat breed${
      origin ? ` from ${origin}` : ""
    }: temperament, traits, life span and care.`;
  if (base.length <= 160) return base;
  return base.slice(0, 157).replace(/\s+\S*$/, "") + "…";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  if (!id || id === "undefined") return {};

  try {
    const breed = await getBreedById(id);
    const cat = breed.breeds[0];
    if (!cat) return {};

    const description = breedSummary(cat.name, cat.description, cat.origin);
    const path = breedPath(id);
    const image = breed.url || siteConfig.ogImage;
    const ogTitle = pageTitle(cat.name);

    return {
      title: cat.name,
      description,
      keywords: [
        cat.name,
        `${cat.name} cat`,
        `${cat.name} breed`,
        cat.origin ? `${cat.name} ${cat.origin}` : cat.name,
        ...parseTemperament(cat.temperament),
      ].filter(Boolean),
      alternates: { canonical: path },
      openGraph: {
        type: "article",
        title: ogTitle,
        description,
        url: absoluteUrl(path),
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        images: [{ url: image, alt: `A ${cat.name} cat` }],
      },
      twitter: {
        card: "summary_large_image",
        title: ogTitle,
        description,
        images: [image],
      },
    };
  } catch {
    return {};
  }
}

/**
 * A country flag rendered from flagcdn. Unicode flag emoji are unreliable on
 * Windows (no flag font → bare letters), so we use a real image instead.
 */
function Flag({ code }: { code?: string }) {
  if (!code || code.length !== 2) return null;
  const cc = code.toLowerCase();
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={`https://flagcdn.com/${cc}.svg`}
      alt=""
      aria-hidden
      width={22}
      height={16}
      className="h-4 w-5.5 rounded-[3px] object-cover ring-1 ring-cream/20"
    />
  );
}

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id || id === "undefined") notFound();
  const breed = await getBreedById(id);
  const breedPhotos = await getPhotosByBreed(`${breed.breeds[0].id}`);

  const cat = breed.breeds[0];

  const temperaments = parseTemperament(cat.temperament);

  // Group the trait meters into two readable themes.
  const isLevel = (t: { level?: HabilityLevel }) =>
    typeof t.level === "number";

  const personality = [
    { title: "Affection", level: cat.affection_level },
    { title: "Social needs", level: cat.social_needs },
    { title: "Child friendly", level: cat.child_friendly },
    { title: "Stranger friendly", level: cat.stranger_friendly },
    { title: "Dog friendly", level: cat.dog_friendly },
    { title: "Cat friendly", level: cat.cat_friendly },
  ].filter(isLevel);

  const lifestyle = [
    { title: "Energy level", level: cat.energy_level },
    { title: "Intelligence", level: cat.intelligence },
    { title: "Adaptability", level: cat.adaptability },
    { title: "Grooming", level: cat.grooming },
    { title: "Shedding", level: cat.shedding_level },
    { title: "Vocalisation", level: cat.vocalisation },
    { title: "Health issues", level: cat.health_issues },
  ].filter(isLevel);

  // Structured data: a breadcrumb trail plus an article describing the breed.
  // Helps search engines render rich results and understand page context.
  const canonical = absoluteUrl(breedPath(id));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteConfig.name,
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: cat.name,
            item: canonical,
          },
        ],
      },
      {
        "@type": "Article",
        headline: `${cat.name} — Cat Breed Profile`,
        description: breedSummary(cat.name, cat.description, cat.origin),
        image: breed.url,
        about: {
          "@type": "Thing",
          name: `${cat.name} cat breed`,
          ...(cat.wikipedia_url ? { sameAs: cat.wikipedia_url } : {}),
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
        isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteUrl },
      },
    ],
  };

  // Binary characteristics worth surfacing as badges.
  const characteristics = [
    { label: "Hypoallergenic", on: cat.hypoallergenic },
    { label: "Lap cat", on: cat.lap },
    { label: "Indoor", on: cat.indoor },
    { label: "Natural breed", on: cat.natural },
    { label: "Rare", on: cat.rare },
    { label: "Hairless", on: cat.hairless },
    { label: "Short legs", on: cat.short_legs },
    { label: "Experimental", on: cat.experimental },
  ].filter((c) => c.on);

  return (
    <main className="mx-4 mb-20 flex flex-col gap-6 sm:mx-24 sm:mb-28">
      <JsonLd data={jsonLd} />
      {/* Back to the encyclopedia */}
      <Link
        href="/"
        className="group inline-flex w-fit items-center gap-2 font-sans text-sm font-medium text-espresso/60 transition-colors hover:text-bark"
      >
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:-translate-x-1"
        >
          ←
        </span>
        Back to all breeds
      </Link>

      {/* Portrait header — dark editorial plate, echoing the hero */}
      <section className="relative isolate overflow-hidden rounded-3xl bg-ink">
        {/* Warm radial glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-amber/15 blur-3xl" />
        {/* Film grain */}
        <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" />

        <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-5 md:gap-10 md:p-10">
          {/* The portrait */}
          <div
            className="animate-rise relative aspect-square overflow-hidden rounded-2xl ring-1 ring-cream/10 md:col-span-2"
            style={{ animationDelay: "60ms" }}
          >
            <Image
              src={breed.url}
              alt={`A ${cat.name} cat`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
            <div className="grain pointer-events-none absolute inset-0 opacity-[0.05]" />
          </div>

          {/* The dossier */}
          <div className="flex flex-col justify-center gap-5 md:col-span-3">
            <div
              className="animate-rise flex items-center gap-3"
              style={{ animationDelay: "120ms" }}
            >
              <span className="animate-pulse-glow size-2 rounded-full bg-amber" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-amber-soft">
                Breed Profile
              </span>
            </div>

            <div
              className="animate-rise flex flex-col gap-1"
              style={{ animationDelay: "180ms" }}
            >
              <h1 className="font-display text-4xl font-light leading-[1.05] text-cream sm:text-5xl">
                {cat.name}
              </h1>
              {cat.alt_names && (
                <p className="font-display text-lg font-light italic text-cream/45">
                  also known as {cat.alt_names}
                </p>
              )}
            </div>

            <p
              className="animate-rise max-w-prose font-sans text-base leading-relaxed text-cream/65"
              style={{ animationDelay: "240ms" }}
            >
              {cat.description}
            </p>

            {/* Quick facts */}
            <dl
              className="animate-rise flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/10 pt-5"
              style={{ animationDelay: "300ms" }}
            >
              {cat.origin && (
                <div className="flex flex-col gap-1">
                  <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/40">
                    Origin
                  </dt>
                  <dd className="flex items-center gap-2 font-display text-lg text-cream">
                    <Flag code={cat.country_code} />
                    {cat.origin}
                  </dd>
                </div>
              )}
              {cat.life_span && (
                <div className="flex flex-col gap-1">
                  <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/40">
                    Life span
                  </dt>
                  <dd className="font-display text-lg text-cream">
                    {cat.life_span} years
                  </dd>
                </div>
              )}
              {cat.weight?.metric && (
                <div className="flex flex-col gap-1">
                  <dt className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/40">
                    Weight
                  </dt>
                  <dd className="font-display text-lg text-cream">
                    {cat.weight.metric} kg
                  </dd>
                </div>
              )}
            </dl>

            {/* Temperament tags */}
            {temperaments.length > 0 && (
              <div
                className="animate-rise flex flex-wrap gap-1.5"
                style={{ animationDelay: "360ms" }}
              >
                {temperaments.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-full bg-amber/15 px-3 py-1 font-sans text-xs font-medium text-amber-soft ring-1 ring-amber/25"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            )}

            {/* Wikipedia link */}
            {cat.wikipedia_url && (
              <a
                href={cat.wikipedia_url}
                target="_blank"
                rel="noopener noreferrer"
                className="animate-rise group inline-flex w-fit items-center gap-2 font-sans text-sm font-semibold text-amber transition-colors hover:text-amber-soft"
                style={{ animationDelay: "420ms" }}
              >
                Read on Wikipedia
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Traits — warm sand plate, echoing discover */}
      <section className="relative isolate overflow-hidden rounded-3xl bg-sand px-6 py-12 sm:px-10 sm:py-14 md:px-14">
        <div className="pointer-events-none absolute -bottom-16 left-0 -z-10 h-56 w-56 rounded-full bg-bark/10 blur-3xl" />

        <header className="mb-8 flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-bark/50" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-bark">
              The Measure of the Breed
            </span>
          </div>
          <h2 className="font-display text-3xl font-light leading-[1.1] text-ink sm:text-4xl">
            Temperament &{" "}
            <em className="font-medium italic text-bark">traits</em>
          </h2>
        </header>

        {/* Characteristic badges */}
        {characteristics.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2">
            {characteristics.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 font-sans text-xs font-semibold text-espresso ring-1 ring-bark/15"
              >
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-amber"
                />
                {c.label}
              </span>
            ))}
          </div>
        )}

        {/* Two themed columns of meters */}
        <div className="grid gap-x-14 gap-y-2 md:grid-cols-2">
          <div>
            <h3 className="mb-1 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-bark/60">
              Personality
            </h3>
            <div className="divide-y divide-bark/10">
              {personality.map((trait, i) => (
                <Hability
                  key={trait.title}
                  title={trait.title}
                  level={trait.level as HabilityLevel}
                  index={i}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-1 font-sans text-[11px] font-bold uppercase tracking-[0.22em] text-bark/60">
              Lifestyle & Care
            </h3>
            <div className="divide-y divide-bark/10">
              {lifestyle.map((trait, i) => (
                <Hability
                  key={trait.title}
                  title={trait.title}
                  level={trait.level as HabilityLevel}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <PhotosSection photos={breedPhotos} />
    </main>
  );
}
