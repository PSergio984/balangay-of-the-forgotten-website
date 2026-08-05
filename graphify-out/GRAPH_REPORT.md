# Graph Report - .  (2026-08-05)

## Corpus Check
- Large corpus: 304 files · ~1,741,458 words. Semantic extraction will be expensive (many Claude tokens). Consider running on a subfolder, or use --no-semantic to run AST-only.

## Summary
- 608 nodes · 680 edges · 68 communities (47 shown, 21 thin omitted)
- Extraction: 72% EXTRACTED · 26% INFERRED · 2% AMBIGUOUS · INFERRED: 177 edges (avg confidence: 0.77)
- Token cost: 30,400 input · 10,600 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Payload Collection Schemas|Payload Collection Schemas]]
- [[_COMMUNITY_Tech Stack Decisions|Tech Stack Decisions]]
- [[_COMMUNITY_Payload Admin Components|Payload Admin Components]]
- [[_COMMUNITY_Landing Page Components|Landing Page Components]]
- [[_COMMUNITY_App Routes & API|App Routes & API]]
- [[_COMMUNITY_Site Shell & Navigation|Site Shell & Navigation]]
- [[_COMMUNITY_Warrior Card Art|Warrior Card Art]]
- [[_COMMUNITY_Relic Icons & Chests|Relic Icons & Chests]]
- [[_COMMUNITY_Bagani Ability Art|Bagani Ability Art]]
- [[_COMMUNITY_Database Migrations|Database Migrations]]
- [[_COMMUNITY_Babaylan Ability Art|Babaylan Ability Art]]
- [[_COMMUNITY_Logbook Feed|Logbook Feed]]
- [[_COMMUNITY_Role Showcase Section|Role Showcase Section]]
- [[_COMMUNITY_Boss Artwork|Boss Artwork]]
- [[_COMMUNITY_Wiki Search UI|Wiki Search UI]]
- [[_COMMUNITY_World & Realm Maps|World & Realm Maps]]
- [[_COMMUNITY_Relic Showcase UI|Relic Showcase UI]]
- [[_COMMUNITY_Timeline Client UI|Timeline Client UI]]
- [[_COMMUNITY_Battle UI Banners|Battle UI Banners]]
- [[_COMMUNITY_Search & Seeder Scripts|Search & Seeder Scripts]]
- [[_COMMUNITY_Boss Roster & Animations|Boss Roster & Animations]]
- [[_COMMUNITY_Timeline Event Art|Timeline Event Art]]
- [[_COMMUNITY_Mandirigma Artwork|Mandirigma Artwork]]
- [[_COMMUNITY_Polish & Sitemap Tests|Polish & Sitemap Tests]]
- [[_COMMUNITY_Payload API Routes|Payload API Routes]]
- [[_COMMUNITY_DOCX Extraction Script|DOCX Extraction Script]]
- [[_COMMUNITY_Daragang Magayon & Kalasag|Daragang Magayon & Kalasag]]
- [[_COMMUNITY_Crown & Tear Relic Art|Crown & Tear Relic Art]]
- [[_COMMUNITY_Timeline Events Seed|Timeline Events Seed]]
- [[_COMMUNITY_Bagani Artwork|Bagani Artwork]]
- [[_COMMUNITY_Fight Scene UI|Fight Scene UI]]
- [[_COMMUNITY_Tabletop Dice Set|Tabletop Dice Set]]
- [[_COMMUNITY_Legendary Relic Artwork|Legendary Relic Artwork]]
- [[_COMMUNITY_Dungeon Buff Items|Dungeon Buff Items]]
- [[_COMMUNITY_Babaylan Concept Art|Babaylan Concept Art]]
- [[_COMMUNITY_Bundok Pulag Region Art|Bundok Pulag Region Art]]
- [[_COMMUNITY_Kapre Artwork|Kapre Artwork]]
- [[_COMMUNITY_Manananggal Artwork|Manananggal Artwork]]
- [[_COMMUNITY_Tiyanak Swarm Art|Tiyanak Swarm Art]]
- [[_COMMUNITY_Minokawa Artwork|Minokawa Artwork]]
- [[_COMMUNITY_Sirena Artwork|Sirena Artwork]]
- [[_COMMUNITY_Search Page Layout|Search Page Layout]]
- [[_COMMUNITY_Navbar Tests|Navbar Tests]]
- [[_COMMUNITY_Parallax Hero Tests|Parallax Hero Tests]]
- [[_COMMUNITY_Divine Genesis Timeline|Divine Genesis Timeline]]
- [[_COMMUNITY_Babaylan Animations|Babaylan Animations]]
- [[_COMMUNITY_Mangangayaw Animations|Mangangayaw Animations]]
- [[_COMMUNITY_Card Back & Battle Buttons|Card Back & Battle Buttons]]
- [[_COMMUNITY_Health Bars & Borders|Health Bars & Borders]]
- [[_COMMUNITY_Kaluwalhatian Realm Art|Kaluwalhatian Realm Art]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Bulletin Board Tests|Bulletin Board Tests]]
- [[_COMMUNITY_Logbook Entry Tests|Logbook Entry Tests]]
- [[_COMMUNITY_Scroll Container Tests|Scroll Container Tests]]
- [[_COMMUNITY_Theme Tests|Theme Tests]]
- [[_COMMUNITY_Memory Fragment Relic|Memory Fragment Relic]]
- [[_COMMUNITY_Turn Arrow UI|Turn Arrow UI]]
- [[_COMMUNITY_Kalasag Shield Item|Kalasag Shield Item]]
- [[_COMMUNITY_Template Icons|Template Icons]]
- [[_COMMUNITY_File Icon Asset|File Icon Asset]]
- [[_COMMUNITY_Globe Icon Asset|Globe Icon Asset]]
- [[_COMMUNITY_Balangay Card Back|Balangay Card Back]]
- [[_COMMUNITY_Turn Piece Icon|Turn Piece Icon]]
- [[_COMMUNITY_Vercel Logo Asset|Vercel Logo Asset]]
- [[_COMMUNITY_Game Logo Animation|Game Logo Animation]]

