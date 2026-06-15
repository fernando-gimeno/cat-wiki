"use client";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, PawPrint, Search as SearchIcon } from "lucide-react";
import { Breed } from "../details/interfaces/details-interfaces";

function Highlight({ text, query }: { text: string; query: string }) {
  const trimmed = query.trim();
  if (!trimmed) return <>{text}</>;
  const index = text.toLowerCase().indexOf(trimmed.toLowerCase());
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-transparent font-bold text-bark">
        {text.slice(index, index + trimmed.length)}
      </mark>
      {text.slice(index + trimmed.length)}
    </>
  );
}

export default function Search({ breeds }: { breeds: Breed[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const normalized = query.toLowerCase().replace(/\s+/g, "");
  const filteredBreeds =
    query === ""
      ? breeds
      : breeds.filter((breed) =>
          breed.name.toLowerCase().replace(/\s+/g, "").includes(normalized)
        );

  // Power-user shortcut: press "/" anywhere to jump to the search field.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleChange = (breed: Breed | null) => {
    if (breed?.reference_image_id) {
      router.push(`/details/${breed.reference_image_id}`);
    }
  };

  return (
    <Combobox value={null} onChange={handleChange}>
      <div className="group relative w-full max-w-md">
        <SearchIcon
          aria-hidden
          strokeWidth={2.2}
          className="pointer-events-none absolute left-5 top-1/2 z-10 size-5 -translate-y-1/2 text-espresso/40 transition-colors group-focus-within:text-amber"
        />

        <ComboboxInput
          ref={inputRef}
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(breed: Breed) => breed?.name ?? ""}
          placeholder="Search a breed…"
          aria-label="Search cat breeds"
          autoComplete="off"
          className="h-14 w-full rounded-full bg-cream/95 pl-14 pr-24 text-base text-espresso shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] outline-none ring-1 ring-white/25 backdrop-blur-sm transition placeholder:text-espresso/40 focus:bg-cream focus:ring-2 focus:ring-amber"
        />

        <kbd className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-md border border-espresso/15 bg-white/60 px-2 py-1 font-sans text-xs font-semibold text-espresso/50 transition-opacity group-focus-within:opacity-0 sm:flex">
          /
        </kbd>
      </div>

      <ComboboxOptions
        anchor="bottom start"
        transition
        className="z-50 mt-3 w-(--input-width) origin-top rounded-2xl border border-espresso/10 bg-cream p-2 shadow-[0_30px_70px_-25px_rgba(21,10,2,0.6)] [--anchor-gap:0.6rem] focus:outline-none data-closed:scale-95 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
      >
        <div className="flex items-center justify-between px-3 pb-2 pt-1">
          <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.18em] text-espresso/45">
            Breeds
          </span>
          <span className="font-sans text-[0.65rem] font-semibold text-amber">
            {filteredBreeds.length} found
          </span>
        </div>

        <div className="scroll-elegant max-h-72 overflow-y-auto">
          {filteredBreeds.length === 0 ? (
            <div className="flex flex-col items-center gap-2 px-4 py-8 text-center">
              <PawPrint aria-hidden className="size-7 text-espresso/30" />

              <p className="font-sans text-sm text-espresso/60">
                No breeds match{" "}
                <span className="font-semibold text-espresso">
                  &ldquo;{query}&rdquo;
                </span>
              </p>
            </div>
          ) : (
            filteredBreeds.map((breed) => (
              <ComboboxOption
                key={breed.id}
                value={breed}
                className="group/option flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors data-focus:bg-amber/12"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="size-1.5 shrink-0 rounded-full bg-espresso/20 transition-colors group-data-focus/option:bg-amber" />
                  <span className="truncate font-sans text-sm font-medium text-espresso">
                    <Highlight text={breed.name} query={query} />
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  {breed.origin && (
                    <span className="hidden font-sans text-xs text-espresso/45 sm:inline">
                      {breed.origin}
                    </span>
                  )}
                  <ChevronRight
                    aria-hidden
                    strokeWidth={2.5}
                    className="size-4 -translate-x-1 text-amber opacity-0 transition-all group-data-focus/option:translate-x-0 group-data-focus/option:opacity-100"
                  />
                </span>
              </ComboboxOption>
            ))
          )}
        </div>
      </ComboboxOptions>
    </Combobox>
  );
}
