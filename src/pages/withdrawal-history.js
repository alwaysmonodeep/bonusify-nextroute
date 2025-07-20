import React, { useState } from 'react';
import { IoChevronDown, IoArrowForward } from 'react-icons/io5';

export default function PaymentDetails() {
  const [selectedMonth, setSelectedMonth] = useState('June 2025');
  const [isOpen, setIsOpen] = useState(false);

  const months = ['June 2025', 'May 2025', 'April 2025', 'March 2025'];

  const payment = {
    id: '5761155',
    date: '17-06-2025',
    mode: 'Amazon Gift Card',
    amount: '₹84.9',
    reference: '6014857098474486'
  };

  return (
    <div className="min-h-screen bg-gray-50 px-2 md:px-10 py-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          
          <div className=''><h2 className="text-2xl font-semibold text-[#332B4E]"> Withdrawal History</h2>
          <p className='text-xs mt-2 text-gray-700'>Status will update here within 72 hours of withdrawal</p>
          </div>
          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50"
            >
              {selectedMonth}
              <IoChevronDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border rounded-lg shadow-lg z-10">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => {
                      setSelectedMonth(month);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg">
          {/* Header */}
          <div className="flex items-center px-6 py-3 bg-[#332B4E] text-white font-medium">
            <div className="flex-1">Request ID</div>
            <div className="flex-1">Date Paid</div>
            <div className="flex-1">Payment Mode</div>
            <div className="flex-1">Amount Paid</div>
            <div className="flex-1">Reference Number</div>
            <div className="w-20">Info</div>
          </div>

          {/* Row */}
          <div className="flex items-center px-6 py-4 hover:bg-gray-50">
            <div className="flex-1 font-medium">{payment.id}</div>
            <div className="flex-1">{payment.date}</div>
            <div className="flex-1">{payment.mode}</div>
            <div className="flex-1 font-medium">{payment.amount}</div>
            <div className="flex-1 font-mono text-sm">{payment.reference}</div>
            <div className="w-20">
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                View <IoArrowForward className="text-xs" />
              </button>
            </div>
          </div>
        </div>
          <div className='mt-3'>
        <span className='text-blue-700 hover:text-blue-600 hover:underline cursor-pointer text-sm'>If you still have any query, then please click here</span>
      </div>
      </div>
    </div>
  );
}