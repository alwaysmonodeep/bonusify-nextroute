"use client";
import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";
import { CiSearch} from "react-icons/ci";
import { LuHistory } from "react-icons/lu";
import { PiWallet } from "react-icons/pi";
import {
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";

function Nav({ sidebarOpen, setSidebarOpen }) {
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    {
      href: "/wallet",
      icon: <PiWallet className="text-2xl xl:text-3xl" />,
      label: "Wallet"
    },
    {
      href: "/order-history",
      icon: <LuHistory className="text-2xl" />,
      label: "Orders"
    },
    {
      href: "/refer-and-earn",
      icon: <AiOutlineUsergroupAdd className="text-2xl" />,
      label: "Refer"
    },
    {
      href: "/help",
      icon: <IoChatbubbleEllipsesOutline className="text-2xl" />,
      label: "Help"
    },
    {
      href: "/myaccount",
      icon: <MdOutlineAccountCircle className="text-2xl" />,
      label: "Profile"
    }
  ]; // Menu items for both sidebar and bottom navigation

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-[#ffffff] h-16 flex items-center justify-between z-10 sticky top-0">
        {/* Left Section: Menu & Logo */}
        <div className="flex items-center gap-8 pl-8">
          <RiMenu2Fill 
            className="hidden xl:block text-[#332B4E] text-2xl cursor-pointer "
            onClick={toggleSidebar}
          />
          <Link href="/">
            <Image src={'/bonusifygreen.png'} width={110} height={1} alt="Logo" />
          </Link>
        </div>

 <div className="hidden md:flex flex-1 mx-6 lg:max-w-lg max-w-sm ">
      <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2 shadow-sm">
        <CiSearch className="text-xl text-gray-800 mr-4" />
        <input
          type="text"
          placeholder="Search for any brand or product"
          className="flex-1 outline-none text-gray-900 placeholder-gray-800 text-base"
        />
      </div>
    </div>
        {/* Right Section: Wallet & Notification */}
        <div className="flex items-center gap-6">
          {/* Wallet on desktop, Search icon on mobile/tablet */}
          <div className="flex items-center pr-5 border-r border-gray-300">
            {/* Desktop: Show wallet */}
            <div className="hidden lg:flex items-center">
              <PiWallet className="text-2xl text-[#332B4E]" />
              <span className="font-medium pl-2 pb-1 text-[#332B4E]">999.4</span>
            </div>
            {/* Mobile/Tablet: Show search icon */}
            <div className="md:hidden">
              <CiSearch className="text-2xl text-gray-900 cursor-pointer" />
            </div>
          </div>

          {/* Notification & Greeting */}
          <div className="notification flex items-center pr-8">
            <IoMdNotifications className="text-2xl text-[#332B4E] cursor-pointer" />
            <p className="hidden md:block text-black text-sm md:text-base ml-4">
              hello! <span className="text-[#332B4E] font-medium">User</span>
            </p>
          </div>
        </div>
      </nav>

   {/* Professional Side Sidebar */}
<div
  className={`fixed top-0 left-0 h-full bg-white shadow-lg flex flex-col justify-between transition-all duration-300 z-0 ${
    sidebarOpen ? "w-45" : "w-14"
  }`}
>
  <div className="flex flex-col h-full">
    {/* Empty Header Section */}
    <div className="h-16 border-b border-gray-200 bg-white"></div>

    {/* Menu Items */}
    <nav className="flex-1 py-6">
      <ul className="space-y-2 px-3">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href} className="block">
              <div
                className={`flex items-center px-3 py-3 text-gray-700 rounded-lg hover:bg-gray-50 hover:text-gray-900 cursor-pointer ${
                  sidebarOpen ? "justify-start" : "justify-center"
                }`}
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                  {item.icon}
                </div>
                
                {/* Label */}
                {sidebarOpen && (
                  <span className="ml-3 text-sm font-medium whitespace-nowrap">
                    {item.label === "Orders" 
                      ? "Order History" 
                      : item.label === "Refer" 
                      ? "Refer & Earn" 
                      : item.label}
                  </span>
                )}
                
                {/* Tooltip for collapsed state */}
                {/* {!sidebarOpen && (
                  <div className="absolute left-16 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 group-hover:visible whitespace-nowrap z-50">
                    {item.label === "Orders" 
                      ? "Order History" 
                      : item.label === "Refer" 
                      ? "Refer & Earn" 
                      : item.label}
                  </div>
                )} */}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </nav>

    {/* Bottom Section - User Profile or Settings */}
    <div className="border-t border-gray-200 p-4">
      <div
        className={`flex items-center text-gray-700 hover:text-gray-900 cursor-pointer ${
          sidebarOpen ? "justify-start" : "justify-center"
        }`}
      >
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-gray-600 text-sm font-medium">U</span>
        </div>
        {sidebarOpen && (
          <div className="ml-3">
            <p className="text-sm font-medium">Clint Number</p>
            <p className="text-xs text-gray-500">543214</p>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
      {/* Bottom Navigation for Mobile/Tablet */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50">
        <div className="flex items-center justify-around py-2">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
              className="flex flex-col items-center py-2 px-3 min-w-0 flex-1"
            >
              <BottomNavItem
                icon={item.icon}
                label={item.label}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

const SidebarItem = ({ icon, label, isOpen }) => {
  return (
    <li
      className={`flex items-center ${
        isOpen ? "justify-start pl-4" : "justify-center"
      } gap-4 text-[#332B4E] hover:text-[#4E897D] cursor-pointer transition-all duration-200`}
    >
      <span className="text-xl">{icon}</span>
      {isOpen && <span className="whitespace-nowrap">{label}</span>}
    </li>
  );
};

const BottomNavItem = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center gap-1 text-[#332B4E] hover:text-[#4E897D] cursor-pointer transition-all duration-200">
      <span>{icon}</span>
      <span className="text-xs text-center truncate w-full">{label}</span>
    </div>
  );
};

export default Nav;
<div className="flex flex-col justify-between h-full pt-16">
          {/* Menu Items */}
          <ul className="space-y-10 px-4 mt-8">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href} className="block">
                <SidebarItem
                  icon={item.icon}
                  label={item.label === "Orders" ? "Order History" : item.label === "Refer" ? "Refer & Earn" : item.label}
                  isOpen={sidebarOpen}
                />
              </Link>
            ))}
          </ul>
        </div>