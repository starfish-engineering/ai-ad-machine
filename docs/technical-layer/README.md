# ⚙️ Technical Layer - Architecture & Implementation

> The inner workings of Draper: code architecture, database design, and technical decisions.

## Purpose

This layer documents the "how" at a technical level:
- **Architecture** - System design and patterns
- **API** - Endpoints and integrations
- **Database** - Schema and data models

## Contents

### 🏗️ [Architecture](./architecture/README.md)
- System overview
- Component architecture
- State management
- Security model
- Performance strategy

### 🔌 [API](./api/README.md)
- REST endpoints
- GraphQL schema (if applicable)
- Authentication & authorization
- Rate limiting
- Error handling

### 💾 [Database](./database/README.md)
- Entity relationship diagrams
- Table schemas
- Indexes & optimization
- Migration strategy
- Backup & recovery

## Tech Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4
- **State**: React Server Components + Client State
- **Forms**: React Hook Form + Zod

### Backend
- **Runtime**: Vercel Edge Functions + Node.js
- **Database**: Supabase PostgreSQL
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Realtime**: Supabase Realtime

### Infrastructure
- **Hosting**: Vercel
- **Database**: Supabase
- **CDN**: Vercel Edge Network
- **Monitoring**: Vercel Analytics + Custom

### Development
- **Package Manager**: pnpm
- **Testing**: Vitest (unit) + Playwright (E2E)
- **Linting**: ESLint + Prettier
- **CI/CD**: GitHub Actions + Vercel

## Architecture Principles

### 1. Server-First
Leverage React Server Components for:
- Reduced client bundle size
- Better SEO
- Direct database access
- Improved security

### 2. Type Safety
End-to-end TypeScript with:
- Supabase generated types
- Zod validation schemas
- Strict mode enabled

### 3. Progressive Enhancement
- Core functionality works without JS
- Enhanced experience with client interactivity
- Graceful degradation

### 4. Security by Default
- Row-level security in Supabase
- Server-side validation
- CSRF protection
- Rate limiting

## Testing Strategy

### Unit Tests (Vitest)
- Pure functions
- React components (isolated)
- API route handlers
- Database queries

### Browser Tests (Playwright)
- Critical user flows
- Cross-browser compatibility
- Visual regression
- Accessibility

### Test Organization
```
tests/
├── unit/
│   ├── components/
│   ├── lib/
│   └── api/
├── browser/
│   ├── flows/
│   └── pages/
└── fixtures/
    ├── users.ts
    └── campaigns.ts
```

## Environment Strategy

| Environment | Supabase | Purpose |
|-------------|----------|---------|
| Local | Docker | Development & testing |
| Preview | Cloud (Preview Project) | PR previews |
| Production | Cloud (Prod Project) | Live site |

## Related Docs
- [Outer World](../outer-world/README.md) - Business context
- [Product Layer](../product-layer/README.md) - What we're building

