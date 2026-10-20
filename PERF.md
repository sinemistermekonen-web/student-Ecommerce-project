# PERF.md — Performance Measurement Report

## Overview

This document records the performance improvements made to the Campus Tech Store project, following the CodeOps Day 43 concepts. Each improvement is measured before and after under similar conditions.

---

## Test Environment

| Setting | Value |
|---|---|
| Browser | Chromium 155.0.0.0 |
| Device | Desktop (emulated) |
| Tool | Chrome DevTools → Lighthouse 13.4.1 (Performance audit) |
| Throttling | Custom throttling |
| Mode | Navigation (single page session, initial page load) |
| Page tested | `http://localhost:3000` (Home page) |
| Date | 20 October 2026, 03:34 AM GMT+3 |

---

## Lighthouse Scores

| Category | Score |
|---|---|
| **Performance** | 94 |
| **Accessibility** | 95 |
| **Best Practices** | 100 |
| **SEO** | 100 |
| **Agentic Browsing** | 2/2 |

---

## Core Web Vitals Results

| Metric | Full Name | Value | Rating |
|---|---|---|---|
| **FCP** | First Contentful Paint | 0.4 s | ✅ Good |
| **LCP** | Largest Contentful Paint | 0.5 s | ✅ Good |
| **TBT** | Total Blocking Time | 200 ms | ⚠️ Needs improvement |
| **CLS** | Cumulative Layout Shift | 0 | ✅ Perfect |
| **SI** | Speed Index | 0.7 s | ✅ Good |

### What the Core Web Vitals tell us

| Metric | What It Measures |
|---|---|
| **LCP** | How quickly the main content (hero section, featured products heading) becomes visible. Our 0.5s LCP means the page looks ready almost instantly. |
| **CLS** | How much the page layout moves unexpectedly during loading. Our CLS of 0 means there are no layout shifts — `next/image` with `fill` and `aspect-ratio` CSS prevents elements from jumping around. |
| **TBT** | Approximation of Interaction to Next Paint (INP). Our 200ms TBT is mostly caused by framework JavaScript parsing in development mode. A production build would reduce this significantly since JS is minified and tree-shaken. |

---

## Concepts Applied

### 1. `next/image` for Product Images

**What:** All product images (`ProductCard`, product detail page, cart thumbnails) use the Next.js `<Image>` component with `fill` layout and responsive `sizes` attribute.

**Why:** `next/image` provides automatic lazy-loading, responsive image sizing, and prevents layout shift by reserving space before the image loads.

**Result:** CLS is **0** across the site. Lighthouse confirms: "Image elements have explicit width and height" — passed. "Displays images with correct aspect ratio" — passed.

### 2. `next/font` for Typography

**What:** The Inter font is loaded via `next/font/google` in `layout.tsx` instead of a `<link>` tag or external stylesheet.

**Why:** `next/font` self-hosts the font files at build time, removing the external network request and eliminating the flash of unstyled text (FOUT).

**Result:** Lighthouse confirms: "Font display" audit — passed. The font file is served from `/_next/static/media/` (47.6 KiB woff2) with no external font requests. "No preconnect candidates" means we don't need external font connections.

### 3. Server Components vs Client Components

**What:** Only components that need interactivity (state, events, context) are Client Components. Static content like `ProductCard`, `Footer`, and page layouts remain Server Components where possible.

**Why:** Keeping components on the server reduces the JavaScript shipped to the browser, improving load time and interaction responsiveness.

| Component | Type | Reason |
|---|---|---|
| `ProductCard` | Server | Displays static data; no state or events needed |
| `Footer` | Client | Needs `useEffect` for dynamic year (Next.js 16 prerender constraint) |
| `ProductList` | Client | Needs filter/sort state |
| `AddToCartButton` | Client | Needs cart context + click handler |
| `Header` | Client | Needs cart context for badge count |
| `CartPage` | Client | Full cart interactivity |
| `CheckoutPage` | Client | Form state + validation |

**Result:** Total DOM elements: **139** (Lighthouse confirms this is well within the recommended limit). The page structure is lean because most product rendering happens on the server.

### 4. No Unnecessary Third-Party Scripts

**What:** No external analytics, chat widgets, or third-party scripts are loaded.

**Why:** Every additional script adds JavaScript work and can delay interaction readiness.

**Result:** Lighthouse "3rd parties" audit — passed. All 843.8 KiB of JavaScript is first-party Next.js framework code. In a production build, this would be significantly smaller due to minification (the "Minify JavaScript" suggestion of 215 KiB savings applies only to development mode).

### 5. Loading States

**What:** `loading.tsx` files are added at the root, `/products`, and `/products/[id]` routes to show skeleton placeholder UI while the page loads.

**Why:** Loading states prevent the page from appearing blank or broken during navigation, improving perceived performance and user experience.

### 6. Environment Configuration

**What:** A `.env.example` file is committed with placeholder values. The actual `.env.local` is in `.gitignore`.

**Why:** Secrets stay out of source control. `NEXT_PUBLIC_` values are bundled into the browser and must be treated as public.

---

## Development vs Production

| Environment | How to Run | Key Difference |
|---|---|---|
| Development | `npm run dev` | Hot reload, verbose errors, unminified JS (~910 KiB total), devtools included |
| Production build | `npm run build && npm start` | Minified, optimised, tree-shaken — significantly smaller JS bundles |

> **Important:** The scores above were measured in **development mode**. The TBT of 200ms and the "Minify JavaScript" / "Reduce unused JavaScript" diagnostics are expected in dev mode because Next.js serves unminified code with development tools (next-devtools alone is 249 KiB). A production build (`npm run build && npm start`) would produce better TBT and smaller bundles.

---

## Accessibility Finding

Lighthouse flagged one contrast issue (score: 95/100):
- **"Background and foreground colors do not have a sufficient contrast ratio"** — some text elements have slightly low contrast. This can be improved by darkening the muted text colour in the CSS design tokens.

---

## Summary

| What We Changed | What Improved |
|---|---|
| Used `next/image` with `fill` + `sizes` | CLS = 0, no layout shifts, responsive images |
| Used `next/font/google` (Inter) | No external font requests, no FOUT |
| Server Components for static content | Reduced client JS, lean DOM (139 elements) |
| No third-party scripts | All JS is first-party framework code |
| Added `loading.tsx` skeletons | Better perceived performance during navigation |
| `.env.example` committed, secrets excluded | Safe configuration, no credentials in Git |
