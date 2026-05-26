# Phase 2.5 Plan: Wiki Polish & Data Migration

## Goal
Migrate complete narrative data and assets from the old wiki repository, fix navigation issues, and improve the wiki UI to handle the rich content.

## Success Criteria
1. Assets synced to `public/wiki-assets/`.
2. `app/(site)/wiki/page.tsx` (Wiki Hub) implemented.
3. Navbar "Wiki" link points to `/wiki`.
4. `scripts/seed-wiki-full.ts` re-seeds the database with full Tagalog lore and images.
5. Wiki entries show images and full narrative content.

## Tasks

### 1. Asset Sync
- [ ] Create `public/wiki-assets/` directory.
- [ ] Copy all folders from `C:\Users\admin\OneDrive\Documents\GitHub\balangay_of_the_forgotten\assets` to `public/wiki-assets/`.
- [ ] Verify image paths are accessible.

### 2. Navigation Fix
- [ ] Implement `app/(site)/wiki/page.tsx` with a category-based UI.
- [ ] Update `PixelNavbar.tsx` to handle navigation and active state correctly.

### 3. Data Extraction & Re-Seeding
- [ ] Read old HTML files to extract Tagalog descriptions for:
    - Characters (Mandirigma, Bagani, Babaylan, Mangangayaw)
    - Bosses (Bathala, Mayari, Apolaki, Bakunawa, Minokawa)
    - Mini-Bosses (Kapre, Manananggal, Tiyanak, Siren)
- [ ] Update `Relics` with specific descriptions from `relics/*.html`.
- [ ] Create `scripts/seed-wiki-full.ts` to clear and re-seed all data with the new info.

### 4. UI Remake & Polish
- [ ] Update `app/(site)/wiki/[category]/[slug]/page.tsx` to:
    - Use `next/image` with `pixelated` rendering.
    - Display the full narrative text with thematic typography.
    - Improve the "Stat Block" layout for consistency.
- [ ] Add transition animations between hub and entries.

## Verification Strategy
- **Manual Nav Check**: Click "Wiki" in navbar -> see hub -> click a category -> click an entry -> see full lore + image.
- **Data Integrity**: Verify all stats and descriptions match the old wiki.
- **Asset Check**: Ensure all images load without 404s.
