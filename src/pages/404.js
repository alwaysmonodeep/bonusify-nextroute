import Head from 'next/head'
import Link from 'next/link'
export default function NotFound() {
  return (
    <>
    <Head>
  <title>Page Not Found | Bonusify</title>
  <meta name="description" content="Sorry, this page doesn't exist. Find what you need on our site." />
  <meta name="robots" content="noindex, follow" /> {/* Don't index, but follow links */}
</Head>
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl">
        {/* Retro Computer */}
        <div className="relative">
          {/* Computer Base */}
          <div className="w-80 h-64 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-2xl transform rotate-3 border-2 border-gray-300">
            {/* Screen Bezel */}
            <div className="absolute top-4 left-4 right-4 bottom-16 bg-teal-500 rounded-md border-2 border-teal-600 shadow-inner">
              {/* Screen */}
              <div className="absolute top-2 left-2 right-2 bottom-2 bg-black rounded-sm overflow-hidden">
                {/* Color Bars */}
                <div className="flex h-3/4">
                  <div className="flex-1 bg-yellow-400"></div>
                  <div className="flex-1 bg-cyan-400"></div>
                  <div className="flex-1 bg-green-400"></div>
                  <div className="flex-1 bg-pink-400"></div>
                  <div className="flex-1 bg-red-500"></div>
                  <div className="flex-1 bg-blue-600"></div>
                  <div className="flex-1 bg-purple-600"></div>
                  <div className="flex-1 bg-black"></div>
                </div>
                
                {/* 404 Text on Screen */}
                <div className="h-1/4 bg-gray-800 flex items-center justify-center">
                  <div className="text-white font-mono text-xl lg:text-2xl font-bold tracking-wider animate-pulse">
                    4 0 4
                  </div>
                </div>
              </div>
            </div>
            
            {/* Power Button */}
            <div className="absolute bottom-8 left-6 w-6 h-6 bg-red-500 rounded-full border-2 border-red-600 shadow-inner">
              <div className="w-2 h-2 bg-red-400 rounded-full mt-1 ml-1"></div>
            </div>
            
            {/* Vents */}
            <div className="absolute bottom-6 right-6 space-y-1">
              <div className="w-16 h-1 bg-gray-400 rounded"></div>
              <div className="w-16 h-1 bg-gray-400 rounded"></div>
              <div className="w-16 h-1 bg-gray-400 rounded"></div>
            </div>
            
            {/* Screws */}
            <div className="absolute top-2 left-2 w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
          
          {/* Computer Shadow */}
          <div className="absolute -bottom-4 -right-4 w-80 h-64 bg-black opacity-20 rounded-lg transform rotate-3 -z-10"></div>
        </div>
        
        {/* Text Content */}
        <div className="text-center lg:text-left max-w-md">
          <h1 className="text-5xl lg:text-8xl font-black text-[#332B4E] mb-4">
            Oops!
          </h1>
          <p className="text-base lg:text-xl text-gray-500 mb-8 leading-relaxed">
            We couldn't find the page you were looking for
          </p>
          
          <Link 
            href={'/'}
            className="inline-flex items-center gap-3 bg-[#332B4E] hover:bg-gray-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg">
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
            Go home
          </Link>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-pink-400 rounded-full opacity-60 animate-bounce"></div>
      <div className="absolute top-32 right-20 w-6 h-6 bg-cyan-400 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-3 h-3 bg-yellow-400 rounded-full opacity-50 animate-bounce" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute bottom-20 right-40 w-5 h-5 bg-green-400 rounded-full opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
    </div>
    </>
  )
}