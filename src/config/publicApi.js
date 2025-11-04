import axios from "axios";

const publicApi = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// ✅ Custom setup to use context outside React
let loaderSetter = null;
export const setLoaderSetter = (fn) => (loaderSetter = fn);

// REQUEST Interceptor
publicApi.interceptors.request.use(
  (config) => {
    if (loaderSetter) loaderSetter(true); // show loader
    return config;
  },
  (error) => {
    if (loaderSetter) loaderSetter(false);
    return Promise.reject(error);
  }
);

// RESPONSE Interceptor
publicApi.interceptors.response.use(
  (response) => {
    if (loaderSetter) loaderSetter(false); // hide loader
    return response;
  },
  (error) => {
    if (loaderSetter) loaderSetter(false); // hide loader
    return Promise.reject(error);
  }
);

// Get continents API (public)
export const getContinents = async () => {
  return publicApi.get("/continents");
};

// Get videos by continent API (public)
export const getVideosByContinent = async (continentId) => {
  return publicApi.get(`/videos/${continentId}`);
};

// Get all videos API (public)
export const getAllVideos = async () => {
  return publicApi.get("/videos/all"); // Update the endpoint
};

// Upload image to Cloudinary API (public)
export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  
  return publicApi.post("/upload/image", formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// Get all blogs API
export const getAllBlogs = async () => {
  return publicApi.get("/blogs");
};

// Get blog by ID API
export const getBlogById = async (id) => {
  return publicApi.get(`/blogs/${id}`);
};


// Add blog API
// Add blog API (public users - pending approval)
export const addBlog = async (title, content) => {
  return publicApi.post("/blogs", { title, content });
};

// Get only approved blogs API (for public users)
export const getApprovedBlogs = async () => {
  return publicApi.get("/blogs/approved");
};

// Get home content API
export const getHomeContent = async () => {
  return publicApi.get("/home-content");
};

export default publicApi;