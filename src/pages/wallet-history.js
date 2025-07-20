import React from 'react'

const ordersData = [
  {
    id: 1,
    name: "Nutech Auto Repair",
    date: "04 Apr, 2019 ",
    debit: "220.50",
    credit: "5.50",
  },
  {
    id: 2,
    name: "Refer",
    date: "04 Apr, 2019",
    debit: "4,230.50",
    credit: "20.00",
  },
  {
    id: 3,
    name: "Add Money to Wallet",
    date: "04 Apr, 2019 ",
    debit: "2,500.00",
    credit: "0.00",
  },
  {
    id: 4,
    name: "Vancouver Euro Exotic",
    date: "04 Apr, 2019 ",
    debit: "2,190.50",
    credit: "15.75",
  }
];

const Header = () => (
  <div className="bg-gray-100 rounded-2xl shadow-sm mb-8 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16"></div>
    <div className="text-black px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-row flex-wrap items-center justify-between gap-2 sm:gap-4">
      <div className="flex-1 min-w-0">
        <h2 className="text-lg sm:text-xl font-semibold mb-0 sm:mb-2">Wallet History</h2>
        <p className="text-xs sm:text-sm text-black">Statements updates within 24 hours.</p>
      </div>
      <div className="flex-shrink-0 w-36 sm:w-auto">
        <select className="w-full border rounded-md px-3 sm:px-4 py-2 bg-white outline-0 text-black border-gray-300 text-sm sm:text-base">
          <option value="march-2025">March 2025</option>
          <option value="february-2025">February 2025</option>
          <option value="january-2025">January 2025</option>
          <option value="december-2024">December 2024</option>
        </select>
      </div>
    </div>
  </div>
);

const TableHeader = () => (
  <div className="bg-[#332B4E] text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
    <div className="flex items-center justify-between">
      <div className="flex-1 font-medium text-sm sm:text-base">Description</div>
      <div className="flex-1 font-medium text-center text-sm sm:text-base">Debit</div>
      <div className="flex-1 font-medium text-center text-sm sm:text-base">Credit</div>
    </div>
  </div>
);

const TransactionRow = ({ order, index }) => (
  <div 
    className={`px-4 sm:px-6 lg:px-8 py-4 sm:py-6 hover:bg-gray-50 transition-colors ${
      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
    }`}
  >
    <div className="flex items-center">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 mb-1 text-xs sm:text-sm lg:text-base truncate">{order.name}</h3>
        <p className="text-xs lg:text-sm text-gray-400">{order.date}</p>
      </div>
      <div className="flex-1 text-center">
        <span className="text-sm sm:text-base lg:text-lg font-semibold text-red-400">₹{order.debit}</span>
      </div>
      <div className="flex-1 text-center">
        <span className="text-sm sm:text-base lg:text-lg font-semibold text-green-600">₹{order.credit}</span>
      </div>
    </div>
  </div>
);

const NoTransactions = () => (
  <div className="px-4 sm:px-6 lg:px-8 py-16 text-center">
    <div className="max-w-sm mx-auto">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions</h3>
      <p className="text-sm text-gray-500">There are no transactions to show for the selected period.</p>
    </div>
  </div>
);

function Wallethistory() {
  return (
    <div className="bg-white min-h-screen my-5 mb-20 sm:pt-5 px-3 sm:px-6 lg:px-10 pb-0">
      <div className="max-w-6xl mx-auto">
        <Header />
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <TableHeader />
          <div className="divide-y divide-gray-100">
            {ordersData.length > 0 ? (
              ordersData.map((order, index) => (
                <TransactionRow key={order.id} order={order} index={index} />
              ))
            ) : (
              <NoTransactions />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallethistory