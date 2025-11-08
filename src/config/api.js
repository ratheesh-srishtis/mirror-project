import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// ✅ Custom setup to use context outside React
let loaderSetter = null;
export const setLoaderSetter = (fn) => (loaderSetter = fn);

// REQUEST Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (loaderSetter) loaderSetter(true); // show loader
    return config;
  },
  (error) => {
    if (loaderSetter) loaderSetter(false);
    return Promise.reject(error);
  }
);

// RESPONSE Interceptor
api.interceptors.response.use(
  (response) => {
    if (loaderSetter) loaderSetter(false); // hide loader
    return response;
  },
  (error) => {
    if (loaderSetter) loaderSetter(false);
    return Promise.reject(error);
  }
);

// Add continent API
export const addContinent = async (name) => {
  return api.post("/continents", { name });
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

// Delete video by ID API
export const deleteVideo = async (videoId) => {
  return api.delete(`/videos/${videoId}`);
};

// Edit blog API
export const editBlog = async (id, title, content) => {
  return api.put(`/blogs/${id}`, { title, content });
};

// Delete blog API
export const deleteBlog = async (id) => {
  return api.delete(`/blogs/${id}`);
};

// Approve blog API
export const approveBlog = async (id) => {
  return api.put(`/blogs/${id}/approve`);
};

// Reject blog API
export const rejectBlog = async (id) => {
  return api.put(`/blogs/${id}/reject`);
};

// Add blog by admin API (auto-approved)
export const addBlogByAdmin = async (title, content) => {
  return api.post("/blogs/admin", { title, content });
};

// Edit video API
export const editVideo = async (videoId, title, youtubeUrl) => {
  return api.put(`/videos/${videoId}`, { title, youtubeUrl });
};

// Add these FAQ API functions to your existing api.js file

// Search FAQs (Public)
export const searchFAQs = async (query, page = 1, limit = 10) => {
  return api.get(`/faqs/search?q=${query}&page=${page}&limit=${limit}`);
};

// Add FAQ (Protected - Admin only)
export const addFAQ = async (question, answer) => {
  return api.post("/faqs", { question, answer });
};

// Update FAQ (Protected - Admin only)
export const updateFAQ = async (id, question, answer) => {
  return api.put(`/faqs/${id}`, { question, answer });
};

// Delete FAQ (Protected - Admin only)
export const deleteFAQ = async (id) => {
  return api.delete(`/faqs/${id}`);
};

// Delete multiple FAQs (Protected - Admin only)
export const deleteMultipleFAQs = async (ids) => {
  return api.delete("/faqs", { data: { ids } });
};

// Update home content API
export const updateHomeContent = async (
  aboutText1,
  aboutText2,
  strongText,
  linkText
) => {
  return api.put("/home-content", {
    aboutText1,
    aboutText2,
    strongText,
    linkText,
  });
};
// Add more APIs here as needed...

export default api;
