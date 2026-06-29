# ROADMAP

## Phases

- [x] **Phase 1: The "WOW" Landing Page** - Establish pixel-art identity with parallax and animations.
- [x] **Phase 2: Wiki Core & Content Engine** - Build the database for lore, characters, and news.
- [x] **Phase 2.75: Wiki Polish, Performance & SEO Optimization** - Fix image loading, optimize performance, fix sticky footer, correct wiki page formatting, and implement SEO/sitemap.
- [x] **Phase 3: Discovery & Search** - Implement global search and interactive lore timeline.
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

### Phase 02.1: Wiki Polish, Footer Fix & Performance Optimization (INSERTED)

**Goal:** [Urgent work - to be planned]
**Requirements**: TBD
**Depends on:** Phase 2
**Plans:** 0 plans

Plans:

- [ ] TBD (run /gsd-plan-phase 02.1 to break down)

### Phase 2.75: Wiki Polish, Performance & SEO Optimization

**Goal**: Fix image loading on deployment, optimize performance, fix sticky footer, correct wiki page formatting, and implement SEO optimization and XML sitemap.
**Depends on**: Phase 2
**Requirements**: WIKI-01, WIKI-03, CORE-04, SEO-01
**Success Criteria** (what must be TRUE):

  1. Images load correctly on deployment.
  2. The footer is sticky and correctly aligned.
  3. Wiki layout is beautifully formatted with full lore descriptions.
  4. Wiki loading performance is fast (optimized queries, SSG/ISR).
  5. SEO meta tags, OpenGraph tags, and JSON-LD structured data are implemented for dynamic pages.
  6. Dynamic XML sitemap is generated and updated automatically.

**Plans**: 1 plan

- [x] 02.75-01-PLAN.md — Polish, Performance & SEO Optimization

**UI hint**: yes

### Phase 3: Discovery & Search

**Goal**: Enable easy navigation and chronological visualization of game lore.
**Depends on**: Phase 2
**Requirements**: WIKI-02, INT-02
**Success Criteria** (what must be TRUE):

  1. User can find any wiki entry instantly using a global search bar.
  2. User can interact with a visual timeline to understand the game's historical events.

**Plans**: 1 plan

- [x] 03-01-PLAN.md — Search Hub & Lore Timeline

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
| 2.5 Wiki Polish & Migration | 1/1 | Complete | 2026-05-26 |
| 2.75 Wiki Polish, Performance & SEO | 1/1 | Complete | 2026-06-07 |
| 3. Discovery & Search | 1/1 | Complete | 2026-06-07 |
| 4. Unity Interactive Showcase | 0/0 | Not started | - |
| 5. Global State Management Migration | 0/1 | Complete    | 2026-06-30 |

### Phase 5: Global State Management Migration

**Goal:** Migrate event-based component communication to Zustand global state management and verify with unit tests.
**Requirements**: INT-03
**Depends on:** Phase 3
**Plans:** 0/1 plans complete

Plans:

- [x] 05-01-PLAN.md — Global State Management Migration (completed 2026-06-29)
