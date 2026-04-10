# 🎟️ CouponsScript

A full-stack coupons & deals marketplace built with **Next.js 14** (App Router) and **Express.js**, featuring a dynamic admin CMS, multi-layout theming, and a responsive storefront.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-8-47A248?logo=mongodb)
![Express](https://img.shields.io/badge/Express-4.18-000000?logo=express)
![Cypress](https://img.shields.io/badge/Cypress-15-17202C?logo=cypress)

---

## 📸 Features

- **Dynamic Theming** — Admin-configurable colors, fonts, and layouts applied in real-time
- **Multiple Navbar/Footer Layouts** — 4 navbar variants, 4 footer variants, selectable from admin
- **Admin CMS** — Full content management for stores, coupons, deals, banners, blog, categories, pages, and more
- **SEO Optimized** — Dynamic sitemap, robots.txt, meta tags, and structured data
- **Dark Mode** — System-aware dark/light theme toggle
- **Responsive** — Mobile-first design across all pages
- **Search Modal** — Full-screen search with dynamic stores, categories, and offers
- **Coupon System** — Click tracking, promo codes, deal expiration, and featured coupons
- **Blog** — Rich text editor with admin blog management
- **Legal Pages** — Templates for Privacy Policy, Terms & Conditions, Cookie Policy
- **GA4 Analytics** — Server-side Google Analytics 4 event tracking
- **Image Uploads** — Cloudinary integration for logos, banners, and media
- **E2E Testing** — Cypress test suites for both frontend and backend APIs

---

## 🏗️ Project Structure

```
coupons-script-frontend/          # Next.js 14 Frontend
├── app/                          # App Router pages
│   ├── [slug]/                   # Dynamic pages (legal, custom)
│   ├── admin/                    # Admin panel
│   │   ├── banners/              # Hero carousel management
│   │   ├── blog/                 # Blog article management
│   │   ├── categories/           # Category management
│   │   ├── cms/                  # Site config & theming
│   │   ├── coupons/              # Coupon management
│   │   ├── dashboard/            # Admin dashboard
│   │   ├── deals/                # Deals management
│   │   ├── login/                # Admin authentication
│   │   ├── pages/                # CMS pages (legal templates)
│   │   ├── popular-links/        # Popular links management
│   │   ├── promo-banners/        # Promotional banners
│   │   ├── stores/               # Store management
│   │   └── tags/                 # Tag management
│   ├── all-coupons/              # All coupons listing
│   ├── blog/                     # Blog listing & articles
│   ├── category/                 # Category pages
│   ├── coupons/                  # Store-specific coupons
│   ├── deals/                    # Deals page
│   ├── stores/                   # Stores listing
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── robots.ts                 # Dynamic robots.txt
│   └── sitemap.ts                # Dynamic sitemap
├── components/
│   ├── admin/                    # Admin UI components
│   ├── banner/                   # Banner layouts
│   ├── categories/               # Category components
│   ├── common/                   # Shared components (ColumnSwitcher, BackToTop, etc.)
│   ├── coupon/                   # Coupon cards, grid, promo modal
│   ├── coupons-page/             # Coupon listing page components
│   ├── footer/                   # FooterOne, FooterTwo, FooterThree, FooterFour
│   ├── home/                     # Homepage sections
│   ├── layout/                   # Dynamic navbar/footer wrappers
│   ├── navbar/                   # NavbarOne, NavbarTwo, NavbarThree, NavbarFour
│   ├── sections/                 # Reusable page sections
│   ├── store/                    # Store detail page components
│   ├── DynamicThemeProvider.tsx   # Runtime theme provider
│   ├── ThemeProvider.tsx          # Dark/light mode provider
│   └── ThemedMain.tsx             # Main content wrapper
├── cypress/                      # E2E tests
├── hooks/                        # Custom React hooks
├── services/
│   └── api.ts                    # Axios API service (all endpoints)
├── store/                        # Redux store (RTK)
├── styles/
│   └── globals.css               # Global styles
├── utils/                        # Utility functions
├── .env                          # Environment variables
├── .gitignore                    # Git ignore rules
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies & scripts

coupons-script-backend/           # Express.js Backend
├── src/
│   ├── config/                   # Database & app config
│   ├── controllers/              # Route controllers
│   ├── middleware/                # Auth, GA4 analytics middleware
│   ├── models/                   # Mongoose models
│   │   ├── Admin.js
│   │   ├── Banner.js
│   │   ├── BlogArticle.js
│   │   ├── Category.js
│   │   ├── Coupon.js
│   │   ├── CouponClick.js
│   │   ├── Deal.js
│   │   ├── FeaturedCoupon.js
│   │   ├── Footer.js
│   │   ├── Page.js
│   │   ├── PopularStore.js
│   │   ├── PromoBanner.js
│   │   ├── SiteConfig.js
│   │   └── Store.js
│   ├── routes/
│   │   ├── admin/                # Protected admin API routes
│   │   └── public/               # Public API routes
│   └── utils/                    # Helpers, seeders, GA4
├── cypress/                      # Backend API E2E tests
├── seed-data.mjs                 # Database seeder
├── server.js                     # Express entry point
├── .env                          # Backend environment variables
├── .env.example                  # Environment template
└── package.json                  # Dependencies & scripts
```

---

## ⚙️ Tech Stack

| Layer         | Technology                                    |
| ------------- | --------------------------------------------- |
| **Frontend**  | Next.js 14 (App Router), React 18, TypeScript |
| **Styling**   | Tailwind CSS 3, MUI 5 (admin), Framer Motion  |
| **State**     | Redux Toolkit, React hooks                    |
| **Backend**   | Express.js 4, Node.js                         |
| **Database**  | MongoDB (Mongoose 8)                          |
| **Auth**      | JWT (jsonwebtoken), bcryptjs                  |
| **Images**    | Cloudinary                                    |
| **Analytics** | Google Analytics 4 (server-side)              |
| **Testing**   | Cypress 15 (E2E)                              |
| **Icons**     | Lucide React, React Icons, MUI Icons          |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/CouponsScript.git
cd CouponsScript
```

### 2. Backend Setup

```bash
cd coupons-script-backend
npm install
```

Create a `.env` file:

```env
MONGODB_URI=<your_mongodb_connection_string>
PORT=5000
JWT_SECRET=<your_jwt_secret>
GA4_MEASUREMENT_ID=<your_ga4_measurement_id>
GA4_API_SECRET=<your_ga4_api_secret>
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
```

Start the backend:

```bash
npm run dev        # Development (nodemon)
npm start          # Production
```

Seed the database (optional):

```bash
node seed-data.mjs
```

### 3. Frontend Setup

```bash
cd coupons-script-frontend
npm install
```

Create a `.env` file:

```env
NEXT_BASE_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev        # Development (localhost:3000)
npm run build      # Production build
npm start          # Start production server
```

---

## 🔑 Environment Variables

### Frontend (`.env`)

| Variable        | Description          | Default                 |
| --------------- | -------------------- | ----------------------- |
| `NEXT_BASE_URL` | Backend API base URL | `http://localhost:5000` |

### Backend (`.env`)

| Variable                | Description                       | Required |
| ----------------------- | --------------------------------- | -------- |
| `MONGODB_URI`           | MongoDB connection string         | ✅       |
| `PORT`                  | Server port                       | `5000`   |
| `JWT_SECRET`            | JWT signing secret                | ✅       |
| `GA4_MEASUREMENT_ID`    | Google Analytics 4 Measurement ID | ❌       |
| `GA4_API_SECRET`        | Google Analytics 4 API Secret     | ❌       |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name             | ✅       |
| `CLOUDINARY_API_KEY`    | Cloudinary API key                | ✅       |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret             | ✅       |

---

## 📡 API Overview

### Public Endpoints

| Method | Endpoint                              | Description                 |
| ------ | ------------------------------------- | --------------------------- |
| GET    | `/api/public/stores/list`             | List all stores             |
| GET    | `/api/public/stores/details/:slug`    | Store by slug               |
| GET    | `/api/public/coupons/list`            | List coupons (with filters) |
| GET    | `/api/public/coupons/search`          | Search coupons              |
| POST   | `/api/public/coupons/track-click/:id` | Track coupon click          |
| GET    | `/api/public/categories/list`         | List categories             |
| GET    | `/api/public/deals/list`              | List deals                  |
| GET    | `/api/public/blog/list`               | List blog articles          |
| GET    | `/api/public/site/config`             | Site configuration          |
| GET    | `/api/public/site/banners/list`       | Hero banners                |
| GET    | `/api/public/site/:pageName`          | CMS page content            |

### Admin Endpoints (JWT Protected)

| Method | Endpoint                              | Description          |
| ------ | ------------------------------------- | -------------------- |
| POST   | `/api/auth/login`                     | Admin login          |
| CRUD   | `/api/admin/stores/*`                 | Store management     |
| CRUD   | `/api/admin/coupons/*`                | Coupon management    |
| CRUD   | `/api/admin/deals/*`                  | Deal management      |
| CRUD   | `/api/admin/categories/*`             | Category management  |
| CRUD   | `/api/admin/blog/*`                   | Blog management      |
| CRUD   | `/api/admin/banner/*`                 | Banner management    |
| CRUD   | `/api/admin/pages/*`                  | CMS pages management |
| PUT    | `/api/admin/pages/site-config/update` | Site config update   |

---

## 🧪 Testing

### Backend API Tests

```bash
cd coupons-script-backend
npm run test              # Run all Cypress tests
npm run test:open         # Open Cypress UI
npm run test:admin        # Admin API tests only
npm run test:stores       # Store API tests only
npm run test:coupons      # Coupon API tests only
```

### Frontend E2E Tests

```bash
cd coupons-script-frontend
npm run cypress:open      # Open Cypress UI
npm run cypress:run       # Run headless
```

---

## 📂 .gitignore

### Frontend

```
node_modules
.next
.env.local
out
dist
```

### Backend

```
node_modules
.env
```

> **Note:** `.env` files are excluded from version control. Use `.env.example` as a template.

---

## 🎨 Theming

The app supports fully dynamic theming configured from the admin panel:

- **Primary/Secondary Colors** — Applied globally via CSS variables
- **Dark Mode** — Class-based (`darkMode: 'class'`) with system preference detection
- **Navbar Layouts** — NavbarOne, NavbarTwo, NavbarThree, NavbarFour
- **Footer Layouts** — FooterOne, FooterTwo, FooterThree, FooterFour
- **Banner Layouts** — Multiple hero carousel styles
- **Custom Colors** — Tailwind extended with CSS variable-based colors (`primary`, `secondary`, `accent`, etc.)

---

## 🛡️ Admin Panel

Access at `/admin/login`

| Module            | Features                                                |
| ----------------- | ------------------------------------------------------- |
| **Dashboard**     | Stats overview, analytics                               |
| **Stores**        | CRUD, logo upload, promo info, FAQs, sidebar data       |
| **Coupons**       | CRUD, store association, click tracking, expiry         |
| **Deals**         | CRUD, featured images, deal types                       |
| **Categories**    | CRUD, nav link toggle, slug management                  |
| **Banners**       | Hero carousel management                                |
| **Blog**          | Rich text editor, article management                    |
| **Pages**         | CMS pages with legal templates (Privacy, Terms, Cookie) |
| **CMS**           | Site name, logos, theme colors, navbar/footer selection |
| **Promo Banners** | Promotional banner management                           |
| **Popular Links** | Footer popular links                                    |
| **Tags**          | Tag management for coupons                              |

---

## 📄 License

This project is private and proprietary.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
