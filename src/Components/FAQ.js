import React, { useState, useEffect, useRef } from "react";
import "../Css/components/faq.css";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqData, setFaqData] = useState([]);
  const contentRefs = useRef([]);

  // Sample FAQ data - replace this with API call later
  const sampleFaqData = [
    {
      id: 1,
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for all products in their original condition. Items must be returned with original packaging and tags attached.",
    },
    {
      id: 2,
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business days. International shipping may take 7-14 business days depending on the destination.",
    },
    {
      id: 3,
      question: "Do you offer international shipping?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. Please check our shipping calculator at checkout for specific details.",
    },
    {
      id: 4,
      question: "How can I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking number via email. You can use this number to track your package on our website or the carrier's website.",
    },
    {
      id: 5,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for larger orders.",
    },
    {
      id: 6,
      question: "Can I modify or cancel my order?",
      answer:
        "You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer service team, and we'll do our best to accommodate your request.",
    },
    {
      id: 7,
      question: "Do you offer bulk discounts?",
      answer:
        "Yes, we offer bulk discounts for orders over certain quantities. Please contact our sales team at sales@company.com for custom pricing on large orders.",
    },
    {
      id: 8,
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team via email at support@company.com, phone at 1-800-XXX-XXXX, or through our live chat feature available 24/7 on our website.",
    },
  ];

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchFaqData();
    setFaqData(sampleFaqData);
  }, []);

  // Future API call function
  const fetchFaqData = async () => {
    try {
      // const response = await fetch('/api/faq');
      // const data = await response.json();
      // setFaqData(data);
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
    }
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <p className="faq-subtitle">
          Find answers to the most common questions about our products and
          services
        </p>
      </div>

      <div className="faq-content">
        {faqData.map((faq, index) => (
          <div
            key={faq.id}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div
              className="faq-question"
              onClick={() => toggleAccordion(index)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  toggleAccordion(index);
                }
              }}
            >
              <span className="question-text">{faq.question}</span>
              <span className="faq-icon">
                <svg
                  className={`chevron ${activeIndex === index ? "rotate" : ""}`}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
            <div
              className={`faq-answer ${
                activeIndex === index ? "expanded" : ""
              }`}
              style={{
                height:
                  activeIndex === index
                    ? contentRefs.current[index]?.scrollHeight + "px"
                    : "0px",
              }}
            >
              <div
                className="answer-content"
                ref={(el) => (contentRefs.current[index] = el)}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="faq-footer">
        <div className="contact-card">
          <h3>Still have questions?</h3>
          <p>
            Can't find the answer you're looking for? Please reach out to our
            customer support team.
          </p>
          <button className="contact-button">Contact Support</button>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
