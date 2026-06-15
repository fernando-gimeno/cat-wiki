import type { MetadataRoute } from "next";
import { getBreeds } from "./libs/the-cat-api";
import { siteUrl, absoluteUrl, breedPath } from "./libs/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const home: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  try {
    const breeds = await getBreeds();
    const breedRoutes: MetadataRoute.Sitemap = breeds
      .filter((b) => b.reference_image_id)
      .map((b) => ({
        url: absoluteUrl(breedPath(b.reference_image_id)),
        changeFrequency: "monthly",
        priority: 0.8,
      }));

    return [...home, ...breedRoutes];
  } catch {
    // If the API is unavailable at build time, still ship a valid sitemap.
    return home;
  }
}
