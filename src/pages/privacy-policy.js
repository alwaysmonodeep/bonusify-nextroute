import React from 'react';
import { FaShieldAlt, FaEnvelope, FaClock, FaUsers, FaLock} from 'react-icons/fa';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <FaShieldAlt className="h-16 w-16 text-gray-700" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">Your privacy is important to us</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          
          {/* Introduction */}
          <section className="mb-10">
            <p className="text-gray-700 leading-relaxed">
              Welcome to Bonusify. We are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you use our cashback and deals platform.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaUsers className="h-6 w-6 text-gray-600 mr-2" />
              Information We Collect
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Name and email address when you create an account</li>
                  <li>Payment information for cashback processing</li>
                  <li>Phone number (optional) for account verification</li>
                 
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Usage Information</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Shopping activity and purchase history through our platform</li>
                  <li>Browser information and device details</li>
                  <li>IP address and location data</li>
                  <li>Cookies and tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaLock className="h-6 w-6 text-gray-600 mr-2" />
              How We Use Your Information
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Service Delivery</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Process cashback transactions</li>
                  <li>• Track shopping activity</li>
                  <li>• Send payment notifications</li>
                  <li>• Provide customer support</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-3">Communication</h3>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Send promotional offers and deals</li>
                  <li>• Account updates and notifications</li>
                  <li>• Marketing communications (opt-out available)</li>
                  <li>• Service announcements</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
            
            <div className="bg-gray-100 border-l-4 border-gray-400 p-6 mb-6">
              <p className="text-gray-800 font-medium">
                We do not share your personal information to third parties.
              </p>
            </div>

            <p className="text-gray-700 mb-4">We may share your information only in the following circumstances:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li><strong>Merchant Partners:</strong> Transaction data necessary to process cashback rewards</li>
              <li><strong>Payment Processors:</strong> Secure payment processing and cashback distribution</li>
              <li><strong>Analytics Services:</strong> Anonymized data for service improvement</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
            </ul>
          </section>

          {/* Data Security */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-900 mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• SSL encryption for data transmission</li>
                  <li>• Secure server infrastructure</li>
                  <li>• Regular security audits</li>
                </ul>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Access controls and authentication</li>
                  <li>• Data backup and recovery systems</li>
              
                </ul>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Privacy Rights</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl mb-2">📧</div>
                <h3 className="font-medium mb-2">Access & Update</h3>
                <p className="text-sm text-gray-600">View and modify your account information anytime</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl mb-2">🗑️</div>
                <h3 className="font-medium mb-2">Delete Account</h3>
                <p className="text-sm text-gray-600">Request deletion of your personal data</p>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-2xl mb-2">✉️</div>
                <h3 className="font-medium mb-2">Opt-out</h3>
                <p className="text-sm text-gray-600">Unsubscribe from marketing communications</p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to enhance your experience and track cashback eligibility. 
              You can control cookie settings through your browser preferences.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> Disabling cookies may affect cashback tracking functionality.
              </p>
            </div>
          </section>

          {/* Third-Party Links */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Websites</h2>
            <p className="text-gray-700">
              Our platform contains links to merchant websites. We are not responsible for the privacy practices 
              of these external sites. We encourage you to review their privacy policies before making purchases.
            </p>
          </section>

          {/* Changes to Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaClock className="h-6 w-6 text-gray-600 mr-2" />
              Changes to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy periodically. We will notify you of significant changes via email 
              or through our platform. Your continued use of Bonusify after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <FaEnvelope className="h-6 w-6 text-gray-600 mr-2" />
              Contact Us
            </h2>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <p className="text-indigo-900 mb-4">
                If you have questions about this Privacy Policy or your personal information, please contact us:
              </p>
              <div className="space-y-2 text-indigo-800">
                <p><strong>Email:</strong> care@bonusify.in</p>  
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;