"use client";

import { useEffect } from "react";
import Link from "next/link";
import { House, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-4 sm:mx-8 md:mx-12 flex flex-1 flex-col items-center justify-center text-center gap-4">
      <h1 className="text-3xl font-bold text-espresso">
        Oops, something went wrong
      </h1>
      <p className="text-gray-600 max-w-md">
        An unexpected error occurred while loading this page. You can try again
        or go back to the home page.
      </p>
      {error.digest && (
        <p className="text-sm text-gray-400">Error ID: {error.digest}</p>
      )}
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-2 text-white transition-opacity hover:opacity-80"
        >
          <RotateCcw aria-hidden className="size-4" />
          Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-espresso px-6 py-2 text-espresso transition-opacity hover:opacity-80"
        >
          <House aria-hidden className="size-4" />
          Go home
        </Link>
      </div>
    </main>
  );
}
