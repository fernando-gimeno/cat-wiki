import Image from "next/image";
import { SearchResponse } from "../interfaces/details-interfaces";

export default function PhotosSection({
  photos,
}: {
  photos: SearchResponse[];
}) {
  return (
    <section className="mt-20 mb-40">
      <h2 className="text-4xl font-semibold text-[#291507] mb-10">
        Other photos
      </h2>
      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {photos.map((photo: SearchResponse) => (
          <Image
            key={photo.id}
            src={photo.url}
            width={photo.width}
            height={photo.height}
            alt="Photo of breed"
            className="aspect-square object-cover"
          />
        ))}
      </div>
    </section>
  );
}
