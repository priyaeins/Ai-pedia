import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import AIImagecards from "../../Components/AIImagecards/AIImagecards";
import WebFooter from "../../Components/Footer/Footer";
import YoutubeVideoCard from "../../Components/YoutubeVideoCard/YoutubeVideoCard";
import TrendingAI from "../../Components/TrendingAI/TrendingAI";
import AlertModal from "../../Components/AlertModal/AlertModal";
import { tools as initialTools, categories } from "../../data/tools";
import "./Home.css";

export default function Home() {
  const [tools, setTools] = useState(initialTools);
  const [filteredTools, setFilteredTools] = useState(initialTools);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [pendingUnbookmarkId, setPendingUnbookmarkId] = useState(null);

  // Sync with local storage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      const bookmarkIds = JSON.parse(savedBookmarks);
      setTools(prev => prev.map(tool => ({
        ...tool,
        Bookmarked: bookmarkIds.includes(tool.id)
      })));
    }
  }, []);

  // Update filtered list when category or search changes
  useEffect(() => {
    filterTools(selectedCategory, searchQuery, tools);
  }, [tools, selectedCategory, searchQuery]);

  const filterTools = (category, query, allTools) => {
    let filtered = allTools;

    if (category !== "All") {
      filtered = filtered.filter(tool => tool.category === category);
    }

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(q) ||
        tool.tagline.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q)
      );
    }

    setFilteredTools(filtered);
  };

  const toggleBookmark = (id, status) => {
    const updated = tools.map(t => t.id === id ? { ...t, Bookmarked: status } : t);
    setTools(updated);

    // Update global bookmarks array safely
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    let newBookmarks;
    if (status) {
      newBookmarks = [...new Set([...savedBookmarks, id])];
    } else {
      newBookmarks = savedBookmarks.filter(bid => bid !== id);
    }
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  };

  const handleBookmarkClick = (id) => {
    const tool = tools.find(t => t.id === id);
    if (tool.Bookmarked) {
      setAlertMessage(`Do you want to remove ${tool.name} from your bookmarks?`);
      setPendingUnbookmarkId(id);
      setAlertModalVisible(true);
    } else {
      toggleBookmark(id, true);
    }
  };

  const handleAlertModalClose = (confirmed) => {
    if (confirmed && pendingUnbookmarkId) {
      toggleBookmark(pendingUnbookmarkId, false);
    }
    setAlertModalVisible(false);
    setPendingUnbookmarkId(null);
  };

  return (
    <div className="home-wrapper">
      <Header
        handleBookmarkClick={handleBookmarkClick}
        cards={tools}
        onSearch={(q) => setSearchQuery(q)}
      />

      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1 className="hero-title">
            Find the <span className="gradient-text">Perfect AI Tool</span> for Any Task
          </h1>
          <p className="hero-subtitle">
            Join 10M+ users discovering the next generation of AI productivity tools.
            Updated daily with the latest releases in the AI ecosystem.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setShowModal(true)}>
              Get Personalized Suggestions
            </button>
            <button className="btn-secondary">
              Browse All categories
            </button>
          </div>
        </div>
      </section>

      <main className="container main-content">
        <div className="category-bar">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="section-header">
          <h2 className="section-title">
            {selectedCategory === "All" ? "Trending AI Tools" : `${selectedCategory} Tools`}
          </h2>
          <p className="section-desc">Hand-picked and verified tools to boost your workflow.</p>
        </div>

        <div className="tools-grid">
          {filteredTools.map(tool => (
            <AIImagecards
              key={tool.id}
              item={tool}
              handleBookmarkClick={handleBookmarkClick}
            />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="empty-state">
            <h3>No tools found in this category.</h3>
            <p>Try exploring another category or check back later!</p>
          </div>
        )}
      </main>

      <section className="featured-video">
        <div className="container">
          <YoutubeVideoCard />
        </div>
      </section>

      <TrendingAI
        cards={tools}
        handleToolCategoryChange={(cat) => setSelectedCategory(cat)}
      />

      <WebFooter />

      {alertModalVisible && (
        <AlertModal
          description={alertMessage}
          onClose={handleAlertModalClose}
          buttonok="Yes"
        />
      )}

      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal-window" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            <div className="modal-grid">
              <div className="modal-info">
                <h2>Welcome to AI-Pedia</h2>
                <div className="info-item">
                  <h4>Smart Recommendations</h4>
                  <p>Get AI tools matched to your specific professional needs and goals.</p>
                </div>
                <div className="info-item">
                  <h4>Save for Later</h4>
                  <p>Build your personalized library of essential AI tools and resources.</p>
                </div>
                <div className="info-item">
                  <h4>Community Reviews</h4>
                  <p>Read transparent feedback from other professionals in your industry.</p>
                </div>
                <button className="btn-primary" style={{ marginTop: '20px', width: '100%' }}>
                  Sign Up for Free
                </button>
              </div>
              <div className="modal-media">
                <img src="/Assets/1.jpg" alt="AI Tools Showcase" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

