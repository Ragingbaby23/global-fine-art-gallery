# ATELIER VANCE — Global Fine Art Gallery & Shopify Storefront

A museum-grade digital monograph and headless e-commerce viewing room for **Strictly One-of-One** original fine art paintings (`$1,000 – $50,000+ USD`).

## Key Architecture & Features

- **Minimal Museum Aesthetic:** Pure White (`#FFFFFF`), Warm Off-White (`#FAFAFA`), Charcoal Black (`#111111`), and Warm Bronze/Gold (`#9A7B4F`) paired with **Cormorant Garamond** & **Inter** typography.
- **Interactive Viewing Room & Spatial Staging:**
  - **Museum Frame View** with 1.85× interactive hover loupe.
  - **3× Impasto Texture Zoom** under 45° raking studio light.
  - **Higgsfield Spatial Room Mockup** across 3 architectural presets (*Collector Penthouse*, *Architectural Villa*, and *Private Bank / Boutique Hotel Lobby*) with `3000K` vs `5000K` lighting toggle.
- **Four Global Buyer Persona Pathways:**
  1. **Seasoned Private Collectors** (`$10,000 – $50,000+ USD`)
  2. **Emerging & Aspiring Collectors** (`$1,000 – $7,500 USD`)
  3. **Luxury Interior Trade & Architects** (`$3,500 – $25,000+ USD` — Metric & Imperial specs + Tear Sheets)
  4. **Corporate & Hospitality Art Curators** (`$10,000 – $50,000+ USD` — Multi-work & institutional invoicing)
- **Headless Shopify Storefront GraphQL Engine:**
  - Real-time `Quantity = 1` inventory synchronization (`Available` vs `Acquired / Sold`).
  - Built-in encrypted 1-of-1 Checkout simulation with ISPM-15 wooden crating & all-risk fine art transit insurance calculator.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure Shopify Storefront API credentials (optional — runs in Curated Studio Mode by default):
   ```bash
   cp .env.example .env.local
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).
