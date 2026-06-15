"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

export default function GlobalError({
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
    <html lang="en">
      <body>
        <main className="flex flex-col items-center justify-center text-center min-h-screen gap-4 p-4">
          <h1 className="text-3xl font-bold text-[#291507]">
            Something went wrong
          </h1>
          <p className="text-gray-600 max-w-md">
            A critical error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-[#291507] px-6 py-2 text-white transition-opacity hover:opacity-80"
          >
            <RotateCcw aria-hidden className="size-4" />
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
