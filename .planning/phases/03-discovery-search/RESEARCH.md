# Phase 3 Research: Discovery & Search

## Interactive Lore Timeline (INT-02)

### UI/UX Patterns
1. **Vertical "Logbook" Timeline**: Best for mobile and deep lore. Each scroll stop reveals a new age.
2. **Horizontal "Scroll" Timeline**: More cinematic, matches the "Ancient Scroll" theme. Can use Framer Motion's `useScroll` with `useTransform`.

### Technical Implementation
- **Payload Collection**: `events`
  - `year`: Number (e.g., 742)
  - `era`: Select ('Early Migration', 'The Great Fragmentation', 'Age of the Balangay')
  - `isMajor`: Checkbox (for highlighting)
- **Frontend**: Use a CSS-driven timeline line with SVG nodes. Animate nodes into view as the user scrolls.

## Enhanced Search (WIKI-02)

### Search Engine Strategy
- **Payload Native Search**: Payload has a search plugin that creates a unified `search` collection. This is perfect for our needs as it automatically indexes entries.
- **Client-side Filtering**: For the Search Hub, we can fetch all relevant keys (title, slug, collection) once and filter locally for ultra-fast response.

### Component Structure
- `WikiSearchOverlay.tsx`: The debounced dropdown (current).
- `WikiSearchHub.tsx`: A full-page search experience with a sidebar for filters.

## Performance Optimization (Addressing 2s delay)

### Image Loading Bottlenecks
- **Observation**: 10KB images shouldn't take 2s.
- **Cause**: Next.js `/_next/image` endpoint performs server-side optimization. On the first request for a specific size/quality, it generates the cache, causing a delay.
- **Fix**: 
  - Use `unoptimized` flag for these specific pixel-art assets.
  - Set `priority` for the main wiki entry image.
  - Use `loading="eager"` for thumbnails in the hub.

### Static Generation
- **generateStaticParams**: Ensure this is working for all dynamic routes so pages are pre-rendered at build time.

## Next Steps
1. Define the `Events` collection in Payload.
2. Implement the Search Plugin or a custom search resolver.
3. Optimize the Wiki Entry page image loading.
4. Scaffold the Timeline page at `/wiki/timeline`.
