import React, { useState, useEffect } from "react";
import { updateHomeContent } from "../../config/api";
import { notifySuccess, notifyError } from "../../config/NotificationService";
import "../css/manageContent.css";
import { getHomeContent } from "../../config/publicApi";

const ManageContent = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    aboutText1: "",
    aboutText2: "",
    strongText: "",
    linkText: ""
  });

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const fetchHomeContent = async () => {
    try {
      setLoading(true);
      const response = await getHomeContent();
      setFormData({
        aboutText1: response.data.aboutText1,
        aboutText2: response.data.aboutText2,
        strongText: response.data.strongText,
        linkText: response.data.linkText
      });
    } catch (error) {
      notifyError("Failed to fetch home content");
      console.error("Error fetching home content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.aboutText1.trim() || !formData.aboutText2.trim() || 
        !formData.strongText.trim() || !formData.linkText.trim()) {
      notifyError("All fields are required");
      return;
    }

    try {
      setSaving(true);
      await updateHomeContent(
        formData.aboutText1,
        formData.aboutText2,
        formData.strongText,
        formData.linkText
      );
      notifySuccess("Home content updated successfully!");
    } catch (error) {
      notifyError(
        error.response?.data?.message || 
        error.message || 
        "Failed to update home content"
      );
      console.error("Error updating home content:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="manage-content">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="manage-content">
      <div className="mc-container">
        <h1 className="mc-title">Manage Home Page Content</h1>
        <p className="mc-subtitle">Edit the content that appears on your home page</p>
        
        <form className="mc-form" onSubmit={handleSubmit}>
          <div className="mc-form-group">
            <label htmlFor="strongText" className="mc-label">
              Strong Text (Bold part of first paragraph)
            </label>
            <input
              type="text"
              id="strongText"
              name="strongText"
              value={formData.strongText}
              onChange={handleInputChange}
              className="mc-input"
              placeholder="e.g., The Mirror Project is"
              required
            />
          </div>

          <div className="mc-form-group">
            <label htmlFor="aboutText1" className="mc-label">
              First Paragraph Content
            </label>
            <textarea
              id="aboutText1"
              name="aboutText1"
              value={formData.aboutText1}
              onChange={handleInputChange}
              className="mc-textarea"
              rows="3"
              placeholder="The rest of the first paragraph..."
              required
            />
            <small className="mc-help-text">
              Note: The strong text will be automatically bolded at the beginning
            </small>
          </div>

          <div className="mc-form-group">
            <label htmlFor="linkText" className="mc-label">
              Link Text (Clickable part of second paragraph)
            </label>
            <input
              type="text"
              id="linkText"
              name="linkText"
              value={formData.linkText}
              onChange={handleInputChange}
              className="mc-input"
              placeholder="e.g., click on Share With Us"
              required
            />
          </div>

          <div className="mc-form-group">
            <label htmlFor="aboutText2" className="mc-label">
              Second Paragraph Content
            </label>
            <textarea
              id="aboutText2"
              name="aboutText2"
              value={formData.aboutText2}
              onChange={handleInputChange}
              className="mc-textarea"
              rows="3"
              placeholder="The rest of the second paragraph..."
              required
            />
            <small className="mc-help-text">
              Note: The link text will be automatically styled within this content
            </small>
          </div>

          <div className="mc-preview">
            <h3 className="mc-preview-title">Preview:</h3>
            <div className="mc-preview-content">
              <p className="about-text">
                <strong>{formData.strongText}</strong> {formData.aboutText1}
              </p>
              <p className="about-text">
                {formData.aboutText2.replace(formData.linkText, '')}
                <span className="share-link">{formData.linkText}</span>
                {formData.aboutText2.split(formData.linkText)[1] || ''}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="mc-save-btn"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageContent;