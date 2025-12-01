# Supabase Guide for AdPilot

## Local Development

### Starting Supabase

```bash
# Start all Supabase services via Docker
pnpm supabase:start

# This starts:
# - PostgreSQL on port 54322
# - Supabase Studio on port 54323
# - Kong API Gateway on port 54321
# - Auth on port 54325
# - REST API on port 54326
# - Storage on port 54328
# - Realtime on port 54329
```

### Stopping Supabase

```bash
# Stop all services
pnpm supabase:stop

# Stop and remove volumes (reset data)
pnpm supabase:reset
```

### Accessing Services

| Service | URL |
|---------|-----|
| API Gateway | http://localhost:54321 |
| Database | localhost:54322 |
| Studio (UI) | http://localhost:54323 |
| Auth | http://localhost:54325 |

### Default Credentials

```
Database:
  Host: localhost
  Port: 54322
  Database: postgres
  User: postgres
  Password: postgres

API Keys (local only - safe to commit):
  Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
  Service Role: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
```

## Database Migrations

### Creating Migrations

```bash
# Create a new migration file
pnpm db:migration:new create_users_table
```

This creates: `supabase/migrations/TIMESTAMP_create_users_table.sql`

### Migration File Structure

```sql
-- supabase/migrations/20240101000000_create_users_table.sql

-- Create users table
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'agency', 'freelancer', 'enterprise', 'user')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

-- Create updated_at trigger
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION extensions.moddatetime('updated_at');
```

### Running Migrations

```bash
# Run pending migrations (local)
pnpm db:migrate

# Reset database and run all migrations
pnpm db:reset
```

## Row Level Security (RLS)

### Common Patterns

```sql
-- Users can only see their own data
CREATE POLICY "Users see own data"
  ON public.campaigns
  FOR SELECT
  USING (user_id = auth.uid());

-- Users can only modify their own data
CREATE POLICY "Users modify own data"
  ON public.campaigns
  FOR ALL
  USING (user_id = auth.uid());

-- Admins can see everything
CREATE POLICY "Admins see all"
  ON public.campaigns
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Team members can see team data
CREATE POLICY "Team members see team data"
  ON public.campaigns
  FOR SELECT
  USING (
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid()
    )
  );
```

## Authentication

### Server-Side Auth Check

```typescript
// app/dashboard/page.tsx
import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return <Dashboard user={user} />;
}
```

### Client-Side Auth

```typescript
// components/auth/LoginForm.tsx
'use client';

import { createBrowserClient } from '@/lib/supabase/client';

export function LoginForm() {
  const supabase = createBrowserClient();
  
  const handleLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Login failed:', error.message);
    }
  };
  
  // ...
}
```

### OAuth Providers

```typescript
// Sign in with Google
const { error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/auth/callback`,
  },
});
```

## Realtime Subscriptions

```typescript
// Subscribe to changes
const subscription = supabase
  .channel('campaigns')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'campaigns',
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      console.log('Change received:', payload);
    }
  )
  .subscribe();

// Cleanup
subscription.unsubscribe();
```

## Storage

```typescript
// Upload file
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${userId}/avatar.png`, file);

// Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(`${userId}/avatar.png`);
```

## Environment Configuration

### Local Development
```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

### Preview (Vercel)
Set in Vercel project settings:
- Link to Supabase Preview project
- Auto-populated via Vercel integration

### Production (Vercel)
Set in Vercel project settings:
- Link to Supabase Production project
- Auto-populated via Vercel integration

## Type Generation

```bash
# Generate TypeScript types from database schema
pnpm db:types

# This creates: src/types/database.types.ts
```

Usage:
```typescript
import type { Database } from '@/types/database.types';

type Campaign = Database['public']['Tables']['campaigns']['Row'];
type CampaignInsert = Database['public']['Tables']['campaigns']['Insert'];
```

