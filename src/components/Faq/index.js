import React, { useState } from 'react';

const LoanFAQSection = () => {
  const [faq, setFaq] = useState(null);

  const faqs = [
    {
      question: "What types of loans do you offer?",
      answer: "We offer a variety of loans including personal loans, home loans, business loans, and more - all with competitive interest rates."
    },
    {
      question: "How quickly can I get approved for a loan?",
      answer: "Our streamlined approval process ensures that you can get approved for a loan quickly, often within hours."
    },
    {
      question: "What are your interest rates like?",
      answer: "We pride ourselves on offering some of the lowest interest rates in the industry to make sure you get the best deal possible."
    },
  ];

  const handleFaqClick = (index) => {
    setFaq(index === faq ? null : index);
  };

  return (
    <div className="bg-gradient-to-r from-gray-300 via-gray-200 to-cyan-600 mt-1 mb-1 text-black p-8 text-center relative">
      <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="text-left">
        {faqs.map((item, index) => (
          <div key={index} className="mb-4">
            <div
              className="cursor-pointer text-xl font-bold text-black mb-2"
              onClick={() => handleFaqClick(index)}
            >
              {item.question}
            </div>
            {faq === index && (
              <div className="text-lg">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanFAQSection;
