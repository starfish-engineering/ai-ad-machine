# 🔌 API Documentation

## Overview

AdPilot uses a hybrid API approach:
1. **Server Actions** - For mutations from React components
2. **API Routes** - For external integrations and webhooks
3. **Supabase Direct** - For realtime and simple queries

## Authentication

### Session-Based Auth

All requests are authenticated via Supabase session cookies.

```typescript
// Server Component / Server Action
const supabase = await createServerClient();
const { data: { user } } = await supabase.auth.getUser();

if (!user) {
  redirect('/login');
}
```

### API Key Auth (Future)

For external API consumers:

```http
Authorization: Bearer sk_live_xxx
```

## Server Actions

### Campaign Actions

```typescript
// src/app/actions/campaigns.ts
'use server';

import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateCampaignSchema = z.object({
  name: z.string().min(1).max(100),
  type: z.enum(['search', 'shopping', 'display', 'social', 'video']),
  budget: z.number().positive(),
  platform: z.enum(['google', 'meta', 'amazon', 'microsoft', 'linkedin']),
});

export async function createCampaign(formData: FormData) {
  const supabase = await createServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  
  const validated = CreateCampaignSchema.parse({
    name: formData.get('name'),
    type: formData.get('type'),
    budget: Number(formData.get('budget')),
    platform: formData.get('platform'),
  });
  
  const { data, error } = await supabase
    .from('campaigns')
    .insert({
      ...validated,
      user_id: user.id,
    })
    .select()
    .single();
  
  if (error) throw error;
  
  revalidatePath('/campaigns');
  return data;
}

export async function updateCampaign(id: string, formData: FormData) {
  // Similar pattern...
}

export async function deleteCampaign(id: string) {
  const supabase = await createServerClient();
  
  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  
  revalidatePath('/campaigns');
}
```

### Usage in Components

```tsx
// Client Component
'use client';

import { createCampaign } from '@/app/actions/campaigns';

export function CreateCampaignForm() {
  return (
    <form action={createCampaign}>
      <input name="name" required />
      <select name="type">
        <option value="search">Search</option>
        <option value="shopping">Shopping</option>
      </select>
      <input name="budget" type="number" required />
      <select name="platform">
        <option value="google">Google</option>
        <option value="meta">Meta</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
}
```

## API Routes

### Route Structure

```
src/app/api/
├── auth/
│   └── callback/
│       └── route.ts       # OAuth callback handler
├── webhooks/
│   ├── stripe/
│   │   └── route.ts       # Stripe webhooks
│   └── platforms/
│       └── [platform]/
│           └── route.ts   # Platform webhooks
├── cron/
│   ├── sync-data/
│   │   └── route.ts       # Scheduled data sync
│   └── process-rules/
│       └── route.ts       # Automation rule processor
└── v1/
    ├── campaigns/
    │   └── route.ts       # Public API (future)
    └── reports/
        └── route.ts       # Public API (future)
```

### OAuth Callback

```typescript
// src/app/api/auth/callback/route.ts
import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
```

### Webhook Handler

```typescript
// src/app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = await createAdminClient();

  switch (event.type) {
    case 'customer.subscription.created':
      // Handle subscription created
      break;
    case 'customer.subscription.updated':
      // Handle subscription updated
      break;
    case 'customer.subscription.deleted':
      // Handle subscription cancelled
      break;
  }

  return NextResponse.json({ received: true });
}
```

### Cron Job

```typescript
// src/app/api/cron/sync-data/route.ts
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = await createAdminClient();
  
  // Get all active accounts that need syncing
  const { data: accounts } = await supabase
    .from('connected_accounts')
    .select('*')
    .eq('sync_enabled', true);

  // Process each account
  for (const account of accounts ?? []) {
    try {
      await syncAccountData(account);
    } catch (error) {
      console.error(`Failed to sync account ${account.id}:`, error);
    }
  }

  return NextResponse.json({ synced: accounts?.length ?? 0 });
}

async function syncAccountData(account: any) {
  // Implementation
}
```

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Valid auth but insufficient permissions |
| `NOT_FOUND` | 404 | Resource does not exist |
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

## Rate Limiting

| Endpoint Type | Limit | Window |
|--------------|-------|--------|
| Server Actions | 100 | 1 minute |
| API Routes | 60 | 1 minute |
| Webhooks | 1000 | 1 minute |
| Cron Jobs | 1 | Per schedule |

## Response Formats

### Success Response

```json
{
  "data": {
    "id": "123",
    "name": "Campaign Name"
  }
}
```

### List Response

```json
{
  "data": [
    { "id": "123", "name": "Campaign 1" },
    { "id": "456", "name": "Campaign 2" }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 42,
    "totalPages": 3
  }
}
```

### Error Response

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid campaign budget",
    "details": {
      "field": "budget",
      "constraint": "must be positive"
    }
  }
}
```

