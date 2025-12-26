'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { resetPassword } from '@/lib/password-api'

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [token, setToken] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (!tokenParam) {
      setError('Invalid reset link. Token is missing.')
    } else {
      setToken(tokenParam)
    }
  }, [searchParams])

  const validatePassword = (pwd: string): string => {
    const hasMinLength = pwd.length >= 8
    const hasUppercase = /[A-Z]/.test(pwd)
    const hasNumber = /[0-9]/.test(pwd)
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd)

    if (!hasMinLength || !hasUppercase || !hasNumber || !hasSpecial) {
      return 'Password must be at least 8 characters and include 1 uppercase letter, 1 number, and 1 special character.'
    }
    return ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setPasswordError('')

    // Validation
    if (!password.trim()) {
      setPasswordError('Password is required')
      return
    }

    const passwordValidation = validatePassword(password)
    if (passwordValidation) {
      setPasswordError(passwordValidation)
      return
    }

    if (!confirmPassword.trim()) {
      setPasswordError('Please confirm your password')
      return
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }

    if (!token) {
      setError('Invalid reset link. Token is missing.')
      return
    }

    setIsLoading(true)

    try {
      const response = await resetPassword(token, password, confirmPassword)
      
      if (response.success) {
        setSuccess(true)
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } else {
        setError(response.message || 'Failed to reset password. Please try again.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!token && error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#E8F0FE] px-4 sm:px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
          <h1 className="text-2xl font-bold text-grey-700 mb-4">Invalid Reset Link</h1>
          <p className="text-grey-600 mb-6">
            The reset link is invalid or expired.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-primary-base text-white rounded-lg hover:opacity-90 transition-opacity font-satoshi font-bold"
          >
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#E8F0FE] px-4 sm:px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-grey-700 mb-4">Password Reset Successful!</h1>
          <p className="text-grey-600 mb-6">
            Your password has been reset successfully. Redirecting to login...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E8F0FE] px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center text-grey-600 hover:text-grey-700 mb-6 transition-colors"
        >
          <svg 
            className="w-5 h-5 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          <span className="text-sm font-medium">Back to Login</span>
        </Link>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-grey-700 mb-2">
          Reset your password
        </h1>
        <p className="text-sm sm:text-base text-grey-600 mb-6">
          Enter your new password below.
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm font-satoshi">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-grey-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordError('')
                }}
                placeholder="New Password"
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-base transition-colors font-satoshi text-sm sm:text-base ${
                  passwordError ? 'border-red-300' : 'border-grey-200 focus:border-primary-base'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-500 hover:text-grey-700"
              >
                <img 
                  alt={showPassword ? 'Hide password' : 'Show password'} 
                  className="w-5 h-5" 
                  src="/images/visibility-icon.svg" 
                />
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-grey-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setPasswordError('')
                }}
                placeholder="Confirm Password"
                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-base transition-colors font-satoshi text-sm sm:text-base ${
                  passwordError ? 'border-red-300' : 'border-grey-200 focus:border-primary-base'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-500 hover:text-grey-700"
              >
                <img 
                  alt={showConfirmPassword ? 'Hide password' : 'Show password'} 
                  className="w-5 h-5" 
                  src="/images/visibility-icon.svg" 
                />
              </button>
            </div>
          </div>

          {/* Password Error */}
          {passwordError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm font-satoshi">{passwordError}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-base text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed font-satoshi"
          >
            {isLoading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )
}

