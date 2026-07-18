import React, { useState } from "react";
import FAQItem from "./FAQItem";

const faqData = [
  {
    question: "How long does delivery take?",
    answer:
      "For locations around campus and major hubs (like in Ogbomoso), delivery typically takes between 15 to 30 minutes. Our dispatch riders move fast to ensure your food arrives piping hot!",
  },
  {
    question: "Can I pay with mobile bank transfer?",
    answer:
      "Yes, absolutely! When you complete your order on our web app, you can select the Transfer option. The app will display our branch bank details, and you simply attach your transfer receipt when sending the order via WhatsApp.",
  },
  {
    question: "Do you serve all 19 branches from this app?",
    answer:
      "Yes! Once you click 'Order Online,' the app will prompt you to select your closest branch (such as Ogbomoso, Ibadan, or Osogbo). The menu and checkout details will instantly customize to that specific kitchen.",
  },
  {
    question: "What happens after I click 'Place Order via WhatsApp'?",
    answer:
      "The app securely packages your cart items, delivery address, and total bill into a clean text message and seamlessly redirects you to WhatsApp. Once you hit send, our kitchen immediately receives it and starts cooking!",
  },
];



export default function FAQ() {
  // Store the index of the currently open FAQ, or null if all are closed
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF5E14] bg-orange-50 px-3 py-1 rounded-full">
            Have Questions?
          </span>
          <h2 className="text-3xl font-black text-[#1E1E1E] mt-3 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Everything you need to know about getting your supreme meals
            delivered.
          </p>
        </div>

        {/* FAQ Accordion Wrapper */}
        <div className="bg-white rounded-2xl border border-gray-100 p-2 md:p-6 shadow-sm">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
