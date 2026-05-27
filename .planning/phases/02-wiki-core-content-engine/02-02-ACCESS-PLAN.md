# Implementation Plan - Add Public Read Access to Collections

Add `access: { read: () => true, },` right after the `slug` property in the `CollectionConfig` object for several collections.

## Files to Update

### New Access Definitions
1. `collections/Minibosses.ts`
2. `collections/Relics.ts`
3. `collections/Locations.ts`
4. `collections/Characters.ts`
5. `collections/News.ts`

### Reordering Existing Access Definitions (Move to after `slug`)
6. `collections/Media.ts`
7. `collections/Events.ts`
8. `collections/StatusEffects.ts`
9. `collections/Rules.ts`

## Verification Strategy
- For each file, verify `access: { read: () => true, },` is present right after `slug`.
- Run `npm run lint` or `tsc` to ensure no syntax errors (if available).
