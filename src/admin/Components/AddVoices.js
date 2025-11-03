import React, { useState , useEffect} from "react";
import "../css/addvoices.css";
import { getContinents, addVideos } from "../../config/api";
import { notifyError, notifySuccess } from "../../config/NotificationService";
function AddVoices() {
  const [selectedContinent, setSelectedContinent] = useState("");
    const [continents, setContinents] = useState([]);
  
  const [videos, setVideos] = useState([
    { id: 1, title: "", url: "", error: "" },
  ]);
  const [errors, setErrors] = useState({});

   // Fetch continents on mount
   useEffect(() => {
     fetchContinents();
   }, []);
 
   const fetchContinents = async () => {
     try {
       const response = await getContinents();
       setContinents(response.data);
     } catch (error) {
       notifyError("Failed to fetch continents");
     }
   };

  // YouTube URL validation
  const validateYouTubeUrl = (url) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)[\w-]+([?&][\w=&-]*)?$/;
    return youtubeRegex.test(url);
  };

  // Extract YouTube video ID for embedding
  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Handle continent selection
  const handleContinentChange = (e) => {
    setSelectedContinent(e.target.value);
    setErrors((prev) => ({ ...prev, continent: "" }));
  };

  // Handle video field changes
  const handleVideoChange = (id, field, value) => {
    setVideos((prev) =>
      prev.map((video) => {
        if (video.id === id) {
          const updatedVideo = { ...video, [field]: value };

          // Validate URL if it's the url field
          if (field === "url") {
            if (value && !validateYouTubeUrl(value)) {
              updatedVideo.error = "Please enter a valid YouTube URL";
            } else {
              updatedVideo.error = "";
            }
          }

          return updatedVideo;
        }
        return video;
      })
    );
  };

  // Add new video field
  const addVideoField = () => {
    const newId = Math.max(...videos.map((v) => v.id)) + 1;
    setVideos((prev) => [
      ...prev,
      { id: newId, title: "", url: "", error: "" },
    ]);
  };

  // Remove video field
  const removeVideoField = (id) => {
    if (videos.length > 1) {
      setVideos((prev) => prev.filter((video) => video.id !== id));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate continent selection
    if (!selectedContinent) {
      setErrors({ continent: "Please select a continent" });
      return;
    }

    // Validate videos
    const validVideos = videos.filter(
      (video) => video.title && video.url && !video.error
    );
    if (validVideos.length === 0) {
      alert("Please add at least one valid video with title and URL");
      return;
    }

    // Prepare payload for API call
    const payload = {
      continentId: selectedContinent,
      videos: validVideos.map((video) => ({
        title: video.title,
        youtubeUrl: video.url,
        videoId: getYouTubeVideoId(video.url),
      })),
    };

    try {
    await addVideos(payload.continentId, payload.videos);
    notifySuccess("Videos saved successfully!");
    // Optionally, reset form or fetch videos again
  } catch (error) {
    notifyError(
      error.response?.data?.message ||
        error.message ||
        "Failed to save videos"
    );
  }

    console.log("Payload for API:", payload);
  };

  return (
    <div className="addvoices-container">
      <div className="addvoices-form-wrapper">
        <h2 className="form-title">Add Videos by Continent</h2>

        <form className="addvoices-form" onSubmit={handleSubmit}>
          {/* Continent Selection */}
          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="continent" className="required">
                  Select Continent
                </label>
                <select
                  id="continent"
                  value={selectedContinent}
                  onChange={handleContinentChange}
                  className={`form-select ${errors.continent ? "error" : ""}`}
                  required
                >
                  <option value="">Choose a continent...</option>
                  {continents.map((continent) => (
                    <option key={continent._id} value={continent._id}>
                      {continent.name}
                    </option>
                  ))}
                </select>
                {errors.continent && (
                  <span className="error-message">{errors.continent}</span>
                )}
              </div>
            </div>
          </div>

          {/* Videos Section */}
          <div className="form-section">
            <div className="section-header">
              <h3>YouTube Videos</h3>
              <button
                type="button"
                className="add-video-btn"
                onClick={addVideoField}
              >
                <span className="plus-icon">+</span> Add Video
              </button>
            </div>

            <div className="videos-container">
              {videos.map((video, index) => (
                <div key={video.id} className="video-card">
                  <div className="video-card-header">
                    <span className="video-number">Video #{index + 1}</span>
                    {videos.length > 1 && (
                      <button
                        type="button"
                        className="remove-video-btn"
                        onClick={() => removeVideoField(video.id)}
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <div className="video-fields">
                    <div className="video-content">
                      <div className="video-inputs">
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor={`title-${video.id}`}>
                              Video Title
                            </label>
                            <input
                              type="text"
                              id={`title-${video.id}`}
                              value={video.title}
                              onChange={(e) =>
                                handleVideoChange(
                                  video.id,
                                  "title",
                                  e.target.value
                                )
                              }
                              className="form-input"
                              placeholder="Enter video title..."
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor={`url-${video.id}`}>
                              YouTube URL
                            </label>
                            <input
                              type="url"
                              id={`url-${video.id}`}
                              value={video.url}
                              onChange={(e) =>
                                handleVideoChange(
                                  video.id,
                                  "url",
                                  e.target.value
                                )
                              }
                              className={`form-input ${
                                video.error ? "error" : ""
                              }`}
                              placeholder="https://www.youtube.com/watch?v=..."
                              required
                            />
                            {video.error && (
                              <span className="error-message">
                                {video.error}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* YouTube Preview */}
                      {video.url &&
                        !video.error &&
                        getYouTubeVideoId(video.url) && (
                          <div className="video-preview-wrapper">
                            <div className="video-preview">
                              <label>Preview:</label>
                              <div className="iframe-container">
                                <iframe
                                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                                    video.url
                                  )}`}
                                  title={video.title || `Video ${index + 1}`}
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                ></iframe>
                              </div>
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button type="submit" className="form-save-btn">
              Save Videos
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddVoices;
