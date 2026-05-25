# Technology Stack

**Project:** Balangay of the Forgotten Website
**Researched:** 2025-05-25
**Overall Confidence:** HIGH

## Recommended Stack

### Core Framework
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x | Frontend / SSR / SEO | Best-in-class SEO for Wiki/Landing pages; App Router supports React Server Components. |
| React | 19.x | UI Library | Seamless integration with Next.js and modern pixel-art UI kits. |

### CMS (Wiki Content)
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Payload CMS | 3.0 | Headless CMS | TypeScript-native, runs as a Next.js route handler (no separate server needed), perfect for lore/wiki data. |

### Game Backend (Future Integration)
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| ASP.NET Core | 9.0 | Game API / Real-time | User requirement. Shared C# with Unity. Minimal APIs for high performance. |
| SignalR | Core 9.0 | Real-time Communication | Built-in support for hybrid tabletop real-time interactions. |

### Database
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| PostgreSQL | 16+ | Primary Data Store | Robust, industry standard. Easy to host on Supabase or Neon. |

### Game Engine
| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Unity | 6 (LTS) | 2D Pixel Game | Current stable version with modern .NET (CoreCLR) and WebGPU support. |

### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Tailwind CSS | 4.x | Styling | Utility-first CSS. Highly customizable for pixel-art aesthetic. |
| react-unity-webgl | 9.x | Unity Integration | For embedding and communicating with the Unity WebGL build. |
| Framer Motion | 11.x | Animations | For "frame-by-frame" style animations and smooth page transitions. |
| Pixelact UI | 1.x | UI Components | Pre-styled pixel-art accessible components (built on Radix/Tailwind). |

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Frontend | Next.js | Blazor WASM | Next.js has better SEO and faster initial load for landing pages/wikis. |
| Backend | ASP.NET Core | Node.js (Express) | ASP.NET shares C# with Unity, allowing for shared logic and models. |
| CMS | Payload CMS | MediaWiki | MediaWiki is legacy and harder to customize/integrate with modern React apps. |

## Installation

### Frontend & CMS (Next.js + Payload)
```bash
# Initialize Next.js 15 with Payload 3.0
npx create-payload-app@latest
```

### Game Backend (ASP.NET)
```bash
# Create Minimal API
dotnet new webapi -n Balangay.Api
```

### Shared Models Library
```bash
# Create shared class library
dotnet new classlib -n Balangay.Shared
```

## Sources

- [Next.js Documentation](https://nextjs.org/docs) (HIGH)
- [Payload CMS 3.0 Docs](https://payloadcms.com/docs) (HIGH)
- [ASP.NET Core 9.0 Minimal APIs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis) (HIGH)
- [React Unity WebGL Documentation](https://react-unity-webgl.dev/) (MEDIUM - Community driven but standard)
- [Pixelact UI](https://pixelactui.com/) (LOW - Specific aesthetic choice)
