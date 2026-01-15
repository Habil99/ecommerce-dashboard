# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an E-commerce Admin Dashboard built with Next.js App Router, Material UI, and Redux Toolkit. It's a portfolio project demonstrating senior-level frontend architecture with a focus on code quality, clean state management, and enterprise UI customization.

**Key Philosophy:**
- Server-first Next.js architecture (minimal "use client")
- Layered architecture (UI → Pages → Redux → Services → API → Database)
- Fully customized Material UI theme (not default MUI)
- Redux Toolkit as a coordination layer, not a dumping ground
- Real backend with Next.js Route Handlers + Prisma + PostgreSQL
- Strict TypeScript, ESLint, and Prettier

This contrasts with feature-oriented architectures and demonstrates architectural breadth suitable for large enterprise teams.

## Development Commands

```bash
# Development
npm run dev          # Start development server at http://localhost:3000

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Architecture

### Layered Data Flow
```
UI (MUI components)
↓
Pages / Containers
↓
Redux Store (Slices + Thunks)
↓
Service Layer (HTTP)
↓
Backend (Route Handlers)
↓
Database (Prisma + PostgreSQL)
```

### Folder Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (dashboard)/        # Dashboard route group
│   │   ├── dashboard/
│   │   ├── products/
│   │   ├── orders/
│   │   └── customers/
│   ├── api/                # Route handlers
│   │   ├── products/
│   │   ├── orders/
│   │   ├── customers/
│   │   └── stats/
│   └── layout.tsx
│
├── presentation/           # UI layer
│   ├── components/         # Reusable components
│   │   ├── tables/
│   │   ├── forms/
│   │   ├── dialogs/
│   │   └── layout/
│   └── pages/              # Page-specific components
│
├── store/                  # Redux Toolkit
│   ├── index.ts
│   ├── hooks.ts
│   ├── slices/
│   └── thunks/
│
├── domain/                 # Business logic & types
│   ├── product/
│   ├── order/
│   └── customer/
│
├── services/               # HTTP client layer
│   ├── http.ts
│   ├── products.service.ts
│   └── orders.service.ts
│
├── theme/                  # Material UI customization
│   ├── palette.ts
│   ├── typography.ts
│   └── overrides.ts
│
├── utils/
├── types/
└── tests/
```

## Server-First Next.js Approach

**Server Components are the default.** Only use "use client" when absolutely required:
- Forms (React Hook Form)
- Interactive tables
- Modals and dialogs
- Redux store provider

Benefits: Better performance, cleaner component boundaries, easier data flow reasoning.

## Redux Toolkit Guidelines

**Redux owns:**
- Entity collections (products, orders, customers)
- Cross-page filters
- Loading and error states
- Async lifecycle management

**Redux does NOT own:**
- Form state (use React Hook Form)
- Local UI state
- Modal visibility
- One-off component interactions

This avoids over-centralized state anti-patterns.

## Material UI Customization

All MUI components use custom theme overrides in `src/theme/`. The project demonstrates design system ownership:
- Custom color palette
- Custom typography scale
- Consistent border radius
- Component overrides for Button, Table, Chip, Card, Dialog

Do not use default MUI styles.

## Import Paths

Use absolute imports with the `@/` alias:
```typescript
import { Button } from '@/presentation/components/Button'
import { productService } from '@/services/products.service'
```

Never use relative imports like `../../../`.

## TypeScript Standards

- `strict: true` in tsconfig.json
- No `any` types
- No unused variables
- Clear naming everywhere
- All validation schemas use Zod

## Testing Strategy

Tests focus on behavior, not implementation details. No snapshot-only tests.

| Layer        | Test Type                    |
|--------------|------------------------------|
| Presentation | React Testing Library        |
| Redux        | Reducer & thunk tests        |
| Domain       | Zod schema validation        |
| Services     | HTTP mocks                   |

## Performance Rules (from .cursor/rules/)

The project has comprehensive performance rules organized by impact level:

### CRITICAL Impact
1. **Eliminate Waterfalls** - Use `Promise.all()` for independent async operations
2. **Bundle Size** - Defer third-party scripts, use dynamic imports, avoid barrel imports

### HIGH Impact
3. **Server-Side Performance** - Use `React.cache()` for request deduplication, parallel fetching

### MEDIUM Impact
4. **Client Data Fetching** - SWR deduplication for client components
5. **Re-render Optimization** - Memoization, lazy state initialization, derived state
6. **Rendering Performance** - Hoist JSX, conditional rendering, content-visibility CSS

### LOW-MEDIUM Impact
7. **JavaScript Performance** - Set/Map for lookups, hoist RegExp, cache property access
8. **Advanced Patterns** - useLatest for event handlers, activity tracking

**Key Principle:** Waterfalls are the #1 performance killer. Each sequential await adds full network latency.

## Code Quality Standards

- Strict ESLint rules (enforced)
- Prettier for formatting
- No relative imports
- Predictable data flow
- All backend mutations validated with Zod

## What This Project Avoids

- Mock data (real backend only)
- Default MUI styling
- Overusing "use client"
- Over-engineering
- Relative imports

## Data Validation

All mutations are validated using Zod on the backend and reused on the frontend for consistency.
