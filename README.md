# Aurelia Grand Hotel — Luxury Hospitality Booking Concept

> **Stay Above Expectations.**  
> Concept luxury hotel website & booking portal in Islamabad, Pakistan.  
> **Built as a portfolio concept project by SH Web Studio.**

---

## 🏛️ Project Overview

**Aurelia Grand Hotel** is a fictional 5-star urban retreat concept designed to showcase agency-grade digital craftsmanship for high-end hospitality brands. The project features a refined aesthetic, responsive architecture, zero-dependency client-side booking engine, interactive dining reservations, and persistent browser state.

*Disclaimer: This is a concept/demo project created solely for portfolio demonstration. No real bookings or monetary transactions occur.*

---

## ✨ Key Features

1. **Brand Experience & Architecture**:
   - Refined luxury aesthetic with custom palette (`#F8F6F1`, `#171717`, `#A67C52`).
   - Cormorant Garamond serif headings paired with Plus Jakarta Sans body typography.
   - Sticky navigation with scroll-state transitions and mobile drawer.

2. **Quick Availability Search**:
   - Date validation with past date protection and checkout logic.
   - Dynamic stay duration (nightly) calculations.

3. **Room & Penthouse Showcase**:
   - **Deluxe King** (from PKR 28,000 / night)
   - **Executive Suite** (from PKR 42,000 / night)
   - **Presidential Suite** (from PKR 75,000 / night)
   - Real-time filtering by category, guest capacity, and budget range with interactive sorting.

4. **Detailed Accommodation PDP**:
   - Multi-image gallery with thumbnail selection and zero-broken-image fallbacks.
   - Spatial specifications, acoustic and panoramic view callouts, and comprehensive amenity listings.
   - Contiguous sticky reservation module with instant rate and tax calculations (16% GST).

5. **5-Step Frictionless Booking Engine**:
   - Room selection $\to$ Date selection $\to$ Guest configuration $\to$ Guest information $\to$ Review & Confirmation.
   - Local storage persistence for confirmed reservations.
   - Demo confirmation voucher with reference code generation, copy-to-clipboard, and printable receipt format.

6. **The Ember Table Signature Dining**:
   - Full categorized a la carte menus (Breakfast, Starters, Wood-Fired Mains, Desserts, Zero-Proof).
   - Interactive table reservation modal with seating area selection (Terrace, Hearth, Private Alcove).

7. **Curated Amenities & Wellness**:
   - Visual showcase for 8 luxury facilities including the Rooftop Horizon Pool, Himalayan Salt Spa, Technogym Studio, and 24/7 Concierge.

8. **Direct Concierge & Contact**:
   - Interactive guest relations inquiry form with instant local submission logging.
   - Physical coordinates and property highlights in Islamabad.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7 (`react-router-dom`)
- **Icons**: Lucide React
- **State Management**: React Context + `localStorage` API
- **Fonts**: Google Fonts (`Cormorant Garamond`, `Plus Jakarta Sans`)

---

## 📂 Project Structure

```text
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   │   └── images/              # High-fidelity architectural & suite imagery
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky navigation contract & mobile drawer
│   │   ├── Footer.tsx           # Luxury footer with concept attribution
│   │   ├── SectionHeading.tsx   # Typography and editorial kickers
│   │   ├── QuickSearch.tsx      # Date picker & availability calculation
│   │   ├── RoomCard.tsx         # Responsive room card with unboxed metadata
│   │   ├── TableReservationModal.tsx # Dining reservation flow
│   │   ├── ScrollToTop.tsx      # Viewport position restoration
│   │   └── Toast.tsx            # Accessible notification manager
│   ├── context/
│   │   └── BookingContext.tsx   # Centralized booking and reservation state
│   ├── data/
│   │   ├── rooms.ts             # Accommodation specifications & pricing
│   │   ├── menu.ts              # The Ember Table menu items & schedule
│   │   └── amenities.ts         # Hotel lifestyle features & hours
│   ├── pages/
│   │   ├── Home.tsx             # Hotel landing overview & spotlight
│   │   ├── Rooms.tsx            # Filterable room catalog
│   │   ├── RoomDetails.tsx      # Single room PDP & reservation sidebar
│   │   ├── Dining.tsx           # The Ember Table restaurant & menus
│   │   ├── Amenities.tsx        # Wellness & hotel facilities
│   │   ├── About.tsx            # Concept philosophy & Islamabad location
│   │   ├── Contact.tsx          # Concierge form & coordinates
│   │   ├── Booking.tsx          # Multi-step checkout & voucher receipt
│   │   └── NotFound.tsx         # 404 fallback
│   ├── types/
│   │   └── index.ts             # Strict TypeScript definitions
│   ├── App.tsx                  # Root application & routing
│   ├── index.css                # Custom theme variables & typography
│   └── main.tsx                 # DOM entry point
├── vercel.json                  # SPA routing rules for Vercel
├── vite.config.ts
└── package.json
```

---

## 🚀 Local Development Setup

Clone the repository and install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open your browser at `http://localhost:3000` (or the port specified by Vite).

---

## 📦 Production Build

To test the optimized production build:

```bash
npm run build
npm run preview
```

---

## ⚡ Direct Vercel Deployment

This project is 100% self-contained on the client side:
- **No external database required**
- **No server-side functions or API keys needed**
- **No environment variable configuration needed**

### Deploy Steps:
1. Push the repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Framework Preset: **Vite** (Build command: `npm run build`, Output directory: `dist`).
4. Click **Deploy**.

---

## 📜 Attribution & Concept Notice

Created as a concept portfolio demonstration by **SH Web Studio**.  
All branding, pricing, and hotel assets are fictional and constructed for demonstration purposes.
