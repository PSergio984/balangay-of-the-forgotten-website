---
slug: balangay-fix-loop
status: investigating
trigger: "Multiple issues reported: search broken, wiki image cropping, missing/incorrect data, general updates."
goal: find_and_fix
tdd_mode: false
specialist_dispatch_enabled: true
---

# Debug Session: balangay-fix-loop

## Symptoms
- Search issues: Two components (top bar and dedicated page), both not working. Need consolidation or individual fixes.
- Wiki image issues: Images not fitting frames, appearing cropped.
- Missing/Incorrect Data:
    - Minibosses missing info.
    - Relic "Luhain" missing.
    - "Memory Fragment" incorrectly classified as a relic (should be combination of all relics).
    - Maps missing from site.
    - World Name should be "Ang Pook ng Kabilang Mundo".
    - Character Builds/Presets missing.
    - Gameflow, Rules, and Status Effects missing.
- General Updates:
    - Update itchio link to: https://psergio984.itch.io/balangay-of-the-forgotten

## Reference Data
- Path: `C:\Users\admin\OneDrive\Documents\GitHub\balangay_of_the_forgotten`

## Current Focus
- **Hypothesis:** Broken search is likely due to incorrect API endpoint or state management. Image cropping is a CSS layout issue in the wiki components. Data missing/incorrect requires seeding or manual update from reference.
- **Next Action:** Map search components and investigate wiki image styles.

## Evidence
- timestamp: 2026-05-28T00:06:00Z
  - Session initialized with comprehensive issue list.
