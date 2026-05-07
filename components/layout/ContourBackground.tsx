"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ContourBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;

    const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    fetch(`${basePath}/contour_lines_44.svg`)
      .then((r) => r.text())
      .then((svgText) => {
        if (cancelled || !container) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const svgEl = doc.querySelector("svg");
        if (!svgEl) return;

        svgEl.setAttribute("width", "100%");
        svgEl.setAttribute("height", "100%");
        svgEl.setAttribute("preserveAspectRatio", "xMidYMid slice");
        svgEl.style.display = "block";

        // Strip opaque fills (white background rects)
        svgEl.querySelectorAll<SVGElement>("[fill='#ffffff'], [fill='white'], [fill-opacity='1']").forEach((el) => {
          el.setAttribute("fill", "none");
        });

        container.innerHTML = "";
        container.appendChild(svgEl);

        const paths = Array.from(svgEl.querySelectorAll<SVGPathElement>("path"));

        paths.forEach((path) => {
          // Use CSS class so stroke color responds to data-theme changes
          path.classList.add("contour-path");
          path.setAttribute("fill", "none");
          path.setAttribute("stroke-width", "2.5");

          try {
            const len = path.getTotalLength();
            if (len === 0) return;
            path.style.strokeDasharray = String(len);
            path.style.strokeDashoffset = String(len);
          } catch {
            // path type doesn't support getTotalLength — skip
          }
        });

        // Staggered draw-in with random per-path delay
        paths.forEach((path) => {
          const len = parseFloat(path.style.strokeDasharray);
          if (!len) return;

          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.2 + Math.random() * 2.4,
            delay: Math.random() * 4,
            ease: "power2.inOut",
          });
        });
      })
      .catch(() => {
        // SVG unavailable — background gradient still shows
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-80"
    />
  );
}
