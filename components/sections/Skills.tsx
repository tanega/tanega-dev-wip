"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SKILL_ITEMS = [
  {
    key: "frontend" as const,
    accent: "text-accent-warm",
    borderAccent: "border-accent-warm/30",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Deck.gl", "Leaflet"],
  },
  {
    key: "backend" as const,
    accent: "text-accent-cool",
    borderAccent: "border-accent-cool/30",
    skills: ["Python", "FastAPI", "Node.js", "PostgreSQL", "PostGIS", "Redis", "GraphQL", "REST"],
  },
  {
    key: "dataGis" as const,
    accent: "text-accent",
    borderAccent: "border-accent/30",
    skills: ["GDAL", "QGIS", "rasterio", "Shapely", "dbt", "Airbyte", "BigQuery", "Pandas"],
  },
  {
    key: "devops" as const,
    accent: "text-muted",
    borderAccent: "border-border",
    skills: ["Docker", "GitHub Actions", "Vercel", "Supabase", "Terraform", "GCS", "Airflow", "Git"],
  },
];

export default function Skills() {
  const t = useTranslations("skills");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".skills-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
      gsap.fromTo(
        ".skill-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: { amount: 0.5, from: "start" },
          ease: "power2.out",
          scrollTrigger: { trigger: ".skill-card", start: "top 85%" },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="border-t border-border/30 py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="skills-header mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-4">
            {t("label")}
          </p>
          <h2 className="text-3xl font-bold text-foreground">{t("heading")}</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {SKILL_ITEMS.map((cat) => (
            <div
              key={cat.key}
              className={cn(
                "skill-card rounded-xl border bg-surface p-6",
                cat.borderAccent,
              )}
            >
              <p
                className={cn(
                  "mb-4 font-mono text-xs font-semibold uppercase tracking-widest",
                  cat.accent,
                )}
              >
                {t(`categories.${cat.key}`)}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border bg-elevated px-2.5 py-1 text-xs text-muted transition-colors duration-150 hover:border-border/80 hover:text-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
