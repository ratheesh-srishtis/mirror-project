import React, { useState } from "react";
import "../Css/components/joinus.css";

function JoinUs() {
  const [form, setForm] = useState({
    name: "",
    country: "",
    comments: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="joinus__wrapper">
      <form className="joinus__form" onSubmit={handleSubmit}>
        {/* <div className="joinus__logo">
          <img src="/logo192.png" alt="Logo" />
        </div> */}
        <h2 className="joinus__title">Share With Us</h2>
        <div className="joinus__field">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="joinus__field">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
          />
        </div>

        <div className="joinus__field">
          <label htmlFor="comments">Comments</label>
          <textarea
            id="comments"
            name="comments"
            value={form.comments}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <button type="submit" className="joinus__btn">
          Join Us
        </button>
      </form>
    </div>
  );
}

export default JoinUs;
