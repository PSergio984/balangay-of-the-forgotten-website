# ROADMAP

## Phases

- [x] **Phase 1: The "WOW" Landing Page** - Establish pixel-art identity with parallax and animations.
- [ ] **Phase 2: Wiki Core & Content Engine** - Build the database for lore, characters, and news.
- [ ] **Phase 3: Discovery & Search** - Implement global search and interactive lore timeline.
- [ ] **Phase 4: Unity Interactive Showcase** - Embed Unity WebGL models for character inspection.

## Phase Details

### Phase 1: The "WOW" Landing Page
**Goal**: Create an immersive, pixel-perfect landing page that sets the game's atmosphere and delivers immediate visual impact.
**Depends on**: Nothing
**Requirements**: CORE-01, CORE-02, CORE-03, INT-03
**Success Criteria** (what must be TRUE):
  1. User sees a landing page matching the game's 2D pixel art style with crisp rendering (no blur).
  2. Background layers move at different speeds (parallax) during scroll, creating a sense of depth.
  3. UI elements animate into view based on scroll position (fade-in, slide-in).
  4. The overall UX aesthetic feels "in-universe" (e.g., ancient scroll or logbook theme).
**Plans**: 4 plans
- [x] 01-01-PLAN.md — Foundation & Thematic Layout
- [x] 01-02-PLAN.md — Parallax Hero Implementation
- [x] 01-03-PLAN.md — Scroll Narrative & Lore Container
- [x] 01-04-PLAN.md — Experience & Polish
**UI hint**: yes

### Phase 2: Wiki Core & Content Engine
**Goal**: Establish the Lore/Wiki infrastructure and content management system.
**Depends on**: Phase 1
**Requirements**: WIKI-01, WIKI-03, CORE-04
**Success Criteria** (what must be TRUE):
  1. User can browse a structured database of characters and enemies.
  2. User can navigate between related lore entries via cross-links.
  3. User can read game development news and milestones on the landing page.
**Plans**: 1 plan
- [x] 02-01-PLAN.md — CMS Infrastructure & Data Modeling
**UI hint**: yes

### Phase 3: Discovery & Search
**Goal**: Enable easy navigation and chronological visualization of game lore.
**Depends on**: Phase 2
**Requirements**: WIKI-02, INT-02
**Success Criteria** (what must be TRUE):
  1. User can find any wiki entry instantly using a global search bar.
  2. User can interact with a visual timeline to understand the game's historical events.
**Plans**: TBD
**UI hint**: yes

### Phase 4: Unity Interactive Showcase
**Goal**: Integrate standalone interactive character models into the wiki using Unity WebGL.
**Depends on**: Phase 3
**Requirements**: INT-01
**Success Criteria** (what must be TRUE):
  1. User can rotate, zoom, and inspect a standalone Unity-rendered character model directly on the wiki.
  2. Integration is client-side WebGL (no server-side real-time sync with game sessions in this phase).
**Plans**: TBD
**UI hint**: yes

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. The "WOW" Landing Page | 4/4 | Complete | 2026-05-25 |
| 2. Wiki Core & Content Engine | 1/1 | Complete | 2026-05-26 |
| 3. Discovery & Search | 0/0 | Not started | - |
| 4. Unity Interactive Showcase | 0/0 | Not started | - |
