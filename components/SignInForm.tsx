'use client'

import { useState } from 'react'

export default function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)
  const [isEmailFocused, setIsEmailFocused] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Sign in:', { email, password })
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
            <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" style={{ gap: '16px', alignSelf: 'stretch' }}>
              <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative shrink-0">
                <div className="flex-none rotate-[180deg] w-full">
                  <div className="h-0 relative w-full">
                    <div className="absolute inset-[-1px_0_0_0]">
                      <div 
                        className="block h-px" 
                        style={{ width: '162.5px', background: '#D3D4D6' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex gap-1 items-center justify-center px-2 sm:px-[10px] py-1 sm:py-[4px] relative rounded-[40px] shrink-0">
                <p className="font-inter font-normal leading-6 not-italic relative shrink-0 text-xs sm:text-sm md:text-base text-grey-300 whitespace-nowrap">
                  or continue with
                </p>
              </div>
              <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative shrink-0">
                <div className="flex-none rotate-[180deg] w-full">
                  <div className="h-0 relative w-full">
                    <div className="absolute inset-[-1px_0_0_0]">
                      <div 
                        className="block h-px" 
                        style={{ width: '162.5px', background: '#D3D4D6' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Fields */}
            <div className="content-stretch flex flex-col gap-3 sm:gap-4 items-start relative shrink-0 w-full min-w-full">
              {/* Email Input */}
              <div className="content-stretch flex flex-col gap-3 items-start relative shrink-0 w-full">
                <div className="bg-white border border-grey-200 border-solid content-stretch flex flex-col items-start overflow-clip px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-[10px] relative rounded-lg shrink-0 w-full focus-within:border-primary-base transition-colors">
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
                        className={`font-satoshi font-medium leading-normal not-italic relative shrink-0 text-sm sm:text-base w-full outline-none bg-transparent ${email ? 'text-grey-700' : 'text-grey-300 placeholder:text-grey-300'}`}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="content-stretch flex flex-col gap-3 items-start relative shrink-0 w-full">
                <div className="bg-white border border-grey-200 border-solid content-stretch flex flex-col items-start overflow-visible px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-[10px] relative rounded-lg shrink-0 w-full focus-within:border-primary-base transition-colors">
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
                        onChange={(e) => setPassword(e.target.value)}
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
                          src="https://www.figma.com/api/mcp/asset/3b96ea7c-bb01-4388-924f-56d8a5ebd5dc" 
                        />
                      </button>
                    </div>
                  </div>
                </div>
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

