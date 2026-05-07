"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import Badge from "@/components/ui/Badge";
import type { BadgeVariant } from "@/components/ui/Badge";

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const t = useTranslations("hero");
  const containerRef = useRef<HTMLDivElement>(null);

  const ROLES: { label: string; variant: BadgeVariant }[] = [
    { label: t("roles.fullstack"), variant: "muted" },
    { label: t("roles.data"), variant: "cool" },
    { label: t("roles.geospatial"), variant: "default" },
  ];

  const line1Words = t("headlineLine1").split(" ");
  const line2Words = t("headlineLine2").split(" ");

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-eyebrow",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 },
      );
      gsap.fromTo(
        ".hero-word",
        { y: 56, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.4,
        },
      );
      gsap.fromTo(
        ".hero-sub",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 1.15 },
      );
      gsap.fromTo(
        ".hero-tags",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 1.45 },
      );
      gsap.fromTo(
        ".hero-cta",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 1.7 },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <div className="hero-eyebrow mb-7 flex items-center gap-3">
          <span className="h-px w-8 shrink-0 bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            {t("eyebrow")}
          </span>
        </div>

        <h1 className="mb-6 font-bold leading-[1.1] tracking-tight text-foreground">
          <span className="block overflow-hidden text-5xl md:text-7xl">
            {line1Words.map((word, wi) => (
              <span key={wi} className="hero-word mr-[0.28em] inline-block last:mr-0">
                {word}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden text-5xl md:text-7xl">
            {line2Words.map((word, wi) => (
              <span key={wi} className="hero-word mr-[0.28em] inline-block last:mr-0">
                {word}
              </span>
            ))}
          </span>
          <span className="block overflow-hidden text-5xl md:text-7xl">
            <span className="hero-word mr-[0.28em] inline-block text-accent">
              {t("headlineAccent1")}
            </span>
            <span className="hero-word mr-[0.28em] inline-block">&amp;</span>
            <span className="hero-word inline-block text-accent-warm">
              {t("headlineAccent2")}
            </span>
          </span>
        </h1>

        <p className="hero-sub mb-8 max-w-xl text-lg leading-relaxed text-muted">
          {t("subheadline")}
        </p>

        <div className="hero-tags mb-10 flex flex-wrap gap-2">
          {ROLES.map(({ label, variant }) => (
            <Badge key={label} variant={variant}>
              {label}
            </Badge>
          ))}
        </div>

      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          {t("scroll")}
        </span>
        <span className="block h-8 w-px animate-pulse bg-muted" />
      </div>
    </section>
  );
}
