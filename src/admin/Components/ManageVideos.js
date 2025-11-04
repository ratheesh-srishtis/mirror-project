import React, { useState, useEffect } from "react";
import { deleteVideo } from "../../config/api";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import DeleteIcon from "@mui/icons-material/Delete";
import "../css/manageVideos.css";
import Swal from "sweetalert2";
import { getContinents, getVideosByContinent } from "../../config/publicApi";
import EditIcon from '@mui/icons-material/Edit';
import { notifyError, notifySuccess } from "../../config/NotificationService";
import { editVideo } from "../../config/api";
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



// Add these state variables
const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
const [editingVideo, setEditingVideo] = useState(null);
const [editTitle, setEditTitle] = useState("");
const [editYoutubeUrl, setEditYoutubeUrl] = useState("");
const [editLoading, setEditLoading] = useState(false);

// Add these functions
const openEditDialog = (video) => {
  setEditingVideo(video);
  setEditTitle(video.title);
  setEditYoutubeUrl(video.youtubeUrl);
  setIsEditDialogOpen(true);
};

const closeEditDialog = () => {
  setIsEditDialogOpen(false);
  setEditingVideo(null);
  setEditTitle("");
  setEditYoutubeUrl("");
};

const handleEditVideo = async (e) => {
  e.preventDefault();
  
  if (!editTitle.trim() || !editYoutubeUrl.trim()) {
    notifyError("Title and YouTube URL are required");
    return;
  }

  try {
    setEditLoading(true);
    await editVideo(editingVideo._id, editTitle, editYoutubeUrl);
    notifySuccess("Video updated successfully!");
    
    // Refresh the video list
    const response = await getVideosByContinent(selectedContinent);
    setVideos(response.data);
    
    closeEditDialog();
  } catch (error) {
    notifyError(
      error.response?.data?.message || 
      error.message || 
      "Failed to update video"
    );
    console.error("Error updating video:", error);
  } finally {
    setEditLoading(false);
  }
};

  return (
    <>
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
    className="edit-video-btn"
    onClick={() => openEditDialog(video)}
    title="Edit Video"
  >
    <EditIcon />
  </button>
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

    {/* Edit Video Dialog */}
{isEditDialogOpen && editingVideo && (
  <div className="edit-dialog-overlay" onClick={closeEditDialog}>
    <div className="edit-dialog" onClick={(e) => e.stopPropagation()}>
      <div className="edit-dialog-header">
        <h2 className="edit-dialog-title">Edit Video</h2>
        <button className="edit-dialog-close" onClick={closeEditDialog}>
          ×
        </button>
      </div>
      
      <form className="edit-dialog-form" onSubmit={handleEditVideo}>
        <div className="edit-form-group">
          <label htmlFor="edit-title">Video Title</label>
          <input
            type="text"
            id="edit-title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="edit-form-input"
            placeholder="Enter video title"
            required
          />
        </div>
        
        <div className="edit-form-group">
          <label htmlFor="edit-youtube-url">YouTube URL</label>
          <input
            type="url"
            id="edit-youtube-url"
            value={editYoutubeUrl}
            onChange={(e) => setEditYoutubeUrl(e.target.value)}
            className="edit-form-input"
            placeholder="https://www.youtube.com/watch?v=..."
            required
          />
        </div>
        
        <div className="edit-dialog-actions">
          <button
            type="button"
            className="edit-cancel-btn"
            onClick={closeEditDialog}
            disabled={editLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="edit-save-btn"
            disabled={editLoading}
          >
            {editLoading ? 'Updating...' : 'Update Video'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}</>

  );
}

export default ManageVideos;