import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaVideo } from "react-icons/fa";
import "../Css/components/home.css";

function Home() {
  const countries = [
    {
      name: "Africa",
      flag: "https://flagcdn.com/w320/za.png", // Example (South Africa)
    },
    {
      name: "Argentina",
      flag: "https://flagcdn.com/w320/ar.png",
    },
    {
      name: "Bolivia",
      flag: "https://flagcdn.com/w320/bo.png",
    },
    {
      name: "China",
      flag: "https://flagcdn.com/w320/cn.png",
    },
    {
      name: "Nigeria",
      flag: "https://flagcdn.com/w320/ng.png",
    },
    {
      name: "Philippines",
      flag: "https://flagcdn.com/w320/ph.png",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="home-container">
      {/* 🔍 Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="card-grid">
        {filteredCountries.map((country, index) => (
          <div key={index} className="country-card">
            <img src={country.flag} alt={country.name} className="flag-img" />
            <div className="card-content">
              <h2>{country.name}</h2>
              <Link
                to={`/${country.name.toLowerCase()}-videos`}
                className="video-link"
              >
                <FaVideo /> Watch Videos
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
