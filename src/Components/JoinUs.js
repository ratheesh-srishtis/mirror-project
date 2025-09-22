import React, { useState } from "react";
import "../Css/components/joinus.css";

function JoinUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    occupation: "",
    message: "",
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
        <h2 className="joinus__title">Join Us</h2>
        <div className="joinus__fields-row">
          <div className="joinus__field">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="joinus__field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="joinus__fields-row">
          <div className="joinus__field">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="joinus__field">
            <label htmlFor="occupation">Occupation</label>
            <input
              type="text"
              id="occupation"
              name="occupation"
              value={form.occupation}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="joinus__field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={form.message}
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
