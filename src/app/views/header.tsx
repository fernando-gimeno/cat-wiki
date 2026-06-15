import Link from "next/link";
import Logo from "../components/logo";

const navLinks = [
  { label: "Discover", href: "/#discover" },
  { label: "The Case for Cats", href: "/#why" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-4 py-4 sm:px-8 sm:py-5 md:px-12">
        <Link
          href="/"
          aria-label="Cat Wiki — home"
          className="group flex items-center gap-3"
        >
          <Logo className="h-7 w-auto text-espresso transition-colors duration-300 group-hover:text-bark sm:h-8" />
        </Link>

        <nav className="flex items-center gap-6 sm:gap-9">
          <ul className="hidden items-center gap-7 sm:flex md:gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative font-sans text-[13px] font-semibold uppercase tracking-[0.18em] text-espresso/70 transition-colors duration-300 hover:text-espresso"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-amber transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
