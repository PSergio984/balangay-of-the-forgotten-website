# Phase 3 Context: Discovery & Search

## Overview
Phase 3 focuses on making the vast lore of "Balangay of the Forgotten" easily discoverable and chronologically coherent. We will implement an advanced search system and a visual timeline of historical events.

## Implementation Decisions

### 1. Enhanced Search (WIKI-02)
- **Architecture**: A dedicated Search Hub page (`/wiki/search`) with filters for Category (Boss, Character, etc.), Rarity (for Relics), and Tags.
- **UI**: A floating search overlay (already in navbar) but with improved results (snippets, categories).
- **Backend**: Implement a server-side search utility that queries all collections in parallel or uses a unified search index.

### 2. Interactive Lore Timeline (INT-02)
- **Data Model**: A new `Events` collection in Payload CMS.
    - Fields: `title`, `date` (Age/Year), `description`, `relatedLinks` (RelTo any collection), `image`.
- **UI**: A horizontal or vertical scrollable timeline component with "Ancient Scroll" styling.
- **Interactivity**: Clicking an event opens a modal or navigates to a dedicated lore entry.

### 3. Optimization & Polish
- **Image Performance**: Add `unoptimized` and `priority` flags to small pixel-art assets to eliminate the 2s loading delay reported by the user.
- **Prefetching**: Ensure critical wiki routes are prefetched to make navigation instantaneous.

## Success Criteria for Phase 3
1. Global search supports filtering by category.
2. Search results include entry thumbnails and short snippets.
3. Interactive Timeline accurately displays historical events from the CMS.
4. Navigation between entries is snappy (under 500ms for images).

## Deferred / Gray Areas
- User-contributed lore (Wiki editing) - deferred to a later milestone.
- Full-text search across RichText content (basic search first).
