import React, { useState, useEffect } from "react";
import { getContinents, getVideosByContinent,deleteVideo } from "../../config/api";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import DeleteIcon from "@mui/icons-material/Delete";
import "../css/manageVideos.css";
import Swal from "sweetalert2";

function ManageVideos() {
  const [continents, setContinents] = useState([]);
  const [selectedContinent, setSelectedContinent] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchContinents();
  }, []);

  const fetchContinents = async () => {
    try {
      const response = await getContinents();
      setContinents(response.data);
    } catch {
      setContinents([]);
    }
  };

  const handleContinentChange = async (e) => {
    const id = e.target.value;
    setSelectedContinent(id);
    if (id) {
      try {
        const response = await getVideosByContinent(id);
        setVideos(response.data);
      } catch {
        setVideos([]);
      }
    } else {
      setVideos([]);
    }
  };

 const handleDeleteVideo = async (videoId) => {
  const result = await Swal.fire({
    title: "Delete Video",
    text: "Are you sure you want to delete this video? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d32f2f",
    cancelButtonColor: "#1976d2",
    confirmButtonText: "Yes, delete it",
  });

  if (result.isConfirmed) {
    try {
      await deleteVideo(videoId);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The video has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });
      // Refresh the videos list
      if (selectedContinent) {
        const response = await getVideosByContinent(selectedContinent);
        setVideos(response.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to delete video.",
      });
    }
  }
};

  return (
    <div className="manage-videos-container">
      <h2>
        <VideoLibraryIcon /> Manage Videos
      </h2>
      <div className="mv-select-row">
        <label htmlFor="mv-continent-select">Select Continent:</label>
        <select
          id="mv-continent-select"
          value={selectedContinent}
          onChange={handleContinentChange}
          className="mv-select"
        >
          <option value="">Choose a continent...</option>
          {continents.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mv-list">
        {videos.length === 0 ? (
          <div className="mv-empty">No videos found for this continent.</div>
        ) : (
          videos.map((video) => (
            <div className="mv-list-item">
              <div className="mv-preview">
                <iframe
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="mv-title">{video.title}</div>
             
               <div className="mv-meta-row">
      <span className="mv-date">
       {new Date(video.createdAt).toLocaleDateString()}
      </span>
      <div className="mv-actions">
        <button
          className="mv-delete-btn"
          onClick={() => handleDeleteVideo(video._id)}
          title="Delete"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageVideos;