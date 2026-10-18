# Campus Tech Store

An online student electronics store built with **Next.js 16**, **React 19**, and **TypeScript**. This project demonstrates a complete shopping journey — from browsing products to submitting a delivery order — without any payment processing.

**Audience:** Our store helps _students_ find and buy _practical electronics and accessories for campus life_.

---

## Features

- **Home page** with hero section and featured products
- **Product catalogue** with category filters and price sorting
- **Product detail pages** with description, availability, and add-to-cart
- **Shopping cart** with quantity controls, line totals, and subtotal
- **Checkout form** with validation (no payment step)
- **Order confirmation** with order reference and summary
- **Responsive design** for mobile, tablet, and desktop
- **Accessible UI** with semantic HTML, keyboard navigation, and ARIA labels

## Tech Stack

| Tool | Purpose |
|---|---|
| Next.js 16 | Framework (App Router, Server + Client Components) |
| React 19 | UI library |
| TypeScript | Type safety |
| CSS (vanilla) | Styling with custom properties |
| `next/font` | Google Fonts (Inter) loaded without external requests |
| `next/image` | Optimised image rendering |

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repo
git clone https://github.com/sinemistermekonen-web/student-Ecommerce-project.git
cd student-Ecommerce-project

# Install dependencies
npm install

# Copy environment example (if applicable)
cp .env.example .env.local
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    page.tsx                  # Home
    products/page.tsx         # Catalogue
    products/[id]/page.tsx    # Product detail
    cart/page.tsx              # Shopping cart
    checkout/page.tsx          # Order form
    order-success/page.tsx     # Confirmation
    layout.tsx                 # Root layout (Header + Footer + Providers)
    globals.css                # Design tokens and all styles
  components/
    header.tsx                 # Navigation with cart badge
    Footer.tsx                 # Site footer
    productCard.tsx            # Reusable product card (Server Component)
    productList.tsx            # Catalogue with filter/sort (Client Component)
    AddtoCartbutton.tsx        # Add-to-cart with feedback (Client Component)
    providers.tsx              # CartProvider wrapper (Client Component)
  context/
    cartContext.tsx             # Cart state (React Context + localStorage)
  data/
    products.ts                # Shared product data (10 products)
  lib/
    currency.ts                # ETB price formatter
  types/
    product.ts                 # Product type definition
```

## Shopping Journey

```
Home → Catalogue → Product Detail → Cart → Checkout → Order Confirmation
```

## Environment Variables

See [`.env.example`](.env.example) for the variable names. No real secrets are committed.

- `NEXT_PUBLIC_` variables are exposed to the browser — never place private keys there.

## Scope

This project **does not** include payment processing. No card numbers, bank details, or payment credentials are collected. The order flow ends with a delivery form and confirmation page.

## License

Student project — IBT College CodeOps.
