import React, { useState } from "react";
import { IconSearch, IconPlayerPlayFilled } from "@tabler/icons-react";
import Header from "../../Components/Header/Header";
import WebFooter from "../../Components/Footer/Footer";
import "./AITutorial.css";

const tutorialsData = [
  {
    title: "AI Basics for Beginners",
    image: "../assets/yt1.jpg",
    videoLink: "https://www.youtube.com/embed/gpP_YEv_9jA",
    description: "An introduction to the fundamentals of Artificial Intelligence and what it really means for our future.",
    duration: "12:45",
    level: "Beginner"
  },
  {
    title: "The Ultimate Guide to Machine Learning",
    image: "../assets/yt2.jpg",
    videoLink: "https://www.youtube.com/embed/gpP_YEv_9jA",
    description: "Learn the core concepts of ML and how algorithms learn from data through practical examples.",
    duration: "45:20",
    level: "Intermediate"
  },
  {
    title: "Prompt Engineering Essentials",
    image: "../assets/yt3.jpg",
    videoLink: "https://www.youtube.com/embed/gpP_YEv_9jA",
    description: "Master the art of communicating with LLMs to get the desired results every single time.",
    duration: "18:10",
    level: "Advanced"
  },
  {
    title: "Building Autonomous Agents",
    image: "../assets/yt4.jpg",
    videoLink: "https://www.youtube.com/embed/gpP_YEv_9jA",
    description: "Step-by-step tutorial on creating AI agents that can perform tasks independently.",
    duration: "32:15",
    level: "Expert"
  }
];

const AITutorials = () => {
  const [searchInput, setSearchInput] = useState("");

  const filteredTutorials = tutorialsData.filter(t =>
    t.title.toLowerCase().includes(searchInput.toLowerCase()) ||
    t.description.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="tutorial-page-wrapper">
      <Header onSearch={(q) => setSearchInput(q)} />

      <section className="tutorial-hero">
        <div className="container">
          <h1 className="tutorial-page-title">Learn AI <span className="gradient-text">Skills</span></h1>
          <p className="tutorial-page-subtitle">Expert-led video tutorials to help you master the latest AI tools and techniques.</p>

          <div className="tutorial-search-wrapper">
            <IconSearch size={20} />
            <input
              type="text"
              placeholder="Search subjects, levels, or tools..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
      </section>

      <main className="container tutorial-main">
        <div className="tutorial-grid">
          {filteredTutorials.map((tutorial, index) => (
            <div className="modern-tutorial-card" key={index} onClick={() => window.open(tutorial.videoLink, "_blank")}>
              <div className="tutorial-thumb-container">
                <img src={tutorial.image} alt={tutorial.title} />
                <div className="play-btn-circle">
                  <IconPlayerPlayFilled size={24} />
                </div>
                <span className="duration-tag">{tutorial.duration}</span>
              </div>
              <div className="tutorial-card-body">
                <div className="level-badge">{tutorial.level}</div>
                <h3>{tutorial.title}</h3>
                <p>{tutorial.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <WebFooter />
    </div>
  );
};

export default AITutorials;

