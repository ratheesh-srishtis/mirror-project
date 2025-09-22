import React from "react";
import "../Css/Layout/footer.css";

function Footer() {
  const Logo = require("../assets/images/mirrorLogo.png");

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo-section">
          <img src={Logo} alt="Company Logo" className="footer__logo"></img>

          <span className="footer__company-name">Mirror Project</span>
        </div>
        <div className="footer__menu-section">
          <div className="footer__menu">
            <h4>Company</h4>
            <ul>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/home">Home</a>
              </li>
            </ul>
          </div>
          <div className="footer__menu">
            <h4>Support</h4>
            <ul>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__copyright-section">
          <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
