// Password reset API functions

import { AuthResponse } from './api'

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return ''
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
}

const PASSWORD_API_BASE_URL = getApiBaseUrl()

/**
 * Request password reset (forgot password)
 */
export async function forgetPassword(email: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${PASSWORD_API_BASE_URL}/api/v1/auth/forget-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      let errorMessage = data.message || data.error || 'Failed to send reset link.'
      
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

    return {
      success: true,
      data: data.data || data,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again later.',
    }
  }
}

/**
 * Reset password with token
 */
export async function resetPassword(token: string, password: string, confirmPassword: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${PASSWORD_API_BASE_URL}/api/v1/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ password, confirm_password: confirmPassword }),
    })

    const data = await response.json()

    if (!response.ok) {
      let errorMessage = data.message || data.error || 'Failed to reset password.'
      
      if (data.details?.errors) {
        const validationErrors = data.details.errors
          .map((e: any) => e.message || e.msg || e)
          .filter(Boolean)
          .join(', ')
        if (validationErrors) {
          errorMessage = validationErrors
        }
      }

      // Handle specific error cases
      if (response.status === 401) {
        errorMessage = 'Invalid or expired reset token. Please request a new reset link.'
      }

      return {
        success: false,
        message: errorMessage,
        status: response.status,
        details: data.details,
      }
    }

    return {
      success: true,
      data: data.data || data,
    }
  } catch (error) {
    return {
      success: false,
      message: 'Network error. Please try again later.',
    }
  }
}

