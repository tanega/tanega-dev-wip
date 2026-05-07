import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <div aria-hidden="true" className="mb-10 opacity-20">
        <svg
          viewBox="0 0 200 200"
          width={180}
          height={180}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.75}
          className="text-accent"
        >
          <circle cx="100" cy="100" r="90" strokeDasharray="8 5" />
          <ellipse cx="100" cy="100" rx="45" ry="90" />
          <ellipse cx="100" cy="100" rx="90" ry="30" />
          <line x1="10" y1="100" x2="190" y2="100" />
          <line x1="80" y1="80" x2="120" y2="120" stroke="var(--color-accent-warm)" strokeWidth="2" />
          <line x1="120" y1="80" x2="80" y2="120" stroke="var(--color-accent-warm)" strokeWidth="2" />
        </svg>
      </div>

      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
        {t("label")}
      </p>
      <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
        {t("title")}
      </h1>
      <p className="mb-10 max-w-sm text-muted">{t("description")}</p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-accent px-5 text-sm font-medium text-background transition-colors duration-200 hover:bg-accent-light"
        >
          {t("backHome")}
        </Link>
        <Link
          href="/projects"
          className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border px-5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
        >
          {t("viewProjects")}
        </Link>
      </div>
    </main>
  );
}
