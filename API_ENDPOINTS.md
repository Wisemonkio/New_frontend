# API Endpoints Configuration

## Sign-In API Endpoint

The sign-in API endpoint is constructed as: `${API_BASE_URL}/api/v1/auth/login`

### Environment Variable Configuration

In your `.env` or `.env.local` file, set:

```env
# API Base URL - This is where all API calls will be made
# For local development, this should be your backend server (usually localhost:3000)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

### How It Works

1. **If `NEXT_PUBLIC_API_BASE_URL` is set in .env:**
   - Sign-in will hit: `http://localhost:3000/api/v1/auth/login`
   - Sign-up will hit: `http://localhost:3000/api/v1/auth/register`
   - Google OAuth will hit: `http://localhost:3000/api/v1/auth/google`
   
   **Note**: Next.js rewrites proxy `/api/v1/auth/*` requests to your backend automatically.

2. **If `NEXT_PUBLIC_API_BASE_URL` is NOT set:**
   - The app auto-detects based on your frontend URL:
     - **Local** (`http://localhost:5173`): Uses `http://localhost:3000` (default backend)
     - **Staging** (`https://eor-frontend-...`): Uses `https://eor-frontend-459668612637.asia-south2.run.app`
     - **Production** (`https://eor-prod-frontend-...`): Uses `https://eor-prod-frontend-459668612637.asia-south2.run.app`

### Example .env File

```env
# Google OAuth Client ID (REQUIRED)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com

# API Base URL (OPTIONAL - auto-detected if not set)
# For local development (your backend server):
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# For production:
# NEXT_PUBLIC_API_BASE_URL=https://your-backend-api-url.com
```

### API Endpoints Used

1. **Sign-In**: `POST ${API_BASE_URL}/api/v1/auth/login`
   - Body: `{ "email": "user@example.com", "password": "password" }`

2. **Sign-Up**: `POST ${API_BASE_URL}/api/v1/auth/register`
   - Body: `{ "email": "user@example.com", "password": "password", "confirm_password": "password" }`

3. **Google OAuth**: `POST ${API_BASE_URL}/api/v1/auth/google`
   - Body: `{ "id_token": "google_id_token_here" }`

### Important Notes

- The variable name **MUST** start with `NEXT_PUBLIC_` to be accessible in the browser
- After changing `.env` file, **restart your Next.js dev server**
- The API base URL should **NOT** include the endpoint path (e.g., `/api/v1/auth/login`)
- Only include the base URL (e.g., `http://localhost:3000` or `https://api.example.com`)
- All endpoints automatically use the `/api/v1/` prefix
- **Next.js Rewrites**: The app uses Next.js rewrites to proxy `/api/v1/auth/*` requests to your backend, similar to Vite's proxy configuration

