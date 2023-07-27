import Hero from "./views/hero";
import Discover from "./views/discover";
import WhyShouldHaveCat from "./views/why-should-have-cat";
import { getBreedById } from "./libs/the-cat-api";

export default async function Home() {
  return (
    <main className="mx-4 sm:mx-8 md:mx-12">
      <Hero />
      <Discover />
      <WhyShouldHaveCat />
    </main>
  );
}
