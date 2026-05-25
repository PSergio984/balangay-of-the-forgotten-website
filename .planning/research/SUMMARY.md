# Research Summary: Balangay of the Forgotten Website

**Project:** Balangay of the Forgotten Website
**Status:** Research Complete
**Synthesized:** 2025-05-25

## Executive Summary

Balangay of the Forgotten Website is a high-fidelity wiki and portfolio platform for a 2D pixel-art game. The project aims to provide players with deep lore and interactive data while maintaining a consistent, retro aesthetic. To achieve the best balance of SEO, performance, and game-engine compatibility, the research recommends a hybrid headless architecture.

The core approach involves using **Next.js** for the public-facing landing page and wiki to ensure lightning-fast loads and search engine visibility. **Payload CMS** will serve as the flexible content engine for lore and character data, running directly within the Next.js environment. For game-specific logic and real-time tabletop interactions, an **ASP.NET Core** backend is recommended to share C# data models with the **Unity** game engine.

The primary risks identified are visual degradation of pixel art ("Blurry Sprites"), data discrepancies between the game and wiki, and the creation of "Ghost Town" content structures. These will be mitigated through strict CSS image-rendering rules, a shared .NET model library with automated sync scripts, and a "vertical slice" content strategy that prioritizes quality over quantity in the initial phases.

## Key Findings

### From STACK.md
- **Core Framework:** Next.js 15.x / React 19.x for SEO and modern UI.
- **CMS:** Payload CMS 3.0 (headless, TypeScript-native).
- **Backend:** ASP.NET Core 9.0 for logic sharing with Unity.
- **Game Engine:** Unity 6 (LTS) for interactive WebGL previews.
- **Real-time:** SignalR for hybrid tabletop communication.

### From FEATURES.md
- **Must-Haves:** Character/Enemy wiki, Responsive Pixel UI, Search, Interactive Landing Page.
- **Differentiators:** Embedded Unity Preview, Hybrid Tabletop Bridge, Lore Timeline.
- **Anti-Features:** Deferred full tabletop engine and complex in-game real-time sync to V2+.

### From ARCHITECTURE.md
- **Pattern:** Hybrid Headless architecture with Next.js as the orchestrator.
- **Integration:** Shared .NET models between ASP.NET and Unity; JS-Unity bridge for React.
- **Scalability:** Next.js SSR/Static for content; Redis/Azure SignalR for real-time scaling.

### From PITFALLS.md
- **Critical:** "Blurry Sprite" syndrome (fix with CSS `image-rendering: pixelated`).
- **Critical:** Data desync (fix with shared .NET libraries and automation scripts).
- **Strategic:** "Ghost Town" wiki (fix with "Vertical Slice" content prioritization).

## Implications for Roadmap

### Suggested Phase Structure

1. **Phase 1: Visual Identity & Landing Page**
   - **Rationale:** Establishes the pixel-art aesthetic and provides an immediate landing spot.
   - **Delivers:** Responsive Pixel UI, Core Navigation, Landing Page animations.
   - **Features:** Interactive Landing Page, Responsive Pixel UI.
   - **Pitfalls:** Fixes "Blurry Sprite" syndrome and "Anti-Aliased Pixel Fonts" early.
   - **Research Flag:** Standard Patterns (Skip research).

2. **Phase 2: Lore & Wiki Infrastructure**
   - **Rationale:** Sets up the content engine before data gets complex.
   - **Delivers:** Payload CMS setup, Character/Enemy schemas, Basic Search.
   - **Features:** Character/Enemy Wiki, Basic Search.
   - **Pitfalls:** Avoids "Ghost Town" by focusing on the "Founding Five" core lore pages.
   - **Research Flag:** Needs Research (CMS data relationships & SEO optimization).

3. **Phase 3: The Data Bridge (Backend)**
   - **Rationale:** Establishes the shared source of truth between game and web.
   - **Delivers:** ASP.NET Core API, Shared .NET Models, Auto-Sync script from Unity.
   - **Features:** Data-driven Wiki stats.
   - **Pitfalls:** Directly addresses "Manual Data Entry Desync".
   - **Research Flag:** Needs Research (Unity-to-API automation script).

4. **Phase 4: Interactive Showcase**
   - **Rationale:** Adds high-value visual engagement once the data layer is stable.
   - **Delivers:** Unity WebGL builds, `react-unity-webgl` integration.
   - **Features:** Embedded Unity Preview.
   - **Pitfalls:** Fixes "Asset Weight Overload" through lazy-loading strategies.
   - **Research Flag:** Needs Research (Unity-React bridge events).

5. **Phase 5: Real-time Tabletop Integration**
   - **Rationale:** The most complex logic; builds on top of all previous phases.
   - **Delivers:** SignalR Hubs, real-time data sync between web and game client.
   - **Features:** Hybrid Tabletop Bridge.
   - **Pitfalls:** Avoids "The Monolith" by keeping real-time logic separate from content delivery.
   - **Research Flag:** Needs Research (SignalR scaling and state synchronization).

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Modern, well-supported technologies chosen for specific strengths. |
| Features | HIGH | Clear distinction between MVP and future growth. |
| Architecture | HIGH | Hybrid approach addresses SEO and real-time needs effectively. |
| Pitfalls | HIGH | Deep understanding of pixel-art and game-data specific issues. |

**Gaps to Address:**
- Precise technical implementation of the Unity-to-Payload auto-sync script.
- Hosting strategy for hybrid Next.js/ASP.NET deployment (e.g., Vercel + Azure or Docker).

## Sources
- Next.js Documentation (HIGH)
- Payload CMS 3.0 Docs (HIGH)
- ASP.NET Core 9.0 Minimal APIs (HIGH)
- React Unity WebGL Documentation (MEDIUM)
- CSS image-rendering MDN (HIGH)
- Minecraft Wiki Style Guide (HIGH)
