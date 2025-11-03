import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Css/components/videos.css";

function Videos() {
  const { region } = useParams();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [carouselStartIndex, setCarouselStartIndex] = useState(0);
  const [videosPerSlide, setVideosPerSlide] = useState(4);
  const carouselRef = useRef(null);

  // Sample video data organized by continent
  const videosByContinent = {
    Asia: [
      {
        id: 1,
        url: "https://youtube.com/shorts/jdklsqqf9Fw?si=mBXPY0GCrgjjQZi0",
        title: "Discovering Asia #1",
        description: "Beautiful landscapes of Asia",
        postedDate: "2025-09-01",
      },
      {
        id: 2,
        url: "https://youtu.be/bmqUxO8hBTs?si=OGVJ2ncwu9RhAE9m",
        title: "Asian Culture #2",
        description: "Traditional Asian customs",
        postedDate: "2025-09-02",
      },
      {
        id: 3,
        url: "https://youtu.be/8g-JWMhUJdE?si=2XndkGBbCifrtiey",
        title: "Asian Adventures #3",
        description: "Exploring hidden gems in Asia",
        postedDate: "2025-09-03",
      },
      {
        id: 4,
        url: "https://youtu.be/gXId9M2w5LU?si=si4ePcvrkQon2Mwt",
        title: "Asian Cuisine #4",
        description: "Taste of authentic Asian food",
        postedDate: "2025-09-04",
      },
      {
        id: 5,
        url: "https://youtu.be/qSO_MzezQNQ?si=SECxvv3bWB3tE2xD",
        title: "Asian Markets #5",
        description: "Bustling markets across Asia",
        postedDate: "2025-09-05",
      },
      {
        id: 6,
        url: "https://youtu.be/qSO_MzezQNQ?si=SECxvv3bWB3tE2xD",
        title: "Asian Markets #6",
        description: "Bustling markets across Asia",
        postedDate: "2025-09-05",
      },
      {
        id: 7,
        url: "https://youtu.be/0siE31sqz0Q?si=xs_p8uh_63P8lVsw",
        title: "Asian Markets #7",
        description: "Bustling markets across Asia",
        postedDate: "2025-09-05",
      },
      {
        id: 8,
        url: "https://youtu.be/8zviPDgCipc?si=RDLl51ToUbRHjCx1",
        title: "Asian Markets #8",
        description: "Bustling markets across Asia",
        postedDate: "2025-09-05",
      },
      {
        id: 9,
        url: "https://youtu.be/qU1FgDG16U4?si=OTzD6K-eJM6dvLOY",
        title: "Asian Markets #9",
        description: "Bustling markets across Asia",
        postedDate: "2025-09-05",
      },
    ],
    Africa: [
      {
        id: 6,
        url: "https://youtu.be/qSO_MzezQNQ?si=SECxvv3bWB3tE2xD",
        title: "African Wildlife #1",
        description: "Safari adventures in Africa",
        postedDate: "2025-09-05",
      },
      {
        id: 7,
        url: "https://youtu.be/0siE31sqz0Q?si=xs_p8uh_63P8lVsw",
        title: "African Culture #2",
        description: "Rich traditions of Africa",
        postedDate: "2025-09-06",
      },
      {
        id: 8,
        url: "https://youtu.be/8zviPDgCipc?si=RDLl51ToUbRHjCx1",
        title: "African Landscapes #3",
        description: "Breathtaking views of Africa",
        postedDate: "2025-09-07",
      },
    ],
    Europe: [
      {
        id: 9,
        url: "https://youtu.be/qU1FgDG16U4?si=OTzD6K-eJM6dvLOY",
        title: "European Cities #1",
        description: "Historic cities of Europe",
        postedDate: "2025-09-08",
      },
      {
        id: 10,
        url: "https://youtu.be/20o79uGsSwA?si=UmDVvVF4mN4nd9to",
        title: "European Architecture #2",
        description: "Stunning European buildings",
        postedDate: "2025-09-09",
      },
    ],
    "North America": [
      {
        id: 11,
        url: "https://youtu.be/osmqn1A45rU?si=zNWjVMvP0E1E6Knw",
        title: "North American Nature #1",
        description: "Natural wonders of North America",
        postedDate: "2025-09-10",
      },
    ],
    "South America": [
      {
        id: 12,
        url: "https://youtu.be/mcpJilEU1e0?si=9wzeQh1UIc6PiaVx",
        title: "South American Culture #1",
        description: "Vibrant culture of South America",
        postedDate: "2025-09-11",
      },
    ],
    Australia: [
      {
        id: 13,
        url: "https://youtu.be/bmqUxO8hBTs?si=OGVJ2ncwu9RhAE9m",
        title: "Australian Wildlife #1",
        description: "Unique animals of Australia",
        postedDate: "2025-09-12",
      },
    ],
  };

  // Get all videos if no region is selected, or region-specific videos
  const getCurrentVideos = () => {
    if (selectedRegion && videosByContinent[selectedRegion]) {
      return videosByContinent[selectedRegion];
    }
    return Object.values(videosByContinent).flat();
  };

  const currentVideos = getCurrentVideos();

  // Handle responsive design for carousel
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setVideosPerSlide(2);
      } else if (window.innerWidth <= 768) {
        setVideosPerSlide(3);
      } else if (window.innerWidth <= 1024) {
        setVideosPerSlide(4);
      } else {
        // Desktop - vertical layout with fewer videos visible
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
      setCurrentVideoIndex(0);
      setCarouselStartIndex(0);
    }
  }, [region]);

  // Helper to convert YouTube URL to embed format
  const getEmbedUrl = (url) => {
    // Common YouTube embed parameters for clean view
    const params = "?rel=0&modestbranding=1&showinfo=0&controls=1";
    // Handle Shorts URLs
    const shortsMatch = url.match(/youtube\.com\/shorts\/([\w-]{11})/);
    if (shortsMatch) {
      return `https://www.youtube.com/embed/${shortsMatch[1]}${params}`;
    }
    // Handle regular YouTube URLs
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}${params}` : url;
  };

  // Get YouTube thumbnail
  const getThumbnailUrl = (url) => {
    // Handle Shorts URLs
    const shortsMatch = url.match(/youtube\.com\/shorts\/([\w-]{11})/);
    if (shortsMatch) {
      return `https://img.youtube.com/vi/${shortsMatch[1]}/maxresdefault.jpg`;
    }
    // Handle regular YouTube URLs
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    return match
      ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`
      : "";
  };

  // Handle video selection
  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);
  };

  // Carousel navigation
  const scrollCarousel = (direction) => {
    const maxStartIndex = Math.max(0, currentVideos.length - videosPerSlide);

    if (direction === "next") {
      setCarouselStartIndex(Math.min(carouselStartIndex + 1, maxStartIndex));
    } else {
      setCarouselStartIndex(Math.max(carouselStartIndex - 1, 0));
    }
  };

  const getVisibleVideos = () => {
    return currentVideos.slice(
      carouselStartIndex,
      carouselStartIndex + videosPerSlide
    );
  };

  const canScrollPrev = carouselStartIndex > 0;
  const canScrollNext =
    carouselStartIndex + videosPerSlide < currentVideos.length;

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
        <div className="video-player-gallery">
          {/* Main Video Player */}
          <div className="main-video-section">
            <div className="main-video-player">
              <iframe
                src={getEmbedUrl(currentVideos[currentVideoIndex]?.url)}
                title={currentVideos[currentVideoIndex]?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="main-video-info">
              <h2 className="main-video-title">
                {currentVideos[currentVideoIndex]?.title}
              </h2>
              <div className="main-video-meta">
                <p className="main-video-description">
                  {currentVideos[currentVideoIndex]?.description}
                </p>
                <span className="main-video-date">
                  {currentVideos[currentVideoIndex]?.postedDate}
                </span>
              </div>
            </div>
          </div>

          {/* Video Carousel */}
          {currentVideos.length > 1 && (
            <div className="video-carousel-section">
              <div className="carousel-header">
                <h3>More Videos</h3>
                <div className="carousel-controls">
                  <button
                    className={`carousel-btn carousel-btn-prev ${
                      !canScrollPrev ? "disabled" : ""
                    }`}
                    onClick={() => scrollCarousel("prev")}
                    disabled={!canScrollPrev}
                    aria-label="Previous videos"
                  >
                    <span className="arrow-desktop">&#8593;</span>
                    <span className="arrow-mobile">&#8249;</span>
                  </button>
                  <button
                    className={`carousel-btn carousel-btn-next ${
                      !canScrollNext ? "disabled" : ""
                    }`}
                    onClick={() => scrollCarousel("next")}
                    disabled={!canScrollNext}
                    aria-label="Next videos"
                  >
                    <span className="arrow-desktop">&#8595;</span>
                    <span className="arrow-mobile">&#8250;</span>
                  </button>
                </div>
              </div>

              <div className="carousel-container" ref={carouselRef}>
                <div className="carousel-track">
                  {getVisibleVideos().map((video, index) => {
                    const actualIndex = carouselStartIndex + index;
                    const isActive = actualIndex === currentVideoIndex;

                    return (
                      <div
                        key={video.id}
                        className={`carousel-video-item ${
                          isActive ? "active" : ""
                        }`}
                        onClick={() => handleVideoSelect(actualIndex)}
                      >
                        <div className="carousel-thumbnail">
                          <img
                            src={getThumbnailUrl(video.url)}
                            alt={video.title}
                            loading="lazy"
                          />
                          <div className="play-overlay">
                            <div className="play-icon">▶</div>
                          </div>
                          {isActive && <div className="active-indicator"></div>}
                        </div>
                        <div className="carousel-video-info">
                          <h4 className="carousel-video-title">
                            {video.title}
                          </h4>
                          <span className="carousel-video-date">
                            {video.postedDate}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="no-videos">
          <div className="no-videos-content">
            <div className="no-videos-icon">🎬</div>
            <h3>No videos available</h3>
            <p>No videos found for this region yet. Check back soon!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Videos;
