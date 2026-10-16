# Online Store

A team-based online store project built with Next.js, React, TypeScript, and CSS Modules as part of the IBT College Canada CodeOps Full Stack Software Development program.

## Project Overview

The goal is to build a responsive online store where customers can browse products, view product details, manage a shopping cart, and submit an order request.

This project is for educational purposes. It will not process payments or collect payment card details.

## Planned Features

- Homepage with featured products
- Product catalogue with filtering and sorting
- Individual product detail pages
- Shopping cart with quantity updates and item removal
- Checkout form with input validation
- Order confirmation page
- Responsive layout for desktop and mobile
- Accessible navigation and form controls

## Technology Stack

- Next.js with App Router
- React
- TypeScript
- CSS Modules
- ESLint

## Getting Started

### Requirements

- Node.js compatible with the installed Next.js version
- npm
- Visual Studio Code or another code editor

### Installation

Clone the project repository if you have access to it, then open the project directory in your terminal.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run lint` | Check code with ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server after building |

## Project Structure

```text
src/
├── app/          # Routes, layouts, and global styles
├── components/   # Reusable UI components
├── data/         # Product data
└── lib/          # Shared helper functions
```

Component-specific styles will use CSS Modules, keeping each component's styles separate from other components.

## Team Development

The project is developed collaboratively in phases, covering project setup, product data, catalogue and product details, cart functionality, checkout, responsive design, testing, performance, and documentation.

## Project Status

**Phase 1 — Project setup**

- Next.js project created
- TypeScript and ESLint configured
- Development server verified
- Initial folder structure created
- Production build verified

Features listed above are planned and may not yet be implemented.

## Educational Purpose

This project demonstrates full-stack development foundations, frontend architecture, component reuse, form validation, testing, accessibility, and performance practices.

Additional implementation details and screenshots will be added as the project develops.
