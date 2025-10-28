import React, { useState } from "react";
import {
  FiMessageCircle,
  FiAlertCircle,
  FiFileText,
  FiInfo,
} from "react-icons/fi";
import { HiOutlineTicket, HiOutlineClock } from "react-icons/hi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { MdOutlineAttachMoney, MdOutlineAccountCircle } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaMoneyBillWave, FaQuora } from "react-icons/fa";
import Link from "next/link";
import Head from "next/head";

const categories = [
  {
    id: "getting-started",
    title: "Missing Cashback",
    icon: FaMoneyBillWave,
    description: "My cashback is missing, what should I do?",
    href: "/help/missing-cashback",
  },
  {
    id: "usage-guides",
    title: "Payment Issues",
    icon: MdOutlineAttachMoney,
    description: "Payment related queries? Reach out us!",
    href: "/withdrawal-history",
  },
  {
    id: "pricing-plans",
    title: "Refer & Earn",
    icon: AiOutlineUsergroupAdd,
    description: "Refer and earn related queries",
    href: "/help/pricing-plans",
  },
  {
    id: "sales-question",
    title: "Other Question",
    icon: FiMessageCircle,
    description: "Get answers to your sales-related inquiries",
    href: "/help/other-question",
  },
  {
    id: "usage-guides",
    title: "Contact Us",
    icon: BiSupport,
    description: "Want to connect with us? Reach out now!",
    href: "/help/contact-us",
  },

  {
    id: "usage-guides",
    title: "Unable to Login",
    icon: MdOutlineAccountCircle,
    description: "Profile related queries",
    href: "/help/contact-us",
  },
  {
    id: "usage-guides",
    title: "Unable to Login",
    icon: MdOutlineAccountCircle,
    description: "Profile related queries",
    href: "/help/contact-us",
  },
  {
    id: "usage-guides",
    title: "FAQ Section",
    icon: FaQuora,
    description: "Frequently Asked Questions",
    href: "/help/faq",
  },
];

export default function HelpSection() {
  const [activeTab, setActiveTab] = useState("help");

  // Mock data for active tickets
  const activeTickets = [
    {
      id: "TK-2024-001",
      title: "Missing cashback from Amazon purchase",
      status: "In Progress",
      priority: "High",
      created: "2024-12-15",
      lastUpdate: "2024-12-18",
      category: "Missing Cashback",
      description:
        "Cashback not received for $250 Amazon purchase made on December 10th",
    },
    {
      id: "TK-2024-002",
      title: "Account verification issue",
      status: "Pending",
      priority: "Medium",
      created: "2024-12-14",
      lastUpdate: "2024-12-16",
      category: "Account",
      description: "Unable to verify account with uploaded documents",
    },
    {
      id: "TK-2024-003",
      title: "Question about premium plan features",
      status: "Resolved",
      priority: "Low",
      created: "2024-12-12",
      lastUpdate: "2024-12-13",
      category: "Sales Question",
      description:
        "Inquiry about the differences between basic and premium plans",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "In Progress":
        return <HiOutlineClock className="w-4 h-4" />;
      case "Resolved":
        return <AiOutlineCheckCircle className="w-4 h-4" />;
      case "Pending":
        return <FiAlertCircle className="w-4 h-4" />;
      default:
        return <FiFileText className="w-4 h-4" />;
    }
  };
  return (
    <>
       <Head>
        <title>Bonusify Help Center | Customer Support, FAQ & Cashback Help</title>
        <meta 
          name="description" 
          content="Get instant help with Bonusify's comprehensive support center. Find answers to cashback issues, payment problems, account questions, and more." 
        />
        <link rel="canonical" href="https://bonusify.in/help" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Bonusify Help Center - Customer Support & FAQ" />
        <meta 
          property="og:description" 
          content="Get instant help with Bonusify's comprehensive support center. Find answers to cashback issues, payment problems, and account questions." 
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bonusify.com/help" />
        
        {/* Structured Data */}
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": categories.map(category => ({
      "@type": "Question",
      "name": category.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": category.description
      }
    }))}) }}
        />
      </Head>
    <div className="min-h-screen bg-white mx-2 md:mx-5 pb-10 pt-10 md:pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Main Heading */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-5xl font-bold text-black mb-4">
            Hello, how can we help?
          </h1>
          <p className="text-xs md:text-lg text-black mx-10">
            Choose a category to quickly find the help you need
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 ">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("help")}
              className={`cursor-pointer px-6 py-2 text-xs md:text-base rounded-md font-medium transition ${
                activeTab === "help"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              Help Categories
            </button>
            <button
              onClick={() => setActiveTab("requests")}
              className={`cursor-pointer px-6 py-2 text-xs md:text-base rounded-md font-medium transition ${
                activeTab === "requests"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-600 hover:text-black"
              }`}>
              My Requests
            </button>
          </div>
        </div>

        {/* Help Categories Tab */}
        {activeTab === "help" && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Link
                    key={category.id}
                    href={category.href}
                    className="block w-full max-w-lg mx-auto"
                  >
                    <div className="w-full h-35 md:h-45 relative p-4 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 bg-white border border-gray-300 hover:border-gray-400">
                      {/* Icon */}
                      <div className="w-12 md:w-12 h-10 md:h-14 mx-auto mb-4 rounded-lg flex items-center justify-center bg-gray-100 text-gray-400">
                        <IconComponent size={25} />
                      </div>

                      {/* Title */}
                      <h3 className="text-xs md:text-lg font-semibold text-gray-800 mb-3 text-center">
                        {category.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[9px] md:text-xs text-gray-500 leading-relaxed text-center">
                        {category.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Info Section */}
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mt-10 flex items-start gap-2">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <FiInfo className="w-4 h-4 text-gray-600" />
                </div>
              </div>
              <div className="text-[9px] md:text-sm text-gray-700">
                <span className="font-semibold">Hello!</span> If you have any
                questions, you can try to find an answer{" "}
                <span className="font-semibold">in our FAQ section</span> . If
                you can't find an answer to your question there, please contact
                our customer care team. The average time for us to answer is{" "}
                <span className="font-semibold">3 days</span> at the moment.
              </div>
            </div>
          </>
        )}

        {/* My Requests Tab */}
        {activeTab === "requests" && (
          <div className="space-y-4 mx-2">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl ml-1 font-bold text-gray-900">My Requests</h2>
              <div className="text-sm text-gray-600">
                {
                  activeTickets.filter((ticket) => ticket.status !== "Resolved")
                    .length
                }{" "}
                active tickets
              </div>
            </div>

            {/* Tickets List */}
            <div className="space-y-4">
              {activeTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      {/* Ticket Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(ticket.status)}
                          <span className="font-mono text-xs text-gray-500">
                            {ticket.id}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-3">
                        {ticket.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-xs md:text-sm mb-3">
                        {ticket.description}
                      </p>

                      {/* Meta Information */}
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                        <span>Created: {ticket.created}</span>
                        <span>Last Update: {ticket.lastUpdate}</span>
                        <span>Category: {ticket.category}</span>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {activeTickets.length === 0 && (
              <div className="text-center py-12">
                <HiOutlineTicket className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  No requests found
                </h3>
                <p className="text-gray-500">
                  You haven't submitted any support requests yet.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    </>
  );
}
