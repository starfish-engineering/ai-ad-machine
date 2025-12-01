# AdPilot Project Overview

## What is AdPilot?

AdPilot is a B2B SaaS platform for PPC (Pay-Per-Click) automation. It helps paid media teams:
- **Automate** routine optimization tasks
- **Monitor** campaigns in real-time with intelligent alerts
- **Optimize** with AI-powered recommendations
- **Protect** budgets with guardrails and controls
- **Report** with customizable dashboards and exports

## Target Users

1. **PPC Agencies** - Managing multiple client accounts
2. **In-House Teams** - Optimizing internal campaigns
3. **Freelancers** - Solo practitioners scaling operations
4. **Enterprises** - Large organizations with complex needs

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript 5.9
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Deployment**: Vercel
- **Testing**: Vitest (unit), Playwright (E2E)

## Project Structure

The project is organized into three conceptual layers:

### 1. Outer World (`docs/outer-world/`)
Business context, market positioning, and strategy.

### 2. Product Layer (`docs/product-layer/`)
User experience, features, and the interaction surface.

### 3. Technical Layer (`docs/technical-layer/`)
Architecture, codebase, and implementation details.

## Key Conventions

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Types: `types.ts` or `*.types.ts`
- Tests: `*.test.ts` or `*.spec.ts`

### Component Organization
```
src/components/
├── ui/           # Base UI components (Button, Card, Input)
├── layout/       # Layout components (Header, Footer, Sidebar)
├── features/     # Feature-specific components
└── forms/        # Form components and validation
```

### Import Aliases
- `@/*` - Maps to `src/*`

### Environment Strategy
- Local: Docker Supabase
- Preview: Cloud Supabase (Preview project)
- Production: Cloud Supabase (Prod project)

