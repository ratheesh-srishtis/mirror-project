import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add continent API
export const addContinent = async (name) => {
  return api.post("/continents", { name });
};

// Get continents API
export const getContinents = async () => {
  return api.get("/continents");
};


// Update continent API
export const updateContinent = async (id, name) => {
  return api.put(`/continents/${id}`, { name });
};

// Delete continent API
export const deleteContinent = async (id) => {
  return api.delete(`/continents/${id}`);
};

// Add videos under a continent
export const addVideos = async (continentId, videos) => {
  return api.post("/videos", { continentId, videos });
};

// Get videos by continent API
export const getVideosByContinent = async (continentId) => {
  return api.get(`/videos/${continentId}`);
};

// Delete video by ID API
export const deleteVideo = async (videoId) => {
  return api.delete(`/videos/${videoId}`);
};


// Add more APIs here as needed...

export default api;
