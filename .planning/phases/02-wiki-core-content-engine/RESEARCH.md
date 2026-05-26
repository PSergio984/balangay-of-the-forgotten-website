# Phase 2 Research: Wiki Core & Content Engine

## Payload CMS 3.0 Integration (Next.js 15)

### Installation Strategy
Payload 3.0 is Next.js native and runs within the App Router.
1. **Packages**: `payload`, `@payloadcms/next`, `@payloadcms/db-postgres`, `graphql`, `@payloadcms/richtext-lexical`.
2. **Next.js Config**: Wrap `next.config.ts` (or `.mjs`) with `withPayload`.
3. **Database**: Requires PostgreSQL. Since local Docker/Postgres is unavailable/not running, we should recommend a hosted solution (Neon, Supabase) or confirm local DB availability with the user.
4. **Local API**: Use `getPayload({ config: configPromise })` in Server Components for high-performance direct DB access.

### Data Modeling (Relational Wiki)

#### Collections & Relationships
- **Characters**:
  - `faction`: Relationship to `Factions`.
  - `relics`: Relationship to `Relics` (hasMany).
- **Bosses**:
  - `location`: Relationship to `Locations`.
  - `relics`: `join` field to `Relics` on `sourceBoss`.
  - `minibosses`: `join` field to `Minibosses` on `parentBoss`.
- **Relics**:
  - `sourceBoss`: Relationship to `Bosses`.
  - `foundAt`: Relationship to `Locations`.
- **Locations**:
  - `parent`: Self-referencing relationship for hierarchy (e.g., Region > Area).
  - `bosses`: `join` field from `Bosses`.

#### Bi-directional Patterns
- Use Payload 3.0's `join` field to avoid manual hook-based sync for bi-directional links.
- Define "See Also" sections using Polymorphic Relationships.

### Wiki Architecture

#### Dynamic Routing
- Path: `app/wiki/[category]/[slug]/page.tsx`.
- Use `generateStaticParams` for pre-rendering lore entries.
- Next.js 15 specific: `params` must be awaited.

#### Presentation
- **Immersive Scroll**: Each entry page will wrap the content in the `AncientScrollContainer` component.
- **Cross-linking**: Lexical editor supports internal links. Use the `select` API to only fetch `title` and `slug` for these links to prevent over-fetching.

### Technical Hurdles & Mitigation
- **ESM Requirement**: Ensure project uses ESM (`type: module` in `package.json`).
- **PostgreSQL Connection**: Need a valid `DATABASE_URL`.
- **Type Generation**: Run `npx payload generate:types` after defining collections to maintain type safety.

## Next Steps
1. Discuss PostgreSQL hosting preference (Local vs. Cloud).
2. Define the exact fields for the "Lore Stat Block" (Health, Skills, etc.).
3. Begin implementation of `payload.config.ts`.
