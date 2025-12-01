# Testing Guide for AdPilot

## Testing Philosophy

We use a two-tier testing strategy:

1. **Unit Tests (Vitest)** - Test the Technical Layer
   - Pure functions
   - React components in isolation
   - API handlers
   - Database queries

2. **Browser Tests (Playwright)** - Test the Product Layer
   - User flows and journeys
   - Cross-browser compatibility
   - Visual regression
   - Accessibility

## Running Tests

```bash
# Unit tests
pnpm test              # Run once
pnpm test:watch        # Watch mode
pnpm test:coverage     # With coverage

# Browser tests
pnpm test:e2e          # Run all E2E tests
pnpm test:e2e:ui       # With Playwright UI
pnpm test:e2e:debug    # Debug mode

# All tests
pnpm test:all          # Unit + E2E
```

## Writing Unit Tests

Location: `tests/unit/`

```typescript
// tests/unit/lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { formatCurrency } from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00');
  });

  it('handles negative values', () => {
    expect(formatCurrency(-500)).toBe('-$500.00');
  });
});
```

### Component Testing

```typescript
// tests/unit/components/Button.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    render(<Button variant="primary">Primary</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-primary');
  });
});
```

## Writing Browser Tests

Location: `tests/browser/`

```typescript
// tests/browser/flows/signup.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Signup Flow', () => {
  test('user can create an account', async ({ page }) => {
    await page.goto('/signup');
    
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'SecurePass123!');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome');
  });

  test('shows validation errors', async ({ page }) => {
    await page.goto('/signup');
    
    await page.click('button[type="submit"]');
    
    await expect(page.locator('.error-message')).toBeVisible();
  });
});
```

### Page Object Pattern

For complex pages, use page objects:

```typescript
// tests/browser/pages/DashboardPage.ts
import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly createCampaignBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.locator('h1');
    this.createCampaignBtn = page.locator('[data-testid="create-campaign"]');
  }

  async goto() {
    await this.page.goto('/dashboard');
  }

  async createCampaign(name: string) {
    await this.createCampaignBtn.click();
    await this.page.fill('[name="campaign-name"]', name);
    await this.page.click('button[type="submit"]');
  }
}
```

## Test Fixtures

Location: `tests/fixtures/`

```typescript
// tests/fixtures/users.ts
export const testUsers = {
  admin: {
    email: 'admin@test.com',
    password: 'AdminPass123!',
    role: 'admin',
  },
  agency: {
    email: 'agency@test.com',
    password: 'AgencyPass123!',
    role: 'agency',
  },
  freelancer: {
    email: 'freelancer@test.com',
    password: 'FreelancePass123!',
    role: 'freelancer',
  },
};
```

## Test Data Management

For browser tests, we seed the database before running:

```bash
# Reset and seed test database
pnpm db:test:reset

# Run browser tests
pnpm test:e2e
```

## Coverage Requirements

- **Unit Tests**: Aim for 80%+ coverage on business logic
- **Browser Tests**: Cover all critical user flows
- **Accessibility**: All pages must pass axe-core checks

## CI Integration

Tests run automatically on:
- Pull requests (all tests)
- Main branch commits (all tests)
- Nightly builds (full regression)

