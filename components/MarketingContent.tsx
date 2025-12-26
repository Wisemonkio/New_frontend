'use client'

const companies = [
  {
    name: 'Convincely',
    logo: '/images/convincely-logo.png',
    gradient: true,
  },
  {
    name: 'Youtrip',
    logo: '/images/youtrip-logo.png',
    gradient: false,
  },
  {
    name: 'Wieldy.ai',
    logo: '/images/wieldy-logo.png',
    gradient: true,
  },
  {
    name: 'Beauty Garage',
    logo: '/images/beauty-garage-logo.png',
    gradient: true,
  },
  {
    name: 'Leverage Companies',
    logo: '/images/leverage-companies-logo.png',
    gradient: true,
  },
]

export default function MarketingContent() {
  return (
    <div className="content-stretch flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 items-center justify-start relative shrink-0 w-full lg:w-[850px] px-0 py-2 sm:py-3 md:py-4 lg:py-4 bg-transparent rounded-2xl lg:rounded-none overflow-hidden">
      <div className="content-stretch flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 items-center relative shrink-0 w-full">
        {/* Info Header */}
        <div className="content-stretch flex flex-col font-satoshi font-bold gap-2 sm:gap-3 items-center leading-tight not-italic relative shrink-0 text-center w-full max-w-[668px]">
          <div className="relative shrink-0 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[32px] text-grey-700 w-full max-w-[656px]">
            <p className="mb-0">Hire in India. Fast, Compliant,</p>
            <p>Fully Managed.</p>
          </div>
          <p className="min-w-full relative shrink-0 text-xs sm:text-sm md:text-base lg:text-lg text-grey-500 w-[min-content] mt-0.5">
            We are SOC 2 and ISO certified.
          </p>
        </div>

        {/* Trusted Companies */}
        <div className="content-stretch flex flex-col gap-2 sm:gap-3 md:gap-4 items-center relative shrink-0 w-full">
          <p className="font-satoshi font-bold leading-normal not-italic relative shrink-0 text-xs sm:text-sm md:text-base lg:text-lg text-grey-600 text-center w-full">
            Trusted by 200+ Global Teams
          </p>
          <div className="content-stretch flex flex-col gap-1.5 sm:gap-2 items-center justify-center relative shrink-0 w-full overflow-x-auto">
            {/* First Row */}
            <div className="content-stretch flex gap-1.5 sm:gap-2 md:gap-[8px] items-center relative shrink-0 w-full justify-center flex-wrap">
              {companies.slice(0, 3).map((company, index) => (
                <div
                  key={index}
                  className={`content-stretch flex gap-1.5 sm:gap-2 md:gap-[10px] items-center p-2 sm:p-3 md:p-4 lg:p-5 relative rounded-xl md:rounded-2xl shrink-0 ${
                    company.gradient
                      ? 'bg-gradient-to-r from-white to-transparent'
                      : 'bg-white'
                  }`}
                  style={
                    company.gradient
                      ? {
                          backgroundImage:
                            'linear-gradient(-88.78524908158852deg, rgba(255, 255, 255, 1) 0.46341%, rgba(255, 255, 255, 0) 97.372%)',
                        }
                      : {}
                  }
                >
                  <div className="relative shrink-0 size-6 sm:size-8 md:size-10 lg:size-[40px] flex items-center justify-center">
                    <img
                      alt={`${company.name} logo`}
                      className="max-w-full max-h-full w-full h-full object-contain pointer-events-none"
                      src={company.logo}
                    />
                  </div>
                  <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
                    <p className="font-satoshi font-bold leading-normal not-italic relative shrink-0 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-grey-700">
                      {company.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Row */}
            <div className="content-stretch flex gap-1.5 sm:gap-2 md:gap-[8px] items-center relative shrink-0 w-full justify-center flex-wrap">
              {companies.slice(3).map((company, index) => (
                <div
                  key={index + 3}
                  className={`content-stretch flex gap-1.5 sm:gap-2 md:gap-[10px] items-center px-2 sm:px-3 md:px-4 lg:px-[16px] py-2 sm:py-3 md:py-4 lg:py-5 relative rounded-xl md:rounded-2xl shrink-0 ${
                    company.gradient
                      ? 'bg-gradient-to-r from-white to-transparent'
                      : 'bg-white'
                  }`}
                  style={
                    company.gradient
                      ? {
                          backgroundImage:
                            'linear-gradient(-88.63048351812137deg, rgba(255, 255, 255, 1) 0.46341%, rgba(255, 255, 255, 0) 97.372%)',
                        }
                      : {}
                  }
                >
                  <div className="relative shrink-0 size-6 sm:size-8 md:size-10 lg:size-[40px] flex items-center justify-center">
                    <img
                      alt={`${company.name} logo`}
                      className="max-w-full max-h-full w-full h-full object-contain pointer-events-none"
                      src={company.logo}
                    />
                  </div>
                  <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
                    <p className="font-satoshi font-bold leading-normal not-italic relative shrink-0 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-grey-700">
                      {company.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial */}
      <div className="content-stretch flex flex-col gap-2 sm:gap-3 md:gap-4 items-center relative shrink-0 w-full max-w-[424px] px-2 sm:px-4">
        <p className="font-satoshi font-medium leading-normal min-w-full not-italic relative shrink-0 text-xs sm:text-sm md:text-base lg:text-lg text-grey-500 text-center w-[min-content]">
          "Wisemonk helped us tap into the vibrant and top-notch Indian talent market."
        </p>
        <div className="content-stretch flex flex-col gap-0.5 sm:gap-1 items-center leading-normal not-italic relative shrink-0 w-full max-w-[195px]">
          <p className="font-satoshi font-bold relative shrink-0 text-xs sm:text-sm md:text-base lg:text-lg text-grey-700 w-full text-center whitespace-nowrap">
            Krishna Ramachandran
          </p>
          <p className="font-satoshi font-medium relative shrink-0 text-xs sm:text-sm md:text-base text-grey-500 text-center w-full">
            Co-founder at Wieldy.ai
          </p>
        </div>
      </div>
    </div>
  )
}

