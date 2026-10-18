# PERF.md — Performance Measurement Report

## Overview

This document records the performance improvements made to the Campus Tech Store project, following the CodeOps Day 43 concepts. Each improvement is measured before and after under similar conditions.

---

## Test Environment

| Setting | Value |
|---|---|
| Browser | Chrome (latest) |
| Device | Laptop / Desktop |
| Tool | Chrome DevTools → Lighthouse (Performance audit) |
| Throttling | Simulated — Mobile (default Lighthouse preset) |
| Mode | Navigation |

---

## Concepts Applied

### 1. `next/image` for Product Images

**What:** All product images (`ProductCard`, product detail page) use the Next.js `<Image>` component with `fill` layout and responsive `sizes` attribute.

**Why:** `next/image` provides automatic lazy-loading, responsive image sizing, and prevents layout shift by reserving space before the image loads.

| Metric | Before (native `<img>`) | After (`next/image`) |
|---|---|---|
| CLS (home page) | _Measure before_ | _Measure after_ |
| LCP (product detail) | _Measure before_ | _Measure after_ |

### 2. `next/font` for Typography

**What:** The Inter font is loaded via `next/font/google` in `layout.tsx` instead of a `<link>` tag or external stylesheet.

**Why:** `next/font` self-hosts the font files at build time, removing the external network request and eliminating the flash of unstyled text (FOUT).

| Metric | Before (system font / external link) | After (`next/font`) |
|---|---|---|
| Font-related network requests | 1 external | 0 external |
| CLS (any page) | _Measure_ | _Measure_ |

### 3. Server Components vs Client Components

**What:** Only components that need interactivity (state, events, context) are Client Components. Static content like `ProductCard`, `Footer`, and page layouts remain Server Components.

**Why:** Keeping components on the server reduces the JavaScript shipped to the browser, improving load time and interaction responsiveness (INP).

| Component | Type | Reason |
|---|---|---|
| `ProductCard` | Server | Displays static data; no state or events needed |
| `Footer` | Server | Static content only |
| `ProductList` | Client | Needs filter/sort state |
| `AddToCartButton` | Client | Needs cart context + click handler |
| `Header` | Client | Needs cart context for badge count |
| `CartPage` | Client | Full cart interactivity |
| `CheckoutPage` | Client | Form state + validation |

### 4. No Unnecessary Third-Party Scripts

**What:** No external analytics, chat widgets, or third-party scripts are loaded.

**Why:** Every additional script adds JavaScript work and can delay interaction readiness (INP).

### 5. Environment Configuration

**What:** A `.env.example` file is committed with placeholder values. The actual `.env.local` is in `.gitignore`.

**Why:** Secrets stay out of source control. `NEXT_PUBLIC_` values are bundled into the browser and must be treated as public.

---

## Core Web Vitals — What They Tell Us

| Metric | Full Name | What It Measures |
|---|---|---|
| **LCP** | Largest Contentful Paint | How quickly the main content (hero image, heading) becomes visible |
| **CLS** | Cumulative Layout Shift | How much the page layout moves unexpectedly during loading |
| **INP** | Interaction to Next Paint | How quickly the page responds after a user interaction (click, tap) |

---

## How to Measure

1. Open the deployed or locally running site in Chrome.
2. Open DevTools → **Lighthouse** tab.
3. Select **Performance** and run a **Navigation** audit.
4. Record the LCP, CLS, and INP scores.
5. Make a specific change, then re-run under the same conditions.
6. Record the new scores below.

---

## Results

> **Instructions:** Fill in the table below with your actual measured values before and after each change. Run Lighthouse on the same page under the same conditions for both measurements.

| Page Tested | Change Made | Metric | Before | After |
|---|---|---|---|---|
| `/` (Home) | Added `next/image` to featured products | LCP | ___s | ___s |
| `/` (Home) | Added `next/font` (Inter) | CLS | ___ | ___ |
| `/products` (Catalogue) | Server Component for ProductCard | INP | ___ms | ___ms |
| `/products/[id]` (Detail) | `next/image` with `fill` + `sizes` | LCP | ___s | ___s |

---

## Environments

| Environment | How to Run | Key Difference |
|---|---|---|
| Development | `npm run dev` | Hot reload, verbose errors, no optimisation |
| Production build | `npm run build && npm start` | Minified, optimised, closer to deployed behavior |

Always test performance measurements against the **production build** for accurate results.
