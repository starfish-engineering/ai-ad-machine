# Design System Quick Reference

## Colors

### Primary
- Primary: `blue-600` (#2563eb)
- Primary Hover: `blue-700` (#1d4ed8)
- Primary Light: `blue-100` (#dbeafe)

### Semantic
- Success: `green-600` (#16a34a)
- Warning: `yellow-600` (#ca8a04)
- Error: `red-600` (#dc2626)
- Info: `cyan-600` (#0891b2)

### Neutrals
- Use gray-50 through gray-900
- Background: white
- Foreground: gray-900
- Muted: gray-100
- Muted Foreground: gray-500

## Typography

- Font: DM Sans (variable: `--font-sans`)
- Headings: font-bold
- Body: font-normal

## Spacing

Base unit: 4px
- xs: 4px (1)
- sm: 8px (2)
- md: 16px (4)
- lg: 24px (6)
- xl: 32px (8)

## Components

### Button
```tsx
<Button variant="primary|secondary|outline|ghost|destructive" size="sm|md|lg">
  Click me
</Button>
```

### Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Input
```tsx
<Input label="Email" error="Invalid email" helperText="Enter your email" />
```

### Badge
```tsx
<Badge variant="default|success|warning|error|info">Status</Badge>
```

## Utilities

### cn() - Class Name Merger
```tsx
import { cn } from '@/lib/utils';

<div className={cn('base-class', condition && 'conditional-class', className)} />
```

## Icons

Using Lucide React:
```tsx
import { Home, Settings, ChartBar } from 'lucide-react';

<Home className="w-5 h-5" />
```

## Responsive Breakpoints

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

