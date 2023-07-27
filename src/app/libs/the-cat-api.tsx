import {
  Breed,
  BreedResponse,
  SearchResponse,
} from "../details/interfaces/details-interfaces";

const headers = new Headers({
  "x-api-key": `${process.env.CAT_API_KEY}`,
});

export async function getBreedById(id: string): Promise<BreedResponse> {
  const res = await fetch(`https://api.thecatapi.com/v1/images/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getPhotosByBreed(
  breedName: string
): Promise<SearchResponse[]> {
  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${breedName}`
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getBreeds(): Promise<Breed[]> {
  const res = await fetch(`https://api.thecatapi.com/v1/breeds`, {
    headers: headers,
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}

export async function getRandomImages(
  limit: number = 10
): Promise<BreedResponse[]> {
  const res = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=${limit}&has_breeds=1`,
    { cache: "no-store", headers: headers }
  );
  if (!res.ok) throw new Error("Failed to fetch data");
  return res.json();
}
