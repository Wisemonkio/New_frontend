'use client'

import SignInForm from '@/components/SignInForm'
import MarketingContent from '@/components/MarketingContent'
import Header from '@/components/Header'

export default function SignInPage() {
  return (
    <div className="bg-white relative h-screen w-full overflow-hidden flex flex-col">
      {/* Background decorative elements */}
      <div className="absolute h-[245px] left-[calc(66.67%+49px)] top-[186px] w-[339px] pointer-events-none hidden xl:block">
        <div className="absolute inset-[-204.08%_-147.49%]">
          <img 
            alt="" 
            className="block max-w-none size-full" 
            src="https://www.figma.com/api/mcp/asset/4ec70fef-8be9-4315-aaaa-a17c1948df02" 
          />
        </div>
      </div>
      <div className="absolute h-[245px] left-[calc(91.67%-89px)] top-[559px] w-[338px] pointer-events-none hidden xl:block">
        <div className="absolute inset-[-204.08%_-147.93%]">
          <img 
            alt="" 
            className="block max-w-none size-full" 
            src="https://www.figma.com/api/mcp/asset/1b030a1d-d67a-45ea-810c-e4c38305b33e" 
          />
        </div>
      </div>
      <div className="absolute h-[245px] left-[calc(58.33%+21px)] top-[707px] w-[338px] pointer-events-none hidden xl:block">
        <div className="absolute inset-[-204.08%_-147.93%]">
          <img 
            alt="" 
            className="block max-w-none size-full" 
            src="https://www.figma.com/api/mcp/asset/f47ec21f-e81a-4165-a883-b20997a87283" 
          />
        </div>
      </div>

      {/* Header - Part of the same flow */}
      <header className="flex-shrink-0 w-full">
        <div className="flex h-[60px] sm:h-[70px] md:h-[80px] lg:h-[100px] items-center justify-between px-4 sm:px-6 md:px-8 lg:px-[40px] max-w-[1440px] mx-auto">
          <Header />
        </div>
      </header>

      {/* Main Content - Fits remaining space */}
      <main className="flex-1 w-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-0 overflow-hidden">
        <div className="w-full max-w-[1360px] flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-[20px] items-center lg:items-start justify-center h-full">
          <SignInForm />
          <MarketingContent />
        </div>
      </main>
    </div>
  )
}

