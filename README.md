# E-commerce Admin Dashboard

A modern, full-stack admin dashboard showcasing enterprise-level architecture, clean code practices, and production-ready patterns. Built to demonstrate senior frontend engineering capabilities with Next.js, TypeScript, and Material UI.

**Live Demo:** [View Demo](#) | **Portfolio:** [habilabiyev.dev](#)

---

## 🎯 Project Overview

This project demonstrates my ability to architect and build scalable, maintainable admin applications with:

- **Modern Stack:** Next.js 15 App Router, TypeScript, Material UI, Redux Toolkit
- **Full-Stack Implementation:** REST APIs, PostgreSQL database, Prisma ORM
- **Enterprise Patterns:** Layered architecture, type-safe APIs, form validation
- **Production Quality:** ESLint, Prettier, proper state management, responsive design

---

## ✨ Key Features

### Product Management

- ✅ Full CRUD operations with optimistic updates
- ✅ Real-time table with pagination and filtering
- ✅ Form validation using React Hook Form + Zod
- ✅ Confirmation dialogs for destructive actions

### Order Management

- ✅ Order listing with status tracking
- ✅ Detailed order view with line items
- ✅ Status workflow management (Pending → Processing → Shipped → Delivered)
- ✅ Customer information display

### Dashboard Analytics

- ✅ Revenue tracking
- ✅ Order statistics
- ✅ Customer metrics
- ✅ Product inventory overview

---

## 🏗️ Technical Highlights

### Architecture & Design Patterns

- **Layered Architecture:** Clear separation between UI, state, services, and data layers
- **Server-First:** Leverages Next.js App Router with minimal client components
- **Type Safety:** End-to-end TypeScript with Zod schemas for runtime validation
- **State Management:** Redux Toolkit for global state, React Hook Form for local form state

### Code Quality

- **Clean Code:** Strict ESLint rules, Prettier formatting, no relative imports
- **Type Safety:** No `any` types, full TypeScript coverage
- **Scalable Structure:** Domain-driven folder organization
- **Performance:** Server components by default, optimized database queries with Promise.all

### Custom Material UI Theme

- Custom color palette and typography
- Component-level overrides (Button, Table, Chip, Card, Dialog)
- Consistent design system throughout the application
- Responsive layout with mobile support

---

## 🛠️ Tech Stack

**Frontend**

- Next.js 15 (App Router)
- TypeScript (strict mode)
- Material UI v7 (fully customized)
- Redux Toolkit
- React Hook Form + Zod

**Backend**

- Next.js Route Handlers (REST API)
- Prisma ORM
- PostgreSQL
- Server-side data fetching

**Developer Tools**

- ESLint (strict configuration)
- Prettier
- Git hooks (pre-commit)

---

## 📂 Project Structure

```
src/
├── app/
│   ├── (dashboard)/          # Dashboard pages
│   │   ├── dashboard/        # Analytics page
│   │   ├── products/         # Product management
│   │   └── orders/           # Order management
│   └── api/                  # REST API routes
│       ├── products/         # Product CRUD endpoints
│       ├── orders/           # Order endpoints
│       └── stats/            # Dashboard statistics
│
├── presentation/             # UI layer
│   ├── components/
│   │   ├── tables/          # Data tables
│   │   ├── dialogs/         # Modal dialogs
│   │   ├── cards/           # Reusable cards
│   │   └── layout/          # Layout components
│
├── store/                    # Redux store
│   ├── slices/              # Redux slices
│   └── hooks.ts             # Typed Redux hooks
│
├── domain/                   # Business logic
│   ├── product/             # Product types & schemas
│   ├── order/               # Order types & schemas
│   └── customer/            # Customer types
│
├── services/                 # HTTP service layer
├── theme/                    # MUI theme customization
└── utils/                    # Shared utilities
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Habil99/ecommerce-dashboard.git
   cd ecommerce-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   ```bash
   cp .env.example .env
   # Add your DATABASE_URL
   ```

4. **Setup database**

   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

5. **Run development server**

   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 🎨 Design Decisions

### Why Next.js App Router?

- Server-first architecture for better performance
- Built-in API routes for full-stack development
- Excellent TypeScript support

### Why Redux Toolkit?

- Predictable state management for entity collections
- Async data fetching with thunks
- DevTools integration for debugging

### Why Material UI?

- Enterprise-grade component library
- Highly customizable theming system
- Accessible components out of the box

### Why Prisma?

- Type-safe database queries
- Easy migrations and schema management
- Excellent TypeScript integration

---

## 📸 Screenshots

_Coming soon: Dashboard view, product table, order details_

---

## 🔮 Future Enhancements

If this were a production application, I would add:

- **Authentication & Authorization:** Role-based access control (RBAC)
- **Advanced Filtering:** Multi-column filters, saved filter presets
- **Data Export:** CSV/Excel export functionality
- **Real-time Updates:** WebSocket integration for live data
- **Internationalization:** Multi-language support
- **Advanced Analytics:** Charts, graphs, and trend analysis
- **Audit Logging:** Track all user actions
- **Unit & E2E Tests:** Comprehensive test coverage

---

## 👤 About Me

I'm Habil Abiyev, a senior frontend engineer specializing in React, Next.js, and TypeScript. I focus on building scalable, maintainable applications with clean architecture and excellent developer experience.

- **LinkedIn:** [linkedin.com/in/habilabiyev](#)
- **GitHub:** [github.com/Habil99](https://github.com/Habil99)
- **Email:** [habil.abiyev.dev@gmail.com](#)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Habil Abiyev**
