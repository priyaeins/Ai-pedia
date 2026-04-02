import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IconBookmark, IconSearch, IconUser, IconMenu2, IconX } from "@tabler/icons-react";
import "./Header.css";
import AlertModal from "../AlertModal/AlertModal";

export default function Header({ handleBookmarkClick, cards, onSearch }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [bookmarkCount, setBookmarkCount] = useState(0);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLogin(loggedInStatus === "true");

    const updateBookmarkCount = () => {
      const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
      setBookmarkCount(savedBookmarks.length);
    };

    updateBookmarkCount();

    // Setup a custom event listener to catch updates across components
    window.addEventListener("storage", updateBookmarkCount);
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function () {
      originalSetItem.apply(this, arguments);
      if (arguments[0] === "bookmarks") {
        updateBookmarkCount();
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", updateBookmarkCount);
      localStorage.setItem = originalSetItem;
    };
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) onSearch(query);
  };

  const handleLogout = (confirmed) => {
    if (confirmed) {
      setIsLogin(false);
      localStorage.setItem("isLoggedIn", "false");
      navigate("/login");
    }
    setAlertModalVisible(false);
  };

  return (
    <header className={`main-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <div className="header-left">
          <Link to="/" className="logo-link">
            <span className="logo-text">AI<span className="accent-dot">.</span>PEDIA</span>
          </Link>

          <nav className="desktop-nav">
            <Link to="/AITools" className="nav-item">AI Tools</Link>
            <Link to="/AIAgent" className="nav-item">AI Agents</Link>
            <Link to="/AITutorials" className="nav-item">Tutorials</Link>
            <Link to="/News" className="nav-item">Daily News</Link>
          </nav>
        </div>

        <div className="header-right">
          <div className="search-box">
            <IconSearch size={20} className="search-icon" />
            <input
              type="text"
              className="header-search-input"
              placeholder="Search 10,000+ AI tools..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                if (window.location.pathname !== "/" && window.location.pathname !== "/AIAgent") {
                  navigate("/AIAgent");
                }
              }}
            />
            <span className="search-key">/</span>
          </div>

          <div className="header-actions">
            <button className="action-btn bookmark-btn-nav" onClick={() => navigate("/saved")}>
              <IconBookmark size={22} />
              {bookmarkCount > 0 && <span className="badge">{bookmarkCount}</span>}
            </button>

            {isLogin ? (
              <button className="user-profile-btn" onClick={() => setAlertModalVisible(true)}>
                <IconUser size={22} />
              </button>
            ) : (
              <button className="login-button" onClick={() => navigate("/login")}>
                Join Now
              </button>
            )}

            <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <IconX /> : <IconMenu2 />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
        <nav className="mobile-nav-links">
          <Link to="/AITools" onClick={() => setMobileMenuOpen(false)}>AI Tools</Link>
          <Link to="/AIAgent" onClick={() => setMobileMenuOpen(false)}>AI Agents</Link>
          <Link to="/AITutorials" onClick={() => setMobileMenuOpen(false)}>Tutorials</Link>
          <Link to="/News" onClick={() => setMobileMenuOpen(false)}>Daily News</Link>
          <hr />
          {isLogin ? (
            <button onClick={() => { setMobileMenuOpen(false); setAlertModalVisible(true); }}>Logout</button>
          ) : (
            <button onClick={() => { setMobileMenuOpen(false); navigate("/login"); }}>Login / Register</button>
          )}
        </nav>
      </div>

      {alertModalVisible && (
        <AlertModal
          description="Are you sure you want to sign out?"
          onClose={handleLogout}
          buttonok="Sign Out"
        />
      )}
    </header>
  );
}

