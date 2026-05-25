# Architecture Patterns

**Domain:** Game Wiki & Landing Page
**Researched:** 2025-05-25

## Recommended Architecture

A **Hybrid Headless** architecture using Next.js as the core orchestrator.

- **Next.js (Frontend/Orchestrator)**: Handles SEO, Routing, and integrates Payload CMS for content.
- **Payload CMS (Content Engine)**: Manages Lore, Characters, and Media. Runs as a Next.js route handler.
- **ASP.NET Core (Logic/Real-time)**: Handles the tabletop bridge, game-specific logic, and real-time SignalR hubs.
- **Unity (Client Engine)**: Embedded WebGL builds communicating with Next.js via JS Bridge.

### Component Boundaries

| Component | Responsibility | Communicates With |
|-----------|---------------|-------------------|
| Next.js App | UI, Routing, SEO | Payload CMS (Direct), ASP.NET (HTTP/SignalR), Unity (JS Bridge) |
| Payload CMS | Lore Data Management | PostgreSQL (DB), Next.js (Local API) |
| ASP.NET API | Real-time Tabletop Logic | Next.js (SignalR/HTTP), Unity (HTTP/gRPC), PostgreSQL |
| Unity WebGL | Interactive Visuals | Next.js (JS Events), ASP.NET (Shared Data Models) |

### Data Flow

1. **Wiki Content**: Payload CMS (Local) → Next.js RSC (Server Component) → User Browser (HTML).
2. **Tabletop Real-time**: Next.js (SignalR Client) ↔ ASP.NET Hub ↔ Unity WebGL (via JS Bridge).
3. **Shared Logic**: .NET Shared Library defines DTOs → Unity (Reference) & ASP.NET (Reference). TypeScript generation ensures Next.js stays in sync.

## Patterns to Follow

### Pattern 1: Shared .NET Data Models
**What:** Define game data (stats, items, lore structures) in a .NET Standard library.
**When:** To ensure Unity and ASP.NET use the exact same logic.
**Example:**
```csharp
namespace Balangay.Shared.Models {
    public class CharacterStats {
        public int Health { get; set; }
        public int Mana { get; set; }
    }
}
```

### Pattern 2: JS-Unity Bridge (Event-Driven)
**What:** Use `react-unity-webgl` to pass events between React and Unity.
**When:** When clicking a wiki entry should trigger an animation in the Unity viewer.
**Example:**
```typescript
const { sendMessage } = useUnityContext();
const onWikiSelect = (charId) => sendMessage("SceneManager", "LoadCharacter", charId);
```

## Anti-Patterns to Avoid

### Anti-Pattern 1: "The Monolith" (Trying to do everything in Blazor)
**What:** Building the Wiki and Landing Page in Blazor WASM.
**Why bad:** Poor SEO for wiki pages, larger bundle sizes for a landing page.
**Instead:** Use Next.js for the public-facing content and ASP.NET for the private/logic-heavy backend.

## Scalability Considerations

| Concern | At 100 users | At 10K users | At 1M users |
|---------|--------------|--------------|-------------|
| Content Delivery | Next.js SSR/Static | Vercel Edge / CDN | Global Edge Caching (Cloudflare) |
| Real-time | Single SignalR Hub | Redis Backplane | Azure SignalR Service |
| Database | Single DB Instance | Read Replicas | Sharded DB / High Availability |

## Sources

- [Modern Web Architecture Patterns](https://nextjs.org/docs/app/building-your-application/rendering)
- [Unity WebGL Interop](https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html)
- [Shared .NET Logic Patterns](https://learn.microsoft.com/en-us/dotnet/standard/net-standard)
