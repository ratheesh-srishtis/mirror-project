import React, { useState, useEffect } from "react";
import { approveBlog, rejectBlog, deleteBlog } from "../../config/api";
import { getAllBlogs } from "../../config/publicApi";
import { notifySuccess, notifyError } from "../../config/NotificationService";
import "../css/manageBlogs.css";
import DeleteIcon from '@mui/icons-material/Delete';

function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, []); 

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogs();
      setBlogs(response.data);
    } catch (error) {
      notifyError("Failed to fetch blogs");
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const openDialog = (blog) => {
    setSelectedBlog(blog);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedBlog(null);
    setIsDialogOpen(false);
  };

  const handleApprove = async () => {
    if (!selectedBlog) return;

    try {
      setActionLoading(true);
      await approveBlog(selectedBlog._id);
      notifySuccess("Blog approved successfully!");
      
      // Update the blog status in state
      setBlogs(blogs.map(blog => 
        blog._id === selectedBlog._id 
          ? { ...blog, isAdminApproved: true, status: 'approved' }
          : blog
      ));
      
      closeDialog();
    } catch (error) {
      notifyError("Failed to approve blog");
      console.error("Error approving blog:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!selectedBlog) return;

    try {
      setActionLoading(true);
      await rejectBlog(selectedBlog._id);
      notifySuccess("Blog rejected successfully!");
      
      // Update the blog status in state
      setBlogs(blogs.map(blog => 
        blog._id === selectedBlog._id 
          ? { ...blog, isAdminApproved: false, status: 'rejected' }
          : blog
      ));
      
      closeDialog();
    } catch (error) {
      notifyError("Failed to reject blog");
      console.error("Error rejecting blog:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const getBlogStatus = (blog) => {
    if (blog.status === 'rejected') return 'rejected';
    if (blog.isAdminApproved) return 'approved';
    return 'pending';
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'approved': return 'mb-badge-approved';
      case 'rejected': return 'mb-badge-rejected';
      case 'pending': return 'mb-badge-pending';
      default: return 'mb-badge-pending';
    }
  };

  if (loading) {
    return (
      <div className="mb-container">
        <div className="mb-loading">Loading blogs...</div>
      </div>
    );
  }

  const handleDelete = async (blogId) => {
  if (!window.confirm('Are you sure you want to delete this blog? This action cannot be undone.')) {
    return;
  }

  try {
    await deleteBlog(blogId);
    notifySuccess("Blog deleted successfully!");
    
    // Remove the blog from state
    setBlogs(blogs.filter(blog => blog._id !== blogId));
    
    // Close dialog if the deleted blog was being viewed
    if (selectedBlog && selectedBlog._id === blogId) {
      closeDialog();
    }
  } catch (error) {
    notifyError("Failed to delete blog");
    console.error("Error deleting blog:", error);
  }
};

  return (
    <div className="mb-container">
      <div className="mb-header">
        <h1 className="mb-title">Manage Blogs</h1>
        <p className="mb-subtitle">Review and manage all blog posts</p>
      </div>

      {blogs.length === 0 ? (
        <div className="mb-no-blogs">
          <p>No blogs found.</p>
        </div>
      ) : (
        <div className="mb-grid">
          {blogs.map((blog) => {
            const status = getBlogStatus(blog);
            return (
              <div key={blog._id} className="mb-card">
               <div className="mb-card-header">
  <h3 className="mb-card-title">{blog.title}</h3>
  <div className="mb-card-actions">
    <span className={`mb-badge ${getStatusBadgeClass(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  <button
  className="mb-delete-btn"
  onClick={() => handleDelete(blog._id)}
  title="Delete Blog"
>
  <DeleteIcon fontSize="small" />
</button>
  </div>
</div>
                
                <div className="mb-card-content">
                  <div 
                    className="mb-card-excerpt"
                    dangerouslySetInnerHTML={{
                      __html: blog.content.length > 150 
                        ? `${blog.content.substring(0, 150)}...`
                        : blog.content
                    }}
                  />
                </div>
                
                <div className="mb-card-footer">
                  <div className="mb-card-meta">
                    <span className="mb-card-date">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    className="mb-view-btn"
                    onClick={() => openDialog(blog)}
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Blog Details Dialog */}
      {isDialogOpen && selectedBlog && (
        <div className="mb-dialog-overlay" onClick={closeDialog}>
          <div className="mb-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="mb-dialog-header">
              <h2 className="mb-dialog-title">{selectedBlog.title}</h2>
              <button className="mb-dialog-close" onClick={closeDialog}>
                ×
              </button>
            </div>
            
            <div className="mb-dialog-content">
              <div className="mb-dialog-meta">
                <span className="mb-dialog-date">
                  Created: {new Date(selectedBlog.createdAt).toLocaleDateString()}
                </span>
                <span className={`mb-badge ${getStatusBadgeClass(getBlogStatus(selectedBlog))}`}>
                  {getBlogStatus(selectedBlog).charAt(0).toUpperCase() + getBlogStatus(selectedBlog).slice(1)}
                </span>
              </div>
              
              <div className="mb-dialog-body">
                <div 
                  className="mb-blog-content"
                  dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                />
              </div>
            </div>
            
            <div className="mb-dialog-actions">
              <button
                className="mb-action-btn mb-approve-btn"
                onClick={handleApprove}
                disabled={actionLoading || getBlogStatus(selectedBlog) === 'approved'}
              >
                {actionLoading ? 'Processing...' : 'Approve'}
              </button>
              <button
                className="mb-action-btn mb-reject-btn"
                onClick={handleReject}
                disabled={actionLoading || getBlogStatus(selectedBlog) === 'rejected'}
              >
                {actionLoading ? 'Processing...' : 'Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageBlogs;