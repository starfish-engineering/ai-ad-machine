# 🎨 Design System

## Brand Identity

### Logo
- Primary: Full logo (icon + wordmark)
- Secondary: Icon only (for small spaces)
- Minimum size: 32px height

### Brand Personality
- **Professional** but not stuffy
- **Confident** but not arrogant
- **Helpful** but not patronizing
- **Modern** but not trendy

## Color System

### Primary Palette

```css
:root {
  /* Brand Colors */
  --color-primary: #2563eb;      /* Blue 600 - Primary actions */
  --color-primary-hover: #1d4ed8; /* Blue 700 - Hover state */
  --color-primary-light: #dbeafe; /* Blue 100 - Light backgrounds */
  
  /* Semantic Colors */
  --color-success: #16a34a;       /* Green 600 */
  --color-warning: #ca8a04;       /* Yellow 600 */
  --color-error: #dc2626;         /* Red 600 */
  --color-info: #0891b2;          /* Cyan 600 */
  
  /* Neutral Colors */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  
  /* Background & Foreground */
  --color-background: #ffffff;
  --color-foreground: #111827;
  --color-muted: #f3f4f6;
  --color-muted-foreground: #6b7280;
}

/* Dark Mode */
.dark {
  --color-background: #0f172a;
  --color-foreground: #f8fafc;
  --color-muted: #1e293b;
  --color-muted-foreground: #94a3b8;
}
```

### Usage Guidelines

| Color | Use For | Don't Use For |
|-------|---------|---------------|
| Primary | CTAs, links, focus states | Large backgrounds |
| Success | Positive metrics, confirmations | Non-success content |
| Warning | Caution states, pending | Normal content |
| Error | Errors, destructive actions | Warnings |
| Gray | Text, borders, backgrounds | Status indicators |

## Typography

### Font Stack

```css
:root {
  --font-sans: 'DM Sans', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}
```

### Type Scale

| Name | Size | Weight | Line Height | Use |
|------|------|--------|-------------|-----|
| Display | 48px | 700 | 1.1 | Hero headlines |
| H1 | 36px | 700 | 1.2 | Page titles |
| H2 | 30px | 600 | 1.3 | Section headers |
| H3 | 24px | 600 | 1.4 | Subsection headers |
| H4 | 20px | 600 | 1.4 | Card titles |
| Body Large | 18px | 400 | 1.6 | Intro paragraphs |
| Body | 16px | 400 | 1.6 | Main content |
| Body Small | 14px | 400 | 1.5 | Secondary content |
| Caption | 12px | 500 | 1.4 | Labels, helpers |

## Spacing System

Using 4px base unit:

| Token | Value | Use |
|-------|-------|-----|
| xs | 4px | Tight spacing |
| sm | 8px | Related elements |
| md | 16px | Component padding |
| lg | 24px | Section gaps |
| xl | 32px | Large gaps |
| 2xl | 48px | Section padding |
| 3xl | 64px | Page sections |

## Components

### Buttons

```tsx
// Variants
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>

// States
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>
```

### Form Elements

```tsx
// Text Input
<Input 
  label="Email address"
  type="email"
  placeholder="you@example.com"
  error="Invalid email format"
/>

// Select
<Select 
  label="Campaign type"
  options={[
    { value: 'search', label: 'Search' },
    { value: 'shopping', label: 'Shopping' },
  ]}
/>

// Checkbox
<Checkbox 
  label="Enable automation"
  description="Allow rules to make changes automatically"
/>
```

### Cards

```tsx
// Basic Card
<Card>
  <CardHeader>
    <CardTitle>Campaign Performance</CardTitle>
    <CardDescription>Last 30 days</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
  <CardFooter>
    <Button>View Details</Button>
  </CardFooter>
</Card>

// Stat Card
<StatCard
  title="Total Spend"
  value="$24,500"
  change="+12.5%"
  trend="up"
/>
```

### Data Display

```tsx
// Table
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Campaign</TableHead>
      <TableHead>Spend</TableHead>
      <TableHead>Conversions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {campaigns.map((c) => (
      <TableRow key={c.id}>
        <TableCell>{c.name}</TableCell>
        <TableCell>{formatCurrency(c.spend)}</TableCell>
        <TableCell>{c.conversions}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

// Badge
<Badge variant="success">Active</Badge>
<Badge variant="warning">Paused</Badge>
<Badge variant="error">Error</Badge>
```

## Layout

### Breakpoints

| Name | Min Width | Typical Devices |
|------|-----------|-----------------|
| sm | 640px | Large phones |
| md | 768px | Tablets |
| lg | 1024px | Small laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large desktops |

### Grid System

```tsx
// 12-column grid
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-12 md:col-span-8">Main content</div>
  <div className="col-span-12 md:col-span-4">Sidebar</div>
</div>
```

### Page Layout

```tsx
// Marketing pages
<Layout>
  <Header />
  <main className="flex-1">
    <Hero />
    <Features />
    <Testimonials />
    <CTA />
  </main>
  <Footer />
</Layout>

// App pages
<AppLayout>
  <Sidebar />
  <main className="flex-1">
    <PageHeader />
    <PageContent />
  </main>
</AppLayout>
```

## Animation

### Timing

| Name | Duration | Use |
|------|----------|-----|
| fast | 100ms | Micro-interactions |
| normal | 200ms | Standard transitions |
| slow | 300ms | Complex animations |
| slower | 500ms | Page transitions |

### Easing

```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Common Animations

```css
/* Fade in */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide up */
@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* Scale in */
@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
```

## Icons

Using Lucide React icons for consistency:

```tsx
import { 
  Home, 
  Settings, 
  ChartBar, 
  AlertCircle,
  Check,
  X,
  ChevronDown,
  Search,
  Plus,
  Trash,
  Edit,
  Eye,
  Download,
  Upload,
} from 'lucide-react';

// Usage
<Button>
  <Plus className="w-4 h-4 mr-2" />
  Add Campaign
</Button>
```

## Accessibility

### Focus States

All interactive elements must have visible focus states:

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Color Contrast

- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

### Keyboard Navigation

- All actions reachable via keyboard
- Logical tab order
- Skip links for main content
- Escape closes modals/dropdowns

