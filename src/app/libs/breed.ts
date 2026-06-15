/**
 * Split The Cat API's comma-separated `temperament` string into clean,
 * non-empty trait labels. Centralised so the parsing (and empty-value
 * filtering) stays consistent across cards, detail pages and metadata.
 */
export function parseTemperament(temperament?: string): string[] {
  return (
    temperament
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) ?? []
  );
}
