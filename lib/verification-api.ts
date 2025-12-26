// Email verification API functions

import { AuthResponse } from './api'

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return ''
  }
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
}

const VERIFICATION_API_BASE_URL = getApiBaseUrl()

/**
 * Verify email with OTP code
 */
export async function verifyEmail(email: string, code: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${VERIFICATION_API_BASE_URL}/api/v1/email-verification/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp: code }),
    })

    const data = await response.json()

    if (!response.ok) {
      let errorMessage = data.message || data.error || 'Email verification failed.'
      
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
 * Resend verification OTP code
 */
export async function resendVerificationCode(email: string): Promise<AuthResponse> {
  try {
    const response = await fetch(`${VERIFICATION_API_BASE_URL}/api/v1/email-verification/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    const data = await response.json()

    if (!response.ok) {
      let errorMessage = data.message || data.error || 'Failed to resend verification code.'
      
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

