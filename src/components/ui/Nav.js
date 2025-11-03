// Updated Nav component with back button navigation
"use client";
import React, { useState, useRef, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";
import {
  MdOutlineAccountCircle,
  MdNotifications,
  MdHelpOutline,
  MdAccountBalanceWallet,
  MdOutlineSupervisedUserCircle,
  MdHistory,
  MdClose,
  MdArrowForward,
  MdKeyboardBackspace,
} from "react-icons/md";
import { FaSignOutAlt,FaRegMoneyBillAlt } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import SearchBox from "./SearchBox";
import { useSelector } from "react-redux";
import { supabase } from "@/lib/superbase";

// Sidebar & Bottom Nav Items
const menuItems = [
  {
    href: "/",
    icon: IoHomeOutline,
    label: "Home",
  },
  { href: "/order-history", icon: MdHistory, label: "Orders" },
  { href: "/wallet", icon: MdAccountBalanceWallet, label: "Wallet" },
  { href: "/paybills", icon: FaRegMoneyBillAlt, label: "Pay Bills" },
  { href: "/myaccount", icon: MdOutlineAccountCircle, label: "Profile" },
];

// Initial Notification Data
const initialNotifications = [
  {
    id: 1,
    title: "Welcome Bonus",
    message: "₹100 welcome bonus credited",
    time: "3 days ago",
    read: false,
  },
];

function Nav({ sidebarOpen, setSidebarOpen }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [message, setMessage] = useState("");
  const notificationRef = useRef(null);
  const router = useRouter();

  // Get auth state from Redux
  const { isAuthenticated, profile } = useSelector((state) => state.auth);

  // Check if current page is home page
  const isHomePage = router.pathname === "/";

  // Check if current page is auth page (login/signup)
  const isAuthPage = router.pathname.startsWith("/auth");

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  // Updated search functionality with proper navigation
  const handleSearch = (query) => {
    console.log("Searching for:", query);

    // Convert query to URL-friendly slug
    const searchSlug = query
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    router.push(`/stores/${searchSlug}`);
  };

  // Logout user completely
  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    try {
      // Supabase logout
      await supabase.auth.signOut();

      // Clear local storage tokens
      localStorage.removeItem("persist:auth");
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("sb-")) localStorage.removeItem(key);
      });

      // Redirect to login page
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Remove single notification
  const removeNotification = (id) => {
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  // Click outside to close notifications
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Don't render Nav on auth pages - AFTER all hooks
  if (isAuthPage) {
    return null;
  }

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`bg-white z-10 ${
          isHomePage ? "md:sticky md:top-0" : "sticky top-0"
        }`}
      >
        {/* Main navbar section */}
        <div className="h-16 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-8 pl-4 md:pl-7">
            {/* Menu Icon - Shows when authenticated (always visible on desktop) */}
            {isAuthenticated && (
              <CiMenuFries
                className="hidden xl:block text-black text-4xl pr-2 cursor-pointer"
                onClick={toggleSidebar}
              />
            )}

            {/* Back button - Shows on non-home pages */}
            {!isHomePage && (
              <button
                onClick={handleBack}
                className="flex ml-1 items-center gap-2 px-2 py-2 rounded-lg transition-all duration-300 hover:-translate-x-0.5 active:translate-x-0 cursor-pointer"
                aria-label="Go back"
              >
                <MdKeyboardBackspace className="text-2xl md:text-3xl text-[#111111]" />
                <span className="text-md sm:text-lg xl:hidden font-semibold text-[#111111] pt-0 sm:pt-1">
                  Go Back
                </span>
              </button>
            )}

            {/* Logo - Always visible on home page, hidden on mobile when not home page */}
            <Link href="/" className={!isHomePage ? "hidden xl:block" : ""}>
              <Image
                src="/bonusifygreen.png"
                width={80}
                height={50}
                alt="Logo"
                className="md:w-[100px] w-[90px] pl-1"
              />
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <SearchBox
            className="hidden md:flex flex-1 mx-6 lg:max-w-lg max-w-sm"
            onSearch={handleSearch}
            showSuggestions={true}
            isMobile={false}
          />

          {/* Right Section */}
          <div className="flex items-center gap-6 ">
            {/* Wallet - Show for both logged in and not logged in */}
            <div className="flex items-center pr-5 border-r transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
              <Link href={"/wallet"}>
                <div className="hidden xl:flex items-center">
                  <span className="text-3xl font-medium text-black">₹</span>
                  <span className="font-semibold pl-1 text-[#111111]">
                    {isAuthenticated ? "0" : "0"}
                  </span>
                </div>
              </Link>
            </div>

            {/* Notifications / Lets Go Button */}
            {isAuthenticated ? (
              // Show notifications when logged in
              <div
                className="flex hover:text-gray-700 cursor-pointer items-center pr-8 duration-300 hover:-translate-y-0.5 active:translate-y-0"
                onClick={toggleNotifications}
              >
                <div className="relative" ref={notificationRef}>
                  <MdNotifications className="text-xl md:text-2xl text-[#111111] hover:text-gray-800" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}

                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-[-18px] top-6 w-70 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <h3 className="text-sm md:text-lg font-semibold text-gray-800">
                          Notifications
                        </h3>
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
                              className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                                !notification.read ? "bg-blue-50" : ""
                              }`}
                              onClick={() =>
                                removeNotification(notification.id)
                              }
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="text-xs md:text-sm font-medium text-gray-800 mb-1">
                                    {notification.title}
                                  </h4>
                                  <p className="text-xs md:text-sm text-gray-600 mb-2">
                                    {notification.message}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    {notification.time}
                                  </p>
                                </div>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-1 ml-2" />
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-gray-500">
                            <MdNotifications className="text-2xl mx-auto mb-2 text-gray-300" />
                            <p className="text-xs md:text-sm">
                              No notifications yet
                            </p>
                          </div>
                        )}
                      </div>

                      {notifications.length > 0 && (
                        <div className="p-3 border-t border-gray-100 text-center">
                          <button
                            className="text-sm cursor-pointer text-red-600 hover:text-red-700 font-medium hover:bg-red-50 px-3 py-1 rounded transition-colors"
                            onClick={clearAllNotifications}
                          >
                            Clear all
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <p className="hidden md:block text-[#111111] hover:text-gray-700 ml-2">
                  hello!{" "}
                  <span className="font-medium">
                    {(() => {
                      const firstName = profile?.full_name
                        ?.split(" ")[0]
                        .trim();
                      return firstName
                        ? firstName.charAt(0).toUpperCase() +
                            firstName.slice(1).toLowerCase()
                        : "User";
                    })()}
                  </span>
                </p>
              </div>
            ) : (
              // Show Lets Go button when not logged in
              <div className="flex items-center pr-8">
                <Link href="/auth/login">
                  <button className="text-sm cursor-pointer hidden md:flex items-center gap-1 px-4 py-2 bg-[#111111] text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                    Let's Go
                    <MdArrowForward className="text-lg" />
                  </button>
                </Link>
                <Link href="/auth/login" className="md:hidden">
                  <button className="text-xs flex items-center gap-1 px-3 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0">
                    Let's Go
                    <MdArrowForward className="text-base" />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar - Only shows on home page */}
      {isHomePage && (
        <div className="md:hidden bg-white sticky top-0 z-1 px-4 py-2">
          <SearchBox
            onSearch={handleSearch}
            showSuggestions={true}
            placeholder="Search for brands"
            isMobile={true}
            className="w-full"
          />
        </div>
      )}

      {/* Sidebar Navigation */}
      {isAuthenticated && (
        <div
          className={`hidden xl:flex fixed top-0 left-0 h-full bg-white shadow-sm flex-col transition-all duration-300 z-1 ${
            sidebarOpen ? "w-42" : "w-18"
          }`}
        >
          <div className="h-16 border-b border-gray-200" />
          <nav className="flex-1 py-11">
            <ul className="space-y-11 pl-1">
              {menuItems.map(({ href, icon: Icon, label }, index) => (
                <li key={index}>
                  <Link
                    href={href}
                    className="flex items-center gap-4 text-[#111111] hover:shadow-xs hover:text-[#4E897D] px-4 py-1 transition-all duration-300 hover:-translate-x-0.5 active:translate-x-0"
                  >
                    <Icon className="text-3xl" />
                    {sidebarOpen && <span>{label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden xl:flex border-t border-gray-200 p-4">
            <div
              className={`flex items-center text-gray-800 cursor-pointer ${
                sidebarOpen ? "justify-start" : "justify-center"
              }`}
            >
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">
                  {isAuthenticated && profile?.full_name
                    ? profile.full_name.charAt(0).toUpperCase()
                    : "U"}
                </span>
              </div>
              {sidebarOpen && (
                <div className="ml-3">
                  <button
                    onClick={handleLogout}
                    className="flex items-center  text-xs md:text-base text-red-600 cursor-pointer py-1 px-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                  >
                    <FaSignOutAlt className="w-4 h-4 mr-2 text-red-600" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav (Mobile) */}
      {isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 xl:hidden z-50">
          <div className="flex items-center justify-around py-2">
            {menuItems.map(({ href, icon: Icon, label }, index) => (
              <Link
                key={index}
                href={href}
                className="flex flex-col items-center py-2 px-3 min-w-0 flex-1"
              >
                <Icon className="text-xl text-[#111111] hover:text-[#4E897D]" />
                <span className="text-xs md:text-base text-center truncate w-full text-[#332B4E]">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;