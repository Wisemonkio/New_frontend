'use client'

const companies = [
  {
    name: 'Convincely',
    logo: 'https://www.figma.com/api/mcp/asset/c832f01c-43aa-4f56-ad37-3c32a0d4c3d8',
    gradient: true,
  },
  {
    name: 'Youtrip',
    logo: 'https://www.figma.com/api/mcp/asset/9769cef8-112f-434d-a7f5-fe45d71b8364',
    gradient: false,
  },
  {
    name: 'Wieldy.ai',
    logo: 'https://www.figma.com/api/mcp/asset/747fbe2e-0409-453e-926b-bde023a865f5',
    logoOverlay: 'https://www.figma.com/api/mcp/asset/4a82a7e9-8c26-4100-be5f-1b141f1603f1',
    gradient: true,
  },
  {
    name: 'Beauty Garage',
    logo: 'https://www.figma.com/api/mcp/asset/c0dc9414-909c-452b-8d33-3eaac6f484e4',
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
    <div className="content-stretch flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 h-full items-center justify-center relative shrink-0 w-full lg:w-[760px] px-0 py-2 sm:py-3 md:py-4 lg:py-6 xl:py-8 bg-transparent rounded-2xl lg:rounded-none overflow-hidden">
      <div className="content-stretch flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8 items-center relative shrink-0 w-full">
        {/* Info Header */}
        <div className="content-stretch flex flex-col font-satoshi font-bold gap-2 sm:gap-3 items-center leading-tight not-italic relative shrink-0 text-center w-full max-w-[668px]">
          <div className="relative shrink-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[40px] text-grey-700 w-full max-w-[656px]">
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
                  <div className="relative shrink-0 size-8 sm:size-10 md:size-12 lg:size-[50px]">
                    {company.logoOverlay ? (
                      <div className="absolute inset-0 pointer-events-none">
                        <img
                          alt=""
                          className="absolute max-w-none object-cover size-full"
                          src={company.logo}
                        />
                        <div className="absolute inset-0 overflow-hidden">
                          <img
                            alt=""
                            className="absolute h-[122.7%] left-[-16.05%] max-w-none top-[-11.04%] w-[123.46%]"
                            src={company.logoOverlay}
                          />
                        </div>
                      </div>
                    ) : (
                      <img
                        alt={`${company.name} logo`}
                        className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
                        src={company.logo}
                      />
                    )}
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
                  <div className="relative shrink-0 size-8 sm:size-10 md:size-12 lg:size-[50px]">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img
                        alt={`${company.name} logo`}
                        className="absolute h-[183.2%] left-[-33.04%] max-w-none top-[-43.44%] w-[585.85%]"
                        src={company.logo}
                      />
                    </div>
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
          <p className="font-satoshi font-bold relative shrink-0 text-xs sm:text-sm md:text-base lg:text-lg text-grey-700 w-full text-center">
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