## God Nodes (most connected - your core abstractions)
1. `getPayloadInstance()` - 14 edges
2. `Design System Master` - 13 edges
3. `Mangangayaw (The Phantom Hunter)` - 13 edges
4. `Babaylan (Healer Class)` - 11 edges
5. `Bagani (Tank Class)` - 10 edges
6. `Next.js 15` - 9 edges
7. `Landing Page` - 9 edges
8. `Fight Scene Battle UI` - 9 edges
9. `Balangay of the Forgotten Website` - 7 edges
10. `ASP.NET Core 9.0` - 7 edges

## Surprising Connections (you probably didn't know these)
- `Pangil Art Variant (-1)` --references--> `Pangil ni Bakunawa (Draconic Fang Relic, Legendary, +20% Water DMG)`  [INFERRED]
  public/media/Pangil-1.png → components/landing/RelicShowcase.tsx
- `Bakunawa Boss Art (alternate)` --conceptually_related_to--> `Bakunawa (Moon-Eating Sea Serpent, Main Boss)`  [INFERRED]
  public/media/Bakunawa-1.png → scripts/seed-wiki.ts
- `Bakunawa Final Art` --conceptually_related_to--> `Bakunawa (Moon-Eating Sea Serpent, Main Boss)`  [INFERRED]
  public/media/BakunawaFinal.jpg → scripts/seed-wiki.ts
- `Dagat ng Kabisayaan Region Art (alternate)` --conceptually_related_to--> `Dagat ng Kabisayaan (Region)`  [INFERRED]
  public/media/Dagat ng Kabisayaan-1.png → scripts/seed-wiki.ts
- `Dagat ng Kabisayaan Final Art` --conceptually_related_to--> `Dagat ng Kabisayaan (Region)`  [INFERRED]
  public/media/DagatNgKabisayan_1.jpg → scripts/seed-wiki.ts

