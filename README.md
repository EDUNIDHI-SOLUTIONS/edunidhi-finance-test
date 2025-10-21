# Edunidhi Finance Module

This repository contains a full-stack finance module for Edunidhi, including:

- **Backend** (`backend/`): Node.js + Express API with MongoDB (via Mongoose) and Razorpay integration
- **Frontend** (`frontend/`): React (Vite) dashboard with Tailwind CSS, Chart.js visualizations, and Razorpay checkout

## Local Development

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB connection string (MongoDB Atlas recommended)
- Razorpay sandbox credentials

### Backend

```bash
cd backend
npm install
cp .env.example .env # update with real credentials
npm run dev
```

Environment variables:

```
MONGO_URI=<your MongoDB URI>
RAZORPAY_KEY_ID=<your Razorpay key>
RAZORPAY_SECRET=<your Razorpay secret>
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Set the API base URL in a `.env` file if deploying to production:

```
VITE_API_BASE_URL=<render-backend-url>/api
VITE_RAZORPAY_KEY_ID=<razorpay-key>
```

## Deployment Overview

- **Backend**: Deploy to Render with build command `npm install` and start command `npm start`.
- **Frontend**: Deploy to Vercel using the Vite framework preset.
- **Database**: Use MongoDB Atlas (free tier) and update `MONGO_URI` accordingly.
- **Payments**: Razorpay sandbox integration for order creation, verification, and webhooks.

Refer to service-specific docs for provisioning steps.
