# 💾 Database Schema

## Overview

Draper uses Supabase PostgreSQL with Row Level Security (RLS) enabled on all tables.

## Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐
│     users       │       │     teams       │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ email           │       │ name            │
│ full_name       │◀──────│ owner_id (FK)   │
│ avatar_url      │       │ plan            │
│ role            │       │ created_at      │
│ created_at      │       └─────────────────┘
│ updated_at      │              │
└─────────────────┘              │
        │                        │
        │                        ▼
        │               ┌─────────────────┐
        │               │  team_members   │
        │               ├─────────────────┤
        │               │ id (PK)         │
        └──────────────▶│ team_id (FK)    │
                        │ user_id (FK)    │
                        │ role            │
                        │ created_at      │
                        └─────────────────┘
                               │
                               │
        ┌──────────────────────┘
        │
        ▼
┌─────────────────┐       ┌─────────────────┐
│   campaigns     │       │connected_accounts│
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ user_id (FK)    │       │ user_id (FK)    │
│ team_id (FK)    │       │ platform        │
│ account_id (FK) │◀──────│ external_id     │
│ name            │       │ name            │
│ type            │       │ credentials     │
│ status          │       │ sync_enabled    │
│ budget          │       │ last_synced_at  │
│ spent           │       │ created_at      │
│ platform        │       └─────────────────┘
│ created_at      │
│ updated_at      │
└─────────────────┘
        │
        │
        ▼
┌─────────────────┐       ┌─────────────────┐
│automation_rules │       │     alerts      │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ user_id (FK)    │       │ user_id (FK)    │
│ campaign_id (FK)│       │ campaign_id (FK)│
│ name            │       │ type            │
│ trigger_type    │       │ severity        │
│ trigger_config  │       │ message         │
│ action_type     │       │ is_read         │
│ action_config   │       │ created_at      │
│ is_active       │       └─────────────────┘
│ last_triggered  │
│ created_at      │
└─────────────────┘
```

## Tables

### users

Stores user profile information (extends Supabase auth.users).

```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enum for user roles
CREATE TYPE user_role AS ENUM ('admin', 'agency', 'freelancer', 'enterprise', 'user');

-- RLS Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- Trigger to create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### teams

For agency and enterprise team management.

```sql
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view team"
  ON public.teams FOR SELECT
  USING (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = teams.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Only owner can update team"
  ON public.teams FOR UPDATE
  USING (owner_id = auth.uid());
```

### team_members

Junction table for team membership.

```sql
CREATE TYPE team_role AS ENUM ('admin', 'manager', 'member', 'viewer');

CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  role team_role NOT NULL DEFAULT 'member',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(team_id, user_id)
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view team membership"
  ON public.team_members FOR SELECT
  USING (
    user_id = auth.uid() OR
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid()
    )
  );
```

### connected_accounts

External ad platform connections.

```sql
CREATE TYPE platform AS ENUM ('google', 'meta', 'amazon', 'microsoft', 'linkedin');

CREATE TABLE public.connected_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  platform platform NOT NULL,
  external_id TEXT NOT NULL,
  name TEXT NOT NULL,
  credentials JSONB, -- Encrypted at rest
  sync_enabled BOOLEAN NOT NULL DEFAULT true,
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(platform, external_id)
);

ALTER TABLE public.connected_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own accounts"
  ON public.connected_accounts FOR ALL
  USING (
    user_id = auth.uid() OR
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND role IN ('admin', 'manager')
    )
  );
```

### campaigns

Campaign data synced from platforms.

