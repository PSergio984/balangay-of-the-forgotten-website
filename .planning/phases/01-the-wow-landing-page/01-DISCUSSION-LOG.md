# Phase 1: The "WOW" Landing Page - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-25
**Phase:** 1-The "WOW" Landing Page
**Areas discussed:** Asset Storage, Interactivity Library, Thematic UI Theme, Hero Component Layout, Typography Strategy, Navigation UX, News Feed Style, Color Palette, Timeline Interaction, Wiki Layout Structure, Audio Experience, Mobile Pixel Policy

---

## Asset Storage

| Option | Description | Selected |
|--------|-------------|----------|
| Git LFS (In-Repo) | Keeps everything together, good for pixel art and versioning. | ✓ |
| Cloudinary / CDN | Better for large videos/images, optimized delivery, keeps repo light. | |
| Payload CMS Media | Centralized content management, easy to update lore/images together. | |

**User's choice:** Git LFS (In-Repo)
**Notes:** User specifically asked about Cloudinary but preferred the repo approach for simplicity and versioning.

---

## Interactivity Library

| Option | Description | Selected |
|--------|-------------|----------|
| Framer Motion | Great for React/Next.js, declarative, easy scroll-triggered animations. | |
| GSAP + ScrollTrigger | Industrial grade, excellent for complex timelines and parallax. | ✓ |
| Vanilla CSS / Tailwind | Keep it light, use standard CSS transitions and keyframes. | |

**User's choice:** GSAP + ScrollTrigger
**Notes:** User also approved **Lenis Smooth Scroll** to enhance the GSAP experience.

---

## Thematic UI Theme

| Option | Description | Selected |
|--------|-------------|----------|
| Adventurer's Logbook | Structured, gritty, feels like a field guide for a traveler. | |
| Ancient Scroll | Mystical, weathered edges, feels like discovering lost lore. | |
| Modern Pixel-Lite | Clean, modern game dashboard with pixel art accents. | |

**User's choice:** combination of all with emphasis on pixel
**Notes:** Hybrid approach captured as "Hybrid Pixel-Thematic".

---

## Hero Component Layout

| Option | Description | Selected |
|--------|-------------|----------|
| Full-Screen Cinematic | Immersive opening scene that takes over the viewport. | ✓ |
| Contained Showcase | Classic hero header with text and a centered character showcase. | |

**User's choice:** Full-Screen Cinematic

---

## Typography Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Hybrid (Pixel + Clean) | Pixel fonts for titles, clean serif/sans-serif for reading lore. | ✓ |
| Full Pixel Art Fonts | Use pixel fonts for everything. | |

**User's choice:** Hybrid (Pixel + Clean)

---

## Navigation UX

| Option | Description | Selected |
|--------|-------------|----------|
| Hidden/Overlay Menu | A 'Hamburger' style menu with a pixel art icon that opens a full-screen map/menu. | |
| Sticky Pixel Bar | A pixel-styled bar at the top that stays as you scroll. | ✓ |

**User's choice:** Sticky Pixel Bar

---

## News Feed Style

| Option | Description | Selected |
|--------|-------------|----------|
| Bulletin Board Hook | Looks like a town bulletin board with pinned notes. | ✓ |
| Standard List Feed | Modern clean feed with pixel thumbnails. | |

**User's choice:** Bulletin Board Hook

---

## Color Palette

| Option | Description | Selected |
|--------|-------------|----------|
| Vibrant Game Palette | Bright, saturated colors from the game sprites. | ✓ |
| Weathered Lore Palette | Sepia, weathered, and desaturated tones for a 'lost' feeling. | |

**User's choice:** Vibrant Game Palette

---

## Timeline Interaction

| Option | Description | Selected |
|--------|-------------|----------|
| Vertical Scroll-based | Scroll down to move through time, easy for mobile. | ✓ |
| Horizontal Drag-based | Classic horizontal line you can drag or click. | |

**User's choice:** Vertical Scroll-based

---

## Wiki Layout Structure

| Option | Description | Selected |
|--------|-------------|----------|
| Two-Column Sidebar | Sidebar on the left for categories, content on the right. | ✓ |
| Single-Column Focused | Clean, centered reading experience, sidebar hidden in a menu. | |

**User's choice:** Two-Column Sidebar

---

## Audio Experience

| Option | Description | Selected |
|--------|-------------|----------|
| UI Sound Effects Only | Subtle UI clicks and hover sounds to enhance the pixel feel. | |
| Ambient Music Hook | Atmospheric loop from the game (with an 'Unmute' button). | ✓ |
| Silent by Default | No sound at all. | |

**User's choice:** Ambient Music Hook

---

## Mobile Pixel Policy

| Option | Description | Selected |
|--------|-------------|----------|
| Integer Upscaling | Scale pixel art up to fit screen width, maintaining crispness. | ✓ |
| Fluid Responsive Scaling | Allow 'fluid' scaling that might slightly blur pixels. | |

**User's choice:** Integer Upscaling

---

## Claude's Discretion

- Selection of specific pixel fonts.
- Implementation details for GSAP animation sequences.
- Mobile layout optimizations.

## Deferred Ideas

- ASP.NET Integration (Phase v2).
- SignalR Tabletop Bridge (Phase v2).
