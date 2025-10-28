import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MdEmail } from "react-icons/md";
import {
  FaXTwitter,
  FaLinkedinIn 
} from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full">
      <div className="relative  bg-white h-20 md:h-40 flex items-center justify-center">
        {/* SVG Wave at the bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-[80px] md:h-[120px] lg:h-[180px] xl:h-[220px]"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#332B4E"
              fillOpacity="1"
              d="M0,160 Q360,0 720,160 T1440,160 L1440,320 L0,320 Z"
            />
          </svg>
        </div>
      </div>
      
      {/* Purple Footer Section */}
      <div className="bg-[#332B4E] text-white px-4 sm:px-6 py-4 md:py-5">
        <div className=" max-w-7xl mx-auto">
          {/* Single Responsive Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {/* Logo & Social/Apps (Previously Contact Us) */}
            <div className="flex-1 text-left">
              <Image 
                src="/bonusifywhite.png" 
                width={170}
                height={40} 
                alt="Logo"
                className="md:w-[170px] w-[100px]"/>

              <h3 className="font-semibold my-5 text-sm">Follow Us On</h3>
              <div className="flex gap-3 mb-2">
                <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                  <FaFacebookF className="text-lg md:text-xl" />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                  <FaInstagram className="text-lg md:text-xl" />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                  <FaXTwitter className="text-lg md:text-xl" />
                </a>
                
                <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                  <FaTelegramPlane className="text-lg md:text-xl" />
                </a>
              </div>
              
              
            </div>

            {/* About */}
            <div className="text-left">
              <h3 className="font-semibold mb-3 mt-18 md:mt-0 text-sm md:text-lg">About</h3>
              <ul className="space-y-1 text-xs md:text-sm font-light">
                <li><Link href={"/about-us"} className=" text-gray-100 transition-colors">About Us</Link></li>
                <li><Link href={"/privacy-policy"} className="text-gray-100 transition-colors">Privacy Policy</Link></li>
                <li><Link href={"/terms"} className="text-gray-100 transition-colors">Terms and Conditions</Link></li>
              </ul>
            </div>

            {/* Useful Links */}
            <div className="text-left">
              <h3 className="font-semibold mb-3 text-sm md:text-lg">Useful Links</h3>
              <ul className="space-y-1 font-light text-xs md:text-sm">
                <li><Link href={"/"} className="hover:text-gray-300 transition-colors">Become our Partner</Link></li>
                <li><Link href={"/refer-and-earn"} className="hover:text-gray-300 transition-colors">Refer &amp; Earn</Link></li>
              </ul>
            </div>

            {/* Contact Us (Previously Social & Apps) */}
            <div className="text-left">
              <h3 className="font-semibold mb-3 text-sm md:text-lg">Contact Us</h3>
              <div className="space-y-2 font-light text-xs md:text-sm">
                <div className="flex items-center gap-2">
                  <MdEmail className="text-lg" />
                  <span>care@bonusify.in</span>
                </div>
                <h3 className="font-semibold mb-3 text-xs md:text-lg">Coming Soon</h3>
              <div className="flex flex-wrap cursor-pointer gap-1 md:gap-2">
                <Image
                  src="/apple.png"
                  alt="App Store"
                  width={90}
                  height={28}
                  className="md:w-[90px] w-[70px]"
                />
                <Image
                  src="/google.png"
                  alt="Google Play"
                  width={90}
                  height={28}
                  className="md:w-[90px] w-[70px]"
                />
              </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-white text-sm mt-6 pt-4 ">
          © Copyright 2025 Bonusify, All rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;