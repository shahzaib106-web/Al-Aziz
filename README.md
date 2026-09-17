# العزيز ریسٹورنٹ — Al Aziz Restaurant

A full-featured online food ordering website built with **Next.js 14 (App Router) + Tailwind CSS**, matching the provided Urdu/maroon design, plus a complete **Admin Dashboard**.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
```

Data is stored in `data/db.json` (auto-seeded on first run) via built-in API routes — no external database needed.

## Customer App (mobile-first, Urdu RTL)

| Screen | Route |
| --- | --- |
| Splash + Onboarding + Home | `/` |
| Login / Signup | `/login` |
| Categories | `/categories` |
| Menu list (category tabs + search) | `/menu?cat=c1` |
| Product detail (options, qty, favorites) | `/product/m1` |
| Cart | `/cart` |
| Checkout (address, payment methods) | `/checkout` |
| Order confirmation | `/confirmation/AGH2356` |
| Live order tracking (auto-refresh) | `/track/AGH2356` |
| My Orders | `/orders` |
| Profile (edit, favorites, about, logout) | `/profile` |

Features: cart with localStorage persistence, stock-aware ordering (items go out of stock when sold out), ingredient consumption per order, favorites, live tracking timeline.

## Admin Dashboard — `/admin` (login: `admin` / `admin123`)

- **Dashboard** — revenue, orders in progress, low-stock alerts, staff on duty, recent orders, top sellers.
- **Orders** — filter by status, expand details, advance status (Placed → Confirmed → Preparing → Out for Delivery → Delivered) or cancel; customer tracking page updates live.
- **Menu & Prices** — add/edit/delete dishes, Urdu + English names, half/full plate prices, ratings, per-day stock, available toggle, category manager.
- **Inventory** — ingredients with stock levels, low-stock thresholds, +/- adjustments, restock, stock value; stock auto-deducts when orders are placed (recipes).
- **Staff** — add/edit/remove staff, roles, salaries, on/off duty toggle.
- **Settings** — restaurant identity (Urdu/English), promo banner text, discount %, delivery fee, free-delivery threshold, ETA, admin credentials.

## PWA (installable app)

The website is a Progressive Web App:
- `public/manifest.webmanifest` — app name, maroon theme, gold-on-maroon icons (192/512/maskable), standalone display.
- `public/sw.js` — service worker: offline fallback + asset caching (API always live).
- On Android Chrome: menu → **"Add to Home screen" / "Install app"** → gets app icon, full-screen app without browser bar. iPhone Safari: Share → Add to Home Screen.

## Admin dashboard preview

Open `admin-preview.html` in the workspace viewer for a static visual preview, or use the **live** dashboard at `/admin` (login `admin` / `admin123`).

## Menu data

Seeded with the restaurant's actual menu card: **Chicken Special** (چکن ڈھاکا، پکڑہ، قلفی، ڈرم اسٹک، پلیٹر، جمبو), **Rice** (fried rice varieties + chicken biryani), **Sp. Desi Murgha** (کڑاہی، غفار بابا، قندھاری), **Special Mutton** (کڑاہی، قورمہ، پسندہ، شاہی جہانی، دسترخانی، روسٹ، تکہ), **Tandoor** (روغنی نان، گارلک نان، پراٹھا، روغنی پیٹھ) and **Cold Drinks** (منٹ مارگریٹا، فریش لائم، پاے، کھیر…) with half/full prices. Sample orders `AGH2356` (preparing) and `AGH2341` (delivered), inventory and staff included. Any name/price can be corrected anytime from Admin → Menu & Prices.
