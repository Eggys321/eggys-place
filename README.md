# Eggy's Place

A full-stack MERN food-ordering app: browse a menu, add items to a cart, check out with Paystack, and track your orders. Admins get a dashboard to manage orders and view customers.

### Stack

- **Backend:** Node.js / Express, MongoDB (Mongoose), JWT auth, Nodemailer
- **Frontend:** React 19, Vite, React Router, Tailwind CSS + DaisyUI
- **Payments:** Paystack (client-side charge, server-side verification)
- **Address autocomplete:** LocationIQ

### Project layout

This repo holds two independent apps — see `client/` and `server/` for their own setup/run instructions, and `CLAUDE.md` for a fuller architecture overview.

```
client/   React + Vite frontend
server/   Express + MongoDB API
```

### Features

- Browse menu by category, search products
- Cart with quantity management, persisted locally
- Checkout with recipient info, delivery address (LGA/state + autocomplete), and Paystack payment
- Server-verified payments — order totals are recomputed from the database and the Paystack transaction is verified before an order is marked paid
- Customer order history (ongoing/delivered and cancelled)
- Admin dashboard: order overview stats, order management (status updates), customer list

### Running locally

Each app needs its own `.env` file (not committed) — see `CLAUDE.md` for the required variables.

```bash
# backend
cd server
npm install
npm run dev

# frontend (separate terminal)
cd client
npm install
npm run dev
```
