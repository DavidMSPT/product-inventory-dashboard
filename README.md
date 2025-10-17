# 📦 Product Inventory Dashboard (Interview Challenge)

A modern, fully-typed React dashboard for managing product inventory with real-time filtering, sorting, and statistics.

## ✨ Features

- 🎨 **Dark Mode** - Seamless theme switching with no flash
- 🔍 **Advanced Filtering** - Search, category, stock status, and price range filters
- 📊 **Real-time Statistics** - Track total products, stock levels, and average pricing
- 🎯 **Dual Views** - Switch between grid cards and detailed table view
- 💾 **Local Persistence** - Data and preferences saved in localStorage
- ⚡ **Performance Optimized** - Memoized components, single-pass calculations
- 🎭 **Type-Safe** - Full TypeScript with discriminated unions
- 🎯 **Pure Reducer Pattern** - Side-effect free state management

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

```bash
# Build for production
npm run build

# Run tests
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 🏗️ Architecture

```
src/
├── app/              # Main application component
├── components/       # Reusable UI components
│   ├── cards/        # Summary cards
│   ├── feedback/     # Loading, error, empty states
│   ├── modals/       # Dialog components
│   └── products/     # Product display components
├── lib/              # Utilities and helpers
│   ├── api.ts        # Product CRUD operations
│   ├── format.ts     # Currency & text formatting
│   ├── stock.ts      # Stock status logic
│   └── storage.ts    # localStorage abstraction
├── store/            # State management
│   ├── state.ts      # Global state & types
│   ├── reducer.ts    # Pure reducer logic
│   └── types.ts      # TypeScript definitions
└── styles/           # CSS theme variables
```

## 🎯 Tech Stack

- **React 18** - UI library with hooks
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling with CSS variables
- **Vite** - Lightning-fast build tool
- **useReducer** - Predictable state management
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing utilities


## 🧪 Testing

The project uses **Vitest** and **React Testing Library** for comprehensive testing:

- **Unit Tests** - Utility functions (formatting, stock logic)
- **Component Tests** - React components with user interactions
- **Reducer Tests** - State management logic

```bash
# Run all tests
npm test

# Watch mode (default)
npm test

# Run tests with UI interface
npm run test:ui

# Generate coverage report
npm run test:coverage
```

**Test Coverage:**
- ✅ Utility functions (`format.ts`, `stock.ts`)
- ✅ Components (`ProductCard`, `StatusBadge`)
- ✅ State reducer (`reducer.ts`)

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

Requires JavaScript enabled and localStorage support.

---

Built with ❤️ using React + TypeScript + Tailwind CSS
