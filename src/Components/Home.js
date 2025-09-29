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
      {/* About Us Section */}
      <div className="about-section">
        <div className="about-content">
          <p className="about-text">
            The Mirror Project is a global youth cultural exchange built around
            a simple idea: when we listen to each other, we see ourselves more
            clearly.
          </p>
          <p className="about-text">
            We asked teens and young adults from around the world about American
            teenagers, their own cultures, and the stereotypes they face. From
            Asia to Africa to South America, their answers reveal both the
            differences that shape us and the common ground we share. Below we
            highlight short, authentic clips that capture real feelings,
            unexpected insights, and new ways of seeing each other.
          </p>
          <p className="about-text">
            Our goal is to challenge stereotypes and open a dialogue across
            borders. As teens and young adults share their perspectives, they
            offer us a mirror that helps us see ourselves and each other in new
            ways.
          </p>
          <p className="about-text">
            Share your story with us on social media or{" "}
            <span className="share-link">click on Share With Us</span> to join
            the conversation.
          </p>
        </div>
      </div>

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
