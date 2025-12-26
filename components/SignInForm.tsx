'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { login, googleAuth } from '@/lib/api'
import { storeAuthData } from '@/lib/auth-utils'
import { navigateBasedOnStatus, fetchOrganization } from '@/lib/organization-api'
import ForgotPasswordModal from './ForgotPasswordModal'

export default function SignInForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false)
  const googleButtonRef = useRef<HTMLDivElement>(null)
  
  // Validation states
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)

  // Validation functions
  const validateEmail = (emailValue: string): string => {
    if (!emailValue.trim()) {
      return 'Email is required.'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailValue.trim())) {
      return 'Please enter a valid email address.'
    }
    return ''
  }

  const validatePassword = (passwordValue: string): string => {
    if (!passwordValue.trim()) {
      return 'Password is required.'
    }
    return ''
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setError('') // Clear general error
    
    // Validate if field has been touched or submit was attempted
    if (emailTouched || submitAttempted) {
      setEmailError(validateEmail(value))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    setError('') // Clear general error
    
    // Validate if field has been touched or submit was attempted
    if (passwordTouched || submitAttempted) {
      setPasswordError(validatePassword(value))
    }
  }

  const handleEmailBlur = () => {
    setEmailTouched(true)
    setEmailError(validateEmail(email))
  }

  const handlePasswordBlur = () => {
    setPasswordTouched(true)
    setPasswordError(validatePassword(password))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitAttempted(true)
    
    // Validate all fields
    const emailValidation = validateEmail(email)
    const passwordValidation = validatePassword(password)
    
    setEmailError(emailValidation)
    setPasswordError(passwordValidation)
    setEmailTouched(true)
    setPasswordTouched(true)
    
    // If validation fails, don't submit
    if (emailValidation || passwordValidation) {
      return
    }
    
    setIsLoading(true)

    try {
      const response = await login({ email, password })
      
      if (response.success && response.data) {
        // Store all authentication data (same as Google auth)
        const accessToken = response.data.accessToken || response.data.token
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken)
        }
        if (response.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.refreshToken)
        }
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user))
          if (response.data.user.email) {
            localStorage.setItem('userEmail', response.data.user.email)
          }
        }
        // Store role and organization if available
        if (response.data.roles && Array.isArray(response.data.roles) && response.data.roles.length > 0) {
          const firstRole = response.data.roles[0]
          if (firstRole && typeof firstRole === 'object') {
            const roleId = (firstRole as any).role_id || (firstRole as any).roleId
            const roleName = (firstRole as any).role_name || (firstRole as any).roleName
            if (roleId !== null && roleId !== undefined) {
              localStorage.setItem('roleId', roleId.toString())
            }
            if (roleName) {
              localStorage.setItem('roleName', roleName)
            }
          }
        }
        if (response.data.organization) {
          localStorage.setItem('organization', JSON.stringify(response.data.organization))
          const orgId = (response.data.organization as any).id || (response.data.organization as any)._id
          if (orgId) {
            localStorage.setItem('organizationId', orgId.toString())
          }
        }
        
        // Fetch organization data and navigate based on setup status
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
      } else {
        // Handle different error statuses
        const status = response.status || 0
        let errorMsg = response.message || 'Login failed. Please try again.'
        
        if (status === 401) {
          errorMsg = 'Invalid email or password. Please check your credentials and try again.'
        } else if (status === 400 || status === 422) {
          errorMsg = response.message || 'Invalid login data. Please check your input.'
        } else if (status === 500) {
          errorMsg = 'Server error. Please try again later.'
        } else if (status === 0 || !status) {
          errorMsg = 'Unable to connect to the server. Please check your connection.'
        }
        
        setError(errorMsg)
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Initialize Google OAuth when component mounts
  useEffect(() => {
    let isMounted = true
    
    // Suppress 403 errors from Google button iframes (not popup)
    const suppressIframeErrors = () => {
      const originalError = window.console.error
      const originalWarn = window.console.warn
      
      // Suppress console errors from button iframe
      window.console.error = (...args: any[]) => {
        const errorMessage = args.join(' ')
        // Only suppress button iframe errors, not popup errors
        if (
          (errorMessage.includes('403') || errorMessage.includes('Failed to load resource')) &&
          (errorMessage.includes('/gsi/button') || 
           errorMessage.includes('iframe_id=gsi_') ||
           errorMessage.includes('GSI_LOGGER') ||
           errorMessage.includes('The given origin is not allowed'))
        ) {
          // Silently ignore button iframe errors (popup works independently)
          return
        }
        // Log other errors normally (including popup errors)
        originalError.apply(console, args)
      }

      // Suppress console warnings from GSI logger
      window.console.warn = (...args: any[]) => {
        const warnMessage = args.join(' ')
        if (
          warnMessage.includes('GSI_LOGGER') ||
          (warnMessage.includes('The given origin is not allowed') && warnMessage.includes('client ID'))
        ) {
          // Silently ignore GSI logger warnings about button iframe
          return
        }
        // Log other warnings normally
        originalWarn.apply(console, args)
      }

      // Suppress network errors from button iframe
      const originalErrorHandler = window.onerror
      window.onerror = (message, source, lineno, colno, error) => {
        if (typeof message === 'string') {
          // Only suppress button iframe errors
          if (
            (message.includes('403') || message.includes('Failed to load')) &&
            (message.includes('/gsi/button') || 
             message.includes('accounts.google.com/gsi/button') ||
             message.includes('iframe_id=gsi_'))
          ) {
            return true // Suppress button iframe errors
          }
        }
        // Don't suppress other errors (including popup errors)
        if (originalErrorHandler) {
          return originalErrorHandler(message, source, lineno, colno, error)
        }
        return false
      }

      return () => {
        window.console.error = originalError
        window.console.warn = originalWarn
        window.onerror = originalErrorHandler
      }
    }

    const cleanupErrorSuppression = suppressIframeErrors()
    
    const initializeGoogle = () => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      
      if (!clientId) {
        console.error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set')
        setError('Google OAuth is not configured. Please check your environment variables.')
        return
      }

      const checkGoogle = () => {
        return new Promise<void>((resolve, reject) => {
          if (typeof window !== 'undefined' && (window as any).google) {
            resolve()
          } else {
            let attempts = 0
            const maxAttempts = 50 // 5 seconds max
            const interval = setInterval(() => {
              attempts++
              if ((window as any).google) {
                clearInterval(interval)
                resolve()
              } else if (attempts >= maxAttempts) {
                clearInterval(interval)
                reject(new Error('Google Identity Services failed to load'))
              }
            }, 100)
          }
        })
      }

      checkGoogle()
        .then(() => {
          if (!isMounted) return
          
          const google = (window as any).google
          if (!google || !google.accounts) {
            console.error('Google accounts API not available')
            return
          }

          // Get the current origin for redirect URI
          const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'
          
          google.accounts.id.initialize({
            client_id: clientId,
            callback: async (response: any) => {
              setIsLoading(true)
              setError('')
              try {
                if (!response.credential) {
                  setError('Failed to get Google ID token.')
                  setIsLoading(false)
                  return
                }

                console.log('Google OAuth callback received, calling /api/v1/auth/google')
                const authResponse = await googleAuth(response.credential)
                
                if (authResponse.success && authResponse.data) {
                  // Store all authentication data
                  storeAuthData(authResponse.data)
                  
                  // Fetch organization data and navigate based on setup status
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
                } else {
                  setError(authResponse.message || 'Google authentication failed.')
                  setIsLoading(false)
                }
              } catch (err: any) {
                console.error('Google auth error:', err)
                setError(err.message || 'An unexpected error occurred. Please try again.')
                setIsLoading(false)
              }
            },
            ux_mode: 'popup',
            context: 'signin',
            auto_select: false,
            use_fedcm_for_prompt: true,
          })

          // Disable auto-select to avoid CORS issues
          google.accounts.id.disableAutoSelect()

          // Render the Google button in hidden container for popup mode
          if (googleButtonRef.current && isMounted) {
            try {
              google.accounts.id.renderButton(googleButtonRef.current, {
                type: 'standard',
                theme: 'outline',
                size: 'large',
                text: 'signin_with',
                shape: 'rectangular',
                logo_alignment: 'left',
              })
            } catch (err) {
              // Silently handle render errors (403s are suppressed by error handlers)
              console.warn('Google button render note (suppressed):', err)
            }
          }
        })
        .catch((err) => {
          console.error('Google initialization error:', err)
          if (isMounted) {
            setError('Failed to load Google Sign-In. Please refresh the page.')
          }
        })
    }

    // Wait for both script and DOM to be ready
    const checkReady = () => {
      const scriptLoaded = typeof window !== 'undefined' && (window as any).google
      const refReady = googleButtonRef.current !== null
      
      if (scriptLoaded && refReady) {
        initializeGoogle()
      } else {
        setTimeout(checkReady, 100)
      }
    }

    // Start checking after a short delay
    const timer = setTimeout(checkReady, 300)
    
    return () => {
      isMounted = false
      clearTimeout(timer)
      if (cleanupErrorSuppression) {
        cleanupErrorSuppression()
      }
    }
  }, [router])

  const handleGoogleSignIn = async () => {
    setError('')
    
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    if (!clientId || clientId.trim() === '') {
      setError('Google authentication is not configured. Please add NEXT_PUBLIC_GOOGLE_CLIENT_ID to your .env file and restart the server.')
      return
    }

    setIsLoading(true)

    // Set timeout to reset loading state if user closes popup
    let timeoutId: NodeJS.Timeout | null = setTimeout(() => {
      setIsLoading(false)
    }, 30000) // 30 seconds timeout

    let callbackCalled = false
    let isWaitingForCallback = true

    // Listen for window focus to detect if popup was closed
    const handleWindowFocus = () => {
      setTimeout(() => {
        if (!callbackCalled && isWaitingForCallback) {
          if (timeoutId) clearTimeout(timeoutId)
          setIsLoading(false)
          isWaitingForCallback = false
          window.removeEventListener('focus', handleWindowFocus)
        }
      }, 1000)
    }

    try {
      // Wait for Google to be ready with more retries
      const checkGoogle = () => {
        return new Promise<void>((resolve, reject) => {
          if (typeof window !== 'undefined' && (window as any).google?.accounts?.id) {
            resolve()
          } else {
            let attempts = 0
            const maxAttempts = 100 // 10 seconds max
            const interval = setInterval(() => {
              attempts++
              if ((window as any).google?.accounts?.id) {
                clearInterval(interval)
                resolve()
              } else if (attempts >= maxAttempts) {
                clearInterval(interval)
                reject(new Error('Google Identity Services failed to load'))
              }
            }, 100)
          }
        })
      }

      await checkGoogle()

      const google = (window as any).google
      if (!google || !google.accounts || !google.accounts.id) {
        setError('Google Identity Services failed to load. Please refresh the page.')
        setIsLoading(false)
        return
      }

      // Check if Google button container exists
      if (!googleButtonRef.current) {
        setError('Google button container not found. Please refresh the page.')
        setIsLoading(false)
        return
      }

      // Wait for the button to be rendered, then click it programmatically
      let buttonFound = false
      let retries = 0
      const maxRetries = 20 // 2 seconds
      
      while (!buttonFound && retries < maxRetries) {
        const googleButton = googleButtonRef.current.querySelector('div[role="button"]') as HTMLElement
        if (googleButton) {
          buttonFound = true
          window.addEventListener('focus', handleWindowFocus)
          // Click the button to trigger popup
          googleButton.click()
          break
        }
        await new Promise(resolve => setTimeout(resolve, 100))
        retries++
      }

      if (!buttonFound) {
        setIsLoading(false)
        setError('Google Sign-In button not ready. Please wait a moment and try again.')
      }
    } catch (err: any) {
      if (timeoutId) clearTimeout(timeoutId)
      setIsLoading(false)
      setError(err.message || 'Google authentication failed. Please try again.')
    }
  }

  return (
    <div className="flex flex-row items-start self-stretch w-full lg:w-[1100px] h-full">
      <div className="content-stretch flex flex-col gap-2 sm:gap-3 items-center justify-start p-2 sm:p-3 md:p-4 relative shrink-0 w-full max-w-full overflow-hidden">
        <div className="content-stretch flex flex-col gap-1.5 sm:gap-2 items-start relative shrink-0 w-full">
          {/* Form Header */}
          <div className="content-stretch flex flex-col gap-0.5 sm:gap-1 items-center relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <h1 className="font-satoshi font-bold leading-tight not-italic relative shrink-0 text-base sm:text-lg md:text-xl lg:text-2xl text-grey-700 whitespace-nowrap">
                Welcome back to Wisemonk
              </h1>
            </div>
            <p className="font-satoshi font-medium leading-normal not-italic relative shrink-0 text-xs sm:text-sm text-grey-500 w-full">
              Sign in to manage your team, payroll, and compliance.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="content-stretch flex flex-col gap-3 sm:gap-4 items-start relative shrink-0 w-full min-w-full">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 w-full">
                <p className="text-red-600 text-sm font-satoshi">{error}</p>
              </div>
            )}

            {/* Hidden Google Button Container for popup mode */}
            <div ref={googleButtonRef} className="hidden" aria-hidden="true"></div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full h-[38px] px-[18px] py-[9px] rounded-xl outline outline-1 outline-[rgb(211,212,214)] outline-offset-[-1px] flex items-center justify-center gap-2 cursor-pointer opacity-100 bg-white hover:bg-grey-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="overflow-clip relative shrink-0 size-5 sm:size-6">
                <div className="absolute left-1/2 size-5 sm:size-[20px] top-1/2 translate-x-[-50%] translate-y-[-50%]">
                  <img 
                    alt="Google Logo" 
                    className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" 
                    src="/images/google-logo.png" 
                  />
                </div>
              </div>
              <p className="font-satoshi font-bold leading-normal not-italic relative shrink-0 text-sm sm:text-base text-grey-700">
                Sign in with Google
              </p>
            </button>

            {/* Divider */}
            <div className="content-stretch flex items-center justify-center relative shrink-0 w-full gap-[0.5rem]">
              <div className="flex flex-1 items-center justify-center min-h-px relative shrink-0">
                <div className="w-full h-px bg-grey-200"></div>
              </div>
              <div className="content-stretch flex gap-1 items-center justify-center px-2 sm:px-[10px] py-1 sm:py-[4px] relative rounded-[40px] shrink-0">
                <p className="font-inter font-normal leading-6 not-italic relative shrink-0 text-xs sm:text-sm md:text-base text-grey-300 whitespace-nowrap">
                  or continue with
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center min-h-px relative shrink-0">
                <div className="w-full h-px bg-grey-200"></div>
              </div>
            </div>

            {/* Input Fields */}
            <div className="content-stretch flex flex-col gap-2 items-start relative shrink-0 w-full min-w-full">
              {/* Email Input */}
              <div className="content-stretch flex flex-col gap-2 items-start relative shrink-0 w-full">
                <div className="bg-white border border-grey-200 border-solid content-stretch flex flex-col items-start overflow-clip px-[0.3rem] py-[0.3rem] relative rounded-lg shrink-0 w-full focus-within:border-primary-base transition-colors">
                  <div className={`content-stretch flex flex-col ${email ? 'gap-[2px]' : 'gap-0'} items-start justify-center relative shrink-0 w-full`}>
                    {email && (
                      <label className="font-satoshi font-medium leading-normal not-italic relative shrink-0 text-xs sm:text-sm text-grey-500">
                        Work email*
                      </label>
                    )}
                    <div className="content-stretch flex items-center relative shrink-0 w-full">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={email ? '' : 'Work email*'}
                        className={`font-satoshi font-medium leading-normal not-italic relative shrink-0 text-sm sm:text-base w-full outline-none bg-transparent px-[0.3rem] ${email ? 'text-grey-700' : 'text-grey-300 placeholder:text-grey-300'}`}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="content-stretch flex flex-col gap-2 items-start relative shrink-0 w-full">
                <div className={`bg-white border border-solid content-stretch flex flex-col items-start overflow-visible px-[0.3rem] py-[0.3rem] relative rounded-lg shrink-0 w-full transition-colors ${
                  passwordError ? 'border-red-500' : 'border-grey-200 focus-within:border-primary-base'
                }`}>
                  <div className={`content-stretch flex flex-col ${password ? 'gap-[2px]' : 'gap-0'} items-start justify-center relative shrink-0 w-full`}>
                    {password && (
                      <label className="font-satoshi font-medium leading-normal not-italic relative shrink-0 text-xs sm:text-sm text-grey-500">
                        Password*
                      </label>
                    )}
                    <div className="content-stretch flex items-center gap-2 relative shrink-0 w-full">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordBlur}
                        onFocus={() => setIsPasswordFocused(true)}
                        placeholder={password ? '' : 'Password*'}
                        className={`font-satoshi font-medium leading-normal not-italic relative flex-1 text-sm sm:text-base outline-none bg-transparent px-[0.3rem] ${password ? 'text-grey-700' : 'text-grey-300 placeholder:text-grey-300'}`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="h-5 sm:h-[23px] relative shrink-0 w-5 sm:w-6 cursor-pointer hover:opacity-70 transition-opacity"
                      >
                        <img 
                          alt={showPassword ? 'Hide password' : 'Show password'} 
                          className="block max-w-none size-full" 
                          src="/images/visibility-icon.svg" 
                        />
                      </button>
                    </div>
                  </div>
                </div>
                {passwordError && (passwordTouched || submitAttempted) && (
                  <p className="text-red-500 text-xs sm:text-sm font-satoshi mt-0.5">{passwordError}</p>
                )}
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="bg-primary-base content-stretch cursor-pointer flex items-center justify-center px-4 sm:px-8 md:px-[135.5px] py-2.5 sm:py-3 md:py-[12px] relative rounded-lg shrink-0 w-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <p className="font-satoshi font-bold leading-normal not-italic relative shrink-0 text-sm sm:text-base text-white text-center sm:text-left">
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </p>
              </button>

              {/* Forgot Password Link */}
              <div className="w-full text-right mt-1">
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-sm text-primary-base hover:text-primary-base/80 font-satoshi font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Legal Text */}
            <p className="font-satoshi font-medium leading-normal not-italic relative shrink-0 text-xs sm:text-sm text-grey-500 text-center px-2 sm:px-4 break-words">
              <span>By continuing, you agree to our </span>
              <a 
                className="[text-underline-position:from-font] cursor-pointer decoration-solid underline hover:text-primary-base transition-colors" 
                href="https://www.wisemonk.io/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms & Conditions
              </a>
              <span> and </span>
              <a 
                className="[text-underline-position:from-font] cursor-pointer decoration-solid underline hover:text-primary-base transition-colors" 
                href="https://www.wisemonk.io/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              .
            </p>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
      />
    </div>
  )
}

