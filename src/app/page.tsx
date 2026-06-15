import Hero from "./views/hero";
import Discover from "./views/discover";
import WhyShouldHaveCat from "./views/why-should-have-cat";
import { siteConfig, siteUrl } from "./libs/site";
import JsonLd from "./components/json-ld";

export default async function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: siteConfig.title,
    description: siteConfig.description,
    url: siteUrl,
  };

  return (
    <main className="mx-4 sm:mx-8 md:mx-12">
      <JsonLd data={jsonLd} />
      <Hero />
      <Discover />
      <WhyShouldHaveCat />
    </main>
  );
}
