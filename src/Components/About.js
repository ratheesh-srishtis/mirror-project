import React from "react";
import "../Css/components/about.css";
import { FaInstagram, FaTiktok, FaYoutube, FaXTwitter } from "react-icons/fa6";

function About() {
  return (
    <div className="about-container">
      <section className="about-content">
        <h1>About Us</h1>
        <p>
          Welcome to our platform! We are passionate about creating engaging
          content and building a community of like-minded people who share the
          same interests. Our mission is to entertain, inspire, and connect with
          audiences across the globe.
        </p>
        <p>
          Through our work, we aim to provide valuable insights, exciting
          stories, and fun experiences that keep you coming back for more. Thank
          you for being part of our journey!
        </p>
      </section>

      {/* <section className="social-media">
        <h2>Our Social Media's</h2>
        <div className="icons">
          <a
            href="https://instagram.com/youraccount"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://tiktok.com/@youraccount"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTiktok />
          </a>
          <a
            href="https://youtube.com/@youraccount"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
        </div>
      </section> */}
    </div>
  );
}

export default About;
