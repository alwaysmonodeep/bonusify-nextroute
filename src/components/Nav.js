"use client";
import React, { useState, useRef, useEffect } from "react";
import { CiSearch, CiMenuFries } from "react-icons/ci";
import {
  MdOutlineAccountCircle,
  MdNotifications,
  MdHelpOutline,
  MdAccountBalanceWallet,
  MdOutlineSupervisedUserCircle,
  MdHistory,
  MdClose,
} from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

// Sidebar & Bottom Nav Items
const menuItems = [
  { href: "/order-history", icon: MdHistory, label: "Orders" },
  { href: "/refer-and-earn", icon: MdOutlineSupervisedUserCircle, label: "Refer" },
  { href: "/wallet", icon: MdAccountBalanceWallet, label: "Wallet" },
  { href: "/help", icon: MdHelpOutline, label: "Help" },
  { href: "/myaccount", icon: MdOutlineAccountCircle, label: "Profile" },
];

// Initial Notification Data
const initialNotifications = [
  {
    id: 1,
    title: "Cashback Credited",
    message: "₹50 cashback added to your wallet",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Order Shipped",
    message: "Your order #12345 has been shipped",
    time: "1 day ago",
    read: false,
  },
  {
    id: 3,
    title: "Welcome Bonus",
    message: "₹100 welcome bonus credited",
    time: "3 days ago",
    read: true,
  }
];

function Nav({ sidebarOpen, setSidebarOpen }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const notificationRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleNotifications = () => setShowNotifications(!showNotifications);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Remove single notification
  const removeNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Click outside to close notifications
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white h-16 flex items-center justify-between sticky top-0 z-10">
        {/* Left Section */}
        <div className="flex items-center gap-8 pl-8">
          <CiMenuFries
            className="hidden xl:block text-black text-4xl pr-2 cursor-pointer"
            onClick={toggleSidebar}
          />
          <Link href="/">
        <Image 
  src="/bonusifygreen.png" 
  width={90}
  height={40} 
  alt="Logo"
  className="md:w-[110px] w-[90px]"
/>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 mx-6 lg:max-w-lg max-w-sm">
          <div className="flex items-center w-full bg-gray-100 rounded-full px-4 py-2">
            <CiSearch className="text-xl text-gray-800 mr-4" />
            <input
              type="text"
              placeholder="Search for any brand or product"
              className="flex-1 outline-none text-gray-900 placeholder-gray-800"
            />
          </div>
        </div>
        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Wallet or Mobile Search */}
          <div className="flex items-center pr-5 border-r border-gray-300">
            <Link href={'/wallet'}>
              <div className="hidden xl:flex items-center">
                <MdAccountBalanceWallet className="text-2xl text-[#332B4E]" />
                <span className="font-medium pl-2 text-[#332B4E]">₹999.4</span>
              </div>
            </Link>
            <div className="md:hidden">
              <CiSearch className="text-xl text-gray-900 cursor-pointer" />
            </div>
          </div>

          {/* Notifications */}
          <div className="flex cursor-pointer items-center pr-8" onClick={toggleNotifications}>
            <div className="relative" ref={notificationRef}>
              <MdNotifications className="text-xl md:text-2xl text-[#332B4E] hover:text-gray-600"/>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-[-18px] top-6 w-70 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="flex items-center justify-between p-4 border-b border-gray-100">
                    <h3 className="text-sm md:text-lg font-semibold text-gray-800">Notifications</h3>
                    <MdClose
                      className="text-xl text-gray-500 cursor-pointer hover:text-gray-700"
                      onClick={() => setShowNotifications(false)}
                    />
                  </div>

                  <div className="max-h-90 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${
                            !notification.read ? "bg-blue-50" : ""
                          }`}
                          onClick={() => removeNotification(notification.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="text-xs md:text-sm font-medium text-gray-800 mb-1">{notification.title}</h4>
                              <p className="text-xs md:text-sm text-gray-600 mb-2">{notification.message}</p>
                              <p className="text-xs text-gray-400">{notification.time}</p>
                            </div>
                            {!notification.read && <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2" />}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        <MdNotifications className="text-2xl mx-auto mb-2 text-gray-300" />
                        <p className="text-xs md:text-sm">No notifications yet</p>
                      </div>
                    )}
                  </div>

                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-100 text-center">
                      <button 
                        className="text-sm cursor-pointer text-red-600 hover:text-red-700 font-medium"
                        onClick={clearAllNotifications}
                      >
                        Clear all
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <p className="hidden md:block text-black ml-4">
              hello! <span className="text-[#332B4E] font-medium">[User]</span>
            </p>
          </div>
        </div>
      </nav>

      {/* Sidebar Navigation */}
      <div
        className={`hidden xl:flex fixed top-0 left-0 h-full bg-white shadow-sm flex-col transition-all duration-300 z-1 ${
          sidebarOpen ? "w-42" : "w-18"
        }`}
      >
        <div className="h-16 border-b border-gray-200" />
        <nav className="flex-1 py-6">
          <ul className="space-y-11 pl-1">
            {menuItems.map(({ href, icon: Icon, label }, index) => (
              <li key={index}>
                <Link
                  href={href}
                  className="flex items-center gap-4 text-gray-700 hover:text-[#4E897D] px-4"
                >
                  <Icon className="text-3xl" />
                  {sidebarOpen && <span>{label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-4">
          <div
            className={`flex items-center text-gray-800 cursor-pointer ${
              sidebarOpen ? "justify-start" : "justify-center"
            }`}
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">Ci</span>
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">Client ID</p>
                <p className="text-xs text-gray-500">543214</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Nav (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 xl:hidden z-50">
        <div className="flex items-center justify-around py-2">
          {menuItems.map(({ href, icon: Icon, label }, index) => (
            <Link
              key={index}
              href={href}
              className="flex flex-col items-center py-2 px-3 min-w-0 flex-1"
            >
              <Icon className="text-xl text-[#332B4E] hover:text-[#4E897D]" />
              <span className="text-xs md:text-base text-center truncate w-full text-[#332B4E]">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Nav;