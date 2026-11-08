# 🛒 ShopSphere – Full-Stack E-Commerce Product Catalog & Deployment

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-24-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.21-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas_Ready-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **ShopSphere** is an enterprise-grade, high-performance Full-Stack E-Commerce Product Catalog Web Application built to demonstrate production-ready project architecture, responsive UI/UX design, resilient REST APIs, and multi-cloud deployment strategies.

---

## 🌐 Live Deployments & Repository

| Service | Hosting Platform | URL | Status |
| :--- | :--- | :--- | :--- |
| **Frontend Application** | Vercel / Netlify | `https://shopsphere-catalog.vercel.app` *(or your deployed Vercel/Netlify URL)* | ![Online](https://img.shields.io/badge/Status-Live-emerald) |
| **Backend REST API** | Render Cloud | `https://shopsphere-api.onrender.com/api` *(or your deployed Render URL)* | ![Online](https://img.shields.io/badge/Status-Live-emerald) |
| **API Health Check** | Render Cloud | `https://shopsphere-api.onrender.com/api/health` | ![Healthy](https://img.shields.io/badge/Health-200_OK-blue) |
| **Source Code Repository**| GitHub | `https://github.com/teja217/shopsphere-ecommerce` | ![Git](https://img.shields.io/badge/Repo-GitHub-black) |

---

## 🌟 Executive Summary & Key Highlights

ShopSphere bridges modern frontend interactivity with scalable backend micro-architecture:
1. **Intuitive Product Discovery:** Live debounced catalog search, category filtering, multi-criteria price sliders, rating filters, in-stock toggles, and dual grid/list views.
2. **Interactive Shopping Cart:** Full lifecycle cart state persisted locally and synchronized with the backend session API, featuring real coupon codes (`SHOPSPHERE10`, `WELCOME20`, `FREESHIP`), dynamic subtotal, progressive free-shipping bar, and sales tax calculations.
3. **Simulated High-Fidelity Checkout:** Comprehensive 3-step checkout modal with shipping address validation, delivery options (Standard vs. Express Priority), payment selection (Credit Card live preview, UPI/Wallets, COD), and celebratory particle confetti upon order confirmation.
4. **Resilient Dual-Mode Database Architecture:** Automatically connects to **MongoDB Atlas** with Mongoose when `MONGODB_URI` is provided, or seamlessly switches to a zero-dependency **In-Memory Fallback Store** with pre-seeded rich catalog datasets.

---

## 🏗️ Project Architecture

```
Full-Stack E-Commerce Product Catalog/
├── backend/                        # Node.js + Express.js REST API
│   ├── config/
│   │   ├── db.js                   # Dual-mode MongoDB connection & auto-seeder
│   │   └── env.js                  # Environment variable configuration
│   ├── controllers/
│   │   ├── productController.js    # Product & search query handlers
│   │   ├── categoryController.js   # Category listings handler
│   │   ├── cartController.js       # Cart CRUD handlers
│   │   └── contactController.js    # Contact & simulated checkout handlers
│   ├── middleware/
│   │   ├── errorHandler.js         # Centralized error & 404 handler
│   │   └── validator.js            # Payload & email validation
│   ├── models/
│   │   ├── Product.js              # Mongoose Product Schema & Indexes
│   │   ├── Cart.js                 # Mongoose Cart Schema
│   │   └── Contact.js              # Mongoose Contact Schema
│   ├── routes/
│   │   ├── productRoutes.js        # /api/products endpoints
│   │   ├── categoryRoutes.js       # /api/categories endpoints
│   │   ├── cartRoutes.js           # /api/cart endpoints
│   │   └── contactRoutes.js        # /api/contact endpoints
│   ├── services/
│   │   ├── productService.js       # Product data access layer
│   │   ├── cartService.js          # Cart logic & calculations
│   │   ├── contactService.js       # Inquiries & order processing
│   │   └── fallbackStore.js        # In-memory fallback data store
│   ├── utils/
│   │   ├── seedData.js             # 16+ curated e-commerce catalog items
│   │   └── responseHandler.js      # Standardized JSON response envelope
│   ├── package.json                # Standalone backend dependencies
│   └── server.js                   # Express server entry point & static UI host
├── src/                            # React.js + Vite Frontend
│   ├── assets/                     # Static graphics and icons
│   ├── components/                 # Reusable UI Components
│   │   ├── Navbar.jsx              # Responsive header, live search & cart counter
│   │   ├── Footer.jsx              # Navigation links, trust badges & newsletter
│   │   ├── ProductCard.jsx         # Image zoom, discount badge, quick view & add
│   │   ├── QuickViewModal.jsx      # Lightbox preview modal with specs & purchase
│   │   ├── CheckoutModal.jsx       # Multi-step checkout & confetti confirmation
│   │   └── SkeletonCard.jsx        # Loading shimmer animation
│   ├── context/
│   │   ├── CartContext.jsx         # Cart state, coupons, and calculations
│   │   └── ToastContext.jsx        # Global floating notifications
│   ├── hooks/
│   │   └── useDebounce.js          # Live input debounce hook
│   ├── layouts/
│   │   └── MainLayout.jsx          # Header, outlet, and footer shell
│   ├── pages/
│   │   ├── HomePage.jsx            # Hero, curated collections, trending products
│   │   ├── ProductsPage.jsx        # Grid/list catalog, sidebar filters, sorting
│   │   ├── ProductDetailPage.jsx   # Gallery, specs, tabs, reviews & related items
│   │   ├── CartPage.jsx            # Cart table, promo code box & order summary
│   │   ├── AboutPage.jsx           # Mission, brand story & impact metrics
│   │   ├── ContactPage.jsx         # Validated contact form & interactive FAQ
│   │   └── NotFoundPage.jsx        # 404 recovery page
│   ├── routes/
│   │   └── AppRoutes.jsx           # React Router DOM with lazy-loaded Suspense
│   ├── services/
│   │   ├── api.js                  # Fetch client with session tracking
│   │   ├── productService.js       # Client product API calls
│   │   ├── cartService.js          # Client cart API calls
│   │   └── contactService.js       # Client contact & checkout API calls
│   ├── utils/
│   │   └── formatters.js           # Currency, text truncation & badges
│   ├── App.jsx                     # Root application wrapper
│   ├── main.jsx                    # React DOM entry point
│   └── index.css                   # Tailwind CSS base styles
├── dist/                           # Production compiled frontend bundle
├── netlify.toml                    # Netlify deployment configuration & redirects
├── vercel.json                     # Vercel SPA rewrites & asset caching
├── render.yaml                     # Render Infrastructure-as-Code Blueprint
├── tailwind.config.js              # Custom theme colors (Navy & Indigo/Violet)
├── vite.config.js                  # Vite configuration & chunk splitting
├── .env.example                    # Sample environment variables
└── package.json                    # Root build and concurrency scripts
```

---

## ⚡ REST API Specification

### Products Endpoints

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/products` | Retrieve catalog with filters & pagination | `search`, `category`, `minPrice`, `maxPrice`, `sortBy`, `page`, `limit` |
| `GET` | `/api/products/:id` | Retrieve single product details by ID or slug | — |
| `GET` | `/api/products/category/:category` | Retrieve products by category slug | — |
| `GET` | `/api/products/search` | Search products by text keyword | `q=keyword` |

### Categories Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/categories` | Retrieve all product categories with metadata |

### Cart Endpoints

| Method | Endpoint | Description | Payload |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/cart` | Retrieve user cart & financial breakdown | Header: `x-session-id` |
| `POST` | `/api/cart` | Add product to cart | `{ "productId": "SP-101", "quantity": 1 }` |
| `PUT` | `/api/cart/:id` | Update item quantity | `{ "quantity": 3 }` |
| `DELETE`| `/api/cart/:id` | Remove specific item from cart | — |
| `DELETE`| `/api/cart` | Clear entire shopping cart | — |

### Contact & Checkout Endpoints

| Method | Endpoint | Description | Payload |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/contact` | Submit customer support inquiry | `{ "name": "...", "email": "...", "subject": "...", "message": "..." }` |
| `POST` | `/api/contact/checkout` | Simulate order authorization & placement | `{ "shippingAddress": {...}, "paymentMethod": "...", "items": [...] }` |
| `GET` | `/api/health` | Service status & database backend check | — |

---

## 🛠️ Local Development & Quickstart

### Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- Optional: MongoDB Atlas connection string (or run with automatic in-memory mode)

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/your-username/shopsphere-ecommerce.git
cd shopsphere-ecommerce

# Install all root, frontend, and backend packages
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Contents of `.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=
CLIENT_ORIGIN=*
```
*(Leave `MONGODB_URI` blank to automatically use the built-in Fallback Store with zero configuration!)*

### 3. Run Concurrently in Development Mode
```bash
npm run dev
```
- **React Frontend:** `http://localhost:5173`
- **Express Backend:** `http://localhost:5000/api`
- **Health Check:** `http://localhost:5000/api/health`

### 4. Build for Production
```bash
npm run build
```
Generates a minified, chunk-split production bundle into the `dist/` directory.

### 5. Run Unified Full-Stack Production Server
```bash
npm start
```
Starts Express on port `5000`, serving the REST API on `/api/*` and serving the static React single-page app on `/` with full HTML5 client-side routing.

---

## 🚀 Public Deployment Guide

### A. Deploy Frontend on Vercel
1. Sign in to [Vercel](https://vercel.com).
2. Click **Add New** > **Project** and import your GitHub repository.
3. Set **Framework Preset**: `Vite`.
4. Set **Root Directory**: `./`.
5. Set **Build Command**: `npm run build`.
6. Set **Output Directory**: `dist`.
7. In **Environment Variables**, add:
   - `VITE_API_BASE_URL`: `https://shopsphere-api.onrender.com/api` (your deployed Render API URL).
8. Click **Deploy**. Vercel will automatically read `vercel.json` for SPA rewrites.

### B. Deploy Frontend on Netlify
1. Sign in to [Netlify](https://www.netlify.com).
2. Click **Add new site** > **Import an existing project**.
3. Select your GitHub repository.
4. Netlify will detect `netlify.toml` automatically:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Under **Environment variables**, add `VITE_API_BASE_URL`.
6. Click **Deploy Site**.

### C. Deploy Backend on Render
1. Sign in to [Render](https://render.com).
2. Click **New +** > **Web Service**.
3. Connect your GitHub repository.
4. Configure service parameters:
   - **Name**: `shopsphere-backend`
   - **Language**: `Node`
   - **Branch**: `main`
   - **Root Directory**: *(leave blank for root, or set to `backend`)*
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/server.js`
5. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `CLIENT_ORIGIN`: `*` (or your frontend Vercel/Netlify URL)
   - `MONGODB_URI`: *(Optional: your MongoDB Atlas connection string)*
6. Click **Create Web Service**.
7. Once live, test `https://your-app.onrender.com/api/health`.

### D. MongoDB Atlas Setup (Optional)
1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Under **Database Access**, create a user with read/write privileges.
3. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) to allow Render instances to connect.
4. Copy the connection string (e.g. `mongodb+srv://<username>:<password>@cluster0.mongodb.net/shopsphere?retryWrites=true&w=majority`).
5. Paste it as `MONGODB_URI` in your Render Environment Variables.
6. The server will automatically connect and seed initial products!

---

## 🧪 Testing Checklist Verified

- [x] **Homepage Loading:** Hero section, popular categories, featured products, and newsletter.
- [x] **Catalog & Live Search:** Instant debounced search filtering by name, tags, and description.
- [x] **Category Filters:** Real-time filtering across Electronics, Audio, Apparel, Smart Home, and Outdoors.
- [x] **Price & Rating Filters:** Interactive min/max bounds and minimum star rating checks.
- [x] **Sorting Controls:** Price (low-high, high-low), popularity, and newest arrivals.
- [x] **Product Details Page:** Multi-image gallery, specs table, tabs, and customer reviews submission.
- [x] **Cart Management:** Increment/decrement quantity, item removal, and subtotal calculation.
- [x] **Coupon System:** Promo codes `SHOPSPHERE10` (10% off) and `WELCOME20` (20% off) validated dynamically.
- [x] **Checkout Flow:** Shipping address validation, delivery tiers, payment simulation, and confetti celebration.
- [x] **Contact Form:** Client & server-side regex email validation with feedback banners.
- [x] **Mobile Responsiveness:** Tested on mobile drawer view, tablet layout, and 4K desktop displays.
- [x] **Production Build:** Clean minified chunks with zero console or compilation warnings.

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
