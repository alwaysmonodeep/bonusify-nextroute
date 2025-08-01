import { 
  FaQuestionCircle, 
  FaCreditCard, 
  FaSyncAlt, 
  FaEnvelope, 
  FaUsers, 
  FaFileAlt, 
  FaClock, 
  FaBriefcase, 
} from 'react-icons/fa';

const FAQPage = () => {

  const faqData = [
    {
      id: 1,
      icon: <FaQuestionCircle className="w-6 h-6 text-gray-700" />,
      question: "How will I earn on referring a friend?",
      answer: "Refer your 3 friend on bonusify. When your 3 friend will signup on bonusify via your link and shop atleast for once, you will get ₹50 back at your wallet. And this cycle will be continued. Note: You will get credited only when they will shop atleast once after singnup via your link on bonusify"
    },
    {
      id: 2,
      icon: <FaCreditCard className="w-6 h-6 text-gray-700" />,
      question: "How do I refer my friends?",
      answer: "Click on Menu  > Go to Refer and Earn >  Share this referral link with your friends /family"
    },
    {
      id: 3,
      icon: <FaSyncAlt className="w-6 h-6 text-gray-700" />,
      question: "Can I change my plan later?",
      answer: "Of course you can! Our pricing scales with your company. Chat to our friendly team to find a solution that works for you as you grow."
    },
    {
      id: 4,
      icon: <FaEnvelope className="w-6 h-6 text-gray-700" />,
      question: "How do I change my account email?",
      answer: "You can change the email address associated with your account by going to untitled.com/account from a laptop or desktop."
    },
    {
      id: 5,
      icon: <FaFileAlt className="w-6 h-6 text-gray-700" />,
      question: "What is your cancellation policy?",
      answer: "We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid."
    },
    {
      id: 6,
      icon: <FaUsers className="w-6 h-6 text-gray-700" />,
      question: "How does support work?",
      answer: "If you're having trouble with Untitled UI, we're here to try and help via hello@untitled.com. We're a small team, but will get back to you soon."
    },
    {
      id: 7,
      icon: <FaFileAlt className="w-6 h-6 text-gray-700" />,
      question: "Can other info be added to an invoice?",
      answer: "At the moment, the only way to add additional information to invoices is to add the information to the workspace's name manually."
    },
    {
      id: 8,
      icon: <FaQuestionCircle className="w-6 h-6 text-gray-700" />,
      question: "Do you provide tutorials?",
      answer: "Not yet, but we're working on it! In the meantime, we've done our best to make it intuitive and we're building our documentation page."
    },
    {
      id: 9,
      icon: <FaClock className="w-6 h-6 text-gray-700" />,
      question: "What does \"lifetime access\" mean?",
      answer: "Once you have purchased the UI kit, you will have access to all of the future updates, free of charge. We'll let you know about releases."
    },
    {
      id: 10,
      icon: <FaBriefcase className="w-6 h-6 text-gray-700" />,
      question: "Can I use it for commercial projects?",
      answer: "Of course! We'd love to see it. You can use this UI kit to build any type of commercial business, website, app, or project."
    },
   
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-4 md:py-8 mb-10">
      {/* Header */}
      
      <div className="max-w-6xl mx-auto  mb-12">
        <div className="flex  mb-6">
          <div className="bg-gray-100 border border-gray-200 rounded-full px-4 py-2 flex items-center space-x-2">
            <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
              <FaQuestionCircle className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs md:text-sm font-medium text-gray-700">FAQs</span>
          </div>
        </div>
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
          Frequently asked questions
        </h2>
         <p className="text-xs md:text-base text-gray-600">
          Stuck on something? We're here to help with all your questions.
        </p>
      </div>

      {/* FAQ Content */}
      <div className="max-w-6xl pt-2 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {faqData.map((item) => (
            <div key={item.id} className="space-y-6">
              {/* Icon and Question */}
              <div className="flex items-start space-x-6">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm md:text-xl font-semibold text-gray-900 mb-2">
                    {item.question}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-base leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;