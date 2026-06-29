# Phase 5: Global State Management Migration - Research

**Date:** 2026-06-30
**Phase:** 05-global-state-management-migration

## Objective
Research the technical requirements, design patterns, and migration pathways to replace the browser's ad-hoc window CustomEvent system with a unified global React state store using Zustand.

---

## 1. State Store Library: Zustand v5 on Next.js 15 & React 19

Next.js 15 operates on React 19. Zustand v5 is fully compatible with React 19.

### Installation Command
```bash
npm install zustand
```

### Next.js SSR/Hydration Mismatch Mitigation
Since Next.js pre-renders pages on the server (SSR), creating a store and initializing state could cause a hydration mismatch if client components attempt to render state retrieved from `sessionStorage` or browser APIs immediately before the client hydrates.
To prevent this, we will implement a standard Next.js hydration guard pattern in one of two ways:
1. **Hydrated State Wrapper / Hook:** Return a safe value (or null/loading) until the component mounts.
2. **Client-only Mount Guard:**
   ```typescript
   const [mounted, setMounted] = useState(false);
   useEffect(() => { setMounted(true); }, []);
   if (!mounted) return null; // or loading placeholder
   ```
Alternatively, keep state initialization completely memory-based, and only sync with storage inside a `useEffect` inside the store or inside the client component, ensuring the server-rendered HTML matches the initial client render.

---

## 2. Store API Design

We will create `lib/store.ts` exporting `useGameStore`.

### State Structure
```typescript
interface GameState {
  // Loader Slice
  isLoaderMounted: boolean;
  isLoaderVisible: boolean;
  loaderProgress: number;
  isReady: boolean;
  bootMsgIndex: number;
  bossIndex: number;
  typedName: string;
  flash: boolean;

  // Audio Slice
  isAudioPlaying: boolean;
  currentTheme: string | null;

  // Selections Slice
  selectedRegionId: string;
  selectedRoleId: string | null;

  // Loader Actions
  setLoaderProgress: (progress: number) => void;
  setLoaderVisible: (visible: boolean) => void;
  setLoaderMounted: (mounted: boolean) => void;
  setBootMsgIndex: (index: number) => void;
  setBossIndex: (index: number) => void;
  setTypedName: (name: string) => void;
  setFlash: (flash: boolean) => void;
  setReady: (ready: boolean) => void;

  // Audio Actions
  setAudioPlaying: (playing: boolean) => void;
  playTheme: (src: string) => void;
  stopTheme: () => void;

  // Selection Actions
  selectRegion: (regionId: string) => void;
  selectRole: (roleId: string | null) => void;
}
```

---

## 3. Component Refactoring Matrix

| Component | Current Implementation | Target Zustand Pattern |
|-----------|------------------------|------------------------|
| [SiteLoader.tsx](file:///c:/Users/admin/OneDrive/Documents/GitHub/balangay-of-the-forgotten-website/components/landing/SiteLoader.tsx) | Local React state (`progress`, `visible`, etc.) + dispatches CustomEvent `balangay-ready` | Sets progress, visible, ready, and flash via `useGameStore` actions. |
| [ParallaxHero.tsx](file:///c:/Users/admin/OneDrive/Documents/GitHub/balangay-of-the-forgotten-website/components/landing/ParallaxHero.tsx) | Listens to CustomEvent `balangay-ready` to trigger `shouldAnimate` | Subscribes to `useGameStore(s => s.isReady)` to trigger animations. |
| [AmbientPlayer.tsx](file:///c:/Users/admin/OneDrive/Documents/GitHub/balangay-of-the-forgotten-website/components/audio/AmbientPlayer.tsx) | Listens to CustomEvents `play-game-theme` and `stop-game-theme` | Subscribes to `useGameStore(s => s.currentTheme)` and `useGameStore(s => s.isAudioPlaying)`. Runs a `useEffect` on those values. |
| [RolesSection.tsx](file:///c:/Users/admin/OneDrive/Documents/GitHub/balangay-of-the-forgotten-website/components/landing/RolesSection.tsx) | Local `selectedRole` state + dispatches `play-game-theme`/`stop-game-theme` | Subscribes to `selectedRoleId` + dispatches `playTheme()` / `stopTheme()` and `selectRole()` actions directly. |
| [WorldMapSection.tsx](file:///c:/Users/admin/OneDrive/Documents/GitHub/balangay-of-the-forgotten-website/components/landing/WorldMapSection.tsx) | Local `selectedRegion` state + dispatches `play-game-theme` | Subscribes to `selectedRegionId` + dispatches `playTheme()` and `selectRegion()` actions directly. |

---

## 4. Verification & Testing Strategy

### Unit Testing with Vitest
We will create `tests/state-store.test.ts`. This test suite will:
1. Verify the store's initial/default state (e.g. loader progress = 0, current theme = null, isReady = false).
2. Test store state transitions by executing actions (e.g., executing `setLoaderProgress(50)` updates the state correctly).
3. Verify selection updates and audio triggers (e.g., `playTheme('/audio/test.mp3')` updates the current theme and playing state).

### Manual Verification
1. Open the dev server (`npm run dev`).
2. Verify the initial site loader executes smoothly, reaches 100%, flashes, and initiates the parallax hero animations.
3. Scroll to **Choose Your Destiny** (RolesSection) and select a champion. Verify the custom audio theme plays, and deselecting resumes island music/mutes accordingly.
4. Scroll to **Explore The Realms** (WorldMapSection) and select different regions. Verify region-specific audio plays correctly.
