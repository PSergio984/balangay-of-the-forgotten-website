# Phase 1: The "WOW" Landing Page - Context

**Gathered:** 2026-05-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Creation of an immersive, pixel-perfect landing page that sets the game's atmosphere and delivers immediate visual impact through parallax effects, scroll-triggered animations, and a thematic "in-universe" UI.

</domain>

<decisions>
## Implementation Decisions

### Asset Management
- **D-01:** **Git LFS (In-Repo)** — All game assets (sprites, backgrounds, trailer) will be stored directly in the repository using Git LFS for versioning and simplicity.

### Interactivity & Motion
- **D-02:** **GSAP + ScrollTrigger** — Use GSAP for high-end "WOW" factor parallax and scroll-linked animations.
- **D-03:** **Lenis Smooth Scroll** — Implement smooth momentum scrolling to enhance the cinematic feel of the parallax effects.

### Visual Brand & Theme
- **D-04:** **Hybrid Pixel-Thematic Theme** — A combination of "Adventurer's Logbook" and "Ancient Scroll" aesthetics with a strong emphasis on crisp pixel art.
- **D-05:** **Vibrant Game Palette** — Use the bright, saturated colors from the game sprites as the primary color direction.
- **D-06:** **Full-Screen Cinematic Hero** — The landing page opens with a full-screen immersive scene.
- **D-07:** **Bulletin Board News Feed** — Game updates will be presented as pinned notes on a thematic bulletin board.

### Typography & Navigation
- **D-08:** **Hybrid Typography** — Pixel art fonts for titles/headers; clean serif or sans-serif fonts for long-form lore text to ensure readability.
- **D-09:** **Sticky Pixel Bar** — A persistent, pixel-styled navigation bar for easy access between sections.

### Experience Enhancements
- **D-12:** **Ambient Music Hook** — Include atmospheric game loops with a clear "Unmute" button/toggle.
- **D-13:** **Integer Upscaling for Mobile** — Maintain pixel crispness on mobile by using integer-ratio scaling.

### Claude's Discretion
- Selection of specific pixel fonts that balance aesthetic with readability.
- Implementation details for the scroll-triggered animation sequences.
- Mobile-specific layout adjustments for the bulletin board and timeline.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Foundation
- `.planning/PROJECT.md` — Core project vision and value.
- `.planning/REQUIREMENTS.md` — Full v1 requirements and scope.
- `.planning/ROADMAP.md` — Phase structure and success criteria.

### Research & Strategy
- `.planning/research/SUMMARY.md` — Synthesized technical and domain research.
- `.planning/research/STACK.md` — Technology stack decisions (Next.js, Tailwind v4, etc.).
- `.planning/research/PITFALLS.md` — Domain-specific landmines (Pixel blurring, etc.).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None (Greenfield project).

### Established Patterns
- **Styling**: Tailwind CSS v4 with `image-rendering: pixelated`.
- **Architecture**: Next.js 15 App Router.

### Integration Points
- Landing page (`app/page.tsx`).
- Wiki root (`app/wiki/page.tsx`).

</code_context>

<specifics>
## Specific Ideas

- "Something amazing like WOW, like a parallax website" — prioritized high-impact motion.
- "Combination of all [themes] with emphasis on pixel" — ensures the "Forgotten" lore feeling meets the pixel art game style.

</specifics>

<deferred>
## Deferred Ideas

- **ASP.NET Integration**: Entirely deferred to v2 per user instructions.
- **Hybrid Tabletop Features**: Real-time health/turn tracking deferred to later milestones.

</deferred>

---

*Phase: 1-The "WOW" Landing Page*
*Context gathered: 2026-05-25*
