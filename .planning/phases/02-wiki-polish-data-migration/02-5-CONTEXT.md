# Phase 2.5 Context: Wiki Polish & Data Migration

## Overview
The initial wiki implementation lacks complete narrative data and missing assets. This phase focuses on migrating data and assets from the "old wiki" repository (`balangay_of_the_forgotten`) and fixing critical navigation issues.

## Implementation Decisions

### 1. Asset Management
- **Sync**: All assets from the old wiki's `assets/` directory will be synced to `public/wiki-assets/`.
- **Reasoning**: Ensures images are available to the Next.js frontend and Payload CMS without absolute external paths.

### 2. Data Migration
- **Source**: Narrative lore (Tagalog descriptions) will be extracted from the old wiki's HTML files (`roles/*.html`, `boss/*.html`, etc.).
- **Strategy**: Update the Payload seeder to include these full descriptions and link to the synced local images.

### 3. Navigation & UX
- **Wiki Hub**: Create `app/(site)/wiki/page.tsx` to serve as the main entry point for the wiki, listing categories (Roles, Bosses, Relics, etc.).
- **Navbar Fix**: Ensure the "Wiki" link in `PixelNavbar` is functional and points to the new hub.
- **UI Remake**: Update the `WikiEntryPage` to render the migrated images and handle the full narrative text with proper typography.

### 4. Technical Strategy
- **Extraction**: Use shell commands to read and parse the old HTML files.
- **Seeding**: Use `scripts/seed-wiki-full.ts` to perform a clean re-seed of all collections.
- **Dynamic Routing**: Maintain the `/wiki/[category]/[slug]` structure but improve the data mapping.

## Success Criteria for Phase 2.5
1. All assets from the old wiki are available in the current project's `public` directory.
2. The wiki database contains complete narrative lore for all characters and bosses.
3. The "Wiki" link in the navbar works and leads to a functional Wiki Hub.
4. Wiki entry pages display high-quality images and full lore descriptions.

## Deferred / Gray Areas
- Advanced filtering in the Wiki Hub (to be handled in Phase 3).
- Search result snippets (to be refined later).
