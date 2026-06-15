import Image from "next/image";
import image1 from "../../../public/img/image 1.png";
import image2 from "../../../public/img/image 2.png";
import image3 from "../../../public/img/image 3.png";

const benefits = [
  {
    title: "Calm on tap",
    body: "A cat in the room can trigger the release of calming chemicals, lowering your stress and softening anxiety.",
  },
  {
    title: "A steadier heart",
    body: "Years of cohabitation are tied to lower blood pressure and a measurably reduced risk of heart disease.",
  },
  {
    title: "Deeper rest",
    body: "A purr hums between 20 and 140 Hz — the very band long associated with healing and easier sleep.",
  },
];

export default function WhyShouldHaveCat() {
  return (
    <section
      id="why"
      className="relative isolate mt-24 mb-12 scroll-mt-24 overflow-hidden rounded-3xl bg-sand px-7 py-16 sm:px-14 sm:py-20 md:px-20"
    >
      {/* Warm atmosphere — amber light pooling behind the type */}
      <div className="pointer-events-none absolute -left-20 top-10 -z-10 h-72 w-72 rounded-full bg-amber/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 right-1/3 -z-10 h-64 w-64 rounded-full bg-bark/10 blur-3xl" />
      {/* Film grain for tactile depth */}
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" />

      <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Editorial column */}
        <div className="w-full lg:w-1/2">
          {/* Eyebrow */}
          <div
            className="animate-rise flex items-center gap-3"
            style={{ animationDelay: "60ms" }}
          >
            <span className="h-px w-10 bg-bark/50" />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-bark">
              The Case for Cats
            </span>
          </div>

          {/* Headline */}
          <h2
            className="animate-rise mt-5 max-w-xl font-display text-4xl font-light leading-[1.08] text-ink sm:text-5xl"
            style={{ animationDelay: "140ms" }}
          >
            Why should you have a{" "}
            <em className="font-medium italic text-bark">cat</em>?
          </h2>

          {/* Lead */}
          <p
            className="animate-rise mt-6 max-w-md font-sans text-lg leading-relaxed text-espresso/80"
            style={{ animationDelay: "220ms" }}
          >
            More than companionship — a quiet, four-legged adjustment to how you
            feel, day after day.
          </p>

          {/* Benefits ledger */}
          <ul className="mt-10 flex flex-col">
            {benefits.map((benefit, index) => (
              <li
                key={benefit.title}
                className="animate-rise group flex gap-5 border-t border-bark/15 py-5 first:border-t-0 first:pt-0"
                style={{ animationDelay: `${320 + index * 110}ms` }}
              >
                <span className="font-display text-2xl font-light italic leading-none text-amber/70 transition-colors duration-300 group-hover:text-amber">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-medium text-ink">
                    {benefit.title}
                  </h3>
                  <p className="mt-1.5 max-w-sm font-sans text-sm leading-relaxed text-espresso/70">
                    {benefit.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Plate collage */}
        <div
          className="animate-rise relative w-full lg:w-1/2"
          style={{ animationDelay: "260ms" }}
        >
          <div className="flex items-stretch gap-3 sm:gap-4">
            {/* Left stack — stepped down for an editorial offset */}
            <div className="flex w-[43%] flex-col gap-3 pt-10 sm:gap-4">
              {/* Landscape plate */}
              <div className="group relative aspect-5/4 overflow-hidden rounded-2xl ring-1 ring-bark/20 shadow-[0_18px_40px_-22px_rgba(21,10,2,0.5)]">
                <Image
                  src={image2}
                  alt="A cat being held close"
                  fill
                  sizes="(max-width: 1024px) 40vw, 22vw"
                  className="object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.06]"
                />
                <div className="grain pointer-events-none absolute inset-0 opacity-[0.06]" />
              </div>

              {/* Portrait plate */}
              <div className="group relative aspect-4/5 overflow-hidden rounded-2xl ring-1 ring-bark/20 shadow-[0_18px_40px_-22px_rgba(21,10,2,0.5)]">
                <Image
                  src={image1}
                  alt="A cat curled and content"
                  fill
                  sizes="(max-width: 1024px) 40vw, 22vw"
                  className="object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.06]"
                />
                <div className="grain pointer-events-none absolute inset-0 opacity-[0.06]" />
              </div>
            </div>

            {/* Tall anchor plate — fills the column height */}
            <div className="group relative flex-1 overflow-hidden rounded-2xl ring-1 ring-bark/20 shadow-[0_24px_56px_-24px_rgba(21,10,2,0.55)]">
              <Image
                src={image3}
                alt="A cat resting at ease"
                fill
                sizes="(max-width: 1024px) 56vw, 28vw"
                className="object-cover transition-transform duration-1400 ease-out group-hover:scale-[1.06]"
              />
              <div className="grain pointer-events-none absolute inset-0 opacity-[0.06]" />
            </div>
          </div>

          {/* The healing-frequency badge — a distinctive, contextual detail */}
          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-full bg-ink/90 px-4 py-2.5 shadow-[0_12px_28px_-12px_rgba(21,10,2,0.7)] ring-1 ring-cream/10 backdrop-blur-md sm:-left-6">
            <span className="animate-pulse-glow size-2 shrink-0 rounded-full bg-amber" />
            <span className="font-sans text-[11px] leading-tight text-cream/85">
              <strong className="font-semibold text-amber-soft">20–140 Hz</strong>
              <br className="hidden sm:block" /> the frequency of a healing purr
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
