E-commerce Admin Dashboard

A production-style E-commerce Admin Dashboard built with Next.js App Router, Material UI, and Redux Toolkit, designed as a portfolio project to demonstrate senior-level frontend architecture, enterprise UI customization, and clean state management.

This project intentionally focuses on code quality, structure, and architectural decisions rather than feature completeness.

⸻

✨ Key Characteristics
• Server-first Next.js architecture
• Minimal and intentional usage of "use client"
• Fully customized Material UI theme (not default MUI)
• Redux Toolkit used as a coordination layer, not a dumping ground
• Real backend with Next.js Route Handlers
• Strict ESLint + Prettier
• Testable components and predictable data flow

⸻

🧱 Tech Stack

Frontend
• Next.js (App Router)
• TypeScript (strict)
• Material UI (MUI v5) – fully customized
• Redux Toolkit
• React Hook Form + Zod

Backend
• Next.js Route Handlers
• REST APIs
• Prisma ORM
• PostgreSQL

Tooling
• ESLint (strict rules)
• Prettier
• Absolute imports only
• Jest / Vitest + React Testing Library

⸻

🏗️ Architecture Overview

This project intentionally uses a layered architecture, commonly found in large enterprise admin systems.

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

Why layered architecture?
• Scales well with large teams
• Keeps UI clean and testable
• Makes Redux usage predictable
• Clearly separates business concepts from UI concerns

This contrasts with the feature-oriented architecture used in the Airbnb Admin project, demonstrating architectural breadth.

⸻

📁 Folder Structure

src/
├── app/
│ ├── (dashboard)/
│ │ ├── dashboard/page.tsx
│ │ ├── products/page.tsx
│ │ ├── orders/page.tsx
│ │ └── customers/page.tsx
│ │
│ ├── api/
│ │ ├── products/
│ │ ├── orders/
│ │ ├── customers/
│ │ └── stats/
│ │
│ └── layout.tsx
│
├── presentation/
│ ├── components/
│ │ ├── tables/
│ │ ├── forms/
│ │ ├── dialogs/
│ │ └── layout/
│ └── pages/
│
├── store/
│ ├── index.ts
│ ├── hooks.ts
│ ├── slices/
│ └── thunks/
│
├── domain/
│ ├── product/
│ ├── order/
│ └── customer/
│
├── services/
│ ├── http.ts
│ ├── products.service.ts
│ └── orders.service.ts
│
├── theme/
│ ├── palette.ts
│ ├── typography.ts
│ └── overrides.ts
│
├── utils/
├── types/
└── tests/

⸻

🧠 Server-First Next.js Approach

This project is built with a server-first mindset:

Server Components by default
• Pages fetch data on the server whenever possible
• Tables and lists render server-side
• Reduces client bundle size
• Improves initial load performance

Minimal "use client"

Client Components are used only when required, for example:
• Forms (React Hook Form)
• Interactive tables
• Modals and dialogs
• Redux store provider

This ensures:
• Better performance
• Cleaner component boundaries
• Easier reasoning about data flow

⸻

🎨 Material UI Customization

This project does not use default MUI styles.

Customizations include:
• Custom color palette
• Custom typography scale
• Consistent border radius
• Component overrides for:
• Button
• Table
• Chip
• Card
• Dialog

createTheme({
palette: customPalette,
typography: customTypography,
components: componentOverrides,
})

The goal is to demonstrate design system ownership, not just component usage.

⸻

🧠 Redux Toolkit Usage

Redux Toolkit is used intentionally and selectively.

Redux owns:
• Entity collections (products, orders, customers)
• Cross-page filters
• Loading and error states
• Async lifecycle management

Redux does NOT own:
• Form state
• Local UI state
• Modal visibility
• One-off component interactions

This avoids the common anti-pattern of over-centralized state.

⸻

🔄 Data Flow

Page (Server Component)
↓
Redux Thunk (Client, when needed)
↓
Service Layer (HTTP)
↓
API Route Handler
↓
Prisma → PostgreSQL

All mutations are validated using Zod on the backend and reused on the frontend.

⸻

🧪 Testing Strategy

This project emphasizes testability.

Layer Test Type
Presentation React Testing Library
Redux Reducer & thunk tests
Domain Zod schema validation
Services HTTP mocks

No snapshot-only tests.
Tests focus on behavior, not implementation details.

⸻

📘 Code Quality Standards
• Strict ESLint rules
• Prettier for formatting
• No relative imports (../../../)
• No unused variables
• No any
• Clear naming everywhere
• Predictable data flow

⸻

🚫 What This Project Intentionally Avoids
• Mock data
• Default MUI styling
• Overusing "use client"
• Over-engineering
• Microservices
• Complex auth flows

This is a portfolio project, not a production SaaS.

⸻

🔮 What Would Be Added in Real Production
• Authentication & authorization
• Role-based access control
• Audit logs
• Advanced caching
• Observability (metrics, tracing)
• Internationalization
