# Phase 5: Global State Management Migration - Context

**Gathered:** 2026-06-29
**Status:** Ready for planning

<domain>
## Phase Boundary

Migrate the current custom DOM window event-based messaging system (used for audio themes, loader progress, map, and role selections) to a formal React global state management solution using Zustand. This phase will optimize component re-renders, establish reliable state sharing, and add regression tests.

</domain>

<decisions>
## Implementation Decisions

### State Management Library
- **D-01:** Install `zustand` as a dependency in the project.
- **D-02:** Implement a single global state store `useGameStore` in a newly created module `lib/store.ts` to coordinate global application states.

### State Scope & Store Design
- **D-03:** Store is responsible for managing:
  - **Loader State:** `progress` (number), `isMounted` (boolean), `isReady` (boolean), and `bootMsgIndex` (number).
  - **Audio State:** `isPlaying` (boolean), `currentTheme` (string | null), and volume adjustments.
  - **Thematic Selections:** Currently active `selectedRegion` and `selectedRole` to centralize the page's current active lore context.

### Refactoring Approach
- **D-04:** Fully deprecate and remove window-level custom DOM events (`balangay-ready`, `play-game-theme`, `stop-game-theme`) and event listeners.
- **D-05:** Update interactive components to consume and update state directly through selector-based Zustand hooks:
  - [SiteLoader.tsx](file:///c:/Users/admin/OneDrive/Documents/GitHub/balangay-of-the-forgotten-website/components/landing/SiteLoader.tsx) sets loading progress and triggers the ready state.
  - [ParallaxHero.tsx](file:///c:/Users/admin/OneDrive/Documents/GitHub/balangay-of-the-forgotten-website/components/landing/ParallaxHero.tsx) subscribes to readiness state to begin hero animations.
  - [AmbientPlayer.tsx](file:///c:/Users/admin/OneDrive/Documents/GitHub/balangay-of-the-forgotten-website/components/audio/AmbientPlayer.tsx) subscribes to playback state and theme URL.
  - [RolesSection.tsx](file:///c:/Users/admin/OneDrive/Documents/GitHub/balangay-of-the-forgotten-website/components/landing/RolesSection.tsx) and [WorldMapSection.tsx](file:///c:/Users/admin/OneDrive/Documents/GitHub/balangay-of-the-forgotten-website/components/landing/WorldMapSection.tsx) call actions to update selected items and themes.

### Testing & Verification
- **D-06:** Write a new Vitest test suite at `tests/state-store.test.ts` to assert store state transitions, default values, and setter action behaviors.

### Claude's Discretion
- Store file layout, hydration safety guards (preventing SSR mismatch issues), and detailed volume levels.

</decisions>

<specifics>
## Specific Ideas

- Ensure proper selector isolation (e.g., `useGameStore(state => state.progress)`) so components only re-render when their specific tracked slice of state changes, maximizing scroll and animation performance.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Target Layout & App Architecture
- `app/(site)/layout.tsx` — Layout wrapper containing navbar, site loader, and ambient player.

### Core Interactive Components
- `components/landing/SiteLoader.tsx` — Coordinates site loading state and progress.
- `components/landing/ParallaxHero.tsx` — Triggers animation on loader completion.
- `components/audio/AmbientPlayer.tsx` — Audio player component controlling ambient/regional music.
- `components/landing/RolesSection.tsx` — Role selection showcase with custom themes.
- `components/landing/WorldMapSection.tsx` — Regional showcase with custom themes.

### Project Specs
- No external specs — requirements are fully captured in decisions above.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `useGameStore` — The new global store hook to be created.

### Established Patterns
- Selector-based Zustand usage to ensure high-performance, lag-free UI rendering.

### Integration Points
- Refactoring `AmbientPlayer.tsx` to subscribe to the store rather than window events.
- Interlocking loader state transitions directly between `SiteLoader.tsx` and `ParallaxHero.tsx`.

</code_context>

<deferred>
## Deferred Ideas

- None — discussion stayed within phase scope.

</deferred>

---

*Phase: 05-global-state-management-migration*
*Context gathered: 2026-06-29*
