import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Css/components/viewblog.css";

function ViewBlog() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get the blog data from navigation state
  const blog = location.state?.blog;

  const handleBackToBlog = () => {
    navigate("/blogs");
  };

  // If no blog data is available, show error
  if (!blog) {
    return (
      <div className="viewblog-container">
        <div className="viewblog-error">
          <h2>Blog not found</h2>
          <p>
            The blog you're looking for doesn't exist or wasn't loaded properly.
          </p>
          <button className="back-to-blogs-btn" onClick={handleBackToBlog}>
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="viewblog-container">
      <div className="viewblog-content">
        {/* Navigation */}
        <div className="viewblog-navigation">
          <button className="back-to-blogs-btn" onClick={handleBackToBlog}>
            ← Back to Blogs
          </button>
        </div>

        {/* Blog Header */}
        <header className="viewblog-header">
          <h1 className="viewblog-title">{blog.title}</h1>
          <div className="viewblog-meta">
            <span className="viewblog-author">By {blog.author}</span>
            <span className="viewblog-date">{blog.date}</span>
          </div>
        </header>

        {/* Featured Image */}
        <div className="viewblog-image-container">
          <img
            src={blog.image}
            alt={blog.title}
            className="viewblog-featured-image"
          />
        </div>

        {/* Blog Content */}
        <article className="viewblog-article">
          <div className="viewblog-content-body">
            <p className="viewblog-paragraph">{blog.content}</p>
          </div>
        </article>

        {/* Social Share Section */}
        {/* <div className="viewblog-share">
          <h3>Share this blog</h3>
          <div className="viewblog-share-buttons">
            <button className="share-btn facebook">Share on Facebook</button>
            <button className="share-btn twitter">Share on Twitter</button>
            <button className="share-btn linkedin">Share on LinkedIn</button>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ViewBlog;
