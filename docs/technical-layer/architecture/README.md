# 🏗️ Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DRAPER ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                          CLIENT LAYER                                │    │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                  │    │
│  │  │   Browser   │  │   Mobile    │  │    API      │                  │    │
│  │  │   (React)   │  │  (Future)   │  │  Consumers  │                  │    │
│  │  └─────────────┘  └─────────────┘  └─────────────┘                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                      │                                       │
│                                      ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                       APPLICATION LAYER                              │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │                    Next.js App Router                        │    │    │
│  │  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐ │    │    │
│  │  │  │  Server   │  │  Server   │  │   API     │  │  Server   │ │    │    │
│  │  │  │Components │  │  Actions  │  │  Routes   │  │ Middleware│ │    │    │
│  │  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘ │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  │                                                                      │    │
│  │  ┌─────────────────────────────────────────────────────────────┐    │    │
│  │  │                    Vercel Edge Runtime                       │    │    │
│  │  │  ┌───────────┐  ┌───────────┐  ┌───────────┐               │    │    │
│  │  │  │  Caching  │  │   Rate    │  │   Auth    │               │    │    │
│  │  │  │           │  │  Limiting │  │ Middleware│               │    │    │
│  │  │  └───────────┘  └───────────┘  └───────────┘               │    │    │
│  │  └─────────────────────────────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                      │                                       │
│                                      ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                          DATA LAYER                                  │    │
│  │  ┌───────────────────┐  ┌───────────────────┐  ┌─────────────────┐  │    │
│  │  │     Supabase      │  │     Supabase      │  │    Supabase     │  │    │
│  │  │    PostgreSQL     │  │       Auth        │  │     Storage     │  │    │
│  │  │    + Realtime     │  │                   │  │                 │  │    │
│  │  └───────────────────┘  └───────────────────┘  └─────────────────┘  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                      │                                       │
│                                      ▼                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                       EXTERNAL SERVICES                              │    │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐        │    │
│  │  │  Google   │  │   Meta    │  │  Amazon   │  │ Microsoft │        │    │
│  │  │  Ads API  │  │  Ads API  │  │  Ads API  │  │  Ads API  │        │    │
│  │  └───────────┘  └───────────┘  └───────────┘  └───────────┘        │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Core Principles

### 1. Server-First Architecture

We leverage React Server Components and Next.js App Router for:
- **Performance**: Reduced JavaScript bundle sent to client
- **Security**: Sensitive operations stay on server
- **SEO**: Full server-side rendering
- **Simplicity**: Direct database access without API layer

```tsx
// Server Component - default
async function CampaignList() {
  const supabase = await createServerClient();
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*');
  
  return <ul>{campaigns?.map(c => <li key={c.id}>{c.name}</li>)}</ul>;
}
```

### 2. Edge-Ready

- Middleware runs at the edge for fast auth checks
- API routes can run at edge when possible
- Static assets served from global CDN

### 3. Type-Safe End-to-End

- TypeScript strict mode
- Supabase generated types
- Zod validation at boundaries
- No `any` types

### 4. Secure by Default

- Row Level Security (RLS) in database
- Server-side validation
- CSRF protection via Supabase Auth
- No secrets in client code

## Component Architecture

### Component Categories

```
src/components/
├── ui/           # Primitive components (Button, Input, Card)
│                 # - Stateless
│                 # - Highly reusable
│                 # - Design system aligned
│
├── layout/       # Layout components (Header, Footer, Sidebar)
│                 # - Structural
│                 # - May include navigation logic
│
├── features/     # Feature-specific components
│                 # - Business logic
│                 # - May fetch data
│                 # - Domain-specific
│
└── forms/        # Form components
                  # - Validation logic
                  # - Server action integration
```

### Component Patterns

#### 1. Container/Presenter Pattern

```tsx
// Container: handles data fetching (Server Component)
async function CampaignListContainer() {
  const campaigns = await fetchCampaigns();
  return <CampaignListPresenter campaigns={campaigns} />;
}

// Presenter: handles rendering (can be Client Component)
function CampaignListPresenter({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <ul>
      {campaigns.map(c => <CampaignCard key={c.id} campaign={c} />)}
    </ul>
  );
}
```

