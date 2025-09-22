import React from "react";
import "../Css/components/voices.css";

const videos = [
  {
    url: "https://youtu.be/mcpJilEU1e0?si=9wzeQh1UIc6PiaVx",
    title: "Inspiring Voices #1",
    description: "A motivational talk to start your day.",
    postedDate: "2025-09-01",
    likes: 120,
    comments: 34,
  },
  {
    url: "https://youtu.be/bmqUxO8hBTs?si=OGVJ2ncwu9RhAE9m",
    title: "Inspiring Voices #2",
    description: "Learn how to overcome challenges.",
    postedDate: "2025-09-02",
    likes: 98,
    comments: 21,
  },
  {
    url: "https://youtu.be/8g-JWMhUJdE?si=2XndkGBbCifrtiey",
    title: "Inspiring Voices #3",
    description: "Success stories from real people.",
    postedDate: "2025-09-03",
    likes: 150,
    comments: 45,
  },
  {
    url: "https://youtu.be/gXId9M2w5LU?si=si4ePcvrkQon2Mwt",
    title: "Inspiring Voices #4",
    description: "Tips for personal growth.",
    postedDate: "2025-09-04",
    likes: 87,
    comments: 19,
  },
  {
    url: "https://youtu.be/qSO_MzezQNQ?si=SECxvv3bWB3tE2xD",
    title: "Inspiring Voices #5",
    description: "How to stay motivated every day.",
    postedDate: "2025-09-05",
    likes: 132,
    comments: 28,
  },
  {
    url: "https://youtu.be/0siE31sqz0Q?si=xs_p8uh_63P8lVsw",
    title: "Inspiring Voices #6",
    description: "Building confidence and self-esteem.",
    postedDate: "2025-09-06",
    likes: 110,
    comments: 25,
  },
  {
    url: "https://youtu.be/8zviPDgCipc?si=RDLl51ToUbRHjCx1",
    title: "Inspiring Voices #7",
    description: "Finding your passion in life.",
    postedDate: "2025-09-07",
    likes: 99,
    comments: 22,
  },
  {
    url: "https://youtu.be/qU1FgDG16U4?si=OTzD6K-eJM6dvLOY",
    title: "Inspiring Voices #8",
    description: "Stories of resilience and hope.",
    postedDate: "2025-09-08",
    likes: 143,
    comments: 39,
  },
  {
    url: "https://youtu.be/20o79uGsSwA?si=UmDVvVF4mN4nd9to",
    title: "Inspiring Voices #9",
    description: "How to set and achieve goals.",
    postedDate: "2025-09-09",
    likes: 105,
    comments: 20,
  },
  {
    url: "https://youtu.be/osmqn1A45rU?si=zNWjVMvP0E1E6Knw",
    title: "Inspiring Voices #10",
    description: "Empowering yourself for success.",
    postedDate: "2025-09-10",
    likes: 160,
    comments: 50,
  },
];

function Voices() {
  return (
    <div className="voices-gallery">
      {videos.map((video, idx) => (
        <section className="video-card" key={idx}>
          <div className="video-frame">
            <iframe
              src={getEmbedUrl(video.url)}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="video-info">
            <h3>{video.title}</h3>
            <p className="video-desc">{video.description}</p>
            <div className="video-meta">
              <span className="video-date">{video.postedDate}</span>
              <span className="video-icons">
                <span className="icon likes" title="Likes">
                  ❤️ {video.likes}
                </span>
                <span className="icon comments" title="Comments">
                  💬 {video.comments}
                </span>
              </span>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

// Helper to convert YouTube URL to embed format
function getEmbedUrl(url) {
  // Handles both youtu.be and youtube.com links
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default Voices;
