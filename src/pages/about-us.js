import Head from 'next/head';
import Image from 'next/image';
import React from 'react'
import { FaInstagram, FaFacebook  } from "react-icons/fa";
export default function Aboutus() {
  return (
    <div className="min-h-screen bg-white">
        <Head>
        <title>About Us - Bonusify | Cashback & Deals Platform</title>
        <meta name="description" content="Learn about Bonusify - your trusted cashback earning and deals application" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Header Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className='flex justify-center items-center mb-4 gap-6'>
            <h1 className="text-2xl md:text-5xl font-bold text-gray-800 mb-2">
              about 
            </h1>
            <Image src="/bonusifygreen.png" width={180} height={20} className="md:w-[190px] w-[120px]" alt="Bonusify Logo" />
          </div>
          <p className="text-xs xl:text-lg text-gray-600 max-w-4xl mx-auto">
            Your trusted application for earning cashback and discovering best deals
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Our Story Section */}
          <div className="bg-gray-50 rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              Bonusify was founded with a clear vision: to make online shopping more rewarding for everyone. 
              We recognized that consumers deserve to benefit financially from their purchases.
            </p>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
              Through strategic partnerships with trusted affiliate networks and retailers, we're building 
              a comprehensive platform that consolidates cashback opportunities and trending deals in one 
              convenient location.
            </p>
           
          </div>

          {/* Vision & Mission Section */}
          <div className="bg-gray-50 rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              Our mission is to create an ecosystem where every online purchase becomes reswarding 
              for consumers.We want to create a world where online shopping is not just convenient, 
                but also financially rewarding, with all the trending deals available at one place.
            </p>            
          </div>

          {/* Founder Section */}
          <div className="bg-gray-50 rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Meet the Founder</h2>
            <div className="flex flex-col md:flex-row items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-35 h-35  rounded-full flex items-center justify-center">
                  <Image src={'/founder.png'} height={40} width={200}/>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl md:text-2xl font-semibold text-blue-600">Monodeep Biswas</h3>
                  <div className="flex">
                    <a href="#" className="w-8 h-8 bg-gray-70 rounded-full flex items-center justify-center hover:bg-gray-200">
                      <FaFacebook className="text-xl text-black" />
                    </a>
                    <a href="#" className="w-8 h-8 bg-gray rounded-full flex items-center justify-center text-black hover:bg-gray-200">
                        <FaInstagram className="text-xl" />
                    </a>
                  </div>
                </div>
                <p className="text-gray-500 mb-4 text-xs md:text-sm">Founder & CEO</p>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                   With expirence in Computer Science and proven experience 
                  in business development. Monodeep combines technical expertise with entrepreneurial insight 
                  to drive Bonusify's mission of making online shopping more rewarding for consumers.
                </p>
                
              </div>
            </div>
          </div>

          {/* Our Team Section */}
          <div className="bg-gray-50 rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Our Team</h2>
            <div className="flex items-start gap-4 mb-4">
              
              <div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
                  Bonusify operates as a lean, efficient startup with our CEO managing core operations 
                  while collaborating with experienced marketing professionals and industry specialists. 
                  This streamlined approach allows us to maintain focus on delivering exceptional value 
                  to our users.
                </p>
                <p className="text-gray-600  text-sm md:text-base leading-relaxed">
                 We're strategically building a team that shares our 
                  commitment to transparency, customer satisfaction, and sustainable growth in the 
                  e-commerce space.
                </p>
              </div>
            </div>
          </div>

 
          {/* The Journey Continues */}
          <div className="bg-gray-500 rounded-lg shadow-md md:p-16 p-6 text-black text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">The Journey Continues</h2>
            <p className="text-xs md:text-base font-light text-gray-100 mb-6 max-w-4xl mx-auto">
              We're not just building a cashback platform – 
              we're creating a community of informed consumers who believe that smart shopping should 
              be rewarding. Join us as we transform the online shopping experience.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6 text-center">
              <div className="bg-white rounded-lg p-3">
                <h3 className="text-sm md:text-lg font-bold mb-1">2025</h3>
                <p className='text-xs md:text-base'>Platform Launch</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <h3 className="text-sm md:text-lg font-bold mb-1">Growing Network</h3>
                <p  className='text-xs md:text-base'>Partner Retailers</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-3">
                <h3 className="text-sm md:text-lg font-bold mb-1">Endless Potential</h3>
                <p  className='text-xs md:text-base'>Future Opportunities</p>
              </div>
            </div>
            <p className="text-xs md:text-base text-gray-100 opacity-90">
              Stay tuned for updates on our launch
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}