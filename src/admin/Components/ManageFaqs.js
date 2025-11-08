import React, { useState, useEffect } from "react";
import "../css/managefaqs.css";
import { addFAQ, updateFAQ, deleteFAQ } from "../../config/api";
import { getAllFAQs } from "../../config/publicApi";
import Swal from "sweetalert2";

function ManageFaqs() {
  const [faqs, setFaqs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await getAllFAQs();
      setFaqs(response.data.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const handleDeleteFaq = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Delete FAQ",
        text: "Are you sure you want to delete this FAQ? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      if (!result.isConfirmed) return;

      await deleteFAQ(id);

      setFaqs((prev) => prev.filter((faq) => faq.id !== id));

      console.log("Delete FAQ payload:", { id });

      await Swal.fire({
        title: "Deleted",
        text: "FAQ deleted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      await Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || "Failed to delete FAQ",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleAddFaq = () => {
    setEditingFaq(null);
    setFormData({ question: "", answer: "" });
    setIsModalOpen(true);
  };

  const handleEditFaq = (faq) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
    setIsModalOpen(true);
  };

  const handleSaveFaq = async () => {
    try {
      if (editingFaq) {
        // Update existing FAQ
        const response = await updateFAQ(
          editingFaq._id,
          formData.question,
          formData.answer
        );
        console.log("Update FAQ payload:", response.data.data);

        setFaqs(
          faqs.map((faq) =>
            faq._id === editingFaq._id ? response.data.data : faq
          )
        );
      } else {
        // Add new FAQ
        const response = await addFAQ(formData.question, formData.answer);
        console.log("Add FAQ payload:", response.data.data);

        setFaqs([response.data.data, ...faqs]);
      }

      setIsModalOpen(false);
      setFormData({ question: "", answer: "" });
    } catch (error) {
      console.error("Error saving FAQ:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ question: "", answer: "" });
    setEditingFaq(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log("FAQs updated:", faqs);
  }, [faqs]);

  return (
    <div className="manage-faqs-container">
      <div className="faqs-header">
        <h2>Manage FAQs</h2>
        <button className="add-faq-btn" onClick={handleAddFaq}>
          <span className="add-icon">+</span>
          Add FAQ
        </button>
      </div>

      <div className="faqs-list">
        {faqs.length === 0 ? (
          <div className="no-faqs">
            <p>No FAQs found. Add your first FAQ to get started.</p>
          </div>
        ) : (
          faqs.map((faq) => (
            <div key={faq} className="faq-item">
              <div className="faq-content">
                <div className="faq-question">
                  <h4>Q: {faq.question}</h4>
                </div>
                <div className="faq-answer">
                  <p>A: {faq.answer}</p>
                </div>
              </div>
              <div className="faq-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEditFaq(faq)}
                  title="Edit FAQ"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteFaq(faq.id)}
                  title="Delete FAQ"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingFaq ? "Edit FAQ" : "Add New FAQ"}</h3>
              <button className="close-btn" onClick={handleCloseModal}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="question">Question *</label>
                <textarea
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  placeholder="Enter your question here..."
                  rows="3"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="answer">Answer *</label>
                <textarea
                  id="answer"
                  name="answer"
                  value={formData.answer}
                  onChange={handleInputChange}
                  placeholder="Enter your answer here..."
                  rows="5"
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={handleCloseModal}>
                Cancel
              </button>
              <button
                className="save-btn"
                onClick={handleSaveFaq}
                disabled={!formData.question.trim() || !formData.answer.trim()}
              >
                {editingFaq ? "Update FAQ" : "Save FAQ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageFaqs;
