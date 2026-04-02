import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { IconSearch, IconAdjustmentsHorizontal, IconRobot } from "@tabler/icons-react";
import Header from "../../Components/Header/Header";
import WebFooter from "../../Components/Footer/Footer";
import AIImagecards from "../../Components/AIImagecards/AIImagecards";
import TrendingAI from "../../Components/TrendingAI/TrendingAI";
import AlertModal from "../../Components/AlertModal/AlertModal";
import { tools } from "../../data/tools";
import "./AIAgent.css";

const ITEMS_PER_PAGE = 8;

export default function AIAgent() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [itemOffset, setItemOffset] = useState(0);
  const [alertConfig, setAlertConfig] = useState({ visible: false, message: "", id: null });

  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    const agentTools = tools.map(t => ({
      ...t,
      Bookmarked: savedBookmarks.includes(t.id)
    }));
    setCards(agentTools);
    setFilteredCards(agentTools);
  }, []);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * ITEMS_PER_PAGE) % filteredCards.length;
    setItemOffset(newOffset);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setItemOffset(0);
    applyFilters(filter, searchQuery, cards);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setItemOffset(0);
    applyFilters(selectedFilter, query, cards);
  };

  const applyFilters = (filter, query, allCards) => {
    let filtered = allCards;

    if (filter !== "All") {
      filtered = filtered.filter(c => c.category === filter || c.pricing === filter);
    }

    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    }

    setFilteredCards(filtered);
  };

  const handleBookmark = (id) => {
    const card = cards.find(c => c.id === id);
    if (card.Bookmarked) {
      setAlertConfig({ visible: true, message: `Remove ${card.name} from your saved agents?`, id });
    } else {
      toggleBookmark(id, true);
    }
  };

  const toggleBookmark = (id, status) => {
    const updated = cards.map(c => c.id === id ? { ...c, Bookmarked: status } : c);
    setCards(updated);
    // Maintain filtering when bookmarking
    applyFilters(selectedFilter, searchQuery, updated);

    // Update global bookmarks list
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
    let newBookmarks;
    if (status) {
      newBookmarks = [...new Set([...savedBookmarks, id])];
    } else {
      newBookmarks = savedBookmarks.filter(bid => bid !== id);
    }
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarks));
  };

  const endOffset = itemOffset + ITEMS_PER_PAGE;
  const currentItems = filteredCards.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);

  return (
    <div className="agent-page-wrapper">
      <Header cards={cards} onSearch={handleSearch} />

      <section className="agent-hero">
        <div className="container">
          <div className="agent-hero-content">
            <div className="agent-badge">
              <IconRobot size={18} />
              <span>Autonomous Agents</span>
            </div>
            <h1 className="agent-title">The Future of <span className="gradient-text">Automation</span></h1>
            <p className="agent-subtitle">
              Discover powerful AI agents capable of autonomous research, coding, and complex task execution.
              Future-proof your workflow today.
            </p>

            <div className="agent-search-bar">
              <IconSearch size={22} />
              <input type="text" placeholder="Search autonomous agents..." />
              <button className="search-btn">Find Agents</button>
            </div>
          </div>
        </div>
      </section>

      <TrendingAI handleToolCategoryChange={(cat) => handleFilterChange(cat)} />

      <main className="container agent-main">
        <div className="filter-bar">
          <div className="filter-group">
            <button className={selectedFilter === "All" ? "active" : ""} onClick={() => handleFilterChange("All")}>All Agents</button>
            <button className={selectedFilter === "Trending" ? "active" : ""} onClick={() => handleFilterChange("Trending")}>Trending</button>
            <button className={selectedFilter === "Popular" ? "active" : ""} onClick={() => handleFilterChange("Popular")}>Popular</button>
          </div>
          <button className="advanced-filter-btn">
            <IconAdjustmentsHorizontal size={20} />
            <span>Filters</span>
          </button>
        </div>

        <div className="agent-grid">
          {currentItems.map((tool) => (
            <AIImagecards
              key={tool.id}
              item={tool}
              handleBookmarkClick={handleBookmark}
            />
          ))}
        </div>

        {pageCount > 1 && (
          <div className="pagination-wrapper">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="Previous"
              containerClassName="modern-pagination"
              activeClassName="active"
              disabledClassName="disabled"
            />
          </div>
        )}
      </main>

      <WebFooter />

      {alertConfig.visible && (
        <AlertModal
          description={alertConfig.message}
          buttonok="Unsave"
          onClose={(confirmed) => {
            if (confirmed) toggleBookmark(alertConfig.id, false);
            setAlertConfig({ visible: false, message: "", id: null });
          }}
        />
      )}
    </div>
  );
}

