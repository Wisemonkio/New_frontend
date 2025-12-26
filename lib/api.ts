// API utility functions for authentication

// Use relative URLs for API calls - Next.js rewrites will proxy them
// This matches the Vite proxy behavior where /api/v1/auth/* goes to backend
// In browser: use relative URLs (Next.js rewrites handle proxying)
// Server-side: use absolute URL for API routes
const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    // Browser: use relative URLs, Next.js rewrites will proxy to backend
    return ''
  }
  // Server-side: use absolute URL
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
}

const API_BASE_URL = getApiBaseUrl()

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  confirm_password: string
}

export interface GoogleAuthRequest {
  id_token: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  data?: {
    accessToken?: string
    refreshToken?: string
    token?: string // Fallback
    user?: any
    roles?: Array<{
      role_id?: number
      roleId?: number
      id?: number
      role_name?: string
      roleName?: string
      name?: string
    } | string>
    organization?: any
  }
  status?: number
  details?: {
    errors?: Array<{ message?: string; msg?: string }>
    error?: string
  }
}

/**
 * Login with email and password
 */
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    const data = await response.json()

    if (!response.ok) {
      // Extract error message from various possible formats
      let errorMessage = data.message || data.error || 'Login failed. Please check your credentials.'
      
      // Handle validation errors
      if (data.details?.errors) {
        const validationErrors = data.details.errors
          .map((e: any) => e.message || e.msg || e)
          .filter(Boolean)
          .join(', ')
        if (validationErrors) {
          errorMessage = validationErrors
        }
      }

      return {
        success: false,
        message: errorMessage,
        status: response.status,
        details: data.details,
      }
    }

    // Extract data from response (handle both data.data and direct data)
    const responseData = data.data || data

    return {
      success: true,
      data: responseData,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again later.',
    }
  }
}

/**
 * Register a new user
 */
export async function register(userData: RegisterRequest): Promise<AuthResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok) {
      // Extract error message from various possible formats
      let errorMessage = data.message || data.error || 'Registration failed. Please try again.'
      
      // Handle validation errors
      if (data.details?.errors) {
        const validationErrors = data.details.errors
          .map((e: any) => e.message || e.msg || e)
          .filter(Boolean)
          .join(', ')
        if (validationErrors) {
          errorMessage = validationErrors
        }
      }

      // Handle database errors (like column doesn't exist)
      if (response.status === 500 && data.error) {
        if (data.error.includes('column') && data.error.includes('does not exist')) {
          errorMessage = 'Server configuration error. Please contact support.'
        } else {
          errorMessage = data.error || 'Server error. Please try again later.'
        }
      }

      return {
        success: false,
        message: errorMessage,
        status: response.status,
        details: data.details,
      }
    }

    // Extract data from response (handle both data.data and direct data)
    const responseData = data.data || data

    return {
      success: true,
      data: responseData,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again later.',
    }
  }
}

/**
 * Authenticate with Google
 */
export async function googleAuth(idToken: string): Promise<AuthResponse> {
  try {
    const endpoint = `${API_BASE_URL}/api/v1/auth/google`
    const payload = { id_token: idToken }
    
    console.log('Google Auth Request:', {
      endpoint,
      method: 'POST',
      payload: { id_token: idToken.substring(0, 20) + '...' } // Log partial token for debugging
    })
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      // Extract detailed error messages
      let errorMessage = data.message || 'Google authentication failed.'
      
      if (data.details?.errors) {
        const validationErrors = data.details.errors
          .map((e: any) => e.message || e.msg || e)
          .filter(Boolean)
          .join(', ')
        if (validationErrors) {
          errorMessage = validationErrors
        }
      }

      return {
        success: false,
        message: errorMessage,
        status: response.status,
        details: data.details,
      }
    }

    // Extract data from response (handle both data.data and direct data)
    const responseData = data.data || data

    return {
      success: true,
      data: responseData,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again later.',
    }
  }
}

/**
 * Logout user
 */
export async function logout(): Promise<AuthResponse> {
  try {
    const token = localStorage.getItem('accessToken')
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    })

    const data = await response.json()

    if (!response.ok) {
      // Even if logout fails on server, clear local storage
      return {
        success: false,
        message: data.message || data.error || 'Logout failed.',
        status: response.status,
      }
    }

    return {
      success: true,
      data: data.data || data,
    }
  } catch (error) {
    // Even on network error, clear local storage
    return {
      success: false,
      message: 'Network error. Please try again later.',
    }
  }
}
