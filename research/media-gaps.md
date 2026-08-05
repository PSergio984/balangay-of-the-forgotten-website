# Media Gap Analysis: Old Wiki Assets vs New Site

Ticket: https://github.com/PSergio984/balangay-of-the-forgotten-website/issues/4 (fill-gaps-only)

Method: compared every file under `D:\Github\balangay_of_the_forgotten\assets\` (91 files) against `D:\Github\balangay-of-the-forgotten-website\public\` (all subfolders), cross-checked old-wiki HTML usage (`index.html`, `wiki/cards.html`, role/boss/mini_boss/relics/maps pages) and new-site component/collection references.

**Bottom line: 88 of 91 old-wiki assets are already mirrored in the new site's `public/media/` (exact filenames, plus `-1.png` render variants). Only 2 assets have no equivalent at all, plus 1 asset whose high-res original is not mirrored (new site uses a lower-res derivative).**

## Gap list (no new-site equivalent)

| Old-wiki asset | Depicts | Used on old wiki | Suggested new-site target |
|---|---|---|---|
| `assets/BOTF_BOOK COVER.png` | Game book cover art ("Balangay of the Forgotten" cover) | Homepage `index.html` (`#book-cover` hero) | Copy to `public/media/BOTF_BOOK_COVER.png`; display on landing page (hero/about/lore section) or wiki home; add Media collection entry. **Note: 31.9 MB PNG — compress/re-encode before shipping.** |
| `assets/rules/playing_mat.jpg` | Playing mat layout diagram ("Ang lugar kung saan ipupwesto ng mga player ang kanilang mga cards na napili") | `wiki/cards.html` Game Flow & Rules section | Copy to `public/media/playing-mat.jpg`; embed in Rules collection richText (`collections/Rules.ts` has title/slug/content/order — no dedicated image field, so embed via richText or add an image field). |

## Partially covered (equivalent exists, but original master missing)

| Old-wiki asset | Depicts | New-site equivalent | Note |
|---|---|---|---|
| `assets/logo/balangayOfTheForgottenLogo.png` | Full game logo (753 KB) | `public/videos/animations/logo.png` (22 KB, used in `ParallaxHero.tsx` + `AccoladesSection.tsx`) | New site has its own logo asset (likely a downscaled derivative). Original high-res master not mirrored — optional copy to `public/media/` as master if full-res needed. Not a functional gap. |

## Already covered (old asset → new-site file)

Exact-filename mirrors in `public/media/` (source → `public/media/...` unless noted):

- **Root**: `d10.png`, `d100.png`, `d20.png`, `d4.png`, `turnpiece.png`, `CARD BACK OG.png`
- **Boss sprites** (`assets/boss/`): `Apolaki.png`, `Bakunawa.png`, `Bathala.png`, `Mayari.png`, `Minokawa.png`
- **Mini-boss sprites** (`assets/mini_boss/`): `Kapre.png`, `Sirena.png`, `Manananggal.png`, `Tiyanak Swarm.png`
- **Relics** (`assets/relics/`): `Silang.png`, `Pangil.png`, `Memory Fragment.png`, `Luhain.png`, `Korona.png` (also lowercase copies in `public/relics/`)
- **Roles** (`assets/roles/`): `Mangangayaw.png`, `Mandirigma.png`, `Bagani.png`, `Babaylan.png`
- **Maps** (`assets/maps/`): `Bundok Pulag.png`, `Dagat ng Kabisayaan.png`, `Daragang Magayon.png`, `Kaluwalhatian.png`, `Ang Kabilang Mundo.png` (also `public/maps/` copies)
- **MAP CARDS**: `BundokPulag.jpg`, `DagatNgKabisayan_1.jpg`, `DaragangMagayon.jpg`, `Kaluwalhatian.jpg`
- **MAIN BOSS CARDS**: `ApolakiFInal.jpg`, `BakunawaFinal.jpg`, `BathalaFinal.jpg`, `MayariFinal.jpg`, `MinokawaFinal1.jpg`
- **MINI BOSS CARDS**: `KapreFinal.jpg`, `MananangalFinal.jpg`, `SirenaFinal.jpg`, `TiyanakFinal.jpg`
- **SPECIAL ITEM CARDS**: `Kalasag.jpg` (and `Kalasag_1.jpg`), `Balaraw.jpg`, `Agos-Oras.jpg`
- **ROLE CARDS**: `MangagayawRoleCard.jpg` (old typo preserved), `MandirigmaRoleCard.jpg`, `BaganiRoleCard.jpg`, `BabaylanRoleCard.jpg`
- **PRESET CARDS** (all 12): `Mangangayaw{Sniper,Ranger,Hunter}.jpg`, `Mandirigma{GlassCanon,Bruiser,Berserker}.jpg`, `Bagani{Wall,JUggernaut,DamageSoaker}.jpg`, `Babaylan{SupportCleric,PureHealer,BattlePriest}.jpg`
- **SKILL CARDS** (all 23): Mangangayaw `{VolleySHot,QuickF,PiercingF,FocusF,ExplosiveF}.jpg`; Mandirigma `{Attack,AllIn,AllIn_1,HeavyAttack,Berserk,Rest}.jpg`; Bagani `{Bash,Fortify,Fortify_1,LastStand_1,Oath_1,Oath_2,TauntFinal_1}.jpg`; Babaylan `{BlessingFinal,BlessingFinal_1,HealFinal,ManaSurge,Purify,SacrificeFInal}.jpg`

## Notes / edge cases

- New-site `public/media/` also contains new-only assets (timeline-*.png, `-1.png` render variants, `Ang Kabilang Mundo.png`, boss/mini-boss/relic `-1` variants) — these are new site assets, not old-wiki mirrors, and were not treated as gaps.
- `assets/SPECIAL ITEM CARDS/Kalasag.jpg` is not referenced by any old-wiki HTML page (only `Kalasag_1.jpg` is), but both exist in new `public/media/` — covered.
- New-site files with no old-wiki counterpart but equivalent role: `public/fight-scene/others/card-back.png` (new card back vs old `CARD BACK OG.png`, both present), `public/videos/loading/loading*.mp4` (new boss loading videos).
