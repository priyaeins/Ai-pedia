import React, { useState } from "react";
import "./AITutorial.css"; // Adjust the path if necessary
import { useNavigate } from "react-router-dom";
import WebFooter from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";

const AITutorials = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const tutorials = [
    {
      title: "AI Basics",
      image: "../assets/yt1.jpg",
      videoLink: "https://www.youtube.com/embed/gpP_YEv_9jA",
      description:
        "An introduction to the fundamentals of Artificial Intelligence.",
    },
    {
      title: "Machine Learning 101",
      image: "../assets/yt2.jpg",
      videoLink: "https://www.youtube.com/embed/gpP_YEv_9jA",
      description: "Learn the basics of Machine Learning and its applications.",
    },
    {
      title: "Machine Learning 102",
      image: "../assets/yt3.jpg",
      videoLink: "https://www.youtube.com/embed/gpP_YEv_9jA",
      description:
        "Learn the basics part-2 of Machine Learning and its applications.",
    },
    {
      title: "Machine Learning 103",
      image: "../assets/yt4.jpg",
      videoLink: "https://www.youtube.com/embed/gpP_YEv_9jA",
      description:
        "Learn the basics part-3 of Machine Learning and its applications.",
    },
    // Add more tutorials as needed
  ];

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  return (
    <>
      <Header />

      <div className="tutorial-container">
        {/* Header Section */}
        <div className="tutorial-header-container">
          <h1 className="tutorial-title">AI Tutorials</h1>
        </div>

        {/* Search Bar Section */}
        <div className="tutorial-search-bar">
          <input
            type="text"
            placeholder="Search tutorials..."
            value={searchInput}
            onChange={handleSearchChange}
            className="tutorial-search-input"
          />
        </div>

        {/* Card Container Section */}
        <div className="tutorial-card-container">
          {tutorials
            .filter((tutorial) =>
              tutorial.title.toLowerCase().includes(searchInput)
            )
            .map((tutorial, index) => (
              <div className="tutorial-card" key={index}>
                {/* Card Image */}
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="tutorial-card-image"
                  onClick={() => (window.location.href = tutorial.videoLink)}
                />
                <div className="tutorial-card-content">
                  {/* Card Title with Clickable Link */}
                  <h2
                    className="tutorial-card-title"
                    onClick={() => (window.location.href = tutorial.videoLink)}
                  >
                    {tutorial.title}
                  </h2>
                  {/* Card Description */}
                  <p className="tutorial-card-description">
                    {tutorial.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <WebFooter />
    </>
  );
};

export default AITutorials;