## Hyperedges (group relationships)
- **Frontend and Styling Stack** — claude_md_nextjs, claude_md_react, claude_md_tailwind, claude_md_framer_motion, claude_md_pixelact_ui [INFERRED 0.80]
- **Game Backend Integration Path** — claude_md_unity, claude_md_aspnet, claude_md_signalr, claude_md_react_unity_webgl, claude_md_shared_models [INFERRED 0.80]
- **Design System Foundations** — master_md_color_palette, master_md_typography, master_md_spacing, master_md_shadows, master_md_retro_futurism [INFERRED 0.80]
- **Playable Character Roster** — babaylan_role, bagani_role, mandirigma_role, mangangayaw_role, babaylan_card, bagani_card, mandirigma_card, mangangayaw_card, babaylan_shadow, bagani_shadow, mandirigma_shadow, mangangayaw_shadow [INFERRED 0.80]
- **Boss Roster** — allbosses_roster_artwork, allbosses_bathala, allbosses_mayari, allbosses_apolaki, allbosses_bakunawa, allbosses_minokawa [INFERRED 0.80]
- **Battle Banner Overlay System** — battle_start_banner, graybattle_start_banner, defeat_banner, victory_banner, game_enemy_turn_banner, game_player_turn_banner, main_boss_banner, mini_boss_banner, fight_scene_ui [INFERRED 0.75]
- **Relic Loot Rewards from Chests** — korona_korona, luhain_luhain, pangil_pangil, silang_silang, chest_chest, chest_main_boss_chest_main_boss [INFERRED 0.80]
- **Special Item Dungeon Buff Icons** — balaraw_buff_balaraw_buff, kalasag_buff_kalasag_buff, balaraw_buff_balaraw_item, kalasag_buff_kalasag_item [INFERRED 0.85]
- **Battle UI Controls and Status Elements** — continue_continue, end_turn_end_turn, boss_healthbar_boss_healthbar, role_healthbar_role_healthbar [INFERRED 0.80]
- **World Map Region Set** — choosing_territory_map, bundok_pulag_map, dagat_kabisayaan_map, daragang_magayon_map, kaluwalhatian_region_map, ang_lagusan_map [EXTRACTED 1.00]
- **Apolaki Art Development Iterations** — apolaki_1_concept_art, apolaki_boss_art, apolaki_final_art [INFERRED 0.75]
- **Babaylan Art Development Iterations** — babaylan_1_concept_art, babaylan_role_art, babaylan_battle_priest_art [INFERRED 0.75]
- **Babaylan Moveset** — BabaylanRoleCard_babaylan_character, BabaylanHealFinal_heal_ability, BabaylanBlessingFinal_blessing_ability, BabaylanManaSurge_manasurge_ability, BabaylanPurify_purify_ability, BabaylanSacrificeFInal_sacrifice_ability [EXTRACTED 0.90]
- **Bagani Moveset** — Bagani_bagani_character, BaganiBash_bash_ability, BaganiFortify_fortify_ability, BaganiLastStand_1_laststand_ability, BaganiOath_1_oath_ability [EXTRACTED 0.90]
- **Babaylan Preset System** — BabaylanRoleCard_babaylan_character, BabaylanPureHealer_preset, BabaylanSupportCleric_preset [EXTRACTED 0.90]
- **Main Boss Artwork Series (Bathala & Bakunawa)** — bathala_bathala_boss_art, bathala-1_bathala_boss_art_alt, bathalafinal_bathala_final_art, bakunawa_bakunawa_boss_art, bakunawa-1_bakunawa_boss_art_alt, bakunawafinal_bakunawa_final_art [INFERRED 0.75]
- **Region Artwork Series (Dagat, Daragang Magayon, Bundok Pulag)** — dagat-ng-kabisayaan_dagat_region_art, dagat-ng-kabisayaan-1_dagat_region_art_alt, dagatngkabisayan_1_dagat_final_art, daragang-magayon_daragang_region_art, daragang-magayon-1_daragang_region_art_alt, daragangmagayon_daragang_final_art, bundok-pulag_bundok_pulag_region_art, bundok-pulag-1_bundok_pulag_region_art_alt, bundokpulag_bundok_pulag_final_art [INFERRED 0.75]
- **Physical Game Card Art Assets** — card-back-og_balangay_card_back, balaraw_balaraw_item_card_art, kalasag_kalasag_item_card_art [INFERRED 0.60]
- **Mandirigma Character Artwork Set** — Mandirigma_mandirigma, Mandirigma_mandirigma_art, Mandirigma_1_mandirigma_art, MandirigmaAllIn_mandirigma_all_in_art, MandirigmaAllIn_1_mandirigma_all_in_art, MandirigmaAttack_mandirigma_attack_art, MandirigmaBerserk_mandirigma_berserk_art, MandirigmaBerserker_mandirigma_berserker_art [INFERRED 0.85]
- **Divine Guardians of the Gods** — Kapre_kapre, Manananggal_manananggal, Kaluwalhatian_kaluwalhatian [INFERRED 0.70]
- **Relics of the Gods Showcase** — Korona_korona, Luhain_luhain, Korona_korona_art, Luhain_luhain_art [INFERRED 0.70]
- **Mandirigma Card Kit (Role Card + Presets + Skills)** — MandirigmaRoleCard_MandirigmaRoleCardArt, MandirigmaBruiser_MandirigmaBruiserArt, MandirigmaGlassCanon_MandirigmaGlassCanonArt, MandirigmaHeavyAttack_MandirigmaHeavyAttackArt, MandirigmaRest_MandirigmaRestArt [EXTRACTED 1.00]
- **Mangangayaw Card Kit (Role Card + Presets + Skills)** — MangagayawRoleCard_MangangayawRoleCardArt, MangangayawSniper_SniperPresetArt, MangangayawRanger_RangerPresetArt, MangangayawHunter_HunterPresetArt, MangangayawQuickF_QuickShotArt, MangangayawPiercingF_PiercingArrowArt, MangangayawVolleySHot_VolleyArt, MangangayawFocusF_FocusAimArt, MangangayawExplosiveF_ExplosiveArrowArt [EXTRACTED 1.00]
- **Mayari Boss Art Iterations (Variant to Final)** — Mayari-1_BossArtVariant, Mayari_BossArt, MayariFinal_MayariFinalBossArt [INFERRED 0.70]
- **World History Timeline** — timeline_fragmentation_art, timeline_age_of_balangay_art, timeline_arrival_pinili_art [EXTRACTED 1.00]
- **Polyhedral Dice Set (d4/d10/d20/d100)** — d4_d4_dice_art, d10_d10_dice_art, d20_d20_dice_art, d100_d100_dice_art [EXTRACTED 1.00]
- **Minokawa Art Iterations** — minokawa_minokawa_art, minokawa_1_art, minokawafinal1_art [INFERRED 0.60]
- **Relic Quadrant Master Composition** — pangil_relic-art, luhain_relic-art, korona_relic-art, silang_relic-art [EXTRACTED 1.00]
- **Divine Relic Collection** — pangil_relic-art, luhain_relic-art, korona_relic-art, silang_relic-art, memory-fragment_relic-art [INFERRED 0.80]
- **Timeline Event Sequence** — timeline-fragmentation_event-great-fragmentation, timeline-sky-mist_event-sky-mist, timeline-age-of-balangay_event-age-of-balangay, timeline-arrival-pinili_event-arrival-pinili [INFERRED 0.80]

