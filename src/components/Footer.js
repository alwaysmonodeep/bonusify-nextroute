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
      <div className="bg-[#332B4E] text-white px-4 sm:px-6 py-6">
        <div className=" max-w-7xl mx-auto">
          {/* Single Responsive Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Logo & Social/Apps (Previously Contact Us) */}
            <div className="flex-1  text-left">
              <Image
                src={"/bonusifywhite.png"}
                width={180}
                height={35}
                alt="Logo"
                className="mb-4"
              />
              <h3 className="font-semibold mb-3 text-base">Follow Us On</h3>
              <div className="flex gap-3 mb-4">
                <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                  <FaFacebookF className="text-xl" />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                  <FaInstagram className="text-xl" />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                  <FaXTwitter className="text-xl" />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                  <FaLinkedinIn className="text-xl" />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
                  <FaTelegramPlane className="text-xl" />
                </a>
              </div>
              
              
            </div>

            {/* About */}
            <div className="text-left">
              <h3 className="font-semibold mb-3 mt-18 md:mt-0 text-base">About</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href={"/"} className="hover:text-gray-300 transition-colors">About Us</Link></li>
                <li><Link href={"/"} className="hover:text-gray-300 transition-colors">Privacy Policy</Link></li>
                <li><Link href={"/terms"} className="hover:text-gray-300 transition-colors">Terms and Conditions</Link></li>
              </ul>
            </div>

            {/* Useful Links */}
            <div className="text-left">
              <h3 className="font-semibold mb-3 text-base">Useful Links</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href={"/"} className="hover:text-gray-300 transition-colors">Become our Partner</Link></li>
                <li><Link href={"/"} className="hover:text-gray-300 transition-colors">Refer &amp; Earn</Link></li>
              </ul>
            </div>

            {/* Contact Us (Previously Social & Apps) */}
            <div className="text-left">
              <h3 className="font-semibold mb-3 text-base">Contact Us</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MdEmail className="text-lg" />
                  <span>care@bonusify.in</span>
                </div>
                <h3 className="font-semibold mb-3 text-base">Coming Soon</h3>
              <div className="flex flex-wrap cursor-pointer gap-3">
                <Image
                  src="/apple.png"
                  alt="App Store"
                  width={90}
                  height={28}
                  className="hover:opacity-80 transition-opacity"
                />
                <Image
                  src="/google.png"
                  alt="Google Play"
                  width={90}
                  height={28}
                  className="hover:opacity-80 transition-opacity"
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