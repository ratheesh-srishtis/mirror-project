import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/components/blogs.css";
import AddBlogs from "../admin/Components/AddBlogs";

function Blogs() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // Demo blogs data
  const blogPosts = [
    {
      id: 1,
      title: "Breaking Stereotypes: Global Teen Perspectives",
      content:
        "We asked teens and young adults from around the world about American teenagers, their own cultures, and the stereotypes they face. From Asia to Africa to South America, their answers reveal both the differences that shape us and the common ground we share. We highlight short, authentic clips that capture real feelings, unexpected insights, and new ways of seeing each other. Our goal is to challenge stereotypes and open a dialogue across borders. As teens and young adults share their perspectives, they offer us a mirror that helps us see ourselves and each other in new ways. Share your story with us on social media or share your comments/blog to join the conversation.",
      author: "Sarah Mitchell",
      date: "October 5, 2024",
      image:
        "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 2,
      title: "The Power of Youth Voices in Social Change",
      content:
        "Young people today are more connected and empowered than ever before. Through digital platforms and grassroots movements, they're driving conversations about climate change, social justice, and equality. This blog explores how youth voices are reshaping our world and creating lasting impact in their communities. From organizing protests to starting innovative nonprofits, young leaders are proving that age is just a number when it comes to making a difference.",
      author: "Sarah Mitchell",
      date: "October 3, 2024",
      image:
        "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 3,
      title: "Digital Storytelling: Connecting Cultures Through Technology",
      content:
        "In an increasingly digital world, storytelling has evolved beyond traditional boundaries. Social media, podcasts, and video platforms have become powerful tools for sharing personal narratives and connecting with audiences across the globe. This post examines how young creators are using technology to bridge cultural gaps and foster understanding between different communities.",
      author: "Alex Rodriguez",
      date: "October 1, 2024",
      image:
        "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 4,
      title: "Mental Health Awareness: Breaking the Silence",
      content:
        "Mental health conversations among young people have gained momentum in recent years. This blog discusses the importance of open dialogue about mental wellness, the role of peer support, and how communities can create safe spaces for these crucial conversations. We explore various resources and strategies that help young people navigate mental health challenges.",
      author: "Dr. Emily Chen",
      date: "September 28, 2024",
      image:
        "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 5,
      title: "Sustainable Living: Small Steps, Big Impact",
      content:
        "Climate change is one of the most pressing issues facing young people today. This blog post highlights practical ways teens and young adults can adopt sustainable practices in their daily lives. From reducing plastic consumption to supporting eco-friendly brands, small individual actions can collectively create significant environmental impact.",
      author: "Green Initiative Team",
      date: "September 25, 2024",
      image:
        "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
      id: 6,
      title: "The Future of Education: Learning Beyond Classrooms",
      content:
        "Traditional education is evolving rapidly, with new learning methodologies and technologies reshaping how knowledge is shared and acquired. This post explores innovative educational approaches, the rise of online learning platforms, and how young learners are adapting to these changes while pursuing their academic and career goals.",
      author: "Education Innovators",
      date: "September 22, 2024",
      image:
        "https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
  ];

  const handleViewBlog = (blogId) => {
    // Find the selected blog
    const selectedBlog = blogPosts.find((blog) => blog.id === blogId);
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

      {/* Blog Cards Grid */}
      <div className="blogs-grid">
        {blogPosts.map((blog) => (
          <div key={blog.id} className="blog-card">
            <div className="blog-card-content">
              <h3 className="blog-title">{blog.title}</h3>
              <p className="blog-excerpt">
                {blog.content.length > 150
                  ? `${blog.content.substring(0, 150)}...`
                  : blog.content}
              </p>
            </div>

            <div className="blog-card-footer">
              <div className="blog-meta">
                <span className="blog-author">By {blog.author}</span>
                <span className="blog-date">{blog.date}</span>
              </div>
              <button
                className="view-blog-btn"
                onClick={() => handleViewBlog(blog.id)}
              >
                View Blog
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dialog for Add Blogs */}
      {isDialogOpen && (
        <div className="joinus__dialog-overlay" onClick={closeDialog}>
          <div className="joinus__dialog" onClick={(e) => e.stopPropagation()}>
            <div className="joinus__dialog-header">
              <h2 className="joinus__dialog-title">Add Blog</h2>
              <button className="joinus__dialog-close" onClick={closeDialog}>
                ×
              </button>
            </div>
            <AddBlogs />
          </div>
        </div>
      )}
    </div>
  );
}

export default Blogs;
