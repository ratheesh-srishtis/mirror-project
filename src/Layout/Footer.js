import React from "react";
import "../Css/Layout/footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const Logo = require("../assets/images/mirrorLogo.png");
  const navigate = useNavigate();
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
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/");
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/about");
                  }}
                >
                  about
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__menu">
            <h4>Support</h4>
            <ul>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/contact");
                  }}
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/faq");
                  }}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__copyright-section">
          <p>
            &copy; {new Date().getFullYear()} My App. All rights reserved.{" "}
            <span>Version : 0.01</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
