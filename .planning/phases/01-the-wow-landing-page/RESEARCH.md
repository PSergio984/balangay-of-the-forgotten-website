# Phase 1 Research: The "WOW" Landing Page

## Overview
Technical research for Phase 1 of the Balangay of the Forgotten Website, focusing on creating an immersive, pixel-perfect experience using Next.js 15, GSAP, Lenis, and Tailwind CSS v4.

---

## 1. GSAP + ScrollTrigger in Next.js 15 (App Router)

### Best Practices
- **Use `@gsap/react`:** The `useGSAP()` hook is mandatory for React 19/Next.js 15 to handle automatic cleanup and prevent memory leaks, especially in Strict Mode.
- **Centralized Plugin Registration:** Register plugins once in a client-side library file to ensure they are available across all components.
- **Scoped Selectors:** Use the `scope` property in `useGSAP` to target elements by class name within a specific container ref, reducing the need for multiple `useRef` hooks.

### Implementation Snippet (`lib/gsap.ts`)
```typescript
"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export * from "gsap";
export { ScrollTrigger, useGSAP };
```

---

## 2. Lenis Smooth Scroll Integration

### Best Practices
- **GSAP Ticker Sync:** Disable Lenis's internal `requestAnimationFrame` (`autoRaf: false`) and use the `gsap.ticker` to drive Lenis. This ensures perfectly synchronized "scrub" animations.
- **Global Provider:** Wrap the layout in a `LenisProvider` (Client Component) to maintain smooth scroll state across the entire page.

### Implementation Snippet (`components/providers/LenisProvider.tsx`)
```tsx
"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis root ref={lenisRef} options={{ autoRaf: false, duration: 1.2 }}>
      {children}
    </ReactLenis>
  );
}
```

---

## 3. Tailwind CSS v4 Pixel Art Config

### Best Practices
- **CSS-First Configuration:** Use the new `@theme` and `@utility` directives in `globals.css`.
- **Integer Spacing:** Set `--spacing: 1px` to allow for precise pixel-perfect layouts (e.g., `w-16` = `16px`).
- **Image Rendering:** Create a custom utility for `image-rendering: pixelated` to prevent blurring of scaled sprites.

### Implementation Snippet (`app/globals.css`)
```css
@import "tailwindcss";

@theme {
  --spacing: 1px;
  --font-pixel: "Press Start 2P", system-ui;
  --color-gold-retro: #F97316;
}

@utility rendering-pixelated {
  image-rendering: pixelated;
  image-rendering: crisp-edges;
}

/* Base style to ensure Lenis smooth scrolling */
html.lenis, html.lenis body {
  height: auto;
}
.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}
```

---

## 4. Asset Loading & "WOW" Factor Strategy

### Implementation Approach
1.  **Splash Screen (Phase 0):** A lightweight Server Component in `layout.tsx` that renders immediately with a CSS-based "Loading" animation.
2.  **Next.js Image Optimization:**
    - Use `priority` for Hero layers to ensure they are the first assets fetched.
    - Use `placeholder="blur"` with low-res versions of the backgrounds.
    - Convert all backgrounds to **AVIF** for maximum compression with high fidelity.
3.  **Progressive Reveal:**
    - Fade out the Splash Screen only when the Hero background's `onLoad` fires.
    - Stagger the entrance of "In-Universe" UI elements (Logbook, Navigation).

---

## 5. Component Strategy: Pixelact UI

### Findings
- **Pixelact UI** is a shadcn-compatible library.
- **Integration:** Use the shadcn CLI to pull components directly into `components/ui`.
- **Usage:** Provides accessible Radix-based primitives with pre-configured pixel-art styling.

---

## Known Pitfalls & Mitigations

| Pitfall | Mitigation |
|---------|------------|
| **Mobile Performance Jitter** | Disable multi-layer parallax on devices < 768px using `gsap.matchMedia()`. |
| **Pixel Blurring on Scale** | Apply `rendering-pixelated` and use `object-fit: contain` with integer dimensions. |
| **Layout Shifts vs. Triggers** | Call `ScrollTrigger.refresh()` after images load or when content height changes. |
| **Strict Mode Double Init** | `useGSAP` automatically handles context reversion, preventing double-animation bugs. |
| **FOUC (Flash of Unstyled Content)** | Use a high-z-index splash screen that only clears once Client Components are hydrated and assets are loaded. |

---

## Implementation Sequence
1.  **Setup Core:** Install `gsap`, `@gsap/react`, `lenis`. Create `lib/gsap.ts` and `LenisProvider`.
2.  **Theme Config:** Update `globals.css` with Tailwind v4 pixel units and utilities.
3.  **UI Registry:** Initialize `shadcn` and add `Pixelact UI` components (Button, Card).
4.  **Hero Construction:** Implement multi-layer parallax using `useGSAP`.
5.  **Scroll Narrative:** Add `ScrollTrigger` sections (Logbook, News Board) with stagger animations.
