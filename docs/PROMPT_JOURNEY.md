# AI-Assisted TDD Development & Prompt Journey

This document provides complete traceability of the AI-assisted engineering process behind the **Simple Product Shop** application. It captures the exact prompts (translated to English), architectural rationale, Test-Driven Development (TDD) cycles, and generated assets across all development phases.

---

## Table of Contents
1. [Methodology & Principles](#1-methodology--principles)
2. [Phase 1: Architecture & Project Scaffolding](#2-phase-1-architecture--project-scaffolding)
3. [Phase 2: Core UI Components & TDD Red-Green-Refactor](#3-phase-2-core-ui-components--tdd-red-green-refactor)
   - [2.1 Skeleton & Loading Placeholders](#21-skeleton--loading-placeholders)
   - [2.2 Toast Notification System](#22-toast-notification-system)
   - [2.3 Product Card with Dynamic Feedback](#23-product-card-with-dynamic-feedback)
   - [2.4 Discount Strategy Engine (OOP Pattern)](#24-discount-strategy-engine-oop-pattern)
4. [Phase 3: Accessibility (a11y) & User Experience](#4-phase-3-accessibility-a11y--user-experience)
   - [3.1 Screen Reader Announcements (`aria-live`)](#31-screen-reader-announcements-aria-live)
   - [3.2 Focus Management & Keyboard Navigation (`:focus-visible`)](#32-focus-management--keyboard-navigation-focus-visible)
   - [3.3 Auth & Form Validation on Blur](#33-auth--form-validation-on-blur)
5. [Phase 4: Production Observability & Sentry Monitoring](#5-phase-4-production-observability--sentry-monitoring)
   - [4.1 Sentry SDK Setup & Environment Configuration](#41-sentry-sdk-setup--environment-configuration)
   - [4.2 React Error Boundary Integration](#42-react-error-boundary-integration)
   - [4.3 Breadcrumb Tracking in Cart Context](#43-breadcrumb-tracking-in-cart-context)
   - [4.4 User Context in Authentication](#44-user-context-in-authentication)
6. [Phase 5: Quality Gates, Git Automation & Bundle Optimization](#6-phase-5-quality-gates-git-automation--bundle-optimization)
   - [5.1 Git Hooks Automation with Husky](#51-git-hooks-automation-with-husky)
   - [5.2 Vitest Coverage Thresholds (80%+ Across All Metrics)](#52-vitest-coverage-thresholds-80-across-all-metrics)
   - [5.3 Master Verification Script (`pnpm verify`)](#53-master-verification-script-pnpm-verify)
   - [5.4 Bundle Analysis with Rollup Visualizer](#54-bundle-analysis-with-rollup-visualizer)
7. [Traceability Matrix: Prompts to Artifacts](#7-traceability-matrix-prompts-to-artifacts)

---

## 1. Methodology & Principles

The development workflow adheres to three foundational software engineering standards:

1. **Strict Test-Driven Development (TDD)**:
   - **🔴 RED**: Write a failing unit or integration test establishing user expectations and edge cases before writing production code.
   - **🟢 GREEN**: Implement the minimum viable code necessary to satisfy all assertions.
   - **🔵 REFACTOR**: Refactor code for readability, performance, accessibility, and type-safety while keeping tests passing.
2. **Design Patterns**:
   - **Strategy Pattern** for scalable pricing/discount computations (`IDiscountStrategy`, `BulkDiscountStrategy`, `OrderDiscountStrategy`).
   - **Compound & Presentational Components** for modular UI rendering (`Skeleton`, `Toast`, `ProductCard`, `CartItem`).
   - **Page Object Model (POM)** for robust Playwright End-to-End (E2E) automation.
3. **Automated Quality Gates**:
   - Zero tolerance for lint errors or type failures in CI and local commits.
   - Mandatory minimum of 80% code coverage across statements, branches, functions, and lines.

---

## 2. Phase 1: Architecture & Project Scaffolding

### Objective
Establish a modern, type-safe, high-performance web foundation using React 19, TypeScript, and Vite, complemented by Vitest for unit testing and Playwright for E2E testing.

### Prompt Used
```text
Create the foundational structure for an e-commerce frontend with React + TypeScript + Vite.
Configure support for unit testing with Vitest and Testing Library,
and E2E testing with Playwright using the Page Object Model pattern.
Implement the Strategy pattern for shopping cart discount calculations.
```

### Architectural Rationale & Why It Was Used
- **Vite + React + TS**: Ultra-fast Hot Module Replacement (HMR) and strict compile-time type verification.
- **Strategy Pattern (`src/shared/strategies`)**: Decouples discount rules (e.g. quantity-based bulk discounts vs total order value discounts) from UI rendering and cart state, following the Open/Closed Principle (SOLID).
- **Page Object Model (`e2e/pages`)**: Isolates selector changes from test assertions in Playwright journeys (`shopping-journey.spec.ts`).

### Generated & Configured Artifacts
- `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`
- `src/shared/strategies/IDiscountStrategy.ts`
- `src/shared/strategies/BulkDiscountStrategy.ts` & `BulkDiscountStrategy.test.ts`
- `src/shared/strategies/OrderDiscountStrategy.ts` & `OrderDiscountStrategy.test.ts`
- `src/shared/strategies/DiscountCalculator.ts` & `DiscountCalculator.test.ts`
- `e2e/pages/ProductCatalogPage.ts`, `e2e/pages/ShoppingCartPage.ts`

---

## 3. Phase 2: Core UI Components & TDD Red-Green-Refactor

### 2.1 Skeleton & Loading Placeholders

#### Objective
Provide accessible, smooth shimmer placeholder animations to prevent Cumulative Layout Shift (CLS) while product data loads.

#### Prompt Used
```text
Implement an accessible Skeleton component using TDD (Red -> Green -> Refactor):
1. Write the unit test suite first verifying role, pulse animation,
   variants ('text', 'circular', 'rectangular'), and custom dimensions (width, height).
2. Then implement the React component with support for aria-busy and aria-hidden.
3. Extend it to create a ProductCardSkeleton that mirrors the product card structure.
```

#### Rationale & TDD Workflow
- **🔴 Red**: Created `src/shared/components/Skeleton.test.tsx` verifying:
  - Default rendering has `.skeleton` class and accessibility attributes (`aria-hidden="true"`).
  - Correct rendering of variants (`text`, `circular`, `rectangular`).
  - Correct inline styles for width, height, and border radius.
- **🟢 Green**: Created `src/shared/components/Skeleton.tsx` with vanilla CSS animations and type-safe props.
- **🔵 Refactor**: Created `src/features/product-catalog/components/ProductCardSkeleton.tsx` assembling multiple skeleton elements matching the exact visual footprint of `ProductCard`.

#### Generated Artifacts
- `src/shared/components/Skeleton.tsx`
- `src/shared/components/Skeleton.test.tsx`
- `src/features/product-catalog/components/ProductCardSkeleton.tsx`

---

### 2.2 Toast Notification System

#### Objective
Display non-blocking transient alerts (success, error, info) for user actions such as adding an item to the cart or encountering an error.

#### Prompt Used
```text
Create a Toast component for notifications using TDD:
- Must support variants: success, error, info.
- Must include an accessible close button with aria-label="Close notification".
- Must support auto-dismiss after a configurable timeout.
- Write the unit tests first with Vitest and React Testing Library.
```

#### Rationale & TDD Workflow
- **🔴 Red**: Created `src/shared/components/Toast.test.tsx` testing:
  - Renders message and appropriate icon per type.
  - Fires `onClose` callback when the dismiss button is clicked.
  - Automatically triggers dismiss timer after `duration` ms using `vi.useFakeTimers()`.
- **🟢 Green**: Created `src/shared/components/Toast.tsx` with timer cleanup via `useEffect` and accessible `role="status"` / `role="alert"`.
- **🔵 Refactor**: Extracted CSS transitions and integrated dismiss animations.

#### Generated Artifacts
- `src/shared/components/Toast.tsx`
- `src/shared/components/Toast.test.tsx`

---

### 2.3 Product Card with Dynamic Feedback

#### Objective
Enhance user interaction on the "Add to Cart" button with distinct visual states: `idle`, `loading`, `success`, and `error`.

#### Prompt Used
```text
Enhance the "Add to Cart" button in ProductCard:
- Must support interactive states: idle, loading, success, and error.
- While loading or success, disable the button to prevent duplicate clicks.
- In success state, display a checkmark or 'Added!' message.
- Update ProductCard.test.tsx to validate state transitions and timeouts.
```

#### Rationale & TDD Workflow
- **🔴 Red**: Added tests in `ProductCard.test.tsx` simulating user click, asserting button disables during state transitions, and verifying textual changes.
- **🟢 Green**: Updated `src/features/product-catalog/components/ProductCard.tsx` with local button state management and timing resets.
- **🔵 Refactor**: Cleaned up styling for active/hover states in `index.css`.

#### Generated Artifacts
- `src/features/product-catalog/components/ProductCard.tsx`
- `src/features/product-catalog/components/ProductCard.test.tsx`

---

### 2.4 Discount Strategy Engine (OOP Pattern)

#### Objective
Provide flexible discount calculations without polluting business logic in React components.

#### Prompt Used
```text
Implement the discount calculation engine using the Strategy pattern:
- IDiscountStrategy defines calculate(cartItems, subtotal).
- BulkDiscountStrategy: 10% discount on product lines with 3 or more units.
- OrderDiscountStrategy: 15% discount on orders exceeding 100€.
- DiscountCalculator: Context class that orchestrates and applies the optimal strategies.
- Cover all strategies with comprehensive unit tests using Vitest.
```

#### Rationale & TDD Workflow
- **🔴 Red**: Created test suites for each strategy verifying threshold calculations, boundary numbers (e.g. exactly 3 items vs 2 items; 99.99€ vs 100€).
- **🟢 Green**: Implemented the strategies adhering to `IDiscountStrategy` interface.
- **🔵 Refactor**: Extracted reusable price formatting utilities (`formatPrice.ts`).

#### Generated Artifacts
- `src/shared/strategies/IDiscountStrategy.ts`
- `src/shared/strategies/BulkDiscountStrategy.ts` & `.test.ts`
- `src/shared/strategies/OrderDiscountStrategy.ts` & `.test.ts`
- `src/shared/strategies/DiscountCalculator.ts` & `.test.ts`

---

## 4. Phase 3: Accessibility (a11y) & User Experience

### 3.1 Screen Reader Announcements (`aria-live`)

#### Objective
Ensure assistive technologies (screen readers) receive live auditory updates when items are added, updated, or removed from the cart, without requiring manual focus redirection.

#### Prompt Used
```text
Add accessibility improvements to the shopping cart:
- Include an aria-live="polite" container with aria-atomic="true" and .sr-only class.
- Announce dynamic updates like 'Product X added to cart' or 'Shopping cart is empty'.
- Ensure all action buttons (+, -, remove) feature descriptive aria-labels.
```

#### Rationale & Implementation
- Added `.sr-only` CSS utility class in `src/index.css` (visually hidden but fully announced by screen readers).
- Added dynamic status string state inside `src/features/shopping-cart/ShoppingCart.tsx`.
- Validated via `ShoppingCart.test.tsx` inspecting accessible names and live regions.

#### Generated / Modified Artifacts
- `src/features/shopping-cart/ShoppingCart.tsx`
- `src/features/shopping-cart/components/CartItem.tsx`
- `src/index.css`

---

### 3.2 Focus Management & Keyboard Navigation (`:focus-visible`)

#### Objective
Provide high-contrast, beautiful visual focus rings for keyboard navigators (Tab / Shift+Tab) while suppressing distracting outlines on mouse clicks.

#### Prompt Used
```text
Configure accessible global focus styling in index.css:
- Use the :focus-visible pseudo-selector for all interactive elements (button, input, select, a).
- 2px outline with high-contrast primary color and 2px offset.
- Remove default outline on mouse focus if not triggered via keyboard navigation.
```

#### Rationale & Implementation
- Standardized `:focus-visible` rules across all components, achieving a 90+ Accessibility score on Lighthouse.

#### Modified Artifacts
- `src/index.css`

---

### 3.3 Auth & Form Validation on Blur

#### Objective
Provide real-time accessible validation feedback for login credentials (`PasswordInput` and `LoginDemo`), displaying errors only after user interaction (`onBlur`) to avoid premature validation annoyance.

#### Prompt Used
```text
Enhance the LoginDemo component:
- Validate the email input onBlur and display accessible error message with role="alert".
- Include clearly visible demo credentials (demo / password123) in the UI.
- Implement a show/hide password toggle in PasswordInput with dynamic aria-label.
```

#### Rationale & TDD Workflow
- **🔴 Red**: `PasswordInput.test.tsx` and `LoginDemo.test.tsx` tested toggle visibility, `aria-pressed`, and `onBlur` triggering error messages.
- **🟢 Green**: Implemented `PasswordInput.tsx` and `LoginDemo.tsx` using `aria-invalid` and `aria-describedby`.

#### Generated / Modified Artifacts
- `src/features/auth/components/PasswordInput.tsx` & `.test.ts`
- `src/features/auth/LoginDemo.tsx` & `.test.tsx`
- `src/shared/utils/validatePassword.ts` & `.test.ts`

---

## 5. Phase 4: Production Observability & Sentry Monitoring

### 5.1 Sentry SDK Setup & Environment Configuration

#### Objective
Instrument the frontend application with real-time error tracking, crash reporting, and user breadcrumb capture using `@sentry/react`.

#### Prompt Used
```text
Install and initialize Sentry for React:
- Install @sentry/react.
- Create src/infrastructure/sentry.ts exporting the initSentry() function.
- Read DSN from import.meta.env.VITE_SENTRY_DSN.
- Enable debug mode conditional on VITE_SENTRY_DEBUG and set tracesSampleRate: 1.0.
- Add .env.example with the required environment variables.
```

#### Implementation Details
- Graceful initialization: if `VITE_SENTRY_DSN` is empty or missing, `initSentry()` warns in the console instead of throwing, ensuring local development remains frictionless.
- Safe `.env.local` storage excluded by `.gitignore`.

#### Generated Artifacts
- `src/infrastructure/sentry.ts`
- `.env.example`
- `.gitignore` (updated with `.env.local`)

---

### 5.2 React Error Boundary Integration

#### Objective
Catch uncaught rendering errors in React component subtrees, automatically send the exception to Sentry with component stack traces, and present a friendly fallback recovery screen.

#### Prompt Used
```text
Create a SentryErrorBoundary component:
- Wrap Sentry.ErrorBoundary with an elegant visual fallback UI.
- Allow users to retry or refresh the page.
- Log error telemetry to Sentry with additional component context.
- Add test suite using Vitest.
```

#### Generated Artifacts
- `src/infrastructure/SentryErrorBoundary.tsx`
- `src/infrastructure/SentryErrorBoundary.test.tsx`

---

### 5.3 Breadcrumb Tracking in Cart Context

#### Objective
Provide rich debugging context to Sentry by logging breadcrumbs for every shopping cart transaction (`ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `CLEAR_CART`).

#### Prompt Used
```text
Integrate Sentry breadcrumbs into CartContext:
- For every cart mutation (add, remove, update quantity), record a breadcrumb:
  category: 'cart', message: 'Item added: ...', data: { productId, quantity, price }.
- Enables reproducing the exact user interaction timeline before any unhandled error.
```

#### Implementation Details
- Handled gracefully in `src/context/CartContext.tsx`: captures product metadata and timestamp in Sentry's event timeline.

---

### 5.4 User Context in Authentication

#### Objective
Associate reported errors and sessions with specific user identifiers once authenticated.

#### Prompt Used
```text
Configure Sentry.setUser upon successful login in LoginDemo:
- Call Sentry.setUser({ id, email, username }).
- Upon logout, call Sentry.setUser(null) to clear context.
```

#### Modified Artifacts
- `src/features/auth/LoginDemo.tsx`

---

## 6. Phase 5: Quality Gates, Git Automation & Bundle Optimization

### 6.1 Git Hooks Automation with Husky

#### Objective
Prevent broken code, lint issues, or failing tests from entering the git repository or being pushed to remotes.

#### Prompts Used
```bash
# 1. Initialize Husky hooks
pnpm dlx husky-init && pnpm install

# 2. Configure .husky/pre-commit
pnpm lint && pnpm typecheck

# 3. Configure .husky/pre-push
pnpm test:run && pnpm build
```

#### Hook Configuration Details
- `.husky/pre-commit`: Runs fast quality gates (`pnpm lint && pnpm typecheck`).
- `.husky/pre-push`: Runs deep quality gates (`pnpm test -- --run && pnpm build`).

---

### 6.2 Vitest Coverage Thresholds (80%+ Across All Metrics)

#### Objective
Enforce strict automated code coverage criteria so any code change dropping below 80% coverage automatically fails the test suite.

#### Prompt Used
```text
Configure coverage thresholds in vitest.config.ts:
- Provider: 'v8'
- Reporters: ['text', 'html']
- Thresholds: 80% across statements, branches, functions, and lines.
- Exclude src/**/*.test.{ts,tsx}, src/test/**, src/main.tsx.
- Configure pnpm test:coverage script in package.json.
```

#### Current Coverage Metrics
| Metric | Threshold | Actual Result | Status |
| :--- | :---: | :---: | :---: |
| **Statements** | 80% | **89.61%** | ✅ PASS |
| **Branches** | 80% | **83.50%** | ✅ PASS |
| **Functions** | 80% | **87.09%** | ✅ PASS |
| **Lines** | 80% | **90.62%** | ✅ PASS |

---

### 6.3 Master Verification Script (`pnpm verify`)

#### Objective
Provide a single master command that validates the entire repository end-to-end: linting, typechecking, unit tests, E2E tests, and production compilation.

#### Prompt Used
```json
"scripts": {
  "quality": "pnpm lint && pnpm typecheck && pnpm test:run",
  "verify": "pnpm quality && pnpm test:e2e && pnpm build"
}
```

#### Execution Checklist (`pnpm verify`)
1. `pnpm lint` -> 0 errors, 0 warnings.
2. `pnpm typecheck` -> TypeScript `tsc --noEmit` clean.
3. `pnpm test:run` -> 19 test files, 115 tests passing.
4. `pnpm test:e2e` -> 9 Playwright end-to-end scenarios passing.
5. `pnpm build` -> Production bundle generated successfully.

---

### 6.4 Bundle Analysis with Rollup Visualizer

#### Objective
Analyze distribution of bundle chunk sizes, tree-shaking efficacy, and gzipped footprint.

#### Prompt Used
```text
Add bundle size analysis:
- Install rollup-plugin-visualizer.
- In vite.config.ts add the visualizer plugin with { open: false, gzipSize: true, filename: 'stats.html' }.
- Generate visual report upon every production build.
```

#### Generated Artifact
- `stats.html` (interactive treemap of client assets in `dist/`).

---

## 7. Traceability Matrix: Prompts to Artifacts

The following matrix links every design milestone to its corresponding prompts, TDD stages, and source artifacts:

| Phase / Feature | Prompt Summary | TDD Pattern | Key Generated / Modified Files |
| :--- | :--- | :---: | :--- |
| **Skeleton Component** | Accessible loading skeleton with variants & pulse animation | Red -> Green -> Refactor | [`Skeleton.tsx`](../src/shared/components/Skeleton.tsx), [`Skeleton.test.tsx`](../src/shared/components/Skeleton.test.tsx) |
| **Product Skeleton** | Full card placeholder preventing layout shift | Green -> Refactor | [`ProductCardSkeleton.tsx`](../src/features/product-catalog/components/ProductCardSkeleton.tsx) |
| **Toast System** | Accessible transient notification with timer auto-dismiss | Red -> Green -> Refactor | [`Toast.tsx`](../src/shared/components/Toast.tsx), [`Toast.test.tsx`](../src/shared/components/Toast.test.tsx) |
| **Interactive Buttons** | Button state transitions (`idle`, `loading`, `success`, `error`) | Red -> Green -> Refactor | [`ProductCard.tsx`](../src/features/product-catalog/components/ProductCard.tsx), [`ProductCard.test.tsx`](../src/features/product-catalog/components/ProductCard.test.tsx) |
| **Discount Strategies** | Strategy pattern for Bulk and Order discounts | Red -> Green -> Refactor | [`BulkDiscountStrategy.ts`](../src/shared/strategies/BulkDiscountStrategy.ts), [`OrderDiscountStrategy.ts`](../src/shared/strategies/OrderDiscountStrategy.ts), [`DiscountCalculator.ts`](../src/shared/strategies/DiscountCalculator.ts) |
| **Accessibility (a11y)** | `aria-live` polite regions, `.sr-only` alerts, `:focus-visible` | Green -> Refactor | [`ShoppingCart.tsx`](../src/features/shopping-cart/ShoppingCart.tsx), [`index.css`](../src/index.css) |
| **Form UX & Auth** | OnBlur validation, password visibility toggle, accessible labels | Red -> Green -> Refactor | [`LoginDemo.tsx`](../src/features/auth/LoginDemo.tsx), [`PasswordInput.tsx`](../src/features/auth/components/PasswordInput.tsx) |
| **Sentry Monitoring** | SDK init, `SentryErrorBoundary`, cart breadcrumbs, user context | Green -> Refactor | [`sentry.ts`](../src/infrastructure/sentry.ts), [`SentryErrorBoundary.tsx`](../src/infrastructure/SentryErrorBoundary.tsx), [`CartContext.tsx`](../src/context/CartContext.tsx) |
| **Quality Gates** | Husky pre-commit/pre-push, coverage >80%, `pnpm verify` | CI / Guardrails | [`.husky/pre-commit`](../.husky/pre-commit), [`.husky/pre-push`](../.husky/pre-push), [`vitest.config.ts`](../vitest.config.ts), [`package.json`](../package.json) |
| **Bundle Visualizer** | Interactive treemap of production assets | Optimization | [`vite.config.ts`](../vite.config.ts), `stats.html` |
