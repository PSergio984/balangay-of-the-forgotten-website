# Phase 1 Validation: The "WOW" Landing Page

**Phase:** 1
**Status:** Initialized

## Success Criteria Verification

| ID | Success Criteria (from ROADMAP.md) | Verification Method | Target Result |
|----|-----------------------------------|---------------------|---------------|
| SC-01 | Pixel-perfect rendering (no blur) | Visual / CSS Check | `image-rendering: pixelated` is active; assets are sharp at all integer scales. |
| SC-02 | Parallax scroll effects | Manual Scroll Test | Background layers move at different rates (e.g., -25%, -15%, -5% y-offset). |
| SC-03 | Scroll-triggered animations | Manual Scroll Test | Elements fade/slide into view when 20% visible; staggered board entrance. |
| SC-04 | "In-Universe" UX aesthetic | Visual Review | CRT scanline overlay is active; colors/fonts match UI-SPEC. |

## Requirement Traceability

| REQ ID | Requirement Description | Verification Steps |
|--------|-------------------------|--------------------|
| CORE-01 | Responsive Pixel Art Landing Page | 1. Resize viewport to 375px (Mobile).<br>2. Verify layout adjustments.<br>3. Confirm pixel integrity remains. |
| CORE-02 | Parallax Scroll Effects | 1. Scroll through Hero section.<br>2. Verify deep layered movement using DevTools. |
| CORE-03 | Scroll-triggered Animations | 1. Scroll through Lore and News sections.<br>2. Confirm GSAP triggers fire as expected. |
| INT-03 | Thematic UI Hook | 1. Confirm "Ancient Scroll" and "CRT scanline" elements are present in DOM. |

## Verification Protocols

### 1. Motion Synchronization (Lenis + GSAP)
- **Action:** Open browser and scroll smoothly.
- **Verification:** No jitter or "stutter" between Lenis scrolling and GSAP parallax scrubbing.

### 2. Performance Guardrails
- **Action:** Run Lighthouse performance audit.
- **Verification:** Score > 90 for Desktop; no major layout shifts (CLS < 0.1).

### 3. Mobile Guardrails
- **Action:** Toggle mobile view in DevTools.
- **Verification:** Multi-layer parallax is disabled or simplified per D-13; navigation remains accessible.
