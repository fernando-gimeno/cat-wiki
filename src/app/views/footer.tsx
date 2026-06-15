import Link from "next/link";
import Logo from "../components/logo";

const explore = [
  { label: "Discover breeds", href: "/#discover" },
  { label: "The Case for Cats", href: "/#why" },
];

const elsewhere = [
  { label: "GitHub", href: "https://github.com/fernando-gimeno/" },
  { label: "The Cat API", href: "https://thecatapi.com/" },
];

export default function Footer() {
  return (
    <footer className="relative isolate mx-4 mt-16 overflow-hidden rounded-t-3xl bg-ink sm:mx-8 md:mx-12">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-amber/60 to-transparent" />

      <div className="pointer-events-none absolute -left-20 -top-16 -z-10 h-72 w-72 rounded-full bg-amber/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-72 w-72 rounded-full bg-bark/20 blur-3xl" />

      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" />

      <div className="px-7 py-14 sm:px-14 sm:py-16 md:px-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          <div className="max-w-sm">
            <Link href="/" aria-label="Cat Wiki — home" className="inline-block">
              <Logo className="h-9 w-auto text-cream transition-colors duration-300 hover:text-amber-soft" />
            </Link>

            <p className="mt-5 font-sans text-sm leading-relaxed text-cream/55">
              A beautifully illustrated feline encyclopedia — temperaments,
              origins and care traits for dozens of documented breeds.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="animate-pulse-glow size-2 rounded-full bg-amber" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-amber-soft">
                The Feline Encyclopedia
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            <FooterColumn title="Explore" links={explore} />
            <FooterColumn title="Elsewhere" links={elsewhere} />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-cream/45">
            &copy; {new Date().getFullYear()} Cat Wiki — crafted by{" "}
            <Link
              href="https://github.com/fernando-gimeno/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-cream/70 transition-colors duration-300 hover:text-amber-soft"
            >
              Fernando Gimeno
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

type FooterColumnProps = {
  title: string;
  links: { label: string; href: string }[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  const isExternal = (href: string) => href.startsWith("http");

  return (
    <div>
      <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-cream/40">
        {title}
      </h3>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              {...(isExternal(link.href)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="group inline-flex items-center gap-2 font-sans text-sm text-cream/70 transition-colors duration-300 hover:text-cream"
            >
              <span className="h-px w-0 bg-amber transition-all duration-300 group-hover:w-4" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
