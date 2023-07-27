import Hero from "./components/hero";
import Discover from "./components/discover";
import WhyShouldHaveCat from "./components/why-should-have-cat";
import { getBreedById } from "./libs/the-cat-api";

export default async function Home() {
  return (
    <main className="mx-4 sm:px-24">
      <Hero />
      <Discover />
      <WhyShouldHaveCat />
    </main>
  );
}
