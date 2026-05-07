import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContourBackground from "@/components/layout/ContourBackground";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  const frBase = BASE;
  const enBase = `${BASE}/en`;

  return {
    metadataBase: new URL(BASE),
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    authors: [{ name: "Gaëtan" }],
    keywords: [
      "fullstack developer",
      "data engineer",
      "geospatial",
      "earth observation",
      "biodiversity",
      "Next.js",
      "PostGIS",
    ],
    alternates: {
      canonical: locale === "fr" ? frBase : enBase,
      languages: {
        fr: frBase,
        en: enBase,
        "x-default": frBase,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Gaëtan",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      title: t("title"),
      description: t("description"),
      url: locale === "fr" ? frBase : enBase,
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <ContourBackground />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-background focus:outline-none"
            >
              {locale === "fr" ? "Aller au contenu" : "Skip to content"}
            </a>
            <Header />
            <div id="main-content" className="flex flex-1 flex-col">
              {children}
            </div>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
