// ...existing code...
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getAllFAQs } from "../config/publicApi";
import "../Css/components/faq.css";

function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);
  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await getAllFAQs();
      setFaqs(response.data.data || []);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  useEffect(() => {
    console.log("FAQs updated:", faqs);
  }, [faqs]);

  return (
    <div className="mp-faq-wrap">
      <div className="mp-accordion" role="region" aria-label="FAQ">
        {faqs.length === 0 ? (
          <div className="mp-no-faqs">
            <p>No FAQs found. Add your first FAQ to get started.</p>
          </div>
        ) : (
          faqs.map((faq, idx) => {
            const key = faq._id || faq.id || idx;
            const isOpen = openIndex === idx;
            return (
              <div
                key={key}
                className={`mp-accordion-item ${isOpen ? "open" : ""}`}
              >
                <button
                  className="mp-accordion-button"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`mp-panel-${key}`}
                  id={`mp-button-${key}`}
                >
                  <span className="mp-question">Q: {faq.question}</span>
                  <span className="mp-chevron" aria-hidden="true">
                    ▼
                  </span>
                </button>

                <div
                  id={`mp-panel-${key}`}
                  role="region"
                  aria-labelledby={`mp-button-${key}`}
                  className="mp-accordion-panel"
                >
                  <p className="mp-answer">A: {faq.answer}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default FAQ;
// ...existing code...