## Communities (68 total, 21 thin omitted)

### Community 0 - "Payload Collection Schemas"
Cohesion: 0.06
Nodes (22): importMap, dirname, filename, Bosses, Cards, Characters, Events, Locations (+14 more)

### Community 1 - "Tech Stack Decisions"
Cohesion: 0.05
Nodes (44): Next.js Bundled Docs Rule, ASP.NET Core 9.0, ASP.NET Core Minimal APIs Docs, Blazor WASM (rejected alternative), Framer Motion 11.x, Balangay of the Forgotten (Game), GSD Workflow Enforcement, MediaWiki (rejected alternative) (+36 more)

### Community 2 - "Payload Admin Components"
Cohesion: 0.05
Nodes (37): Auth, Boss, BossesSelect, Card, CardsSelect, Character, CharactersSelect, CollectionsWidget (+29 more)

### Community 3 - "Landing Page Components"
Cohesion: 0.06
Nodes (28): audioRef, charAudioRef, {
    isAudioPlaying: isPlaying,
    currentTheme,
    setAudioPlaying,
  }, containerRef, isReady, logoOpacity, logoScale, logoY (+20 more)

### Community 4 - "App Routes & API"
Cohesion: 0.09
Nodes (21): sitemap(), News, CategoryPageProps, collectionMap, ACCOLADES, AncientScrollContainerProps, BulletinBoardProps, containerVariants (+13 more)

