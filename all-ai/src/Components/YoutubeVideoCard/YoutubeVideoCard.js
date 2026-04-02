import React, { useState } from "react";
import { IconBrandYoutubeFilled, IconPlayerPlayFilled, IconX } from "@tabler/icons-react";
import "./YoutubeVideoCard.css";

const tutorials = [
  {
    id: "1",
    title: "How to Build an AI Agent in 5 Minutes",
    desc: "A quick guide to getting started with autonomous agents.",
    thumbnail: "/assets/yt1.jpg",
    videoUrl: "https://www.youtube.com/embed/gpP_YEv_9jA"
  },
  {
    id: "2",
    title: "Mastering Midjourney V6",
    desc: "Pro tips for stunning AI art generation.",
    thumbnail: "/assets/yt2.jpg",
    videoUrl: "https://www.youtube.com/embed/another1"
  },
  {
    id: "3",
    title: "ChatGPT for Business",
    desc: "Maximize your productivity with advanced prompting.",
    thumbnail: "/assets/yt3.jpg",
    videoUrl: "https://www.youtube.com/embed/another2"
  }
];

export default function YoutubeVideoCard() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section className="youtube-section-wrapper">
      <div className="container">
        <div className="youtube-flex">
          <div className="youtube-info-col">
            <div className="yt-brand">
              <IconBrandYoutubeFilled size={40} className="yt-icon" />
              <span className="yt-name">YouTube Masters</span>
            </div>
            <h2 className="yt-heading">Master AI Skills with Tutorials</h2>
            <p className="yt-subtext">
              Learn how to leverage powerful AI tools to future-proof your career and business.
              New tutorials added every Tuesday.
            </p>
            <button
              className="yt-subscribe-btn"
              onClick={() => window.open("https://www.youtube.com/@futurepedia_io", "_blank")}
            >
              Subscribe for Updates
            </button>
          </div>

          <div className="youtube-videos-col">
            <div className="featured-video-card" onClick={() => setActiveVideo(tutorials[0])}>
              <img src={tutorials[0].thumbnail} alt="Featured Tutorial" className="featured-thumb" />
              <div className="play-overlay">
                <div className="play-button-circle">
                  <IconPlayerPlayFilled size={32} />
                </div>
              </div>
              <div className="video-details">
                <span className="video-label">Latest Video</span>
                <h4 className="video-title">{tutorials[0].title}</h4>
              </div>
            </div>

            <div className="video-sidebar">
              {tutorials.slice(1).map(video => (
                <div key={video.id} className="mini-video-card" onClick={() => setActiveVideo(video)}>
                  <div className="mini-thumb-wrapper">
                    <img src={video.thumbnail} alt={video.title} />
                    <IconPlayerPlayFilled size={14} className="small-play" />
                  </div>
                  <div className="mini-details">
                    <h5>{video.title}</h5>
                    <p>{video.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeVideo && (
        <div className="video-modal-backdrop" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-window" onClick={e => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setActiveVideo(null)}>
              <IconX size={24} />
            </button>
            <div className="video-responsive-container">
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
