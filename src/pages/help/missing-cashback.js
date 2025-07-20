import React, { useState } from 'react';
import { FaCheckCircle, FaArrowLeft, FaTimes } from 'react-icons/fa';
import PendCashback from '@/components/PendCashback';

function Missingcashback() {
  const [activeTab, setActiveTab] = useState('In Review');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selectedRetailer, setSelectedRetailer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const tabs = [
    { name: 'In Review', count: 0 },
    { name: 'Closed', count: 1 },
    { name: 'Others', count: 0 }
  ];

  const retailers = [
    {
      name: 'IndiGo',
      logo: '✈️',
      subtitle: 'HOTELS',
      autotrack: 'Autotracks within 48h'
    },
    {
      name: 'Flipkart',
      logo: '🛒',
      subtitle: '',
      autotrack: 'Autotracks within 36h'
    },
    {
      name: 'amazon.in',
      logo: '📦',
      subtitle: '',
      autotrack: 'Autotracks within 168h'
    }
  ];

  // Sample dates for demonstration
  const availableDates = [
    { date: 7, month: 'July' },
    { date: 9, month: 'July' },
    { date: 16, month: 'July' }
  ];

  const handleRetailerClick = (retailer) => {
    setSelectedRetailer(retailer);
    setIsModalOpen(false);
    setIsDateModalOpen(true);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleContinue = () => {
    if (selectedDate && selectedRetailer) {
      console.log('Selected:', { retailer: selectedRetailer.name, date: selectedDate });
      // Handle the continue action here
      setIsDateModalOpen(false);
      setSelectedRetailer(null);
      setSelectedDate(null);
    }
  };

  const handleBackToRetailers = () => {
    setIsDateModalOpen(false);
    setIsModalOpen(true);
    setSelectedRetailer(null);
    setSelectedDate(null);
  };

  return (
    <>
      <div className='flex flex-col md:flex-row md:my-10 gap-10 p-6 max-w-7xl mx-auto'>
        <div className='flex-1 min-w-0'>
          <PendCashback/>
        </div>
        <div className='flex-1 min-w-0 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden'>
          <div className="bg-[#332B4E] text-white p-6 flex justify-between items-center">
            <h2 className="text-sm font-semibold">🔍 Don't See Your Pending Cashback here?</h2>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-black cursor-pointer px-6 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
              Click here →
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 bg-gray-50">
            <nav className="flex space-x-0 px-6" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.name
                      ? 'border-blue-600 text-blue-600 bg-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                  {tab.count > 0 && (
                    <span className={`ml-2 py-0.5 px-2 rounded-full text-xs font-medium ${
                      activeTab === tab.name
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="px-8 py-20 bg-gray-50 min-h-[400px] flex items-center justify-center">
            {activeTab === 'In Review' && (
              <div className="text-center max-w-md">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute top-2 left-2 w-24 h-28 bg-blue-100 rounded-xl transform rotate-6 opacity-60 shadow-sm"></div>
                    <div className="absolute top-1 left-1 w-24 h-28 bg-blue-200 rounded-xl transform rotate-3 opacity-80 shadow-sm"></div>
                    
                    <div className="relative w-24 h-28 bg-blue-50 rounded-xl border-2 border-blue-100 flex flex-col p-3 shadow-md">
                      <div className="w-14 h-1.5 bg-red-300 rounded mb-1.5"></div>
                      <div className="w-12 h-1.5 bg-blue-300 rounded mb-1.5"></div>
                      <div className="w-14 h-1.5 bg-blue-300 rounded mb-1.5"></div>
                      <div className="w-10 h-1.5 bg-blue-300 rounded"></div>
                    </div>
                    
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#332B4E] rounded-full flex items-center justify-center shadow-lg">
                      <FaCheckCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-lg leading-relaxed">
                  Missing Cashback tickets that are under review will show up here.
                </p>
              </div>
            )}

            {activeTab === 'Closed' && (
              <div className="text-center max-w-md">
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-28 bg-green-50 rounded-xl border-2 border-green-200 flex flex-col p-3 shadow-md">
                    <div className="w-14 h-1.5 bg-green-400 rounded mb-1.5"></div>
                    <div className="w-12 h-1.5 bg-green-300 rounded mb-1.5"></div>
                    <div className="w-14 h-1.5 bg-green-300 rounded mb-1.5"></div>
                    <div className="w-10 h-1.5 bg-green-300 rounded"></div>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Resolved cashback tickets will appear here.
                </p>
              </div>
            )}

            {activeTab === 'Others' && (
              <div className="text-center max-w-md">
                <div className="flex justify-center mb-8">
                  <div className="w-24 h-28 bg-gray-50 rounded-xl border-2 border-gray-200 flex flex-col p-3 shadow-md">
                    <div className="w-14 h-1.5 bg-gray-400 rounded mb-1.5"></div>
                    <div className="w-12 h-1.5 bg-gray-300 rounded mb-1.5"></div>
                    <div className="w-14 h-1.5 bg-gray-300 rounded mb-1.5"></div>
                    <div className="w-10 h-1.5 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Other cashback-related items will be displayed here.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Retailer Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FaArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Where did you shop?</h2>
                  <p className="text-gray-600 mt-1">These are the retailers you have visited in last 30 days</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {retailers.map((retailer, index) => (
                  <div 
                    key={index}
                    onClick={() => handleRetailerClick(retailer)}
                    className="border border-gray-200 rounded-2xl py-6 hover:shadow-lg transition-shadow cursor-pointer group hover:border-blue-300"
                  >
                    <div className="text-center">
                      <div className="text-xl mb-4">{retailer.logo}</div>
                      <div className="mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">{retailer.name}</h3>
                        {retailer.subtitle && (
                          <p className="text-sm text-gray-500 font-medium">{retailer.subtitle}</p>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-4">{retailer.autotrack}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Date Selection Modal */}
      {isDateModalOpen && selectedRetailer && (
        <div className="fixed inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <button 
                onClick={handleBackToRetailers}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => setIsDateModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-8 text-center">
              {/* Retailer Logo */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl px-8 py-4 inline-flex items-center gap-3">
                  <span className="text-2xl">{selectedRetailer.logo}</span>
                  <span className="font-semibold text-lg">{selectedRetailer.name}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Great! Choose the date you shopped on {selectedRetailer.name}
              </h2>

              {/* Month Header */}
              <div className="mt-12 mb-8">
                <h3 className="text-xl font-semibold text-gray-900 border-b-2 border-gray-900 inline-block pb-1">
                  July
                </h3>
              </div>

              {/* Date Selection */}
              <div className="flex justify-center gap-6 mb-8">
                {availableDates.map((dateObj, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(dateObj.date)}
                    className={`w-20 h-20 rounded-full border-2 flex items-center justify-center text-xl font-semibold transition-all ${
                      selectedDate === dateObj.date
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {String(dateObj.date).padStart(2, '0')}
                  </button>
                ))}
              </div>

              {/* Helper Text */}
              <p className="text-gray-600 mb-8">
                These are the dates you visited {selectedRetailer.name}
              </p>

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={!selectedDate}
                className={`w-full max-w-md py-4 rounded-2xl font-semibold text-white transition-colors ${
                  selectedDate
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Missingcashback;