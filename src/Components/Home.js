import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/components/home.css";

function Home() {
  const navigate = useNavigate();

  const continents = [
    {
      name: "Asia",
      theme: "asia",
      tag: "Explore",
      urlSlug: "asia-videos",
    },
    {
      name: "Africa",
      theme: "africa",
      tag: "Explore",
      urlSlug: "africa-videos",
    },
    {
      name: "North America",
      theme: "north-america",
      tag: "Explore",
      urlSlug: "north-america-videos",
    },
    {
      name: "South America",
      theme: "south-america",
      tag: "Explore",
      urlSlug: "south-america-videos",
    },
    {
      name: "Europe",
      theme: "europe",
      tag: "Explore",
      urlSlug: "europe-videos",
    },
    {
      name: "Australia",
      theme: "australia",
      tag: "Explore",
      urlSlug: "australia-videos",
    },
  ];

  const handleContinentClick = (continent) => {
    const selectedContinent = continents.find((c) => c.name === continent);
    if (selectedContinent) {
      navigate(`/videos/${selectedContinent.urlSlug}`);
    }
  };

  return (
    <div className="home-container">
      <div className="continents-section">
        <h2 className="section-title">Choose Your Destination</h2>
        <div className="continents-grid">
          {continents.map((continent, index) => (
            <div key={index} className={`continent-circle ${continent.theme}`}>
              <div className="circle-content">
                <h3 className="continent-name">{continent.name}</h3>
                <button
                  className="continent-tag"
                  onClick={() => handleContinentClick(continent.name)}
                >
                  {continent.tag}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
