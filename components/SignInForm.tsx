'use client'

import { useState } from 'react'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      return 'Email is required'
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address'
    }
    return ''
  }

  const validatePassword = (password: string) => {
    if (!password) {
      return 'Password is required'
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long'
    }
    return ''
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (emailError) {
      setEmailError(validateEmail(value))
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)
    if (passwordError) {
      setPasswordError(validatePassword(value))
    }
  }

  const handleEmailBlur = () => {
    setEmailError(validateEmail(email))
  }

  const handlePasswordBlur = () => {
    setPasswordError(validatePassword(password))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const emailErr = validateEmail(email)
    const passwordErr = validatePassword(password)
    
    setEmailError(emailErr)
    setPasswordError(passwordErr)
    
    if (!emailErr && !passwordErr) {
      // Handle form submission
      console.log('Sign in:', { email, password })
    }
  }

  return (
    <div className="flex flex-row items-start self-stretch w-full lg:w-[1100px] h-full mt-8 sm:mt-10 md:mt-12">
      <div className="content-stretch flex flex-col gap-2 sm:gap-3 md:gap-4 items-center justify-start p-2 sm:p-3 md:p-4 lg:p-4 relative shrink-0 w-full overflow-hidden">
        <div className="content-stretch flex flex-col gap-2 sm:gap-3 md:gap-4 items-start relative shrink-0 w-full">
          {/* Form Header */}
          <div className="content-stretch flex flex-col gap-1 items-center relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <h1 className="font-satoshi font-bold leading-tight not-italic relative shrink-0 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] text-grey-700 whitespace-nowrap">
                Welcome back to Wisemonk
              </h1>
            </div>
            <p className="font-satoshi font-medium leading-normal not-italic relative shrink-0 text-sm sm:text-base text-grey-500 w-full mt-1">
              Sign in to manage your team, payroll, and compliance.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="content-stretch flex flex-col gap-3 sm:gap-4 items-start relative shrink-0 w-full min-w-full">
            {/* Google Sign In Button */}
            <button
              type="button"
              className="border border-grey-200 border-solid content-stretch flex gap-2 h-11 sm:h-12 items-center justify-center px-4 sm:px-5 md:px-[20px] py-2.5 sm:py-3 relative rounded-xl shrink-0 w-full hover:bg-grey-200 transition-colors"
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
            <div className="flex items-center w-full gap-4">
              <div className="flex-1 h-px bg-grey-200"></div>
              <div className="flex items-center justify-center px-2 sm:px-[10px] py-1 sm:py-[4px] shrink-0">
                <p className="font-inter font-normal leading-6 not-italic text-xs sm:text-sm md:text-base text-grey-300 whitespace-nowrap">
                  or continue with
                </p>
              </div>
              <div className="flex-1 h-px bg-grey-200"></div>
            </div>

            {/* Input Fields */}
            <div className="content-stretch flex flex-col gap-3 sm:gap-4 items-start relative shrink-0 w-full min-w-full">
              {/* Email Input */}
              <div className="content-stretch flex flex-col gap-1 items-start relative shrink-0 w-full">
                <div className={`bg-white border ${emailError ? 'border-red-500' : 'border-grey-200'} border-solid content-stretch flex flex-col items-start overflow-clip px-3 sm:px-4 py-2 sm:py-2.5 md:py-[10px] relative rounded-lg shrink-0 w-full focus-within:border-primary-base transition-colors`}>
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
                        onChange={handleEmailChange}
                        onBlur={handleEmailBlur}
                        placeholder={email ? '' : 'Work email*'}
                        className={`font-satoshi font-medium leading-normal not-italic relative shrink-0 text-sm sm:text-base w-full outline-none bg-transparent ${email ? 'text-grey-700' : 'text-grey-300 placeholder:text-grey-300'}`}
                        required
                      />
                    </div>
                  </div>
                </div>
                {emailError && (
                  <p className="font-satoshi font-medium text-xs sm:text-sm text-red-500">
                    {emailError}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="content-stretch flex flex-col gap-1 items-start relative shrink-0 w-full">
                <div className={`bg-white border ${passwordError ? 'border-red-500' : 'border-grey-200'} border-solid content-stretch flex flex-col items-start overflow-visible px-3 sm:px-4 py-2 sm:py-2.5 md:py-[10px] relative rounded-lg shrink-0 w-full focus-within:border-primary-base transition-colors`}>
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
                        placeholder={password ? '' : 'Password*'}
                        className={`font-satoshi font-medium leading-normal not-italic relative flex-1 text-sm sm:text-base outline-none bg-transparent ${password ? 'text-grey-700' : 'text-grey-300 placeholder:text-grey-300'}`}
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
                {passwordError && (
                  <p className="font-satoshi font-medium text-xs sm:text-sm text-red-500">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="bg-primary-base content-stretch cursor-pointer flex items-center justify-center px-4 sm:px-8 md:px-[135.5px] py-2.5 sm:py-3 md:py-[12px] relative rounded-lg shrink-0 w-full hover:opacity-90 transition-opacity"
              >
                <p className="font-satoshi font-bold leading-normal not-italic relative shrink-0 text-sm sm:text-base text-white text-center sm:text-left">
                  Sign in
                </p>
              </button>
            </div>
          </form>
        </div>

        {/* Legal Text */}
        <p className="font-satoshi font-medium leading-normal not-italic relative shrink-0 text-xs sm:text-sm text-grey-500 text-center px-2 whitespace-nowrap">
          <span>By continuing, you agree to our </span>
          <a 
            className="[text-underline-position:from-font] cursor-pointer decoration-solid underline hover:text-primary-base transition-colors" 
            href="#"
          >
            Terms & Conditions
          </a>
          <span> and </span>
          <a 
            className="[text-underline-position:from-font] cursor-pointer decoration-solid underline hover:text-primary-base transition-colors" 
            href="#"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  )
}