### Community 5 - "Site Shell & Navigation"
Cohesion: 0.07
Nodes (16): navLinks, pathname, BOOT_MESSAGES, BOSSES, filled, bodyFont, metadata, pixelFont (+8 more)

### Community 6 - "Warrior Card Art"
Cohesion: 0.1
Nodes (24): Mandirigma Bruiser Preset Card Art, Mandirigma Glass Canon Preset Card Art, Mandirigma Heavy Attack Skill Card Art, Mandirigma Rest Skill Card Art, Mandirigma (The Unstoppable Warrior), Mandirigma Role Card Art, Mangangayaw (The Phantom Hunter), Mangangayaw Role Card Art (+16 more)

### Community 7 - "Relic Icons & Chests"
Cohesion: 0.14
Nodes (18): Chest Sprite Sheet (64x32, closed/open frames), Chest Closed Frame (32x32), Main Boss Chest Sprite Sheet (64x32, closed/open frames), Main Boss Chest Closed Frame (32x32), Main Boss Chest Open Frame (32x32), Chest Open Frame (32x32), Korona ni Apolaki Relic Icon (chest loot variant, 320x320), Korona ni Apolaki (Solar Crown Relic, Legendary, +25% Fire DMG) (+10 more)

### Community 8 - "Bagani Ability Art"
Cohesion: 0.13
Nodes (18): Bagani Character Art, Bagani Character Art (Variant), Bagani Shield Bash Ability Art, Shield Bash Ability, Bagani Damage Soaker Preset Card, Damage Soaker Preset, Bagani Fortify Ability Art, Bagani Fortify Ability Art (Variant) (+10 more)

### Community 10 - "Babaylan Ability Art"
Cohesion: 0.14
Nodes (17): Babaylan Blessing Ability Art, Babaylan Blessing Ability Art (Variant), Blessing Ability, Babaylan Heal Ability Art, Heal Ability, Babaylan Mana Surge Ability Art, Mana Surge Ability, Babaylan Pure Healer Preset Card (+9 more)

### Community 11 - "Logbook Feed"
Cohesion: 0.13
Nodes (7): LogbookEntryProps, categories, firstP, isExpanded, LogbookFeedProps, newSet, NewsItem

### Community 12 - "Role Showcase Section"
Cohesion: 0.18
Nodes (13): cardVariants, colors, containerVariants, isKey, itemHeaderVariants, itemTextVariants, playTheme, RoleData (+5 more)

### Community 13 - "Boss Artwork"
Cohesion: 0.21
Nodes (14): Bakunawa Boss Art (alternate), Bakunawa Boss Art, Bakunawa (Moon-Eating Sea Serpent, Main Boss), Bakunawa Final Art, Balaraw Special Item Card Art, Balaraw (Special Item), Bathala Boss Art (alternate), Bathala Boss Art (+6 more)

### Community 14 - "Wiki Search UI"
Cohesion: 0.15
Nodes (10): [activeCollection, setActiveCollection], collections, delayDebounceFn, imgUrl, [isLoading, setIsLoading], q, [query, setQuery], [results, setResults] (+2 more)

