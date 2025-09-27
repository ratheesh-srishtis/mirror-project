import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Layout/header.css";
const Header = () => {
  const Logo = require("../assets/images/mirrorLogo.png");

  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          {/* Replace with your logo if needed */}
          <span>
            <img className="logo" src={Logo}></img>
          </span>
          <span className="footer__company-name">Mirror Project</span>
        </div>
        <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
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
                  navigate("/videos");
                }}
              >
                Videos
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/join-us");
                }}
              >
                Join Us
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/about");
                }}
              >
                About Us
              </a>
            </li>
            <li>
              <a
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/blogs");
                }}
              >
                Blogs
              </a>
            </li>
          </ul>
        </nav>
        <button
          className={`header__burger ${menuOpen ? "open" : ""}`}
          onClick={handleMenuToggle}
          aria-label="Toggle menu"
        >
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
