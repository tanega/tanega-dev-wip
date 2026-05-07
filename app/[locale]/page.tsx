import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import LaunchDate from "@/components/sections/LaunchDate";

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex-1">
      <Hero />
      <About />
      <Skills />
      <LaunchDate />
    </main>
  );
}
