'use client'

import { useState } from 'react'

export default function SignUpForm() {
  const [email, setEmail] = useState('abc@wisemonk.co')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Sign up:', { email, password, confirmPassword })
  }

  return (
    <div className="flex flex-row items-center self-stretch w-full lg:w-auto lg:max-w-[500px] h-full">
      <div className="content-stretch flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 h-full items-center justify-center p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8 relative shrink-0 w-full overflow-hidden">
        <div className="content-stretch flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 items-start relative shrink-0 w-full max-w-[500px]">
          {/* Form Header */}
          <div className="content-stretch flex flex-col gap-2 items-center relative shrink-0 w-full">
            <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
              <h1 className="font-satoshi font-bold leading-tight not-italic relative shrink-0 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[32px] text-grey-700 whitespace-nowrap">
                Create your workspace
              </h1>
            </div>
            <p className="font-satoshi font-medium leading-normal not-italic relative shrink-0 text-sm sm:text-base text-grey-500 w-full mt-1">
              Enter your work email to start building your India team.
            </p>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="content-stretch flex flex-col gap-4 sm:gap-5 md:gap-6 items-start relative shrink-0 w-full">
            {/* Google Sign Up Button */}
            <button
              type="button"
              className="border border-grey-200 border-solid content-stretch flex gap-2 h-12 sm:h-[52px] items-center justify-center px-4 sm:px-5 md:px-[20px] py-3 sm:py-[14px] relative rounded-xl shrink-0 w-full hover:bg-grey-200 transition-colors"
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
                Sign up with Google
              </p>
            </button>

            {/* Divider */}
            <div className="content-stretch flex gap-3 sm:gap-4 items-center justify-center relative shrink-0 w-full">
              <div className="flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative shrink-0">
                <div className="flex-none rotate-[180deg] w-full">
                  <div className="h-0 relative w-full">
                    <div className="absolute inset-[-1px_0_0_0]">
                      <img 
                        alt="" 
                        className="block max-w-none size-full" 
                        src="https://www.figma.com/api/mcp/asset/39357add-4ab0-40f9-a486-b06511745704" 
                      />
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
                      <img 
                        alt="" 
                        className="block max-w-none size-full" 
                        src="https://www.figma.com/api/mcp/asset/39357add-4ab0-40f9-a486-b06511745704" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Fields */}
            <div className="content-stretch flex flex-col gap-4 sm:gap-5 items-start relative shrink-0 w-full">
              {/* Email Input */}
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
                <div className="bg-white border border-grey-200 border-solid content-stretch flex flex-col items-start overflow-clip px-3 sm:px-[14px] py-2.5 sm:py-3 md:py-[12px] relative rounded-lg shrink-0 w-full focus-within:border-primary-base transition-colors">
                  <div className="content-stretch flex flex-col gap-[2px] items-start justify-center relative shrink-0 w-full">
                    <label className="font-satoshi font-medium leading-normal not-italic relative shrink-0 text-xs sm:text-sm text-grey-500">
                      Work email*
                    </label>
                    <div className="content-stretch flex items-center relative shrink-0 w-full">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="font-satoshi font-medium leading-normal not-italic relative shrink-0 text-sm sm:text-base text-grey-700 w-full outline-none bg-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="h-12 sm:h-[47px] relative shrink-0 w-full">
                <div className="absolute bg-white border border-grey-200 border-solid content-stretch flex flex-col items-start left-0 overflow-clip px-3 sm:px-[14px] py-2.5 sm:py-3 md:py-[12px] rounded-lg top-0 w-full focus-within:border-primary-base transition-colors">
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create password*"
                      className="font-satoshi font-medium leading-normal not-italic relative shrink-0 text-sm sm:text-base text-grey-300 w-full outline-none bg-transparent placeholder:text-grey-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="h-5 sm:h-[23px] relative shrink-0 w-5 sm:w-6 cursor-pointer hover:opacity-70 transition-opacity ml-2"
                    >
                      <img 
                        alt={showPassword ? 'Hide password' : 'Show password'} 
                        className="block max-w-none size-full" 
                        src="https://www.figma.com/api/mcp/asset/9eb3833e-eaf9-433e-bb81-979399212e00" 
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="h-12 sm:h-[47px] relative shrink-0 w-full">
                <div className="absolute bg-white border border-grey-200 border-solid content-stretch flex flex-col items-start left-0 overflow-clip px-3 sm:px-[14px] py-2.5 sm:py-3 md:py-[12px] rounded-lg top-0 w-full focus-within:border-primary-base transition-colors">
                  <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password*"
                      className="font-satoshi font-medium leading-normal not-italic relative shrink-0 text-sm sm:text-base text-grey-300 w-full outline-none bg-transparent placeholder:text-grey-300"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="h-5 sm:h-[23px] relative shrink-0 w-5 sm:w-6 cursor-pointer hover:opacity-70 transition-opacity ml-2"
                    >
                      <img 
                        alt={showConfirmPassword ? 'Hide password' : 'Show password'} 
                        className="block max-w-none size-full" 
                        src="https://www.figma.com/api/mcp/asset/9eb3833e-eaf9-433e-bb81-979399212e00" 
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Get Started Button */}
              <button
                type="submit"
                className="bg-primary-base content-stretch cursor-pointer flex items-center justify-center px-4 sm:px-8 md:px-[135.5px] py-3 sm:py-3.5 md:py-[15px] relative rounded-lg shrink-0 w-full hover:opacity-90 transition-opacity"
              >
                <p className="font-satoshi font-bold leading-normal not-italic relative shrink-0 text-sm sm:text-base text-white text-center sm:text-left">
                  Get Started
                </p>
              </button>
            </div>
          </form>
        </div>

        {/* Legal Text */}
        <p className="font-satoshi font-medium leading-normal not-italic relative shrink-0 text-xs sm:text-sm text-grey-500 text-center px-2">
          <span>By creating an account, you agree to the </span>
          <a 
            className="[text-underline-position:from-font] cursor-pointer decoration-solid underline hover:text-primary-base transition-colors text-grey-700" 
            href="#"
          >
            Terms & Conditions
          </a>
          <span className="text-grey-700">, </span>
          <a 
            className="[text-underline-position:from-font] cursor-pointer decoration-solid underline hover:text-primary-base transition-colors text-grey-700" 
            href="#"
          >
            Privacy Policy
          </a>
          <span className="text-grey-500">,</span>
        </p>
      </div>
    </div>
  )
}

