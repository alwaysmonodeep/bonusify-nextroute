import Head from 'next/head';
import Link from 'next/link';
export default function Custom500() {
  return (
    <>
    <Head>
  <title>Temporarily Down | Bonusify</title>  
  <meta name="description" content="Our servers are taking a quick break. We're working to fix this and will be back shortly." />
  <meta name="robots" content="noindex, nofollow" />
</Head>
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-4">
      <div className="text-center max-w-4xl w-full">
        <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 mb-6 sm:mb-8">
          {/* Large background 500 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10rem] md:text-[15rem] lg:text-[20rem] font-black text-gray-200 select-none">
              500
            </span>
          </div>
          
          {/* Rocket illustration */}
          <div className="absolute left-1/4 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] z-1 scale-50 sm:scale-75 md:scale-90 lg:scale-100">
            <div className="relative">
              {/* Rocket body */}
              <div className="w-10 h-28 bg-blue-100 rounded-t-2xl rounded-b-lg border-2 border-blue-300 relative">
                {/* Rocket window */}
                <div className="w-5 h-5 bg-blue-600 rounded-full absolute top-4 left-1/2 transform -translate-x-1/2 border-2 border-blue-800"></div>
              </div>
              {/* Rocket nose */}
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[23px] border-r-[23px] border-b-[40px] border-l-transparent border-r-transparent border-b-red-500"></div>
              {/* Rocket fins */}
              <div className="absolute -bottom-1 -left-2 w-4 h-7 bg-red-500 transform rotate-12 origin-bottom"></div>
              <div className="absolute -bottom-1 -right-2 w-4 h-7 bg-red-500 transform -rotate-12 origin-bottom"></div>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-red-500"></div>
            </div>
          </div>
          
          {/* Person illustration */}
          <div className="absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2 z-1 scale-50 sm:scale-75 md:scale-90 lg:scale-100">
            <div className="relative">
              {/* Head */}
              <div className="w-11 h-11 bg-orange-300 rounded-full mx-auto mb-1"></div>
              {/* Body */}
              <div className="w-20 h-20 bg-blue-500 rounded-t-[40px] rounded-b-lg relative">
                {/* Arm */}
                <div className="absolute -right-2 top-3 w-6 h-12 bg-blue-500 rounded-xl transform rotate-[30deg] origin-top"></div>
              </div>
              {/* Legs */}
              <div className="w-20 h-18 bg-blue-700 rounded-b-lg"></div>
              {/* Feet */}
              <div className="w-22 h-6 bg-blue-900 rounded-full mt-1"></div>
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#332B4E] mb-3 sm:mb-4 md:mb-6">
           Temporarily Down - We'll Be Back Soon!
          </h1>
         
          <Link 
            href="/" 
            className="inline-flex justify-center items-center gap-2 bg-[#332B4E] rounded-4xl text-white px-6 md:px-10 py-2.5 sm:py-3 md:py-3 text-sm sm:text-base md:text-lg font-medium transition-colors duration-200"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            Go Home
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}