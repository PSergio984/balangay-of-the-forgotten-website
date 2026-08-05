# Content Inventory: docx vs Old Wiki vs Current Seeds

Issue: https://github.com/PSergio984/balangay-of-the-forgotten-website/issues/3
Date: 2026-08-05 · Research only (no source modifications)

## Sources inspected

| # | Source | Location | Notes |
|---|--------|----------|-------|
| 1 | Game-Lore.docx | `public/Game-Lore.docx` → `extracted-content.json.lore` (12.4 KB) | Tagalog lore, deities, regions, relics, roles |
| 2 | GAME-MASTER-SCRIPT-v0.2.docx | `extracted-content.json.script` (4.8 KB) | GM intro script, dice, card instructions, core loop |
| 3 | Game-Flow-and-Rules.docx | `extracted-content.json.rules` (3.3 KB) | Card/dice/rule sections, item effects |
| 4 | char-stats.docx (v1.4, balance source-of-truth) | `public/char-stats.docx` — **NOT in extracted-content.json** | Text extracted manually for research; full analysis in `research/char-stats.md` (issue #5) |
| 5 | Old wiki | `D:\Github\balangay_of_the_forgotten\` — wiki/ (8 pages), roles/ (4), boss/ (5), mini_boss/ (4), relics/ (4), maps/ (4), assets/ (card images) | Static HTML, Tagalog headings, some copy-paste bugs |
| 6 | seed-wiki.ts | `scripts/seed-wiki.ts` | Base seed: 4 chars, 5 bosses, 4 minibosses, 4 relics, 3 locations, 3 news |
| 7 | seed-wiki-full.ts | `scripts/seed-wiki-full.ts` | Full seed: +12 status effects, 5 locations, 5 relics, 3 rules, ~63 cards, 6 events, HTML lore extraction |
| 8 | seed-timeline.ts | `scripts/seed-timeline.ts` | Alternative 4-event timeline (conflicts with #7's events) |
| 9 | Collections schema | `collections/*.ts` | 12 collections (characters, bosses, minibosses, relics, locations, status-effects, rules, cards, events, news, media, users) |

---

## Per-collection gap table

Legend: ✅ complete · ⚠️ partial (details in "Missing" column) · ❌ missing

### Roles / Characters (4: Mandirigma, Bagani, Babaylan, Mangangayaw)

| Source | What exists | Status |
|---|---|---|
| Old wiki roles/ | Lore (Ang Sandata ng Balangay etc.), 20 skill cards w/ formulas+CD, 12 presets w/ HP/ATK/MAG/DEF+desc | Source complete (preset HP/MAG values outdated, see conflicts) |
| char-stats.docx | 12 presets (buffed values), 20 skills, status effects, items | Source-of-truth v1.4 |
| Seed | 4 characters, 12 presets, 20 skills, role, image | ⚠️ |

**Missing / broken:**
1. **Role lore = "Lore not found." for all 4.** `seed-wiki-full.ts:405` looks for `<h2>Ang Matapang na Mandirigma</h2>` (and Tagapagtanggol/Manggagamot/Mangangaso), but actual wiki headings are `Ang Sandata ng Balangay`, `Ang Kalasag ng Balangay`, `Ang Diwa ng Balangay`, `Ang Anino ng Balangay`. Regex never matches.
2. Preset "Description" strings (e.g. "Very high damage, low defense, medium HP") from wiki/char-stats are **not seeded** — `presets[].stats` only has numbers, schema has no preset description field.
3. Skill cards reference status effects (Bonecracked, Rage, Blessing, Focused Aim, Overexplosion) only as prose; no relationship to status-effects collection.

### Bosses (5: Bathala, Mayari, Apolaki, Bakunawa, Minokawa)

| Source | What exists | Status |
|---|---|---|
| Old wiki boss/ | Lore (Ama ng Langit etc.), movesets w/ type+desc, stats, territory, relic, guard | Complete (matches char-stats) |
| char-stats.docx | 5 stats + 22 moves — matches wiki + seeds | ✅ |
| Seed | 5 bosses, stats, moveset, image, lore extraction **works** (tagalog h2s match: Ama ng Langit, Diyosa ng Buwan, Diyos ng Araw, Serpiyente ng Buwan, Lawin ng Kamatayan) | ⚠️ |

**Missing / broken:**
1. **`location` (home region) never set** in either seed — Bosses.location relationship is null for all 5 → Locations.bosses join empty.
2. **Minokawa HP seeded as `1000`** (`seed-wiki.ts:276`) — wiki & char-stats say "Inherit Bakunawa's total HP" (dynamic, 2000). See conflicts.
3. Bakunawa passive `Eat the Sun and Moon` seeded in **abbreviated form** — omits "Minokawa takes 50% of Bakunawa's current HP to inherit" and "Minokawa attacks the same turn" (both in wiki + char-stats).
4. `droppedRelics` (join on sourceBoss) empty — Relics.sourceBoss never seeded.

### Minibosses (4: Kapre, Manananggal, Tiyanak, Sirena)

| Source | What exists | Status |
|---|---|---|
| Old wiki mini_boss/ | Lore, movesets, stats, Kampon (guardian of) | ⚠️ 2 pages buggy (Tiyanak, Sirena) |
| char-stats.docx | 4 stats + 12 moves (MAG for Tiyanak/Sirena) | ✅ source-of-truth |
| Seed | 4 minibosses, stats, moveset, location, image | ⚠️ |

**Missing / broken:**
1. **`parentBoss` never set in seed-wiki-full.ts** (seed-wiki.ts does set it: Manananggal→Bakunawa, Tiyanak→Bathala, Sirena→Bakunawa, Kapre→Apolaki — note these differ from wiki's "Kampon" mapping: wiki says Tiyanak→Apolaki, Manananggal→Mayari, Sirena→Bakunawa+Minokawa, Kapre→Bathala).
   - Conflict example: seed-wiki.ts sets Tiyanak's parentBoss = Bathala; wiki + docx lore say Tiyanak Swarm guards **Apolaki** ("Tiyanak Swarm – Bantay ni Apolaki" in Game-Lore.docx and mini_boss/tiyanak.html).
2. Lore extraction works (h2s: Ang Bantay ni Mayari / Apolaki / Bakunawa at Minokawa / Bathala all match) ✅.
3. Wiki Tiyanak page is corrupted: header "Kapre's Moveset", moves say "1.2x ATK" + move named "Demonic Wall"; char-stats + seeds say MAG scaling + "Demonic Wail". Wiki Sirena page also says ATK scaling; char-stats + seeds say MAG (Sirena atk=20/mag=240).

### Relics (5: Korona, Luhain, Pangil, Silang, Memory Fragment)

| Source | What exists | Status |
|---|---|---|
| Old wiki relics/ | 4 pages: lore + protector + location; wiki/relics.html lists 5 incl. Memory Fragment | Complete |
| Game-Lore.docx | Region↔relic map: Bato ng Pagsilang (Bathala/Kaluwalhatian), Tabak ng Luha ng Buwan (Mayari/Bundok Pulag), Korona ng Araw (Apolaki/Daragang Magayon), Pangil ng Buwan (Bakunawa/Minokawa, Dagat) | ✅ |
| char-stats.docx | 3 dungeon-buff items (Balaraw/Kalasag/Agos-Oras) with effects | Related-but-separate concept |
| Seed | 5 relics (full seed) or 4 (base seed) | ⚠️ |

**Missing / broken:**
1. **All `effect` values in seed-wiki-full.ts are placeholder `'Ancient relic of the archipelago.'`** — the real effects exist only in seed-wiki.ts relic effects and in the wiki/docx item cards (see conflicts).
2. **`foundAt` locations conflict with wiki + docx**: full-seed sets Korona→bundok_pulag (wiki/docx: Daragang Magayon), Luhain→dagat_kabisayaan (wiki/docx: Bundok Pulag). Pangil→dagat ✓ correct. Silang→kaluwalhatian ✓ correct.
3. **Naming split**: seed-wiki.ts uses Korona **ng Lakan**, Luha **ng Babaylan**, Pangil **ng Bakunawa**, Silang **ng Araw** — these are the item-card effects reskinned as relics; seed-wiki-full uses wiki names (Korona ng Araw, Luha ng Buwan, Pangil ng Buwan, Silang). Two different relic sets exist in two seeds (scripts overwrite each other — both wipe the relics collection first).
4. `sourceBoss` never seeded → droppedRelics join empty.
5. Memory Fragment: no wiki HTML page; full-seed lore = "Lore not found." (skip). No effects text for the end-game combination (docx core loop: "Build the 4 Memory Fragment as one → Victory").

### Maps / Locations (4 wiki pages; 5 seeded)

| Source | What exists | Status |
|---|---|---|
| Old wiki maps/ | 4 pages: lore + relic + guard (Kaluwalhatian, Bundok Pulag, Daragang Magayon, Dagat ng Kabisayaan) | ⚠️ copy-paste relic text bugs |
| Game-Lore.docx | Same 4 regions + **Lawa ng Laguna** (neutral zone) + **Ilog ng Lusong at Agusan** (memory arteries) + Ang Kabilang Mundo | Extra content |
| Seed | 5 locations (4 + Ang Kabilang Mundo), image | ⚠️ |

**Missing / broken:**
1. **Lore extraction fails for 4/5 locations** in seed-wiki-full.ts (seed tagalogTitle vs actual wiki h2):
   - Dagat ng Kabisayaan: seed 'Karagatan ng Eklipse' ✓ matches → only one that works
   - Daragang Magayon: seed 'Bulkan ng Magayon' ✗ actual 'Pulo ng Apoy'
   - Bundok Pulag: seed 'Bundok ng mga Diyos' ✗ actual 'Pilak ng Dambana'
   - Kaluwalhatian: seed 'Tahanan ng mga Diyos' ✗ actual 'Ang Kaharian sa Ulap'
   - Ang Kabilang Mundo: no HTML page → 'Lore not found.'
2. Wiki map pages have wrong relic text under "Matatagpuang Relika": kaluwalhatian shows Pangil ng Buwan text; daragang_magayon and dagat_kabisayaan show Korona ng Araw text under a "Tabak ng Luha ng Buwan" heading.
3. Locations' `parent`/`subLocations` unused (Ang Kabilang Mundo could parent the rest — lore calls it the wrapper realm).
4. Lawa ng Laguna + Ilog ng Lusong/Agusan (Game-Lore.docx regions) are nowhere on wiki or seeds.

### Status Effects (12)

| Source | What exists | Status |
|---|---|---|
| Old wiki wiki/status_effects.html | 12 effects w/ desc | ✅ |
| char-stats.docx | Same 12 verbatim | ✅ |
| Seed (full only) | All 12 seeded verbatim (Bonecracked, Rage/Enraged, On Guard, Blessing, Focused Aim, Overexplosion, Moonfall, Invulnerable, Stun, Devoured, Eye of the Dragon, Bind) | ✅ **Complete** |

Note: seed-wiki.ts does **not** seed status-effects (full seed required).

### Cards / Rules / Dice / Special Items

| Source | What exists | Status |
|---|---|---|
| Old wiki wiki/cards.html | 5 rule sections (Prep, Opening the Table, Intro to Cards, Intro to Dice, Core Loop); 3 special items w/ effects + mini-boss unlocks | Complete |
| Game-Flow-and-Rules.docx | Same sections incl. item effects (+5%→+15% DMG, +15%→+25% DEF, ×4 no-CD) | ✅ |
| GAME-MASTER-SCRIPT-v0.2.docx | Dice instructions, 9-card hand rules, core loop | ✅ |
| Assets | ~63 card images across 8 asset dirs + back + 5 utilities | ✅ |
| Seed (full only) | 3 rules (Prep, Opening the Table, Core Loop) + ~63 cards + back + 5 utilities | ⚠️ |

**Missing / broken:**
1. **Rules collection misses 2 of 5 sections**: "3) Introduction to Cards" and "4) Introduction to Dice" are not seeded (`seed-wiki-full.ts:431-435` only includes Prep / Opening the Table / Core Loop). These hold the dice rules and item-card definitions.
2. **Special item effects are not structured anywhere**: Balaraw (×2 Dungeon Buff, +5%→+15% DMG to all, drop: Dagat mini boss), Kalasag (×1, +15%→+25% DEF to 2 players, drop: Daragang mini boss), Agos-Oras (×4 rounds no CD, drop: Bundok Pulag mini boss) — Card schema has no effect field; effects exist only as wiki/docx prose + as relic effects in seed-wiki.ts.
3. **Dice conflict**: GAME-MASTER-SCRIPT says **d9** for skill damage; Game-Flow-and-Rules, wiki cards page, and asset files (d4/d10/d20/d100 — no d9.png) say **d10**.
4. Card seed depends on old-wiki asset dirs + `CARD BACK OG.png` + turnpiece/d4/d10/d20/d100.png — all present.
5. **Operational risk**: `seed-wiki-full.ts:6` hardcodes `OLD_WIKI_PATH = 'C:/Users/admin/OneDrive/Documents/GitHub/balangay_of_the_forgotten'` — **this path does not exist on the machine** (repo lives at `D:\Github\balangay_of_the_forgotten`). Every fs read silently fails: all lore = "Lore not found.", all rules = "Content not found.", **zero cards seeded** (uploadImage returns null → card skipped). Only status-effects seed correctly without files. The 110 media files in `public/media/` were pre-copied manually, hiding this.

### Lore / Timeline (docx lore, wiki index)

| Source | What exists | Status |
|---|---|---|
| Game-Lore.docx + wiki index | Same core story text (Balangay vessel, 4 deities, 4 regions, 4 relics, Memory Fragments, roles) | ✅ largely duplicated |
| Seed | seed-wiki-full: 6 events; seed-timeline: 4 events; news: 3 lore snippets | ⚠️ **two conflicting timelines** |

**Missing / broken:**
1. **Two incompatible timelines are seeded by different scripts** (both wipe the events collection):
   - seed-wiki-full.ts: Divine Genesis (−1000, Early Migration), Age of Harmony (250), Father's Tyranny (500, Fragmentation), Eclipse War (520), Rising of Bakunawa (700, Age of Balangay), Wake of the Forgotten (1000, Current Awakening)
   - seed-timeline.ts: Great Fragmentation (0), Discovery of the Sky Mist (215, Early Migration), Age of the Balangay (500), Arrival of the Pinili (742)
   - Same eras, different events/years — the docx lore contains neither timeline verbatim; docx history = "Bathala vs children war → memories hidden in Kabilang Mundo → Bakunawa appears → Memory Fragments".
2. seed-wiki-full event images: references `assets/fight-scene/Dagat.png` — **dir does not exist** in old wiki (only bglong.png/kaluwalhatian.png referenced exist) → Eclipse War + Rising of Bakunawa get null images.
3. News (3 seeded items) are invented placeholder lore — no source in wiki/docx (fine, but not migrated content).

---

## Actual conflicts found (concrete)

| # | Item | Value A (source) | Value B (source) | Notes |
|---|------|------------------|------------------|-------|
| C1 | Minokawa HP | `1000` (seed-wiki.ts:276, seed-wiki-full.ts:230) | "Inherit Bakunawa's total HP" = 2000 (char-stats.docx §Bosses, wiki boss/minokawa.html) | Dynamic HP unmodelable in `Bosses.stats.hp` (number, required) |
| C2 | Bakunawa `Lunar Devour` | "Deal 80% MAG to all enemies" (char-stats, both seeds) | "Deal 80% MAG to **2-4 enemies**" (wiki boss/bakunawa.html) | Wiki outdated |
| C3 | Bakunawa `Eat the Sun and Moon` | "At 50% HP, summons Minokawa. Both heal 20%..." (seeds) | Full: "skips turn, summons Minokawa; Minokawa takes 50% of Bakunawa's current HP to inherit; both heal 20% of max; Minokawa attacks same turn" (char-stats, wiki) | Seeds abbreviated |
| C4 | Tiyanak moveset | MAG scaling: Claw Latch 1.2x MAG, Blood Hex 1.5x MAG, **Demonic Wail** 1.6x MAG all (char-stats, seeds) | ATK scaling + **"Demonic Wall"** + header "Kapre's Moveset" (wiki mini_boss/tiyanak.html) | Wiki page corrupted; stats (atk 50/mag 195) support MAG |
| C5 | Sirena moveset | MAG scaling (char-stats, seeds) | ATK scaling (wiki mini_boss/sirena.html) | Wiki wrong; stats (atk 20/mag 240) support MAG |
| C6 | Tiyanak guardian | Bantay ni **Apolaki** (wiki tiyanak.html, Game-Lore.docx) | parentBoss = **Bathala** (seed-wiki.ts:319) | seed-wiki-full omits parentBoss entirely |
| C7 | Korona relic location | **Daragang Magayon** (wiki relics/korona.html, Game-Lore.docx) | **bundok_pulag** (seed-wiki-full.ts:146) | Also seed-wiki.ts foundAt = Dagat (as "Korona ng Lakan") |
| C8 | Luhain relic location | **Bundok Pulag** (wiki relics/luhain.html, Game-Lore.docx) | **dagat_kabisayaan** (seed-wiki-full.ts:147) | seed-wiki.ts foundAt = Daragang (as "Luha ng Babaylan") |
| C9 | Relic names | Korona **ng Araw**, Luha **ng Buwan**, Pangil **ng Buwan**, Silang = Bato ng Pagsilang (wiki, docx) | Korona **ng Lakan**, Luha **ng Babaylan**, Pangil **ng Bakunawa**, Silang **ng Araw** (seed-wiki.ts) | Two different relic sets; full-seed uses wiki names |
| C10 | Relic effects | Full-seed: placeholder `'Ancient relic of the archipelago.'` ×4 | Real effects in seed-wiki.ts (+15% DMG all / +25% DEF 2 players / no-CD round / double shield) + docx item cards | Real effects exist, not migrated into full seed |
| C11 | Bagani preset HP | Wall 900, Juggernaut 800, Damage Soaker 1100 (wiki roles/bagani.html) | Wall **1050**, Juggernaut **1000**, Damage Soaker **1200** (char-stats v1.4, both seeds) | Wiki outdated (pre-balance) |
| C12 | Babaylan preset MAG | 120 / 100 / 60 (wiki roles/babaylan.html) | **220 / 200 / 180** (char-stats buffed "120→220", "100→200", seeds) | Wiki outdated (pre-buff) |
| C13 | Mandirigma `All-in Attack` CD | CD **4** (wiki roles/mandirigma.html) | CD **3** (char-stats, both seeds) | Wiki outdated |
| C14 | Babaylan `Blessing` duration | **3 turns** (wiki roles/babaylan.html) | **2 turns** (wiki status_effects.html, char-stats, seed) | Wiki page itself inconsistent |
| C15 | `Guardian's Oath` text | "shield all ally (except itself)... unstackable" (wiki, char-stats) | "shield all allies for 25% current HP" (seeds) | Seeds omit "except itself" + "unstackable" |
| C16 | Dice for skill damage | **d9** (GAME-MASTER-SCRIPT-v0.2.docx) | **d10** (Game-Flow-and-Rules.docx, wiki cards.html, assets d10.png, no d9.png) | Script doc outdated vs rules doc |
| C17 | Relic-location map (docx vs full-seed) | Korona→Daragang, Tabak→Bundok Pulag, Pangil→Dagat, Bato→Kaluwalhatian (Game-Lore.docx) | Korona→bundok_pulag, Luha ng Buwan→dagat (seed-wiki-full.ts) | Two of four diverge |
| C18 | Miniboss→boss mapping (seed-wiki.ts vs wiki) | Tiyanak→Bathala, Manananggal→Bakunawa, Sirena→Bakunawa, Kapre→Apolaki (seed-wiki.ts) | Tiyanak→Apolaki, Manananggal→Mayari, Sirena→Bakunawa+Minokawa, Kapre→Bathala (wiki Kampon, docx lore) | Every mapping except Sirena differs |
| C19 | Timeline | 6 events, years −1000…1000 (seed-wiki-full.ts) | 4 events, years 0…742 (seed-timeline.ts) | Scripts wipe each other's data; pick one source |
| C20 | Boss type labels | Seed select: Single Target/AoE/Buff/Ultimate/Passive | Wiki/char-stats use: Heal, Debuff, Dash Attack, Counter, Self Buff, Magic AOE, AOE Burst, Low AoE Damage | Type vocab mismatch; miniboss moveset has no type field at all |

---

## Schema notes (old-wiki data vs new-site fields)

1. **StatusEffects** (`StatusEffects.ts`): has name/slug/type(Buff|Debuff)/description/image — no `duration`, no `stacks`, no `removal` fields. All durations are prose inside description ("for 2 turns"). Wiki data fits without schema change; adding structured duration is optional.
2. **Cards** (`Cards.ts`): type select covers role/preset/skill/map/boss/miniboss/item/back/utility ✓; `category` free text (sub-category: role name / region) ✓. **No mechanics/effect field** — special item effects (Balaraw/Kalasag/Agos-Oras), skill-card damage formulas, and preset stats (HP/ATK/MAG/DEF on cards) cannot be stored structurally; only description textarea.
3. **Bosses.moveset**: type select is a fixed vocab (Single Target/AoE/Buff/Ultimate/Passive) that does not include wiki/char-stats labels (Heal, Debuff, Dash Attack, Counter...). **Minibosses.moveset has no `type` field** (Minibosses.ts) and Characters.moveset has `cooldown` but no type/formula fields.
4. **Bosses.stats.hp required number** — cannot hold "Inherit from Bakunawa" (C1). Dynamic HP needs a text/note field or convention.
5. **Relics**: `type` (Artifact/Special/Fragment) exists and is used ✓; `sourceBoss` relationship exists but **never seeded** (would power the droppedRelics join). Item-cards vs relics duplication (C9/C10) is a content-modeling decision: docx/wiki treat Balaraw/Kalasag/Agos-Oras as **item cards dropped by mini bosses**, while seed-wiki.ts models them as **relics** with different names.
6. **Locations**: `parent`/`subLocations` fields unused; lore suggests Ang Kabilang Mundo as umbrella region.
7. **Rules**: `order` field exists; 2 of 5 wiki/docx rule sections unseeded.
8. **Events**: `era` select options (Early Migration / The Great Fragmentation / Age of the Balangay / The Current Awakening) match both seed scripts' values — schema fine, data source ambiguous (C19).
9. **Characters.presets[].stats**: only numeric group; wiki/char-stats preset "Description" strings (e.g. "Very high damage, low defense") have no field — wiki table had them, seeds drop them.

---

## Priority recommendations

1. Fix `OLD_WIKI_PATH` (OneDrive → repo path) or make it configurable — currently seed-wiki-full silently seeds empty content.
2. Fix lore-extraction h2 titles for roles (4) and locations (3 of 5) — all currently "Lore not found."
3. Resolve relic set: pick wiki names+locations+effects (C7-C10) — full-seed currently has placeholder effects.
4. Resolve Minokawa HP (C1) and Bakunawa passive detail (C3).
5. Resolve parentBoss/guardian mapping (C6, C18) — wiki/docx say Tiyanak→Apolaki, Manananggal→Mayari.
6. Pick one timeline (C19) and document eras; seed-wiki-full events currently win if run last.
7. Decide dice truth d9 vs d10 (C16); d10 is supported by 3 sources + assets.
8. Seed the 2 missing rule sections (Intro to Cards, Intro to Dice).
9. Consider adding structured effect/formula fields or accepting prose-only descriptions (schema notes 2-4).
