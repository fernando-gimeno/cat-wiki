import Image from "next/image";
import { BreedResponse } from "../details/interfaces/details-interfaces";
import { getRandomImages } from "../libs/the-cat-api";
import Link from "next/link";

export default async function Discover() {
  const randomImages = await getRandomImages(4);

  return (
    <div className="bg-[#E3E1DC] rounded-b-3xl pt-4 pb-14 px-8 sm:px-24">
      <h4>Most Searched Breeds</h4>
      <hr className="border-2 border-[#4D270C] w-14 mb-4 mt-1" />
      <h3 className="font-bold text-lg text-[#291507] mb-6">
        66+ Breeds For you to discover
      </h3>
      <div className="grid grid-cols-2 justify-center items-center justify-items-center gap-y-8 gap-x-4 sm:grid-cols-3 md:grid-cols-4">
        {randomImages.map((image: BreedResponse) => {
          return (
            <div>
              <Link href={`/details/${image.breeds[0].reference_image_id}`}>
                <Image
                  className="aspect-square object-cover rounded-2xl"
                  src={image.url}
                  width={image.width}
                  height={image.height}
                  alt="Image 2"
                />
                <p className="font-semibold text-xs text-[#291507]">
                  {image.breeds[0].name}
                </p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