### Community 15 - "World & Realm Maps"
Cohesion: 0.19
Nodes (13): Ang Kabilang Mundo - The Other World (Realm Artwork), Ang Lagusan - The Passage Portal (Region Map), Apolaki Concept Art (Iteration 1), Apolaki Boss Artwork, Apolaki Final Artwork, Apolaki - God of War and the Sun, Bundok Pulag - The Misty Highland Peak (Region Map), Archipelago of the Forgotten (World Map) (+5 more)

### Community 16 - "Relic Showcase UI"
Cohesion: 0.2
Nodes (8): containerVariants, inspectorPanelVariants, inventoryGridVariants, itemHeaderVariants, itemTextVariants, RelicData, RELICS, [selectedRelic, setSelectedRelic]

### Community 17 - "Timeline Client UI"
Cohesion: 0.2
Nodes (8): cardVariants, categoryColors, containerRef, itemVariants, scaleY, { scrollYProgress }, TimelineClientProps, visualVariants

### Community 18 - "Battle UI Banners"
Cohesion: 0.31
Nodes (10): Agos Buff Icon, Battle Start Banner, Defeat Banner, Fight Scene Battle UI, Enemy Turn Banner, Player Turn Banner, Grayscale Battle Start Banner, Main Boss Battle Banner (+2 more)

### Community 19 - "Search & Seeder Scripts"
Cohesion: 0.22
Nodes (8): collections, content, relicSchema, searchRoute, searchRouteExists, seeder, timelinePage, wikiSearch

### Community 20 - "Boss Roster & Animations"
Cohesion: 0.25
Nodes (9): Apolaki (Boss), Bakunawa (Boss), Bathala (Boss), Mayari (Boss), Minokawa (Boss), All Bosses Roster Artwork, Mandirigma Ancient Card Animation, Mandirigma (Unstoppable Warrior) (+1 more)

### Community 21 - "Timeline Event Art"
Cohesion: 0.22
Nodes (9): The Age of the Balangay (Timeline Event), Timeline Art: The Age of the Balangay, Arrival of the Pinili (Timeline Event), Timeline Art: Arrival of the Pinili, The Great Fragmentation (Timeline Event), Timeline Art: The Great Fragmentation, Timeline Art (seed source): Discovery of the Sky Mist, Discovery of the Sky Mist (Timeline Event) (+1 more)

### Community 22 - "Mandirigma Artwork"
Cohesion: 0.36
Nodes (8): Mandirigma All-In Artwork Variant 1, Mandirigma All-In Artwork, Mandirigma Attack Artwork, Mandirigma Berserk Artwork, Mandirigma Berserker Artwork, Mandirigma Art Variant 1, Mandirigma (Frontline Warrior Role), Mandirigma Character Art

### Community 23 - "Polish & Sitemap Tests"
Cohesion: 0.29
Nodes (6): componentExists, layout, mediaConfig, page, sitemap, sitemapExists

### Community 24 - "Payload API Routes"
Cohesion: 0.33
Nodes (5): DELETE, GET, OPTIONS, PATCH, POST

### Community 25 - "DOCX Extraction Script"
Cohesion: 0.4
Nodes (5): extractTextFromDocx(), loreDoc, main(), masterScriptDoc, rulesDoc

### Community 26 - "Daragang Magayon & Kalasag"
Cohesion: 0.47
Nodes (6): Daragang Magayon Region Art (alternate), Daragang Magayon Region Art, Daragang Magayon (Region), Daragang Magayon Final Art, Kalasag (Special Item), Kalasag Special Item Card Art

### Community 27 - "Crown & Tear Relic Art"
Cohesion: 0.47
Nodes (6): Korona Crown Art Variant 1, Korona (Crown Relic), Korona Relic Icon, Luhain Tear Art Variant 1, Luhain (Tear Relic of Mayari), Luhain Relic Icon

