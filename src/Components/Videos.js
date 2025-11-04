import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Css/components/videos.css";
import { useLocation } from "react-router-dom";
import { getVideosByContinent ,getAllVideos} from "../config/publicApi";
function Videos() {
  const { region } = useParams();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [carouselStartIndex, setCarouselStartIndex] = useState(0);
  const [videosPerSlide, setVideosPerSlide] = useState(4);
  const carouselRef = useRef(null);

  const location = useLocation();
const [videos, setVideos] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchVideos = async () => {
  const continentId = location.state?.continentId;
  setLoading(true);
  try {
    let response;
    if (continentId) {
      response = await getVideosByContinent(continentId);
    } else {
      response = await getAllVideos();
    }
    setVideos(response.data);
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    setVideos([]);
  } finally {
    setLoading(false);
  }
};

  fetchVideos();
}, []);


  // Get all videos if no region is selected, or region-specific videos
 const getCurrentVideos = () => {
  return videos;
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
  // Check if url exists
  if (!url) return "";
  
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
  // Check if url exists
  if (!url) return "";
  
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
               src={getEmbedUrl(currentVideos[currentVideoIndex]?.youtubeUrl)} 
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
                    {new Date(currentVideos[currentVideoIndex]?.createdAt).toLocaleDateString()} 
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
                        key={video._id}
                        className={`carousel-video-item ${
                          isActive ? "active" : ""
                        }`}
                        onClick={() => handleVideoSelect(actualIndex)}
                      >
                        <div className="carousel-thumbnail">
                          <img
                            src={getThumbnailUrl(video.youtubeUrl)}
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
                           {new Date(video.createdAt).toLocaleDateString()} 
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
