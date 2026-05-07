# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

## [0.8.0] — 2026-04-13

### Added
- `app/sitemap.ts` — dynamic sitemap including all static routes and blog post slugs; respects `NEXT_PUBLIC_SITE_URL` env var
- `app/robots.ts` — robots.txt allowing all crawlers and pointing to sitemap
- `app/not-found.tsx` — custom 404 page ("Off the map") with broken globe SVG and navigation links
- Skip-to-content link in `app/layout.tsx` for keyboard and screen-reader users
- `id="main-content"` wrapper div in root layout for skip-link target

### Changed
- `app/layout.tsx` — added `metadataBase`, full Open Graph and Twitter card metadata, `robots` directives
- `components/sections/ProjectsList.tsx` — filter buttons now have `type="button"` and `aria-pressed` for correct toggle semantics

## [0.7.0] — 2026-04-13

### Added
- `components/transitions/SvgWipe.tsx` — fixed full-screen SVG overlay (parallelogram shape with wireframe grid + accent stripe); exposes `leave()`/`enter()` GSAP tween handles via `forwardRef`
- `components/transitions/TransitionLayout.tsx` — `TransitionRouter` provider with `auto` link interception; `leave` sweeps the SVG panel in, `enter` sweeps it out while fading the new `<main>` in
- CSS keyframes in `globals.css`: `fade-up`, `animate-fade-up-stagger` (staggered children), `link-underline` animated underline utility, `animate-shimmer` skeleton helper
- Blog post pages use `animate-fade-up-stagger` for a CSS entrance after the page transition

### Changed
- `app/layout.tsx` — wrapped with `TransitionLayout`

## [0.5.0] — 2026-04-13

### Added
- `components/sections/ProjectsList.tsx` — client component with:
  - Category filter tabs (All / Geospatial / Data·EO / Fullstack / Exploration) with per-category counts
  - GSAP filter transition: grid fades out via `gsap.to`, React re-renders via `flushSync`, grid fades in
  - GSAP entrance stagger on page load (header → filters → cards)
- `app/projects/page.tsx` — updated with proper metadata and `ProjectsList`

## [0.4.0] — 2026-04-13

### Added
- `lib/data/projects.ts` — `Project` type, `categoryMeta` map, and 6 sample projects (4 featured, 2 exploration)
- `components/ui/ProjectCard.tsx` — card with category badge, tag chips, hover glow effect, and optional live/repo links; includes compact list variant `ProjectCardCompact`
- `components/sections/Skills.tsx` — 2×2 category grid (Frontend / Backend / Data·GIS / DevOps) with ScrollTrigger reveal
- `components/sections/FeaturedProjects.tsx` — responsive 2-column card grid with stagger ScrollTrigger and "View all" link
- `app/page.tsx` — landing page now composes Hero → About → Skills → FeaturedProjects

## [0.3.0] — 2026-04-13

### Added
- `components/sections/Hero.tsx` — full-viewport hero with:
  - GSAP word-stagger headline animation (opacity + translateY)
  - Wireframe globe SVG with stroke draw-in animation and slow drift rotation
  - Eyebrow label, role `Badge` chips, CTA buttons, scroll hint
- `components/sections/About.tsx` — narrative section with ScrollTrigger reveal and terminal-style skills card
- `app/page.tsx` — landing page composing Hero + About

### Changed
- `components/ui/Badge.tsx` — exported `BadgeVariant` type for reuse

## [0.2.0] — 2026-04-13

### Added
- `components/layout/Header.tsx` — sticky, backdrop-blur nav with active-link underline animation and mobile hamburger menu
- `components/layout/Footer.tsx` — wordmark, tagline, and SVG social icon links (GitHub, LinkedIn, X)
- `components/ui/Button.tsx` — polymorphic button with `primary`, `secondary`, `ghost` variants and `sm`/`md`/`lg` sizes
- `components/ui/Badge.tsx` — pill badge with `default`, `warm`, `cool`, `muted` colour variants
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `app/projects/page.tsx` and `app/blog/page.tsx` placeholder routes
- Root layout wired with Header and Footer

## [0.1.0] — 2026-04-13

### Added
- Initial project bootstrap with Next.js 15 (App Router), TypeScript, and Tailwind CSS v4
- Dark-first design system with earth/nature colour palette (`globals.css`)
- Root layout with Geist Sans + Geist Mono fonts and base metadata
- Core dependency set: `gsap`, `@gsap/react`, `next-transition-router`, `gray-matter`, `remark`, `remark-html`, `rehype-pretty-code`, `lucide-react`, `reading-time`
- Project directory structure: `components/`, `lib/`, `content/`, `public/`
- `CHANGELOG.md` (this file)
