'use client'

import SignUpForm from '@/components/SignUpForm'
import MarketingContentSignUp from '@/components/MarketingContentSignUp'
import Header from '@/components/Header'

export default function SignUpPage() {
  return (
    <div className="bg-white relative h-screen w-full overflow-hidden flex flex-col">
      {/* Header - Part of the same flow */}
      <header className="flex-shrink-0 w-full bg-white relative z-10">
        <div className="flex h-[60px] sm:h-[70px] md:h-[80px] lg:h-[100px] items-center justify-between px-4 sm:px-6 md:px-8 lg:px-[40px] max-w-[1440px] mx-auto">
          <Header isSignUpPage={true} />
        </div>
      </header>

      {/* Main Content - Fits remaining space */}
      <main className="flex-1 w-full bg-white flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 xl:px-0 overflow-hidden relative z-10">
        <div className="w-full max-w-[1360px] flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-8 xl:gap-[20px] items-center lg:items-start justify-center h-full pt-0 pb-2 sm:pb-3 md:pb-4">
          <SignUpForm />
          <MarketingContentSignUp />
        </div>
      </main>
    </div>
  )
}

