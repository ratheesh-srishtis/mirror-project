import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../Css/components/home.css";
import { notifyError, notifySuccess } from "../config/NotificationService";
import { getContinents } from "../config/publicApi";
import {getHomeContent} from "../config/publicApi";
function Home() {
  const navigate = useNavigate();
  const [continents, setContinents] = useState([]);

    // Fetch continents on mount
    useEffect(() => {
      fetchContinents();
    }, []);

    // Add this function before your component return
const mapContinentData = (continents) => {
  const staticData = {
    "Asia": { theme: "asia", tag: "Explore", urlSlug: "asia-videos" },
    "Africa": { theme: "africa", tag: "Explore", urlSlug: "africa-videos" },
    "North America": { theme: "north-america", tag: "Explore", urlSlug: "north-america-videos" },
    "South America": { theme: "south-america", tag: "Explore", urlSlug: "south-america-videos" },
    "Europe": { theme: "europe", tag: "Explore", urlSlug: "europe-videos" },
    "Australia": { theme: "australia", tag: "Explore", urlSlug: "australia-videos" },
  };

  return continents.map(continent => ({
    ...continent,
    ...staticData[continent.name] || { theme: "default", tag: "Explore", urlSlug: `${continent.name.toLowerCase().replace(/\s+/g, "-")}-videos` }
  }));
};
  
// Update your fetchContinents function
const fetchContinents = async () => {
  try {
    const response = await getContinents();
    const mappedContinents = mapContinentData(response.data);
    setContinents(mappedContinents);
  } catch (error) {
    notifyError("Failed to fetch continents");
  }
};

  

  // const continents = [
  //   {
  //     name: "Asia",
  //     theme: "asia",
  //     tag: "Explore",
  //     urlSlug: "asia-videos",
  //   },
  //   {
  //     name: "Africa",
  //     theme: "africa",
  //     tag: "Explore",
  //     urlSlug: "africa-videos",
  //   },
  //   {
  //     name: "North America",
  //     theme: "north-america",
  //     tag: "Explore",
  //     urlSlug: "north-america-videos",
  //   },
  //   {
  //     name: "South America",
  //     theme: "south-america",
  //     tag: "Explore",
  //     urlSlug: "south-america-videos",
  //   },
  //   {
  //     name: "Europe",
  //     theme: "europe",
  //     tag: "Explore",
  //     urlSlug: "europe-videos",
  //   },
  //   {
  //     name: "Australia",
  //     theme: "australia",
  //     tag: "Explore",
  //     urlSlug: "australia-videos",
  //   },
  // ];

// Update your handleContinentClick to pass the _id
const handleContinentClick = (continent) => {
  navigate(`/videos/${continent.urlSlug}`, { 
    state: { continentId: continent._id, continentName: continent.name } 
  });
};

// In your Home component
const [homeContent, setHomeContent] = useState({
  aboutText1: "a global youth cultural exchange built around a simple idea: when we listen to each other, we see ourselves more clearly.",
  aboutText2: "Share your story with us on social media or click on Share With Us to join the conversation.",
  strongText: "The Mirror Project is",
  linkText: "click on Share With Us"
});

useEffect(() => {
  fetchHomeContent();
}, []);

const fetchHomeContent = async () => {
  try {
    const response = await getHomeContent();
    setHomeContent(response.data);
  } catch (error) {
    console.error("Error fetching home content:", error);
    // Keep default content if fetch fails
  }
};

  return (
    <div className="home-container">
      {/* About Us Section */}
      <div className="about-section">
        <div className="about-content-home">
        <p className="about-text">
  <strong>{homeContent.strongText}</strong> {homeContent.aboutText1}
</p>
<p className="about-text">
  {homeContent.aboutText2.split(homeContent.linkText)[0]}
  <span className="share-link">{homeContent.linkText}</span>
  {homeContent.aboutText2.split(homeContent.linkText)[1] || ''}
</p>
        </div>

                  {/* <p className="about-text">
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
          </p> */}

      </div>

      <div className="continents-section">
        {/* <h2 className="section-title">Choose Your Destination</h2> */}
        <div className="continents-grid">
          {continents.map((continent, index) => (
            <div key={index} className={`continent-circle ${continent.theme}`}>
              <div className="circle-content">
                <h3 className="continent-name">{continent.name}</h3>
              <button
  className="continent-tag"
  onClick={() => handleContinentClick(continent)}
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
