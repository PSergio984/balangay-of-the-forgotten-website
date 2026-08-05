# Research: char-stats.docx — content inventory & coverage vs. Characters seeding

Issue: https://github.com/PSergio984/balangay-of-the-forgotten-website/issues/5
Date: 2026-08-05

## How the doc was read

`public/extracted-content.json` does **NOT** contain char-stats.docx. It only has 3 keys (`lore`, `script`, `rules`) extracted by `scripts/extract-docx.ts` from Game-Lore.docx, GAME-MASTER-SCRIPT-v0.2.docx, and Game-Flow-and-Rules.docx. char-stats.docx (449 KB, "Document Ver: 1.4, For: BotF v1.0") is a **fourth, un-extracted docx**. Text was extracted directly via mammoth (`extractRawText`) for this research.

## Full inventory of char-stats.docx

| Section | Content | Count |
|---|---|---|
| Glossary | ATK / HP / DEF / MAG definitions | 4 defs |
| Stat Adjustment Notes | Buffed / Nerfed / Adjusted / Clarified markers (revision metadata) | — |
| **Role Presets** | 4 roles x 3 presets each, with HP/ATK/MAG/DEF | **12 presets** |
| **Status Effects** | Bonecracked, Rage/Enraged, On Guard, Blessing, Focused Aim, Overexplosion, Moonfall, Invulnerable, Stun, Devoured, Eye of the Dragon, Bind — each with effect + duration | **12 effects** |
| **Player Movesets** | 4 roles x 5 skills; each with damage formula (e.g. "334% ATK"), hit %, cooldown, and proc/requirement text | **20 skills** |
| Items (Tentative) | 3 dungeon-buff items (Balaraw +15% DMG, Kalasag +25% DEF to 2 players, Agos-Oras no-CD round) | 3 items |
| **Boss Stats** | Bathala, Mayari, Apolaki, Bakunawa, Minokawa (HP/ATK/MAG/DEF) | 5 bosses |
| **Boss Movesets** | 22 moves with formulas, hit/chance %, stuns, passives (incl. Bakunawa "Eat the Sun and Moon" -> Minokawa inherit) | 22 moves |
| **Mini Boss Stats** | Manananggal, Tiyanak, Siren, Kapre | 4 minibosses |
| **Mini Boss Movesets** | 3 moves each (1.2x / 1.5x / 1.6x single/AoE patterns) | 12 moves |
| Damage Output | **Empty section header** — placeholder, no formulas present | 0 |

The doc is a **balance/source-of-truth sheet**: stat tables + text formulas. It has **no leveling, no per-level stat tables, no experience/progression, no damage-calculation formula section** (the "Damage Output" section is empty).

## Coverage comparison vs. current seeds

### Already covered (matches seed data exactly)

- **12/12 role presets** — `scripts/seed-wiki.ts` lines 379-383, 400-404, 421-425, 442-446 and `scripts/seed-wiki-full.ts` lines 339-343, 354-358, 369-373, 384-388: identical preset names and HP/ATK/MAG/DEF values. (Babaylan's "120 -> 220" notation in the doc is a buff-tracked progression; seeds use the final buffed values 220/200/180 — consistent.)
- **20/20 player skills** — both seeds list the same skill names, same formulas, same cooldowns. `moveset.description` text is a near-verbatim copy of the doc's per-skill text (e.g. "Deals 334% ATK, 80% hit, 50% chance to inflict Bonecracked", CD 2).
- **12/12 status effects** — `scripts/seed-wiki-full.ts` lines 92-105 `statusEffectsData` is a verbatim copy of the doc's status section (names, Buff/Debuff type, descriptions).
- **5/5 boss stats & 22 boss moves** — `scripts/seed-wiki.ts` lines 210-287: Bathala 2800/110/250/200, Mayari 2100/300/120/180, Apolaki 1700/360/70/150, Bakunawa 2000/40/300/190 all match; movesets match (formulas, stun chances, passives).
- **4/4 mini boss stats & 12 moves** — Manananggal 900/230/35/100, Tiyanak 1150/50/195/125, Siren 1000/20/240/80, Kapre 1300/200/0/150 — all match; movesets match.
- **3/3 items** — seeded as Relics (Korona ng Lakan +15% DMG, Luha ng Babaylan +25% DEF, Pangil ng Bakunawa no-CD round) with the same effects and same dungeon unlocks.

### NOT covered / divergences

1. **Minokawa HP divergence** — doc: "Total HP: Inherit from Bakunawa" (dynamic). Seed: hardcoded `hp: 1000` (`seed-wiki.ts:276`). Seed value is a fabricated/legacy number, not from the doc.
2. **"Damage Output" section** — empty in the doc; nothing to seed, but signals the game has no finalized damage-calculation formula. The only math that exists is per-skill percentage text already in movesets.
3. **Doc revision metadata** (Ver 1.4, Buffed/Nerfed/Adjusted markers) — not data, but implies this doc is the living balance source; seeds could drift from future doc revisions.
4. **Dice / hit-resolution rules** (d20 = 1 miss / 20 crit, d4 targeting, d9 damage, d100 events) — not in char-stats.docx; they live in GAME-MASTER-SCRIPT / Game-Flow-and-Rules (already extracted under `script`/`rules` keys) and are unseeded anywhere.
5. **char-stats.docx itself is not in `extracted-content.json`** — if the wiki wants this content published (rules/guide page), the doc needs extraction (a 4th key or separate file); currently none of its text exists in the CMS except through the character/boss seeds.

## Verdict

**char-stats.docx is fully covered by the existing seeds for everything the Characters schema can hold.** Every preset, stat block, skill, status effect, boss, and miniboss in the doc is already seeded (seed-wiki.ts and seed-wiki-full.ts), and the Characters collection schema (`collections/Characters.ts`: name, slug, role, description, presets[] w/ stats group, moveset[] w/ cooldown) already models it.

**No new fields or schema decisions are surfaced by this doc** — no leveling, no per-level stats, no formulas beyond the skill-description text already stored. The only actionable items are:

- **Optional**: Minokawa HP — decide between "inherit from Bakunawa" (dynamic rule, not modelable as a number) vs. the seeded hardcoded 1000.
- **Optional**: consider structured fields (`damageFormula`, `hitChance`, `statusEffect` relation) to make formulas machine-readable instead of prose inside `moveset.description` — but the doc doesn't require this; it's a design choice.
- **Process note**: doc carries balance-revision markers (Buffed/Nerfed, Ver 1.4), so treat it as source-of-truth for future stat updates, and it remains the only unextracted docx in `public/`.

**Recommended ticket resolution**: mark this ticket done — char-stats.docx adds nothing beyond what the character/boss/miniboss/status-effect seeds already contain; optionally track the Minokawa HP divergence and doc-extraction as separate low-priority items.
