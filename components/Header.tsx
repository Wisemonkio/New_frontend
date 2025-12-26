'use client'

import Link from 'next/link'

interface HeaderProps {
  isSignUpPage?: boolean
}

export default function Header({ isSignUpPage = false }: HeaderProps) {
  const logoUrl = '/images/company-image.png'
  
  const buttonText = isSignUpPage ? 'Log in' : 'Sign up'
  const buttonHref = isSignUpPage ? '/' : '/signup'
  
  const arrowIcon1 = '/images/arrow-icon-1.svg'
  const arrowIcon2 = '/images/arrow-icon-2.svg'

  return (
    <>
      <Link href="/" className="h-6 sm:h-7 md:h-8 lg:h-[32px] relative shrink-0 w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px]">
        <img 
          alt="Wisemonk Logo" 
          className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" 
          src={logoUrl} 
        />
      </Link>
      <Link 
        href={buttonHref}
        className="border border-grey-500 border-solid content-stretch flex gap-1 sm:gap-[4px] h-9 sm:h-10 items-center justify-center px-2 sm:px-3 md:px-4 lg:px-[16px] py-1.5 sm:py-2 md:py-[8px] relative rounded-lg shrink-0 hover:bg-grey-200 transition-colors cursor-pointer"
      >
        <div className="content-stretch flex gap-1 sm:gap-[4px] h-full items-center relative shrink-0 pointer-events-none">
          <div className="flex flex-col font-satoshi font-bold justify-center leading-[0] not-italic relative shrink-0 text-xs sm:text-sm md:text-base text-grey-500 text-center whitespace-nowrap">
            <p className="leading-normal">{buttonText}</p>
          </div>
        </div>
        <div className="relative shrink-0 size-5 sm:size-6 md:size-7 lg:size-8 flex items-center justify-center pointer-events-none">
          <img 
            alt="" 
            className="block max-w-none w-full h-full object-contain pointer-events-none" 
            src={arrowIcon1} 
          />
        </div>
      </Link>
    </>
  )
}



