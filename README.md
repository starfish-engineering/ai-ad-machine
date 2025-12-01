# AdPilot - PPC Automation SaaS Platform

> Worry-free PPC management in the AI era. Monitor, optimize, and safeguard your paid media accounts with always-on automation — while you stay in control.

## 🎯 Project Overview

AdPilot is a B2B SaaS platform for paid media and PPC teams that:
- **Automates** routine optimization tasks
- **Protects** with guardrails (budget, bids, alerts)
- **Analyzes** with deeper insights and reporting
- **Serves** agencies, in-house teams, freelancers, and enterprises

## 📁 Three-Layer Architecture

This project is organized into three distinct conceptual layers:

### 🌍 Outer World (`docs/outer-world/`)
Business context, market positioning, and long-term strategy.
- [Business Overview](docs/outer-world/business/README.md)
- [Market Analysis](docs/outer-world/market/README.md)
- [Strategy](docs/outer-world/strategy/README.md)

### 🎨 Product Layer (`docs/product-layer/`)
User experience, features, and the surface area where users interact.
- [User Experience](docs/product-layer/user-experience/README.md)
- [Features](docs/product-layer/features/README.md)
- [Design System](docs/product-layer/design/README.md)

### ⚙️ Technical Layer (`docs/technical-layer/`)
Architecture, codebase organization, and implementation details.
- [Architecture](docs/technical-layer/architecture/README.md)
- [API Documentation](docs/technical-layer/api/README.md)
- [Database Schema](docs/technical-layer/database/README.md)

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 10+
- Docker (for local Supabase)

### Local Development

```bash
# Install dependencies
pnpm install

# Start local Supabase (Docker required)
pnpm supabase:start

# Run development server
pnpm dev

# Open http://localhost:3000
```

### Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Configure your local Supabase credentials
# (auto-generated when you run supabase:start)
```

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run unit tests in watch mode
pnpm test:watch

# Run browser tests
pnpm test:e2e

# Run all tests
pnpm test:all
```

## 📦 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Deployment | Vercel |
| Unit Testing | Vitest |
| E2E Testing | Playwright |

## 🗂️ Project Structure

```
ai-ad-machine/
├── .cursor/              # Cursor AI skills & project context
│   └── skills/           # Project-specific AI skills
├── docs/                 # Three-layer documentation
│   ├── outer-world/      # Business & strategy
│   ├── product-layer/    # UX & features
│   └── technical-layer/  # Architecture & code
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # React components
│   │   ├── ui/           # Base UI components
│   │   ├── layout/       # Layout components
│   │   ├── features/     # Feature-specific components
│   │   └── forms/        # Form components
│   ├── lib/              # Utilities & helpers
│   │   ├── supabase/     # Supabase client & helpers
│   │   ├── utils/        # General utilities
│   │   └── hooks/        # Custom React hooks
│   ├── types/            # TypeScript type definitions
│   └── styles/           # Global styles
├── supabase/             # Supabase configuration
│   ├── migrations/       # Database migrations
│   └── seed/             # Seed data
├── tests/                # Test files
│   ├── unit/             # Unit tests
│   ├── browser/          # Playwright E2E tests
│   └── fixtures/         # Test fixtures
└── public/               # Static assets
```

## 🌐 Environments

| Environment | Database | URL |
|-------------|----------|-----|
| Local | Docker Supabase | http://localhost:3000 |
| Preview | Cloud Supabase (Preview) | Vercel Preview URL |
| Production | Cloud Supabase (Prod) | adpilot.com |

## 📜 Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm test         # Run unit tests
pnpm test:e2e     # Run browser tests
pnpm supabase:start   # Start local Supabase
pnpm supabase:stop    # Stop local Supabase
pnpm supabase:reset   # Reset local database
pnpm db:migrate   # Run database migrations
pnpm db:seed      # Seed database with test data
```

## 🤖 AI Agent Integration

This project is designed for AI-assisted development:

- **`.cursor/skills/`** - Project-specific AI skills that grow over time
- **Three-layer docs** - Clear context for AI to understand business, product, and technical requirements
- **Browser tests** - AI can run and validate user flows
- **Unit tests** - AI can verify code correctness

## 📄 License

Private - All rights reserved.
