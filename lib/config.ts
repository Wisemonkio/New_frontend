// Configuration utility for environment detection

/**
 * Get the current frontend URL based on environment
 */
export function getFrontendUrl(): string {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  
  // Server-side: use environment variable or default
  // Default to localhost:5173 for development
  if (process.env.NEXT_PUBLIC_FRONTEND_URL) {
    return process.env.NEXT_PUBLIC_FRONTEND_URL
  }
  
  // Auto-detect based on NODE_ENV
  if (process.env.NODE_ENV === 'production') {
    return 'https://eor-prod-frontend-459668612637.asia-south2.run.app'
  }
  
  return 'http://localhost:5173'
}

/**
 * Get the API base URL
 */
export function getApiBaseUrl(): string {
  // Check if we have an explicit API URL
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL
  }

  // Auto-detect based on frontend URL
  const frontendUrl = getFrontendUrl()
  
  // Production frontend URL
  if (frontendUrl.includes('eor-prod-frontend')) {
    return process.env.NEXT_PUBLIC_PROD_API_BASE_URL || 'https://eor-prod-frontend-459668612637.asia-south2.run.app'
  }
  
  // Development/staging
  if (frontendUrl.includes('eor-frontend')) {
    return process.env.NEXT_PUBLIC_STAGING_API_BASE_URL || 'https://eor-frontend-459668612637.asia-south2.run.app'
  }
  
  // Local development
  return 'http://localhost:3000'
}

/**
 * Check if we're in production
 */
export function isProduction(): boolean {
  if (typeof window !== 'undefined') {
    return window.location.hostname.includes('eor-prod-frontend')
  }
  return process.env.NODE_ENV === 'production'
}

/**
 * Check if we're in local development
 */
export function isLocal(): boolean {
  if (typeof window !== 'undefined') {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  }
  return process.env.NODE_ENV === 'development'
}

