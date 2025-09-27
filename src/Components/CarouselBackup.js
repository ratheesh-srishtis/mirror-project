import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Css/components/videos.css";

function Videos() {
  const { region } = useParams();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videosPerSlide, setVideosPerSlide] = useState(3);
  const carouselRef = useRef(null);

  // Sample video data organized by continent
  const videosByContinent = {
    Asia: [
      {
        url: "https://youtu.be/mcpJilEU1e0?si=9wzeQh1UIc6PiaVx",
        title: "Discovering Asia #1",
        description: "Beautiful landscapes of Asia",
        postedDate: "2025-09-01",
        likes: 120,
        comments: 34,
      },
      {
        url: "https://youtu.be/bmqUxO8hBTs?si=OGVJ2ncwu9RhAE9m",
        title: "Asian Culture #2",
        description: "Traditional Asian customs",
        postedDate: "2025-09-02",
        likes: 98,
        comments: 21,
      },
      {
        url: "https://youtu.be/8g-JWMhUJdE?si=2XndkGBbCifrtiey",
        title: "Asian Adventures #3",
        description: "Exploring hidden gems in Asia",
        postedDate: "2025-09-03",
        likes: 150,
        comments: 45,
      },
      {
        url: "https://youtu.be/gXId9M2w5LU?si=si4ePcvrkQon2Mwt",
        title: "Asian Cuisine #4",
        description: "Taste of authentic Asian food",
        postedDate: "2025-09-04",
        likes: 87,
        comments: 19,
      },
    ],
    Africa: [
      {
        url: "https://youtu.be/qSO_MzezQNQ?si=SECxvv3bWB3tE2xD",
        title: "African Wildlife #1",
        description: "Safari adventures in Africa",
        postedDate: "2025-09-05",
        likes: 132,
        comments: 28,
      },
      {
        url: "https://youtu.be/0siE31sqz0Q?si=xs_p8uh_63P8lVsw",
        title: "African Culture #2",
        description: "Rich traditions of Africa",
        postedDate: "2025-09-06",
        likes: 110,
        comments: 25,
      },
      {
        url: "https://youtu.be/8zviPDgCipc?si=RDLl51ToUbRHjCx1",
        title: "African Landscapes #3",
        description: "Breathtaking views of Africa",
        postedDate: "2025-09-07",
        likes: 99,
        comments: 22,
      },
    ],
    Europe: [
      {
        url: "https://youtu.be/qU1FgDG16U4?si=OTzD6K-eJM6dvLOY",
        title: "European Cities #1",
        description: "Historic cities of Europe",
        postedDate: "2025-09-08",
        likes: 143,
        comments: 39,
      },
      {
        url: "https://youtu.be/20o79uGsSwA?si=UmDVvVF4mN4nd9to",
        title: "European Architecture #2",
        description: "Stunning European buildings",
        postedDate: "2025-09-09",
        likes: 105,
        comments: 20,
      },
    ],
    "North America": [
      {
        url: "https://youtu.be/osmqn1A45rU?si=zNWjVMvP0E1E6Knw",
        title: "North American Nature #1",
        description: "Natural wonders of North America",
        postedDate: "2025-09-10",
        likes: 160,
        comments: 50,
      },
    ],
    "South America": [
      {
        url: "https://youtu.be/mcpJilEU1e0?si=9wzeQh1UIc6PiaVx",
        title: "South American Culture #1",
        description: "Vibrant culture of South America",
        postedDate: "2025-09-11",
        likes: 140,
        comments: 32,
      },
    ],
    Australia: [
      {
        url: "https://youtu.be/bmqUxO8hBTs?si=OGVJ2ncwu9RhAE9m",
        title: "Australian Wildlife #1",
        description: "Unique animals of Australia",
        postedDate: "2025-09-12",
        likes: 128,
        comments: 27,
      },
    ],
  };

  // Get all videos if no region is selected, or region-specific videos
  const getCurrentVideos = () => {
    if (selectedRegion && videosByContinent[selectedRegion]) {
      return videosByContinent[selectedRegion];
    }
    // Return all videos if no region is selected
    return Object.values(videosByContinent).flat();
  };

  const currentVideos = getCurrentVideos();
  const totalSlides = Math.ceil(currentVideos.length / videosPerSlide);

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setVideosPerSlide(1);
      } else if (window.innerWidth <= 1024) {
        setVideosPerSlide(2);
      } else {
        setVideosPerSlide(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (region) {
      const regionName = region
        .replace("-videos", "")
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setSelectedRegion(regionName);
      setCurrentSlide(0); // Reset to first slide when region changes
    }
  }, [region]);

  // Navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Helper to convert YouTube URL to embed format
  const getEmbedUrl = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  // Get videos for current slide
  const getVideosForSlide = (slideIndex) => {
    const startIndex = slideIndex * videosPerSlide;
    const endIndex = startIndex + videosPerSlide;
    return currentVideos.slice(startIndex, endIndex);
  };

  return (
    <div className="videos-container">
      <div className="videos-header">
        <h1>
          {selectedRegion ? `Videos from ${selectedRegion}` : "All Videos"}
        </h1>
        <p>
          {selectedRegion
            ? `Discover amazing content from ${selectedRegion}`
            : "Browse our complete collection of videos from around the world"}
        </p>
      </div>

      {currentVideos.length > 0 ? (
        <div className="video-carousel">
          <div className="carousel-container" ref={carouselRef}>
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="carousel-slide">
                  {getVideosForSlide(slideIndex).map((video, videoIndex) => (
                    <div key={videoIndex} className="video-card">
                      <div className="video-frame">
                        <iframe
                          src={getEmbedUrl(video.url)}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="video-info">
                        <h3 className="video-title">{video.title}</h3>
                        <p className="video-description">{video.description}</p>
                        <div className="video-meta">
                          <span className="video-date">{video.postedDate}</span>
                          <div className="video-stats">
                            <span className="stat-item likes">
                              ❤️ {video.likes}
                            </span>
                            <span className="stat-item comments">
                              💬 {video.comments}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          {totalSlides > 1 && (
            <>
              <button
                className="carousel-btn carousel-btn-prev"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                &#8249;
              </button>
              <button
                className="carousel-btn carousel-btn-next"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                &#8250;
              </button>
            </>
          )}

          {/* Dots indicator */}
          {totalSlides > 1 && (
            <div className="carousel-dots">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="no-videos">
          <p>No videos available for this region yet.</p>
        </div>
      )}
    </div>
  );
}

export default Videos;
