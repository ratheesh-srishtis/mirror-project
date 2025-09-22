import React, { useState } from "react";
import "../css/addvoices.css";

function AddVoices() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    youtubeUrl: "",
    vimeoUrl: "",
    videoFile: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="addvoices-container">
      <form className="addvoices-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add New Voice</h2>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="form-textarea"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="youtubeUrl">YouTube URL</label>
          <input
            type="url"
            id="youtubeUrl"
            name="youtubeUrl"
            value={form.youtubeUrl}
            onChange={handleChange}
            className="form-input"
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="vimeoUrl">Vimeo URL</label>
          <input
            type="url"
            id="vimeoUrl"
            name="vimeoUrl"
            value={form.vimeoUrl}
            onChange={handleChange}
            className="form-input"
            placeholder="https://vimeo.com/..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="videoFile">Custom Video File</label>
          <input
            type="file"
            id="videoFile"
            name="videoFile"
            accept="video/*"
            onChange={handleChange}
            className="form-file-input"
          />
        </div>
        <button type="submit" className="form-save-btn">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddVoices;
