import {
  Breed,
  BreedResponse,
  SearchResponse,
} from "../details/interfaces/details-interfaces";

const baseUrl = "https://api.thecatapi.com/v1";

async function client<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "x-api-key": process.env.CAT_API_KEY ?? "",
      ...init?.headers,
    },
    next: { revalidate: 3600 }
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data in ${path}: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

export async function getBreedById(id: string): Promise<BreedResponse> {
  return client<BreedResponse>(`/images/${id}`);
}

export async function getPhotosByBreed(
  breedName: string,
): Promise<SearchResponse[]> {
  return client<SearchResponse[]>(`/images/search?breed_ids=${breedName}&limit=8`);
}

export async function getBreeds(): Promise<Breed[]> {
  return client<Breed[]>(`/breeds`);
}

export async function getRandomImages(
  limit: number = 10,
): Promise<BreedResponse[]> {
  return client<BreedResponse[]>(`/images/search?limit=${limit}&has_breeds=1`);
}
