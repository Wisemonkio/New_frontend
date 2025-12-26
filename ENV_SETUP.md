# Environment Configuration Guide

This project supports multiple environments: local development, staging, and production.

## Frontend URLs

- **Local Development**: `http://localhost:5173`
- **Production**: `https://eor-prod-frontend-459668612637.asia-south2.run.app`

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

### Local Development (.env.local)

```env
# Frontend URL (auto-detected, but can be overridden)
NEXT_PUBLIC_FRONTEND_URL=http://localhost:5173

# API Base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Google OAuth Client ID
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### Production Environment

```env
# Frontend URL
NEXT_PUBLIC_FRONTEND_URL=https://eor-prod-frontend-459668612637.asia-south2.run.app

# API Base URL (if different from frontend)
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com

# Google OAuth Client ID
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_production_google_client_id_here
```

## Google OAuth Configuration

When setting up Google OAuth in the Google Cloud Console, make sure to add these authorized redirect URIs:

1. **Local Development**: `http://localhost:5173`
2. **Production**: `https://eor-prod-frontend-459668612637.asia-south2.run.app`

## Running the Application

### Local Development (Port 5173)
```bash
npm run dev
```

### Local Development (Port 3000 - Default Next.js)
```bash
npm run dev:3000
```

### Production Build
```bash
npm run build
npm start
```

## Auto-Detection

The application automatically detects the environment based on:
- The current `window.location.origin` (client-side)
- The `NODE_ENV` environment variable (server-side)
- The presence of specific URLs in the hostname

You can override this behavior by setting `NEXT_PUBLIC_FRONTEND_URL` and `NEXT_PUBLIC_API_BASE_URL` in your environment variables.

