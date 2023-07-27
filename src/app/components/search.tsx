"use client";
import { Combobox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Breed } from "../details/interfaces/details-interfaces";
import Link from "next/link";

export default function Search({ breeds }: { breeds: Breed[] }) {
  const [selectedBreed, setSelectedBreed] = useState();
  const [query, setQuery] = useState("");

  const filteredBreeds =
    query === ""
      ? breeds
      : breeds.filter((breed) =>
          breed.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <Combobox value={selectedBreed} onChange={setSelectedBreed}>
      <Combobox.Input
        onChange={(event) => setQuery(event.target.value)}
        displayValue={(breed: Breed) => breed.name}
      />
      <Combobox.Options className="absolute rounded-2xl h-auto max-h-40 w-80 overflow-y-scroll bg-white">
        {filteredBreeds.map((breed) => (
          <Combobox.Option key={breed.id} value={breed} as={Fragment}>
            <Link href={`/details/${breed.reference_image_id}`}>
              <li className="cursor-pointer px-2 hover:bg-slate-200">
                {breed.name}
              </li>
            </Link>
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
