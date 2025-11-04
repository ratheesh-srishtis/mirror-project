import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/components/blogs.css";
import AddBlogs from "../admin/Components/AddBlogs";
import { getApprovedBlogs } from "../config/publicApi";
function Blogs() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

    // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

    const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getApprovedBlogs(); 
      setBlogs(response.data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };


  const handleViewBlog = (blogId) => {
    // Find the selected blog
    const selectedBlog = blogs.find((blog) => blog._id === blogId);
    // Navigate to the detailed blog view with the blog data
    navigate(`/view-blog/${blogId}`, { state: { blog: selectedBlog } });
  };
  return (
    <div className="blogs-container">
      <div className="blogs-header">
        <h1 className="blogs-title">Our Blog Stories</h1>
        <button
          type="button"
          className="joinus__add-blogs-btn"
          onClick={openDialog}
        >
          Add Blog
        </button>
      </div>


      {loading ? (
  <div className="loading">Loading blogs...</div>
) : blogs.length === 0 ? (
  <div className="no-blogs">
    <p>No blogs available yet. Be the first to add one!</p>
  </div>
) : (
 <>
    <div className="blogs-grid">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <div className="blog-card-content">
              <h3 className="blog-title">{blog.title}</h3>
       <div 
  className="blog-excerpt"
  dangerouslySetInnerHTML={{
    __html: blog.content.length > 200 
      ? `${blog.content.substring(0, 200)}...`
      : blog.content
  }}
/>
            </div>

            <div className="blog-card-footer">
             <div className="blog-meta">
  <span className="blog-date">
    {new Date(blog.createdAt).toLocaleDateString()}
  </span>
</div>
              <button
                className="view-blog-btn"
              onClick={() => handleViewBlog(blog._id)}
              >
                View Blog
              </button>
            </div> 
          </div>
        ))}
      </div></>
)}

    

      

      {/* Dialog for Add Blogs */}
      {isDialogOpen && (
        <div className="joinus__dialog-overlay" >
          <div className="joinus__dialog" onClick={(e) => e.stopPropagation()}>
            <div className="joinus__dialog-header">
              <h2 className="joinus__dialog-title">Add Blog</h2>
              <button className="joinus__dialog-close" onClick={closeDialog}>
                ×
              </button>
            </div>
            <AddBlogs onClose={closeDialog}/>
          </div>
        </div>
      )}

      
    </div>
  );
}

export default Blogs;
