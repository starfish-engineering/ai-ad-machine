# Code Conventions for AdPilot

## TypeScript Guidelines

### Strict Mode
We use strict TypeScript configuration. Always:
- Define explicit types for function parameters
- Use proper return types
- Avoid `any` - use `unknown` if type is truly unknown

### Type Definitions

```typescript
// Prefer interfaces for objects that can be extended
interface User {
  id: string;
  email: string;
  name: string;
}

// Use types for unions, primitives, and computed types
type UserRole = 'admin' | 'agency' | 'freelancer' | 'enterprise';
type UserWithRole = User & { role: UserRole };
```

### Async/Await
Always use async/await over raw promises:

```typescript
// ✅ Good
async function fetchUser(id: string): Promise<User> {
  const response = await supabase.from('users').select().eq('id', id).single();
  return response.data;
}

// ❌ Avoid
function fetchUser(id: string): Promise<User> {
  return supabase.from('users').select().eq('id', id).single().then(r => r.data);
}
```

## React Conventions

### Component Structure

```typescript
// components/ui/Button.tsx

// 1. Imports
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// 2. Types
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

// 3. Component
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium',
          // variant styles
          variant === 'primary' && 'bg-primary text-white',
          variant === 'secondary' && 'bg-secondary text-foreground',
          variant === 'ghost' && 'bg-transparent hover:bg-muted',
          // size styles
          size === 'sm' && 'h-8 px-3 text-sm',
          size === 'md' && 'h-10 px-4',
          size === 'lg' && 'h-12 px-6 text-lg',
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
```

### Server vs Client Components

```typescript
// Server Component (default) - No 'use client' directive
// app/dashboard/page.tsx
import { createServerClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createServerClient();
  const { data } = await supabase.from('campaigns').select();
  
  return <CampaignList campaigns={data} />;
}

// Client Component - Has 'use client' directive
// components/features/CampaignFilter.tsx
'use client';

import { useState } from 'react';

export function CampaignFilter({ onFilter }: { onFilter: (q: string) => void }) {
  const [query, setQuery] = useState('');
  // ...
}
```

### Custom Hooks

```typescript
// lib/hooks/useCampaigns.ts
'use client';

import { useQuery } from '@tanstack/react-query';
import { createBrowserClient } from '@/lib/supabase/client';

export function useCampaigns() {
  const supabase = createBrowserClient();
  
  return useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase.from('campaigns').select();
      if (error) throw error;
      return data;
    },
  });
}
```

## Supabase Conventions

### Server-Side Queries

```typescript
// lib/supabase/server.ts
import { createServerClient as createClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createServerClient() {
  const cookieStore = await cookies();
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => cookieStore.get(name)?.value,
        set: (name, value, options) => cookieStore.set(name, value, options),
        remove: (name, options) => cookieStore.delete(name),
      },
    }
  );
}
```

### Client-Side Queries

```typescript
// lib/supabase/client.ts
import { createBrowserClient as createClient } from '@supabase/ssr';

export function createBrowserClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

## File Organization

```
src/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # Marketing pages (no auth)
│   │   ├── page.tsx        # Homepage
│   │   ├── pricing/
│   │   └── features/
│   ├── (auth)/             # Auth pages
│   │   ├── login/
│   │   └── signup/
│   └── (dashboard)/        # Authenticated app
│       ├── layout.tsx
│       └── dashboard/
├── components/
│   ├── ui/                 # Primitive components
│   ├── layout/             # Layout components
│   ├── features/           # Feature components
│   └── forms/              # Form components
├── lib/
│   ├── supabase/           # Supabase clients
│   ├── utils/              # Utility functions
│   └── hooks/              # Custom hooks
└── types/                  # TypeScript definitions
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Types/Interfaces | PascalCase | `User`, `Campaign` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_FILE_SIZE` |
| CSS Classes | kebab-case (Tailwind) | `text-primary` |
| Database Tables | snake_case | `user_campaigns` |

## Error Handling

```typescript
// Use Result pattern for operations that can fail
type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

async function createCampaign(data: CampaignInput): Promise<Result<Campaign>> {
  try {
    const campaign = await db.campaigns.create(data);
    return { success: true, data: campaign };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

// Usage
const result = await createCampaign(input);
if (result.success) {
  console.log('Created:', result.data);
} else {
  console.error('Failed:', result.error);
}
```

## Comments

```typescript
// Use JSDoc for public APIs
/**
 * Formats a number as currency.
 * @param amount - The amount to format
 * @param currency - ISO 4217 currency code (default: USD)
 * @returns Formatted currency string
 * @example
 * formatCurrency(1000) // "$1,000.00"
 * formatCurrency(1000, 'EUR') // "€1,000.00"
 */
export function formatCurrency(amount: number, currency = 'USD'): string {
  // Implementation
}

// Use TODO/FIXME for tracked work
// TODO(#123): Add support for multiple currencies
// FIXME: This breaks with negative values
```

