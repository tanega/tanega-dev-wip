"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TERMINAL_SKILLS = [
  "Python / FastAPI - Django",
  "Elixir / Phoenix",
  "Ruby / Rails",
  "Next.js / React",
  "SvelteKit / Svelte",
  "Angular / VueJS",
  "PostGIS / GDAL",
  "DuckDB / DuckLake",
  "Deck.gl / Maplibre",
  "dbt / FME",
];

export default function About() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".about-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="border-t border-border/30 py-28"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1fr_auto] lg:gap-20">
          <div className="max-w-2xl">
            <p className="about-reveal font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-5">
              {t("label")}
            </p>

            <h2 className="about-reveal text-3xl font-bold leading-snug text-foreground mb-7">
              {t("heading")}{" "}
              <span className="text-accent">{t("headingAccent")}</span>
            </h2>

            <div className="space-y-4 text-[1.0625rem] leading-relaxed text-muted">
              <p className="about-reveal">{t("p1")}</p>
              <p className="about-reveal">{t("p2")}</p>
              <p className="about-reveal">{t("p3")}</p>
            </div>
          </div>

          <div className="about-reveal lg:pt-16">
            <div className="rounded-xl border border-border bg-surface font-mono text-xs min-w-[220px] overflow-hidden">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-accent-warm/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent/40" />
                <span className="h-2.5 w-2.5 rounded-full bg-border" />
              </div>
              <div className="p-5 space-y-1.5">
                <p className="text-subtle">$ whoami</p>
                <p className="text-foreground pb-3">Gaëtan</p>
                <p className="text-subtle">$ skills --top</p>
                {TERMINAL_SKILLS.map((skill) => (
                  <p key={skill} className="text-accent">
                    · {skill}
                  </p>
                ))}
                <p className="text-subtle pt-2 flex items-center gap-1">
                  ${" "}
                  <span className="inline-block h-[1em] w-2 animate-pulse bg-accent" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
