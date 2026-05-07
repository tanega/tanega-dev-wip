// Generic fallback for routes that don't match any [locale] segment.
// Locale-aware 404 is at app/[locale]/not-found.tsx.
import Link from "next/link";
export default function NotFound() {
  return (
    <html lang="fr">
      <body
        style={{
          fontFamily: "monospace",
          padding: "4rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          404
        </p>
        <h1 style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
          Page introuvable
        </h1>
        <Link href="/" style={{ display: "inline-block", marginTop: "2rem" }}>
          ← Accueil
        </Link>
      </body>
    </html>
  );
}
