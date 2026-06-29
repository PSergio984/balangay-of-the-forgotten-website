# Phase 5: Global State Management Migration - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-06-29T15:24:15+08:00
**Phase:** 05-global-state-management-migration
**Areas discussed:** Library selection, State scope, Refactoring approach, Testing strategy

---

## Library selection

| Option | Description | Selected |
|--------|-------------|----------|
| Native Context | Native React Context + use-context-selector | |
| Zustand | Lightweight, selector-based, SSR-friendly hook-based state management | ✓ |

**User's choice:** Zustand (recommended option)
**Notes:** Decided on Zustand because it avoids wrapping layout in standard Provider elements, making Next.js Server Components integrations cleaner and eliminating unnecessary re-renders via fine-grained state selectors.

---

## State scope

| Option | Description | Selected |
|--------|-------------|----------|
| Audio + Loader Only | Only migrate audio playback states and loader progress states | |
| Migrate All | Migrate Loader states, Audio states, active Region and active Role selections | ✓ |

**User's choice:** Migrate All (recommended option)
**Notes:** Unifies all context/thematic selection states across the site into a single global state model for clean synchronization.

---

## Refactoring approach

| Option | Description | Selected |
|--------|-------------|----------|
| Fully Replace | Eliminate window CustomEvents and import state store hook directly | ✓ |
| Store Bridge | Keep window CustomEvents but bridge them to the store | |

**User's choice:** Fully Replace CustomEvents (recommended option)
**Notes:** Provides complete type safety and cleaner react code by directly binding components to store actions.

---

## Testing strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Static Checks Only | Follow current codebase patterns of verifying file content keywords | |
| Unit Tests + Static | Add new Vitest suite for state transitions and default state verification | ✓ |

**User's choice:** Unit Tests + Static checks (recommended option)
**Notes:** Introduces actual Vitest runtime state assertions in a new file `tests/state-store.test.ts` to ensure robust refactoring without regressions.

---

## Claude's Discretion

- Details on exact store structure, hydration safeguards, default levels, and volume state configuration.

## Deferred Ideas

- None.

---

*Phase: 05-global-state-management-migration*
*Discussion log generated: 2026-06-29*