```sql
CREATE TYPE campaign_type AS ENUM ('search', 'shopping', 'display', 'social', 'video');
CREATE TYPE campaign_status AS ENUM ('active', 'paused', 'completed', 'draft');

CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  account_id UUID REFERENCES public.connected_accounts(id) ON DELETE CASCADE,
  external_id TEXT,
  name TEXT NOT NULL,
  type campaign_type NOT NULL,
  status campaign_status NOT NULL DEFAULT 'draft',
  budget DECIMAL(12, 2) NOT NULL DEFAULT 0,
  spent DECIMAL(12, 2) NOT NULL DEFAULT 0,
  platform platform NOT NULL,
  metrics JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_campaigns_user_id ON public.campaigns(user_id);
CREATE INDEX idx_campaigns_account_id ON public.campaigns(account_id);
CREATE INDEX idx_campaigns_status ON public.campaigns(status);

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own campaigns"
  ON public.campaigns FOR SELECT
  USING (
    user_id = auth.uid() OR
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid()
    )
  );
```

### automation_rules

User-defined automation rules.

```sql
CREATE TYPE trigger_type AS ENUM ('schedule', 'threshold', 'event');
CREATE TYPE action_type AS ENUM ('pause', 'adjust_bid', 'adjust_budget', 'alert', 'report');

CREATE TABLE public.automation_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT,
  trigger_type trigger_type NOT NULL,
  trigger_config JSONB NOT NULL,
  action_type action_type NOT NULL,
  action_config JSONB NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_triggered_at TIMESTAMPTZ,
  execution_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.automation_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own rules"
  ON public.automation_rules FOR ALL
  USING (
    user_id = auth.uid() OR
    team_id IN (
      SELECT team_id FROM public.team_members
      WHERE user_id = auth.uid() AND role IN ('admin', 'manager')
    )
  );
```

### alerts

System and rule-generated alerts.

```sql
CREATE TYPE alert_type AS ENUM ('budget', 'performance', 'policy', 'system', 'rule');
CREATE TYPE alert_severity AS ENUM ('info', 'warning', 'error', 'critical');

CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE CASCADE,
  rule_id UUID REFERENCES public.automation_rules(id) ON DELETE SET NULL,
  type alert_type NOT NULL,
  severity alert_severity NOT NULL DEFAULT 'info',
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_alerts_user_id_unread ON public.alerts(user_id) WHERE is_read = false;

ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own alerts"
  ON public.alerts FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own alerts"
  ON public.alerts FOR UPDATE
  USING (user_id = auth.uid());
```

## Migrations

Migrations are stored in `supabase/migrations/` and applied in order.

### Creating a Migration

```bash
# Create a new migration file
touch supabase/migrations/$(date +%Y%m%d%H%M%S)_description.sql
```

### Migration Best Practices

1. **Idempotent**: Migrations should be safe to run multiple times
2. **Backwards Compatible**: Don't break existing functionality
3. **Small & Focused**: One logical change per migration
4. **Tested**: Test migrations on local database first

### Example Migration

```sql
-- supabase/migrations/20240101000000_add_user_preferences.sql

-- Add preferences column to users
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}';

-- Add comment
COMMENT ON COLUMN public.users.preferences IS 'User preferences and settings';

-- Create index for common queries
CREATE INDEX IF NOT EXISTS idx_users_preferences_theme
ON public.users ((preferences->>'theme'));
```

## Indexes

| Table | Index | Type | Purpose |
|-------|-------|------|---------|
| campaigns | user_id | B-tree | Filter by user |
| campaigns | account_id | B-tree | Filter by account |
| campaigns | status | B-tree | Filter by status |
| alerts | user_id + is_read | Partial | Unread alerts |
| automation_rules | is_active | Partial | Active rules |

## Backup & Recovery

- **Automatic Backups**: Daily by Supabase
- **Point-in-Time Recovery**: 7 days (Pro plan)
- **Manual Backups**: Via Supabase dashboard or pg_dump

## Performance Considerations

1. **Connection Pooling**: Use Supabase connection pooler for serverless
2. **Query Optimization**: Use EXPLAIN ANALYZE for slow queries
3. **Indexing**: Add indexes for frequently filtered columns
4. **Pagination**: Always paginate list queries
5. **Select Specific Columns**: Avoid SELECT * in production

