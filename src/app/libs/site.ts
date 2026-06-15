/**
 * Centralised site metadata used across SEO surfaces (root metadata, sitemap,
 * robots, manifest and JSON-LD). Keeping it in one place means the canonical
 * URL, name and description never drift between files.
 */

/**
 * The public origin of the site, without a trailing slash. Set
 * NEXT_PUBLIC_SITE_URL in the environment for production; the fallback keeps
 * local builds and previews working.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Cat Wiki",
  /** Short tagline used as the default/home title. */
  title: "Cat Wiki — The Feline Encyclopedia",
  description:
    "Discover and compare cat breeds in a beautifully illustrated feline " +
    "encyclopedia. Browse temperaments, origins, life span and care traits " +
    "for dozens of documented breeds.",
  url: siteUrl,
  locale: "en_US",
  /** Default social share image (lives in /public). */
  ogImage: `${siteUrl}/img/HeroImagelg.png`,
  keywords: [
    "cat breeds",
    "cat wiki",
    "feline encyclopedia",
    "cat temperament",
    "cat breed guide",
    "types of cats",
    "cat characteristics",
  ],
} as const;

/** Turn a site-relative path into an absolute URL against the public origin. */
export const absoluteUrl = (path: string) =>
  `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * The (relative) URL of a breed detail page — the single source of truth.
 * Accepts string | number because the API's reference_image_id is typed
 * numeric but used as a string id (coerced via the template literal).
 */
export const breedPath = (id: string | number) => `/details/${id}`;

/** Compose a page title as "Name — Cat Wiki", falling back to the home title. */
export const pageTitle = (name?: string) =>
  name ? `${name} — ${siteConfig.name}` : siteConfig.title;
