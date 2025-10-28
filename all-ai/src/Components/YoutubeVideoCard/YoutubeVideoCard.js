import React, { useState } from "react";
import "./YoutubeVideoCard.css"; // Import the CSS file for styling

export default function YoutubeVideoCard() {
  const [videoSrc, setVideoSrc] = useState(""); // State for storing the video URL

  // Function to open the modal with the selected video URL
  const openYoutubeModal = (url) => {
    setVideoSrc(url);
    document.getElementById("youtubeModal").style.display = "block"; // Display the modal
  };

  // Function to close the modal and reset the video URL
  const closeYoutubeModal = () => {
    setVideoSrc("");
    document.getElementById("youtubeModal").style.display = "none"; // Hide the modal
  };

  return (
    <section id="YoutubeReference">
      <div className="youtube">
        <div
          style={{
            padding: "10px",
            background:
              "linear-gradient(to bottom, #04102c, #134B70, #37B7C3, #3ABEF9, #3572EF)", // Gradient background
          }}
        >
          <div className="youtube-container">
            {" "}
            <h1 style={{ fontSize: "45px" }} className="youtube-title">
              Watch Tutorial of AI on
            </h1>
            <div
              style={{
                display: "flex", // Use flexbox to arrange items in a row
                flexDirection: "row", // Keep items in a row
                alignItems: "center", // Vertically center the content
                justifyContent: "space-between", // Align items at opposite ends
                width: "100%", // Ensure the container takes full width
              }}
            >
              <div style={{ backgrounsColor: "white" }}>
                <img
                  className="youtube-image"
                  src="./Assets/youtube.svg"
                  alt="YouTube Logo"
                />
              </div>
              <div style={{ width: 150, backgroundColor: "transparent" }}>
                <button
                  className="youtube-button"
                  type="button"
                  onClick={() =>
                    (window.location.href =
                      "https://www.youtube.com/@futurepedia_io")
                  }
                >
                  futurePedia-Youtube
                </button>
              </div>
            </div>
            <h3 className="youtube-description">
              Learn to leverage AI tools and acquire AI skills to future-proof
              your life and business.
            </h3>
          </div>
          <div className="youtube-content">
            {/* Main YouTube tutorial image */}
            <img
              className="youtube-img1"
              src="./assets/yt1.jpg"
              alt="YouTube Tutorial 1"
              onClick={() =>
                openYoutubeModal("https://www.youtube.com/embed/gpP_YEv_9jA")
              }
            />

            {/* Modal for YouTube video */}
            <div id="youtubeModal" className="ytmodal">
              <div className="Ytmodal-content">
                <span className="ytclose" onClick={closeYoutubeModal}>
                  &times;
                </span>
                <iframe
                  id="youtubeVideo"
                  width="100%"
                  height="415"
                  src={videoSrc}
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            {/* Thumbnail images */}
            <div className="youtube-thumbnails">
              <img
                className="youtube-thumbnail"
                src="./assets/yt2.jpg"
                alt="YouTube Tutorial 2"
                onClick={() =>
                  openYoutubeModal(
                    "https://www.youtube.com/embed/another_video_link"
                  )
                }
              />
              <img
                className="youtube-thumbnail"
                src="./assets/yt3.jpg"
                alt="YouTube Tutorial 3"
                onClick={() =>
                  openYoutubeModal(
                    "https://www.youtube.com/embed/another_video_link"
                  )
                }
              />
              <img
                className="youtube-thumbnail"
                src="./assets/yt4.jpg"
                alt="YouTube Tutorial 4"
                onClick={() =>
                  openYoutubeModal(
                    "https://www.youtube.com/embed/another_video_link"
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
