'use client'

export default function Header() {
  return (
    <>
      <div className="h-6 sm:h-7 md:h-8 lg:h-[32px] relative shrink-0 w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px]">
        <img 
          alt="Wisemonk Logo" 
          className="absolute inset-0 max-w-none object-contain pointer-events-none size-full" 
          src="https://www.figma.com/api/mcp/asset/25385a7a-5091-4105-bacb-fae174d3fe53" 
        />
      </div>
      <button className="border border-grey-500 border-solid content-stretch flex gap-1 sm:gap-[4px] h-9 sm:h-10 items-center justify-center px-2 sm:px-3 md:px-4 lg:px-[16px] py-1.5 sm:py-2 md:py-[8px] relative rounded-lg shrink-0 hover:bg-grey-200 transition-colors">
        <div className="content-stretch flex gap-1 sm:gap-[4px] h-full items-center relative shrink-0">
          <div className="flex flex-col font-satoshi font-bold justify-center leading-[0] not-italic relative shrink-0 text-xs sm:text-sm md:text-base text-grey-500 text-center whitespace-nowrap">
            <p className="leading-normal">Sign up</p>
          </div>
        </div>
        <div className="relative shrink-0 size-4 sm:size-5 md:size-6">
          <div className="absolute inset-[12.61%_12.73%_12.76%_46.9%]">
            <div className="absolute inset-[-1.67%_-3.1%]">
              <img 
                alt="" 
                className="block max-w-none size-full" 
                src="https://www.figma.com/api/mcp/asset/a4e28d06-7ce9-419f-afd5-c4b5eab13ebd" 
              />
            </div>
          </div>
          <div className="absolute inset-[32.66%_33.59%_32.66%_12.47%]">
            <div className="absolute inset-[-3.6%_-2.34%_-3.6%_-2.32%]">
              <img 
                alt="" 
                className="block max-w-none size-full" 
                src="https://www.figma.com/api/mcp/asset/cd6539d7-2bae-4b6d-81c1-74309177c576" 
              />
            </div>
          </div>
        </div>
      </button>
    </>
  )
}

