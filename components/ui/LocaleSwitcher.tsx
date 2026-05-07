"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("locale");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function toggle() {
    const next = locale === "fr" ? "en" : "fr";
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <button
      onClick={toggle}
      disabled={isPending}
      aria-label={t("switchTo")}
      title={t("switchTo")}
      className="flex h-9 items-center justify-center rounded-md px-2 font-mono text-xs font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50"
    >
      {locale === "fr" ? "EN" : "FR"}
    </button>
  );
}
