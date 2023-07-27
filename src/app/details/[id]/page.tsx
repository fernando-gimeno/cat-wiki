import Image from "next/image";
import Hability from "../components/hability";
import PhotosSection from "../components/photos-section";
import { getBreedById, getPhotosByBreed } from "@/app/libs/the-cat-api";

export default async function DetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const breed = await getBreedById(id);
  const breedPhotos = await getPhotosByBreed(`${breed.breeds[0].id}`);

  return (
    <main className="mx-4 sm:mx-24">
      <div className="grid grid-cols-3 gap-8 justify-items-center">
        <Image
          src={breed.url}
          height={breed.height}
          width={breed.width}
          alt="Image profile"
          className="aspect-square object-cover rounded-3xl"
        />
        <div className="col-span-2 grid gap-y-2">
          <h2>{breed.breeds[0].name}</h2>
          <p>{breed.breeds[0].description}</p>
          <Hability title="Temperament" text={breed.breeds[0].temperament} />
          <Hability title="Origin" text={breed.breeds[0].origin} />
          <Hability
            title="Life Span"
            text={breed.breeds[0].life_span + " years"}
          />
          <Hability title="Adaptability" level={breed.breeds[0].adaptability} />
          <Hability
            title="Affection level"
            level={breed.breeds[0].affection_level}
          />
          <Hability
            title="Child Friendly"
            level={breed.breeds[0].child_friendly}
          />
          <Hability title="Grooming" level={breed.breeds[0].grooming} />
          <Hability title="Intelligence" level={breed.breeds[0].intelligence} />
          <Hability
            title="Health issues"
            level={breed.breeds[0].health_issues}
          />
          <Hability title="Social needs" level={breed.breeds[0].social_needs} />
          <Hability
            title="Stranger friendly"
            level={breed.breeds[0].stranger_friendly}
          />
        </div>
      </div>
      <PhotosSection photos={breedPhotos} />
    </main>
  );
}