#### 2. Compound Components

```tsx
// Card compound component
<Card>
  <Card.Header>
    <Card.Title>Campaign Name</Card.Title>
  </Card.Header>
  <Card.Content>
    {/* Content */}
  </Card.Content>
  <Card.Footer>
    {/* Actions */}
  </Card.Footer>
</Card>
```

#### 3. Render Props / Headless

```tsx
// Headless dropdown
<Dropdown>
  {({ isOpen, toggle }) => (
    <>
      <Dropdown.Trigger onClick={toggle}>
        Options
      </Dropdown.Trigger>
      {isOpen && (
        <Dropdown.Menu>
          <Dropdown.Item>Edit</Dropdown.Item>
          <Dropdown.Item>Delete</Dropdown.Item>
        </Dropdown.Menu>
      )}
    </>
  )}
</Dropdown>
```

## Data Flow

### Server Component Data Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Browser   │───▶│   Next.js   │───▶│  Supabase   │
│   Request   │    │   Server    │    │  Database   │
└─────────────┘    └─────────────┘    └─────────────┘
                         │
                         ▼
                   ┌─────────────┐
                   │   Render    │
                   │   HTML      │
                   └─────────────┘
                         │
                         ▼
                   ┌─────────────┐
                   │   Browser   │
                   │   Display   │
                   └─────────────┘
```

### Client Component Data Flow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Browser   │───▶│   Next.js   │───▶│  Supabase   │
│   Event     │    │ API Route   │    │     API     │
└─────────────┘    └─────────────┘    └─────────────┘
       ▲                                     │
       │                                     │
       └─────────────────────────────────────┘
                   Response
```

## State Management

### Server State
- Managed via Server Components
- Re-fetched on navigation
- Cached via Next.js Data Cache

### Client State
- Local component state (useState)
- URL state (searchParams)
- Form state (react-hook-form)
- Global client state (Context, if needed)

### Realtime State
- Supabase Realtime subscriptions
- WebSocket connections managed per-component

## Error Handling

### Error Boundaries

```tsx
// app/dashboard/error.tsx
'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### API Error Responses

```typescript
// Consistent error format
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Usage
return NextResponse.json(
  { code: 'UNAUTHORIZED', message: 'Invalid token' },
  { status: 401 }
);
```

## Caching Strategy

| Data Type | Cache Location | TTL | Revalidation |
|-----------|---------------|-----|--------------|
| Static pages | CDN | Forever | On deploy |
| User data | None | - | Always fresh |
| Campaign data | Server | 60s | On mutation |
| Platform data | Server | 15min | Scheduled |
| Static assets | CDN | 1 year | Content hash |

## Security Model

### Authentication Flow

```
┌─────────┐   ┌────────────┐   ┌──────────┐   ┌──────────┐
│ Browser │──▶│ Middleware │──▶│ Supabase │──▶│ Database │
│         │   │            │   │   Auth   │   │          │
└─────────┘   └────────────┘   └──────────┘   └──────────┘
     │              │                              │
     │              │         ┌────────────────────┘
     │              │         │ JWT validated
     │              │         ▼
     │              │   ┌──────────┐
     │              └──▶│ App Page │
     │                  └──────────┘
     │                       │
     └───────────────────────┘
           HTML Response
```

### Authorization Layers

1. **Middleware**: Route protection
2. **Server Components**: User context injection
3. **RLS Policies**: Data-level access control
4. **UI**: Feature visibility

## Deployment

### Environments

| Environment | Branch | Database | URL |
|-------------|--------|----------|-----|
| Local | - | Docker | localhost:3000 |
| Preview | PR branches | Supabase Preview | *.vercel.app |
| Production | main | Supabase Prod | draperads.com |

### CI/CD Pipeline

```
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│  Push   │──▶│  Lint   │──▶│  Test   │──▶│  Build  │
└─────────┘   └─────────┘   └─────────┘   └─────────┘
                                               │
                                               ▼
                                         ┌─────────┐
                                         │ Deploy  │
                                         └─────────┘
```