### Community 28 - "Timeline Events Seed"
Cohesion: 0.33
Nodes (6): The Age of the Balangay (Timeline Event), Age of the Balangay Timeline Art, Arrival of the Pinili (Timeline Event), Arrival of the Pinili Timeline Art, The Great Fragmentation Timeline Art, The Great Fragmentation (Timeline Event)

### Community 29 - "Bagani Artwork"
Cohesion: 0.5
Nodes (5): Bagani Ancient Card Animation, Bagani (Shield of the Tribe), Bagani Shadow Sprite, Bagani Taunt Artwork, Bagani Wall Artwork

### Community 30 - "Fight Scene UI"
Cohesion: 0.5
Nodes (5): Agos-Oras (Special Item Card Art), Agos-Oras Special Item Card, Settings Icon (Fight Scene UI), Skill Cooldown Indicator (Fight Scene UI), Turn Border Frame (Fight Scene UI)

### Community 31 - "Tabletop Dice Set"
Cohesion: 0.4
Nodes (5): d100 Dice Art, d10 Dice Art, d20 Dice Art, d4 Dice Art, Tabletop Dice Set (d4/d10/d20/d100)

### Community 32 - "Legendary Relic Artwork"
Cohesion: 0.7
Nodes (5): Korona Relic Artwork (Korona ni Apolaki), Luhain Relic Artwork (Luhain ni Mayari), Memory Fragment Relic Artwork, Pangil Relic Artwork (Pangil ni Bakunawa), Silang Relic Artwork (Silang Crescent Star Compass)

### Community 33 - "Dungeon Buff Items"
Cohesion: 0.67
Nodes (4): Balaraw Buff Icon (DMG buff status, 400x400), Balaraw (Special Item: x2 dungeon buff +5% to +15% DMG to all, from Dagat ng Kabisayaan mini boss), Kalasag Buff Icon (DEF buff status, 400x400), Kalasag (Special Item: x1 dungeon buff +15% to +25% DEF to 2 players, from Daragang Magayon mini boss)

### Community 34 - "Babaylan Concept Art"
Cohesion: 1.0
Nodes (4): Babaylan Concept Art (Iteration 1), Babaylan Battle Priest (Battle Form Artwork), Babaylan - Spiritual Healer Role, Babaylan Role Artwork

### Community 35 - "Bundok Pulag Region Art"
Cohesion: 0.83
Nodes (4): Bundok Pulag Region Art (alternate), Bundok Pulag Region Art, Bundok Pulag (Region), Bundok Pulag Final Art

### Community 36 - "Kapre Artwork"
Cohesion: 0.67
Nodes (4): Kapre Final Artwork, Kapre Art Variant 1, Kapre (Forest Giant Guardian), Kapre Guardian Sprite

### Community 37 - "Manananggal Artwork"
Cohesion: 0.67
Nodes (4): Manananggal Final Artwork, Manananggal Art Variant 1, Manananggal (Night-Sky Guardian), Manananggal Guardian Sprite

### Community 38 - "Tiyanak Swarm Art"
Cohesion: 0.83
Nodes (4): Tiyanak Swarm Art Variant (-1), Tiyanak Swarm Art, Tiyanak Swarm, Tiyanak Final Art

### Community 39 - "Minokawa Artwork"
Cohesion: 0.83
Nodes (4): Minokawa Art Variant (-1), Minokawa Art, Minokawa (Sky-Devouring Beast), Minokawa Final Art

### Community 40 - "Sirena Artwork"
Cohesion: 0.83
Nodes (4): Sirena Art Variant (-1), Sirena Art, Sirena (Sovereign of the Deep), Sirena Final Art

### Community 44 - "Divine Genesis Timeline"
Cohesion: 1.0
Nodes (3): The Divine Genesis (Timeline Event), Long Timeline Background Artwork, The Wake of the Forgotten (Timeline Event)

### Community 45 - "Babaylan Animations"
Cohesion: 1.0
Nodes (3): Babaylan Ancient Card Animation, Babaylan (Spirit Healer), Babaylan Shadow Sprite

