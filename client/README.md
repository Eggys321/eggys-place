# Eggy's Place — Client

The React frontend for Eggy's Place, a food-ordering web app. Customers browse the
menu, add items to a cart, check out with Paystack, enter a delivery address
(with address autocomplete), and track their orders; admins manage products,
orders, and customers from a dashboard.

This app talks to the companion Express/MongoDB API in `../server` — it does not
work standalone.

## Tech stack

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) (dev server / build tool)
- [React Router 7](https://reactrouter.com/) for routing
- [Tailwind CSS 4](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) for styling
- [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) for form validation
- [Axios](https://axios-http.com/) / `fetch` for API calls
- [Sonner](https://sonner.emilkowal.ski/) for toast notifications
- [@paystack/inline-js](https://github.com/PaystackHQ/inline-js) for card payments
- LocationIQ (via raw `fetch` calls in `features/checkout/Delivery.jsx`) for delivery-address autocomplete

## Getting started

```bash
npm install
npm run dev       # start the Vite dev server
```

Other scripts:

```bash
npm run build     # production build
npm run lint      # run ESLint
npm run preview   # preview a production build locally
```

## Environment variables

Create a `.env` file in this folder with:

| Variable | Purpose |
| --- | --- |
| `VITE_API_URL` | Base URL of the backend API (the `server/` app), e.g. `http://localhost:5000`. |
| `VITE_TEST_PUBLIC` | Paystack **public** key used to initialize checkout payments. |
| `VITE_LOCATION_KEY` | LocationIQ API key used for delivery-address autocomplete suggestions. |

`.env` is gitignored — get real values from whoever manages the project's Paystack
and LocationIQ accounts, and point `VITE_API_URL` at your running `server/` instance.
