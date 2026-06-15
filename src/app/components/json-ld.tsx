/**
 * Renders a schema.org JSON-LD block. Centralises the <script> boilerplate so
 * pages only describe the data. The `<` escaping guards against breaking out of
 * the script tag if any field ever contains user/API-provided markup.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
