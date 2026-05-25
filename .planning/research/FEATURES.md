# Feature Landscape

**Domain:** Game Wiki & Landing Page
**Researched:** 2025-05-25

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Character/Enemy Wiki | Core purpose of the site. | Medium | Requires a flexible CMS to handle lore, stats, and media. |
| Responsive Pixel UI | Aesthetic must be consistent across mobile/desktop. | Medium | Requires specific CSS `image-rendering` and pixel-grid layouts. |
| Search functionality | Users need to find specific lore or game data quickly. | Low | Can be handled via Payload's search or Algolia/Meilisearch. |
| Interactive Landing Page | Showcase game trailer and primary hook. | Medium | Use Framer Motion for retro-style animations. |

## Differentiators

Features that set product apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Embedded Unity Preview | Allows players to "interact" with a character model or mini-scene directly on the wiki. | High | Uses `react-unity-webgl` to embed a stripped-down Unity build. |
| Hybrid Tabletop Bridge | Real-time connection between the website lore/data and a digital tabletop experience. | High | Requires ASP.NET Core SignalR and shared logic with Unity. |
| Lore Timeline | Interactive timeline of the game's world history. | Medium | Visual component driven by CMS data. |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| Full Tabletop Engine | Out of scope for current milestone. | Focus on data bridge and lore display first. |
| In-game Real-time Sync | Complexity is too high for MVP. | Deferred until Wiki is stable. |

## Feature Dependencies

```
CMS Data Infrastructure → Character Wiki → Embedded Unity Preview
ASP.NET Backend → SignalR Integration → Hybrid Tabletop Bridge
```

## MVP Recommendation

Prioritize:
1. **Responsive Pixel Landing Page**: Core identity and aesthetic.
2. **Lore & Character Wiki (CMS based)**: Primary value for players.
3. **Basic Search**: Essential for wiki usability.

Defer: **Unity Preview** and **Tabletop Bridge** to later milestones once the core content platform is validated.

## Sources

- Competitor analysis (Wikitide, Fandom, official game sites like Hades/Stardew Valley).
- Project requirements from `PROJECT.md`.
