# Phase 2 Context: Wiki Core & Content Engine

## Overview
Phase 2 focuses on building the foundational infrastructure for the "Balangay of the Forgotten" wiki. This involves setting up a professional headless CMS (Payload 3.0), defining the lore data models, and creating an immersive yet functional "Fandom-style" wiki interface that maintains the pixel-art aesthetic.

## Implementation Decisions

### 1. Content Management System (CMS)
- **Engine**: Payload CMS 3.0 (Next.js native).
- **Database**: PostgreSQL (Primary).
- **Reasoning**: Payload 3.0 offers a TypeScript-native experience that integrates directly into the Next.js App Router, avoiding the need for a separate backend service while providing a robust admin UI for content creators.

### 2. Wiki Architecture & Aesthetic
- **User Experience**: "Immersive Scroll View" — each wiki entry (Character, Boss, Relic) will be presented in a dedicated, thematically styled "Ancient Scroll" or "Logbook" page.
- **Functionality**: Must function like a "real wiki" (Fandom-style):
    - Unique URLs for every entry.
    - Global search (WIKI-02).
    - Extensive cross-linking between entries (WIKI-03).
    - Breadcrumbs and category navigation.

### 3. Data Models & Relationships
- **Collections**:
    - `Characters`: Lore, stats, faction, related relics.
    - `Bosses`: Lore, locations, dropped relics, associated minibosses.
    - `Minibosses`: Lore, parent boss, locations.
    - `Relics`: Lore, associated boss/enemy, effect.
    - `Locations`: Lore, associated bosses/enemies.
    - `News/Events`: For the Bulletin Board (CORE-04).
- **Key Relationships**:
    - Relics -> Bosses (Drop/Associated).
    - Miniboss -> Bosses / Locations (Hierarchy).
    - Characters -> Factions (Organization).

### 4. Technical Strategy
- **Payload Config**: Define collections in `payload.config.ts`.
- **Dynamic Routes**: Use Next.js dynamic routes (e.g., `/wiki/[category]/[slug]`) to fetch and render content from Payload.
- **Search**: Utilize Payload's built-in search or simple full-text search on PostgreSQL.

## Success Criteria for Phase 2
1. Payload CMS 3.0 is successfully integrated into the Next.js project.
2. Database schema supports all identified collections and relationships.
3. Users can view individual lore entries in an immersive scroll interface.
4. Basic "Bulletin Board" on the landing page is driven by CMS data.

## Deferred / Gray Areas (to be resolved during planning)
- Specific UI components for "Stats" (e.g., health bars, damage icons) in the wiki view.
- Media handling (GIFs for characters vs. static images for relics).
- Exact transition animations between wiki pages.
