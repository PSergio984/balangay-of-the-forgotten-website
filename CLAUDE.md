<!-- GSD:project-start source:PROJECT.md -->
## Project

**Balangay of the Forgotten Website**

A landing page and wiki for the 2D pixel game "Balangay of the Forgotten" made in Unity. It serves as a portfolio for characters and enemies, providing lore and game data to players.

**Core Value:** Showcase the game's world and characters through an immersive wiki that will later integrate into a hybrid tabletop experience via ASP.NET.

### Constraints

- **Aesthetic**: Must match the 2D pixel art style of the game.
- **Tech Stack**: Must be compatible with future ASP.NET/Unity integration.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

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
# Initialize Next.js 15 with Payload 3.0
### Game Backend (ASP.NET)
# Create Minimal API
### Shared Models Library
# Create shared class library
## Sources
- [Next.js Documentation](https://nextjs.org/docs) (HIGH)
- [Payload CMS 3.0 Docs](https://payloadcms.com/docs) (HIGH)
- [ASP.NET Core 9.0 Minimal APIs](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/minimal-apis) (HIGH)
- [React Unity WebGL Documentation](https://react-unity-webgl.dev/) (MEDIUM - Community driven but standard)
- [Pixelact UI](https://pixelactui.com/) (LOW - Specific aesthetic choice)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
