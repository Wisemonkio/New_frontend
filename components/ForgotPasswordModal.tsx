'use client'

import { useState } from 'react'
import { forgetPassword } from '@/lib/password-api'

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSendResetLink = async () => {
    setError('')
    
    // Validate email
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const response = await forgetPassword(email.trim())
      
      if (response.success) {
        setShowSuccess(true)
      } else {
        setError(response.message || 'Failed to send reset link. Please try again.')
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setEmail('')
    setError('')
    setShowSuccess(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-grey-500 hover:text-grey-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 sm:p-8">
          {!showSuccess ? (
            <>
              {/* Title */}
              <h2 className="text-2xl font-bold text-grey-700 mb-6">Reset your password</h2>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                  <p className="text-red-600 text-sm font-satoshi">{error}</p>
                </div>
              )}

              {/* Email Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-grey-700 mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError('')
                  }}
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-grey-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-base focus:border-primary-base transition-colors font-satoshi text-sm sm:text-base"
                  disabled={isLoading}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleClose}
                  disabled={isLoading}
                  className="px-6 py-2.5 text-grey-700 bg-white border border-grey-200 rounded-lg hover:bg-grey-50 transition-colors font-satoshi font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendResetLink}
                  disabled={isLoading}
                  className="px-6 py-2.5 bg-primary-base text-white rounded-lg hover:opacity-90 transition-opacity font-satoshi font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Success State */}
              <div>
                {/* Title */}
                <h2 className="text-2xl font-bold text-grey-700 mb-6">Reset your password</h2>

                {/* Success Message Box */}
                <div className="bg-grey-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                  {/* Checkmark Icon */}
                  <div className="w-8 h-8 bg-grey-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  {/* Message Text */}
                  <p className="text-grey-700 text-sm sm:text-base font-satoshi leading-normal flex-1">
                    Password reset instructions have been sent to your email address.
                  </p>
                </div>

                {/* Close Button - Bottom Right */}
                <div className="flex justify-end">
                  <button
                    onClick={handleClose}
                    className="px-6 py-2.5 bg-primary-base text-white rounded-lg hover:opacity-90 transition-opacity font-satoshi font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

