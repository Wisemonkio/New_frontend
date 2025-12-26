'use client'

import SignUpForm from '@/components/SignUpForm'
import MarketingContentSignUp from '@/components/MarketingContentSignUp'
import Header from '@/components/Header'

export default function SignUpPage() {
  return (
    <div className="bg-white relative h-screen w-full overflow-hidden flex flex-col">
      {/* Background decorative elements */}
      <div className="absolute h-[245px] left-[calc(66.67%+49px)] top-[186px] w-[339px] pointer-events-none hidden xl:block">
        <div className="absolute inset-[-204.08%_-147.49%]">
          <img 
            alt="" 
            className="block max-w-none size-full" 
            src="https://www.figma.com/api/mcp/asset/e078bfc8-5f29-493c-8276-df1bf85de233" 
          />
        </div>
      </div>
      <div className="absolute h-[245px] left-[calc(91.67%-89px)] top-[559px] w-[338px] pointer-events-none hidden xl:block">
        <div className="absolute inset-[-204.08%_-147.93%]">
          <img 
            alt="" 
            className="block max-w-none size-full" 
            src="https://www.figma.com/api/mcp/asset/2ac4bc60-3fa1-473c-9f44-81542b42f068" 
          />
        </div>
      </div>
      <div className="absolute h-[245px] left-[calc(58.33%+21px)] top-[707px] w-[338px] pointer-events-none hidden xl:block">
        <div className="absolute inset-[-204.08%_-147.93%]">
          <img 
            alt="" 
            className="block max-w-none size-full" 
            src="https://www.figma.com/api/mcp/asset/cc078050-f951-4a97-9101-e6f9421772e5" 
          />
        </div>
      </div>

      {/* Header - Part of the same flow */}
      <header className="flex-shrink-0 w-full">
        <div className="flex h-[60px] sm:h-[70px] md:h-[80px] lg:h-[100px] items-center justify-between px-4 sm:px-6 md:px-8 lg:px-[40px] max-w-[1440px] mx-auto">
          <Header isSignUpPage={true} />
        </div>
      </header>

      {/* Main Content - Fits remaining space */}
      <main className="flex-1 w-full flex items-start justify-center px-4 sm:px-6 md:px-8 lg:px-0 overflow-hidden pt-4 sm:pt-6 md:pt-8">
        <div className="w-full max-w-[1600px] flex flex-col lg:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-[20px] items-start justify-start">
          <SignUpForm />
          <MarketingContentSignUp />
        </div>
      </main>
    </div>
  )
}

