import { useEffect, useState } from 'react';
import Head from 'next/head';
import { IoFlashSharp, IoPhonePortraitOutline, IoWifiOutline, IoCardOutline, IoWaterOutline } from 'react-icons/io5';
import { MdMoreHoriz } from "react-icons/md";

export default function PayBillsComingSoon() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const services = [
    { icon: IoPhonePortraitOutline, label: 'Mobile' },
    { icon: IoFlashSharp, label: 'Electricity' },
    { icon: IoWifiOutline, label: 'Broadband' },
    { icon: IoCardOutline, label: 'Credit Card' },
    { icon: MdMoreHoriz , label: 'More' }
  ];

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>Pay Bills Online - Mobile, Electricity, Broadband & More | Coming Soon</title>
        <meta name="title" content="Pay Bills Online - Mobile, Electricity, Broadband & More | Coming Soon" />
        <meta name="description" content="All your billing needs in one place. Pay mobile bills, electricity, broadband, credit card bills and manage all payments effortlessly. Coming soon with the best payment experience." />
        <meta name="keywords" content="pay bills online, mobile recharge, electricity bill payment, broadband bill, credit card payment, online payment, bill payment app" />
        <meta name="author" content="Your Company Name" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/pay-bills" />
        <meta property="og:title" content="Pay Bills Online - Mobile, Electricity, Broadband & More | Coming Soon" />
        <meta property="og:description" content="All your billing needs in one place. Pay mobile bills, electricity, broadband, credit card bills and manage all payments effortlessly." />
        <meta property="og:image" content="https://yourwebsite.com/og-image.jpg" />
        <meta property="og:site_name" content="Your Company Name" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://yourwebsite.com/pay-bills" />
        <meta property="twitter:title" content="Pay Bills Online - Mobile, Electricity, Broadband & More | Coming Soon" />
        <meta property="twitter:description" content="All your billing needs in one place. Pay mobile bills, electricity, broadband, credit card bills and manage all payments effortlessly." />
        <meta property="twitter:image" content="https://yourwebsite.com/twitter-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://yourwebsite.com/pay-bills" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Schema.org Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Pay Bills Online - Coming Soon",
              "description": "All your billing needs in one place. Pay mobile bills, electricity, broadband, credit card bills and manage all payments effortlessly.",
              "url": "https://yourwebsite.com/pay-bills",
              "provider": {
                "@type": "Organization",
                "name": "Your Company Name",
                "url": "https://yourwebsite.com"
              },
              "offers": {
                "@type": "AggregateOffer",
                "availability": "https://schema.org/ComingSoon",
                "description": "Online bill payment services including mobile recharge, electricity bills, broadband bills, and credit card payments"
              }
            })
          }}
        />
      </Head>

      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className={`text-center max-w-3xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {/* Icon */}
          <div className="mb-8 inline-block">
            <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center shadow-lg">
              <IoFlashSharp className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-3xl md:text-6xl font-bold text-gray-900 mb-6">
            Coming Soon
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-700 mb-3 font-medium">
            All your billing needs in one place
          </p>
          
          <p className="text-sm text-gray-600 mb-12">
            Pay bills, recharge, and manage payments effortlessly
          </p>

          {/* Services Icons */}
          <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
            {services.map((service, idx) => (
              <div 
                key={idx}
                className="flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md border border-gray-200">
                  <service.icon className="w-6 h-6 text-[#332B4E]" />
                </div>
                <span className="text-xs text-gray-600 font-medium">{service.label}</span>
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-sm">
            We're working hard to bring you the best experience
          </p>
        </div>
      </div>
    </>
  );
}