### Community 46 - "Mangangayaw Animations"
Cohesion: 1.0
Nodes (3): Mangangayaw Ancient Card Animation, Mangangayaw (Phantom Hunter), Mangangayaw Shadow Sprite

### Community 47 - "Card Back & Battle Buttons"
Cohesion: 0.67
Nodes (3): Card Back (1500x2100, card deck back), Continue Button (battle UI, 580x240), End Turn Button (battle UI, 580x240)

### Community 48 - "Health Bars & Borders"
Cohesion: 0.67
Nodes (3): Boss Health Bar (960x190), Map/Battle Field Border Frame (640x640), Role Health Bar (640x50)

### Community 49 - "Kaluwalhatian Realm Art"
Cohesion: 1.0
Nodes (3): Kaluwalhatian (Kingdom of the Supreme Gods), Kaluwalhatian Realm Art (JPG), Kaluwalhatian Realm Art (PNG)

## Ambiguous Edges - Review These
- `Bagani (Shield of the Tribe)` → `Bagani Taunt Artwork`  [AMBIGUOUS]
  public/media/BaganiTauntFinal_1.jpg · relation: conceptually_related_to
- `Bagani (Shield of the Tribe)` → `Bagani Wall Artwork`  [AMBIGUOUS]
  public/media/BaganiWall.jpg · relation: conceptually_related_to
- `End Turn Button (battle UI, 580x240)` → `Card Back (1500x2100, card deck back)`  [AMBIGUOUS]
  public/fight-scene/others/card-back.png · relation: conceptually_related_to
- `Main Boss Chest Sprite Sheet (64x32, closed/open frames)` → `Chest Sprite Sheet (64x32, closed/open frames)`  [AMBIGUOUS]
  public/fight-scene/chests/chest-main-boss.png · relation: conceptually_related_to
- `Boss Health Bar (960x190)` → `Map/Battle Field Border Frame (640x640)`  [AMBIGUOUS]
  public/fight-scene/others/map-border.png · relation: conceptually_related_to
- `Mangangayaw Character Art (Variant)` → `Mangangayaw (The Phantom Hunter)`  [AMBIGUOUS]
  public/media/Mangangayaw-1.png · relation: references
- `Mayari Boss Art (Variant)` → `Mayari (Diyosa ng Buwan)`  [AMBIGUOUS]
  public/media/Mayari-1.png · relation: references
- `Minokawa Art` → `Minokawa Art Variant (-1)`  [AMBIGUOUS]
  public/media/Minokawa-1.png · relation: conceptually_related_to
- `Pangil Art` → `Pangil Art Variant (-1)`  [AMBIGUOUS]
  public/media/Pangil-1.png · relation: conceptually_related_to
- `Silang Art` → `Silang Art Variant (-1)`  [AMBIGUOUS]
  public/media/Silang-1.png · relation: conceptually_related_to
- `Sirena Art` → `Sirena Art Variant (-1)`  [AMBIGUOUS]
  public/media/Sirena-1.png · relation: conceptually_related_to
- `Tiyanak Swarm Art` → `Tiyanak Swarm Art Variant (-1)`  [AMBIGUOUS]
  public/media/Tiyanak Swarm-1.png · relation: conceptually_related_to

## Knowledge Gaps
- **274 isolated node(s):** `eslintConfig`, `nextConfig`, `SupportedTimezones`, `Config`, `UserAuthOperations` (+269 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **21 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Bagani (Shield of the Tribe)` and `Bagani Taunt Artwork`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Bagani (Shield of the Tribe)` and `Bagani Wall Artwork`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `End Turn Button (battle UI, 580x240)` and `Card Back (1500x2100, card deck back)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Main Boss Chest Sprite Sheet (64x32, closed/open frames)` and `Chest Sprite Sheet (64x32, closed/open frames)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Boss Health Bar (960x190)` and `Map/Battle Field Border Frame (640x640)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Mangangayaw Character Art (Variant)` and `Mangangayaw (The Phantom Hunter)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Mayari Boss Art (Variant)` and `Mayari (Diyosa ng Buwan)`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._