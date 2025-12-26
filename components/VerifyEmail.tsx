'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { verifyEmail, resendVerificationCode } from '@/lib/verification-api'
import { navigateBasedOnStatus, fetchOrganization } from '@/lib/organization-api'

interface VerifyEmailProps {
  email: string
}

export default function VerifyEmail({ email }: VerifyEmailProps) {
  const router = useRouter()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleCodeChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    setError('')
    setSuccess('')

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      navigator.clipboard.readText().then((text) => {
        const digits = text.replace(/\D/g, '').slice(0, 6).split('')
        const newCode = ['', '', '', '', '', '']
        digits.forEach((digit, i) => {
          if (i < 6) newCode[i] = digit
        })
        setCode(newCode)
        // Focus the next empty input or last input
        const nextEmptyIndex = newCode.findIndex((c) => !c)
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
        inputRefs.current[focusIndex]?.focus()
      })
    }
  }

  const handleVerify = async () => {
    const verificationCode = code.join('')
    
    if (verificationCode.length !== 6) {
      setError('Please enter the complete verification code.')
      return
    }

    setIsLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await verifyEmail(email, verificationCode)
      
      if (response.success) {
        setSuccess('Email verified successfully!')
        // Store any additional data if provided
        if (response.data) {
          // If tokens are provided, store them
          const accessToken = response.data.accessToken || response.data.token
          if (accessToken) {
            localStorage.setItem('accessToken', accessToken)
          }
          if (response.data.refreshToken) {
            localStorage.setItem('refreshToken', response.data.refreshToken)
          }
        }
        
        // Fetch organization data and navigate based on setup status
        setTimeout(async () => {
          const organizationId = localStorage.getItem('organizationId')
          if (organizationId) {
            const orgResponse = await fetchOrganization(organizationId)
            if (orgResponse.success && orgResponse.data) {
              // Update organization in localStorage
              localStorage.setItem('organization', JSON.stringify(orgResponse.data))
              if (orgResponse.data.id) {
                localStorage.setItem('organizationId', orgResponse.data.id.toString())
              }
            }
          }
          
          // Navigate based on role and organization setup status
          navigateBasedOnStatus(router)
        }, 1000)
      } else {
        setError(response.message || 'Verification failed. Please check your code and try again.')
        // Clear code on error
        setCode(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.')
      setCode(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsResending(true)
    setError('')
    setSuccess('')

    try {
      const response = await resendVerificationCode(email)
      
      if (response.success) {
        setSuccess('Verification code has been resent to your email.')
        // Clear code
        setCode(['', '', '', '', '', ''])
        inputRefs.current[0]?.focus()
      } else {
        setError(response.message || 'Failed to resend code. Please try again.')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to resend code. Please try again.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#E8F0FE] px-4 sm:px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Back Button */}
        <Link 
          href="/signup"
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
          <span className="text-sm font-medium">Back</span>
        </Link>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-grey-700 mb-2">
          Verify your email
        </h1>

        {/* Email Message */}
        <p className="text-sm sm:text-base text-grey-600 mb-8">
          We've sent a verification code to{' '}
          <span className="font-medium text-grey-700">{email}</span>
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm font-satoshi">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <p className="text-green-600 text-sm font-satoshi">{success}</p>
          </div>
        )}

        {/* Verification Code Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-grey-700 mb-3">
            Verification Code
          </label>
          <div className="flex gap-2 sm:gap-3 justify-center">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => {
                  e.preventDefault()
                  const pastedText = e.clipboardData.getData('text')
                  const digits = pastedText.replace(/\D/g, '').slice(0, 6).split('')
                  const newCode = ['', '', '', '', '', '']
                  digits.forEach((digit, i) => {
                    if (i < 6) newCode[i] = digit
                  })
                  setCode(newCode)
                  // Focus the next empty input or last input
                  const nextEmptyIndex = newCode.findIndex((c) => !c)
                  const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
                  inputRefs.current[focusIndex]?.focus()
                }}
                className={`w-12 sm:w-14 h-12 sm:h-14 text-center text-lg sm:text-xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-base transition-colors ${
                  digit
                    ? 'border-primary-base bg-primary-base/5'
                    : 'border-grey-200 hover:border-grey-300'
                } ${error ? 'border-red-300' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Resend Code */}
        <div className="text-center mb-6">
          <span className="text-sm text-grey-600">Didn't receive the code? </span>
          <button
            onClick={handleResend}
            disabled={isResending}
            className="text-sm font-medium text-primary-base hover:text-primary-base/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isResending ? 'Sending...' : 'Resend code'}
          </button>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={isLoading || code.join('').length !== 6}
          className="w-full bg-grey-300 hover:bg-grey-400 disabled:bg-grey-200 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          {isLoading ? 'Verifying...' : 'Verify Email'}
        </button>
      </div>
    </div>
  )
}

