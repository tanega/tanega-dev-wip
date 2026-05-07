"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function LaunchDate() {
  const t = useTranslations("launch");
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".launch-inner",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="border-t border-border/30 py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="launch-inner rounded-xl border border-accent/20 bg-surface p-10 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-4">
            {t("label")}
          </p>
          <p className="text-5xl font-bold text-foreground tracking-tight mb-4">
            {t("date")}
          </p>
          <h2 className="text-lg font-semibold text-muted mb-6">
            {t("heading")}
          </h2>
          <p className="mx-auto max-w-md text-sm text-muted leading-relaxed">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}
