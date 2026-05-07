import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const NAMESPACES = [
  "nav",
  "header",
  "footer",
  "notFound",
  "locale",
  "metadata",
  "hero",
  "about",
  "skills",
  "launch",
] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale =
    requested && routing.locales.includes(requested as "fr" | "en")
      ? requested
      : routing.defaultLocale;

  const entries = await Promise.all(
    NAMESPACES.map(async (ns) => {
      const mod = await import(`../locales/${locale}/${ns}.json`);
      return [ns, mod.default] as const;
    }),
  );

  return {
    locale,
    messages: Object.fromEntries(entries),
  };
});
