# Ramesh Clothing Store

A modern clothing-brand storefront adapted from the HappyPets storefront pattern for fashion retail.

## Included

- Responsive React + Vite storefront
- Men, Women, Kids, Sarees, Ethnic Wear, and Footwear categories
- Clothing-specific sizes, colors, fit/material, stock, and pricing
- Trending and new-arrival merchandising rails
- Product detail flow
- Persistent shopping cart using localStorage
- INR pricing and discount display
- Store-admin inventory overview
- Responsive, mobile-first layout

## Run locally

```bash
pnpm install
pnpm dev
```

The web app runs from `apps/web`.

## Build

```bash
pnpm build
```

## Next production integrations

The UI is intentionally backend-agnostic so it can be connected to Supabase/PostgreSQL, Razorpay, Cloudinary/Supabase Storage, authentication, order management, coupons, analytics, and deployment without changing the storefront information architecture.
