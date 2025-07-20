import Head from 'next/head';
import { useState } from 'react';
import { SiAmazon, SiFlipkart } from "react-icons/si";
export default function WithdrawalPage() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);

  const cashbackAmount = 999.4;

  const paymentMethods = [
    {
      id: 'Flipkart Gift Card',
      name: 'Flipkart Gift Card',
      icon: <SiFlipkart className="text-4xl" />,
      enabled: true
    },
    {
      id: 'Amazon Gift Card', 
      name: 'Amazon Gift Card',
      icon: <SiAmazon className="text-4xl" />,
      enabled: true
    },
    {
      id: 'Recharge',
      name: 'Recharge',
      icon: (
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      ),
      enabled: false,
      comingSoon: true
    }
  ];

  const handleMethodSelect = (method) => {
    if (!method.enabled) return;
    setSelectedMethod(method.id);
    setShowContactForm(true);
  };

  const handleWithdrawal = async () => {
    if (!selectedMethod || !mobile || !email) {
      alert('Please select a payment method and enter both mobile number and email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    if (!agreedTerms) {
      setShowTermsError(true);
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`${selectedMethod} request submitted successfully! We'll send the details to ${email} and ${mobile}`);
      resetForm();
    } catch (error) {
      alert('Error processing request. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setSelectedMethod('');
    setMobile('');
    setEmail('');
    setShowContactForm(false);
    setAgreedTerms(false);
    setShowTermsError(false);
  };

  return (
    <div className="min-h-screen bg-white py-15 px-4">
      <Head>
        <title>Withdrawl Cahsback</title>
      </Head>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-md md:text-xl font-bold text-gray-900 mb-4">
            Cashback available for payment
          </h1>
          <div className="text-4xl font-bold text-green-600 mb-6">
            ₹{cashbackAmount.toFixed(1)}
          </div>
        </div>

        {/* Payment Method Selection */}
        <div className="text-center mb-8">
          <h2 className="text-sm md:text-lg font-bold text-gray-900 mb-6">
            Choose Your Payment Method
          </h2>

          <div className="flex sm:flex-row gap-2 md:gap-4 max-w-3xl mx-auto">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`bg-gray-50 rounded-xl p-6 shadow-md transition-all duration-200 border-1 relative flex-1 ${
                  method.enabled 
                    ? `cursor-pointer hover:shadow-lg ${selectedMethod === method.id ? 'border-blue-500' : 'border-gray-200'}`
                    : 'opacity-60 cursor-not-allowed border-gray-200'
                }`}
                onClick={() => handleMethodSelect(method)}
              >
                <div className="flex flex-col items-center space-y-3">
                  <div className="text-gray-700">{method.icon}</div>
                  <h3 className="text-sm font-bold text-gray-900 text-center">
                    {method.name}
                  </h3>
                </div>
                {method.comingSoon && (
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                    Coming Soon
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information Form */}
        {showContactForm && selectedMethod && (
          <div className="flex justify-center mt-8">
            <div className="w-full max-w-sm bg-gray-50 rounded-2xl border border-gray-200 p-6 relative">
              <button
                onClick={resetForm}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer transition-colors"
              >
                X
              </button>

              <h3 className="text-lg font-bold text-gray-900 mb-6 text-center pr-8">
                Enter Contact Details
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    maxLength="10"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>

                {/* Terms & Conditions */}
                <div className="space-y-2 pt-2">
                  <label className="flex items-start gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => {
                        setAgreedTerms(e.target.checked);
                        if (e.target.checked) setShowTermsError(false);
                      }}
                      className="mt-1"
                    />
                    <span>
                      I agree to the terms & conditions governing payment transfer request listed{' '}
                      <a href="/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        here.
                      </a>
                    </span>
                  </label>
                  {showTermsError && (
                    <p className="text-sm text-red-600">
                      Kindly accept Terms and Conditions
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    disabled={isProcessing || !mobile || !email}
                    onClick={handleWithdrawal}
                    className={`flex-1 py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                      isProcessing || !mobile || !email
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gray-900 cursor-pointer hover:bg-gray-800'
                    }`}
                  >
                    {isProcessing ? 'Processing...' : 'Get Paid'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Terms Note */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Gift card details will be sent to your email or mobile within 48 hours
          </p>
        </div>
      </div>
    </div>
  );
}
