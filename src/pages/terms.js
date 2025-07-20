import React from 'react';
import Head from 'next/head';

const termsData = [
  {
    id: 1,
    title: "Welcome to Bonusify",
    content: [
      "These Terms and Conditions govern your use of the Bonusify mobile application and website. Bonusify is a cashback platform that rewards users with cashback when they make purchases on their favorite websites through our service.",
      "By using our Service, you agree to be bound by these Terms."
    ]
  },
  {
    id: 2,
    title: "Account Registration",
    items: [
      "You must be at least 18 years old to create a Bonusify account",
      "You must provide accurate information during registration",
      "You are responsible for safeguarding your account credentials",
      "You must notify us immediately of any unauthorized use of your account",
      "One account per person is allowed"
    ]
  },
  {
    id: 3,
    title: "How Bonusify Works",
    content: [
      "When you make a purchase through Bonusify by clicking on our partner retailer links, we receive a commission from the retailer. We share a portion of this commission with you as cashback."
    ],
    items: [
      "Purchases must be made through Bonusify links to be eligible for cashback",
      "Cashback rates vary by retailer and may change without notice",
      "Cashback is typically credited within 2-90 days after purchase confirmation",
      "Some purchases may not be eligible for cashback"
    ]
  },
  {
    id: 4,
    title: "Cashback Terms",
    content: [
      "Earning Cashback:"
    ],
    items: [
      "Cashback is earned only on completed and confirmed purchases",
      "Returns, cancellations, or refunded purchases will result in cashback reversal",
      "Use of coupon codes not provided by Bonusify may void cashback eligibility",
      "Minimum withdrawal amount: ₹500",
      "Withdrawal processing time: 3-5 business days"
    ]
  },
  {
    id: 5,
    title: "User Responsibilities",
    items: [
      "Use Bonusify only for legitimate personal shopping purposes",
      "Do not create fake accounts or engage in fraudulent activities",
      "Do not attempt to manipulate the cashback system",
      "Comply with all applicable laws and regulations",
      "Do not share your account with others"
    ]
  },
  {
    id: 6,
    title: "Prohibited Activities",
    items: [
      "Creating multiple accounts to earn additional cashback",
      "Using automated tools, bots, or scripts to access the Service",
      "Making purchases for commercial resale purposes",
      "Attempting to circumvent tracking mechanisms",
      "Engaging in any activity that could harm Bonusify's operations"
    ]
  },
  {
    id: 7,
    title: "Privacy and Data Protection",
    items: [
      "We collect and process your personal information in accordance with our Privacy Policy",
      "By using Bonusify, you consent to the collection and use of your information",
      "We implement appropriate security measures to protect your personal information",
      "You have the right to access, update, or delete your personal information"
    ]
  },
  {
    id: 8,
    title: "Limitation of Liability",
    items: [
      "Bonusify is not responsible for issues with retailer websites or their products",
      "We are not liable for any indirect, incidental, or consequential damages",
      "Our total liability is limited to the amount of cashback in your account",
      "We do not guarantee the availability of cashback from any specific retailer"
    ]
  },
  {
    id: 9,
    title: "Account Termination",
    items: [
      "We may terminate or suspend accounts that violate these Terms",
      "You may close your account at any time by contacting customer support",
      "Upon termination, any pending cashback may be forfeited",
      "We reserve the right to refuse service to anyone for any reason"
    ]
  },
  {
    id: 10,
    title: "Changes to Terms",
    items: [
      "We reserve the right to modify these Terms at any time",
      "Changes will be effective immediately upon posting on our website",
      "Continued use of the Service constitutes acceptance of modified Terms",
      "We will notify users of significant changes via email or app notification"
    ]
  },
  {
    id: 11,
    title: "Contact Information",
    content: [
      "If you have any questions about these Terms, please contact us:",
      "Email: care@bonusify.com",
    
    ]
  }
];

const Terms = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions - Bonusify</title>
        <meta name="description" content="Terms and Conditions for Bonusify cashback app" />
      </Head>
      
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Terms and Conditions</h1>
        
        {termsData.map((section) => (
          <div key={section.id} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            
            {section.content && (
              <div className="mb-4">
                {section.content.map((paragraph, idx) => (
                  <p key={idx} className="mb-2">{paragraph}</p>
                ))}
              </div>
            )}
            
            {section.items && (
              <ul className="list-disc ml-6">
                {section.items.map((item, idx) => (
                  <li key={idx} className="mb-1">{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}

      </div>
    </>
  );
};
export default Terms;