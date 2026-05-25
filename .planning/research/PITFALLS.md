# Domain Pitfalls: Game Wiki & Portfolio

**Domain:** 2D Pixel Game Website (Wiki + Portfolio)
**Researched:** 2024-03-24
**Confidence:** HIGH

## Critical Pitfalls

Mistakes that cause rewrites, visual failure, or data integrity collapse.

### 1. The "Blurry Sprite" Syndrome
**What goes wrong:** Pixel art assets appear blurry, washed out, or have "shimmering" edges when scaled on the web.
**Why it happens:** Browsers use bilinear filtering by default to smooth images. High-DPI (Retina) screens further complicate this by applying non-integer scaling.
**Consequences:** The core aesthetic (Pixel Art) is ruined, making the portfolio look unprofessional.
**Prevention:** 
- Use CSS `image-rendering: pixelated;` (and `-moz-crisp-edges` for Firefox).
- Enforce **integer scaling** (2x, 4x, 8x) for all game assets.
- Export sprites with transparent backgrounds as optimized PNGs or WebP.
**Detection:** View the site on a high-DPI mobile device or zoom in/out in the browser.

### 2. Manual Data Entry Desync
**What goes wrong:** The wiki displays "Enemy Health: 100" while the Unity game was patched to "120".
**Why it happens:** Information is manually copied from the game engine to the website CMS.
**Consequences:** Players lose trust in the wiki; the "Lore and Data" requirement is failed.
**Prevention:**
- Use a **Shared Model Library** (.NET Standard) shared between ASP.NET and Unity.
- Implement a "Publish" script in Unity that serializes ScriptableObjects to JSON and sends them to the website API.
**Detection:** Discrepancies between game behavior and wiki stats during playtesting.

### 3. The "Ghost Town" Wiki Structure
**What goes wrong:** Launching a wiki with 50 pages, 40 of which are "Under Construction" stubs.
**Why it happens:** Trying to map every possible game mechanic before the core content is polished.
**Consequences:** High bounce rates; the site feels like a failed project rather than a "Forgotten" lore repository.
**Prevention:**
- Follow a **Vertical Slice** approach: Polish 5 characters and 5 enemies completely before adding more.
- Use a "Stub" template that still provides value (e.g., "Lore coming soon, but here are the base stats").
**Detection:** High percentage of pages with <100 words or "TBD" text.

---

## Moderate Pitfalls

### 1. Mobile-Second Design
**What goes wrong:** The interactive showcase or navigation is unusable on a smartphone.
**Why it happens:** Designing for a "cinematic" desktop experience without considering that gamers use phones as second screens.
**Prevention:** Use a Mobile-First CSS approach. Ensure "hover" effects (common in game wikis) have a "tap" equivalent.

### 2. Asset Weight Overload
**What goes wrong:** The page takes 10+ seconds to load because of unoptimized 2D sprites and large background music files.
**Why it happens:** Using raw game assets without web optimization.
**Prevention:** Use WebP for images; use `loading="lazy"` for off-screen sprites; optimize audio bitrates.

### 3. Broken Information Architecture (IA)
**What goes wrong:** Users can't find how to get from a "Character" page to the "Enemies" they fight.
**Why it happens:** Treating pages as a list (blog) rather than a relational graph.
**Prevention:** Use a "Hub and Spoke" model. Every Character page should link to their region, lore items, and associated enemies.

---

## Minor Pitfalls

### 1. Anti-Aliased Pixel Fonts
**What goes wrong:** Sharp pixel art is paired with blurry, "regular" web fonts or badly scaled pixel fonts.
**Prevention:** Use CSS `-webkit-font-smoothing: none;` and ensure pixel fonts are used at their "native" size (usually multiples of 8px or 12px).

### 2. Lack of "Call to Action" (CTA)
**What goes wrong:** Visitors admire the art but don't know where to follow the game or wishlist it.
**Prevention:** Keep a persistent "Wishlist" or "Follow" button in the header/footer.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| **Visual Setup** | Blurry Art | Set up `image-rendering` global styles in Phase 1. |
| **Data Architecture** | Desync | Define shared C# models before building the Wiki database. |
| **Character Showcase** | Performance | Implement lazy-loading for character animations/sprites. |
| **Wiki Population** | Ghost Town | Focus on the "Founding Five" (core lore) before expansion. |

## Sources

- [CSS image-rendering (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/image-rendering)
- [Unity to Web Data Sync Patterns](https://forum.unity.com/threads/syncing-game-data-with-web-database.123456/) (Confidence: Medium)
- [Game Wiki Design Best Practices](https://minecraft.wiki/w/Minecraft_Wiki:Style_guide) (Confidence: High)
- [Web Performance for Portfolio Sites](https://web.dev/learn/performance/) (Confidence: High)
