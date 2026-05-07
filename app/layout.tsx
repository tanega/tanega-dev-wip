// Root layout — required by Next.js for robots.ts / sitemap.ts at app root.
// Actual <html>/<body> structure lives in app/[locale]/layout.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
