export interface BreedResponse {
  id: string;
  url: string;
  breeds: Breed[];
  width: number;
  height: number;
}

export interface Breed {
  weight: Weight;
  id: string;
  name: string;
  cfa_url: string;
  vetstreet_url: string;
  vcahospitals_url: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: HabilityLevel;
  lap: HabilityLevel;
  adaptability: HabilityLevel;
  affection_level: HabilityLevel;
  child_friendly: HabilityLevel;
  cat_friendly: HabilityLevel;
  dog_friendly: HabilityLevel;
  energy_level: HabilityLevel;
  grooming: HabilityLevel;
  health_issues: HabilityLevel;
  intelligence: HabilityLevel;
  shedding_level: HabilityLevel;
  social_needs: HabilityLevel;
  stranger_friendly: HabilityLevel;
  vocalisation: HabilityLevel;
  bidability: HabilityLevel;
  experimental: HabilityLevel;
  hairless: HabilityLevel;
  natural: HabilityLevel;
  rare: HabilityLevel;
  rex: HabilityLevel;
  suppressed_tail: HabilityLevel;
  short_legs: HabilityLevel;
  wikipedia_url: string;
  hypoallergenic: HabilityLevel;
  reference_image_id: HabilityLevel;
  image?: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
}

export interface Weight {
  imperial: string;
  metric: string;
}

export interface SearchResponse {
  id: string;
  url: string;
  width: number;
  height: number;
}

export type HabilityLevel = 0 | 1 | 2 | 3 | 4 | 5;
