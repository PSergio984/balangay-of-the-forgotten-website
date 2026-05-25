---
status: draft
phase: 1
name: The "WOW" Landing Page
design_system: Pixelact UI (Tailwind 4)
---

# UI Design Contract - Phase 1

## Design System & Registry

- **Base System:** Tailwind CSS v4 + Pixelact UI (Custom)
- **Visual Style:** Retro-Futurism / 2D Pixel Art
- **Registry:** shadcn (not initialized yet, using custom components with pixel-art logic)
- **Rendering Policy:** `image-rendering: pixelated` must be applied globally to all `img` and `canvas` elements.

## Spacing & Grid

| Token | Value | Usage |
|-------|-------|-------|
| `--p-unit` | `4px` | Base pixel-art unit |
| `--space-xs` | `4px` | Tight gaps (1 unit) |
| `--space-sm` | `8px` | Icon gaps, inline spacing (2 units) |
| `--space-md` | `16px` | Standard padding (4 units) |
| `--space-lg` | `24px` | Section padding (6 units) |
| `--space-xl` | `32px` | Large gaps (8 units) |
| `--space-2xl` | `48px` | Section margins (12 units) |
| `--space-3xl` | `64px` | Hero padding (16 units) |

**Grid Layout:**
- **Standard Width:** `max-w-7xl` (1280px) for content.
- **Hero:** Full-viewport height (`100vh`).
- **Responsive:** Integer scaling (1x, 2x, 4x) for all pixel-art assets.

## Typography

- **Heading Font:** `Press Start 2P` (Google Fonts)
- **Body Font:** `VT323` (Google Fonts)
- **Body Line Height:** 1.5
- **Heading Line Height:** 1.2

| Role | Font Size | Weight | Line Height | Usage |
|------|-----------|--------|-------------|-------|
| Display | 32px | 400 | 1.1 | Hero Main Title |
| H1 | 28px | 400 | 1.2 | Section Headers |
| H2 | 20px | 400 | 1.2 | Subsection Headers |
| Body | 16px | 400 | 1.5 | Long-form Lore / Content |
| Detail | 14px | 400 | 1.4 | Captions, News dates |

## Color Contract

Following the **60-30-10** split for visual hierarchy:

| Role | Hex | Color Name | Split | Usage |
|------|-----|------------|-------|-------|
| Background | `#F0F9FF` | Sky Mist | 60% | Primary surface, empty space |
| Secondary | `#0EA5E9` | Deep Sky | 30% | Sidebar, Nav, Containers, Cards |
| Accent | `#F97316` | Retro Gold | 10% | CTA Buttons, Focus States, Highlights |
| Text | `#0C4A6E` | Midnight Blue | - | Standard readable text |

**Thematic Variance:** Each landing page "Chapter" follows a progressive color reveal as defined in `landing-page.md`.

## Motion & Interaction

- **Smooth Scroll:** Lenis (Lerp: 0.1, Duration: 1.2s).
- **Parallax (GSAP):**
    - **Background Layer:** `yPercent: -25` (slowest)
    - **Mid Layer:** `yPercent: -15`
    - **Foreground Layer:** `yPercent: -5` (fastest)
- **Entrance Animations:** 
    - Section headers slide up (`y: 30`) and fade in (`opacity: 0` to `1`) when 20% in view.
    - Bulletin board items stagger in with `0.1s` delay.
- **Hover States:**
    - Buttons: Scale `1.05x`, transition `200ms ease-out`.
    - Nav Items: Underline animation (pixel-border expansion).

## Copywriting

| Element | Copy |
|---------|------|
| **Primary CTA** | `EXPLORE THE FORGOTTEN` |
| **Secondary CTA** | `READ THE LOGBOOK` |
| **Empty State** | `The logbook is currently blank. Check back for new discoveries.` |
| **Error State** | `Signal lost. The archives are currently inaccessible. Please reconnect.` |
| **Destructive** | N/A (No destructive actions in Phase 1) |

## Component Inventory

1. **ParallaxHero**: Multi-layer background scene with centered Logo and Primary CTA.
2. **AncientScrollContainer**: Full-width lore container with SVG-masked scroll edges.
3. **BulletinBoard**: Flex/Grid container for news items styled as pinned notes.
4. **PixelNavbar**: Sticky header with pixelated border and nav links.
5. **LogbookEntry**: Two-column layout with a sprite on one side and lore text on the other.

## Implementation Notes

- **Mobile Policy:** On viewports < 768px, disable multi-layer parallax for performance; use simple fade-ins.
- **Asset Loading:** Use Next.js `Image` component with `priority` for Hero layers.
- **Accessibility:** Ensure all `Press Start 2P` text has adequate contrast against background (Midnight Blue on Sky Mist passes 4.5:1).
- **Thematic Hook:** Use a CRT scanline overlay (CSS pseudo-element) on the entire viewport for "In-Universe" feeling.
