# Phase 1 Revision: Landing Page & Parallax - Context

**Re-gathered:** 2026-05-25
**Status:** Ready for planning

<domain>
## Phase Boundary

Reorganize public assets, implement a pinned parallax hero using the looping background video and pixel logo, and integrate real game assets (character animations, region maps, relics, and real soundtrack) into the landing page.

</domain>

<decisions>
## Implementation Decisions

### 1. Asset Reorganization
- **D-01:** Rename and move complex public folders into clean, lowercase, kebab-case directories:
  - `public/card-animations/*` -> `public/cards/`
  - `public/SHADOW-20260525T163633Z-3-001/SHADOW/*` -> `public/characters/`
  - `public/Background Music-.../*` -> `public/audio/`
  - `public/Figth Scene-.../*` -> `public/fight-scene/`
  - `public/loadingscreen-.../*` -> `public/videos/loading/`
  - `public/video-animations/*` -> `public/videos/animations/`

### 2. Parallax Hero (Option A)
- **D-02:** **Pinned Background Video** — Use `videos/animations/menuscreen.mp4` as a pinned, looping, muted background video.
- **D-03:** **Pixel Title Layering** — Layer the high-resolution logo `BotF LOGO PIXE2L.png` on top.
- **D-04:** **Scroll Pinning & Overlay** — The Hero section remains pinned at the top. As the user scrolls, the logo translates upward and fades, and the boat sails. The main content container (`AncientScrollContainer`) slides up from the bottom to overlay/cover the hero.

### 3. Landing Page Content & Real Assets
- **D-05:** **Interactive Character Roles** — Replace placeholders in the Roles grid with actual character card GIFs (`public/cards/*`). Hovering/selecting a role reveals their sprite animation (`public/characters/*`) and plays their character theme song (e.g. `public/audio/roles/babaylan.mp3`).
- **D-06:** **Territory Map Section** — Add an interactive map component using `choosing-territory.png` where users can inspect regional maps (e.g. `daragang-magayon.png`) and play their corresponding ambient music tracks (e.g. `daragang-magayon.mp3`).
- **D-07:** **Relic Inventory** — Create a styled pixel-art grid to showcase game relics (`public/relics/*`) and their lore.
- **D-08:** **Atmospheric Ambient Music** — Replace the current `/ambient-loop.mp3` placeholder in `AmbientPlayer` with `public/audio/intro/isla-ng-lihim.mp3`.

</decisions>

<canonical_refs>
## Canonical References

- `.planning/PROJECT.md` — Core project vision.
- `.planning/REQUIREMENTS.md` — Full v1 requirements.
- `.planning/ROADMAP.md` — Phase structure.

</canonical_refs>

<code_context>
## Existing Code Insights

- `app/page.tsx` — Main landing page.
- `components/landing/ParallaxHero.tsx` — Target for pinned video parallax.
- `components/landing/AncientScrollContainer.tsx` — Content wrapper sliding up over the Hero.
- `components/audio/AmbientPlayer.tsx` — Target for game theme loop integration.

</code_context>
