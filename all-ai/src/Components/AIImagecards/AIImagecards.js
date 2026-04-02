import React from "react";
import { useNavigate } from "react-router-dom";
import { IconBookmark, IconBookmarkFilled, IconStarFilled, IconCircleCheckFilled, IconExternalLink } from "@tabler/icons-react";
import "./AIImagecards.css";

export default function AIImagecards({ item, handleBookmarkClick }) {
  const navigate = useNavigate();
  const {
    id,
    name,
    image,
    description,
    rating,
    pricing,
    tagline,
    tags = [],
    Bookmarked,
    verified,
    favorites,
    visitLink
  } = item;

  const getPricingStyle = (pricing) => {
    const p = pricing?.toLowerCase();
    if (p === "free") return "pricing-free";
    if (p === "freemium") return "pricing-freemium";
    if (p === "paid") return "pricing-paid";
    return "pricing-default";
  };

  return (
    <div className="ai-card" onClick={() => navigate(`/tool/${id}`)} style={{ cursor: "pointer" }}>
      <div className="card-image-wrapper">
        <img src={image} alt={name} className="card-banner-image" />
        <div className="card-badge-container">
          <span className={`pricing-badge ${getPricingStyle(pricing)}`}>
            {pricing}
          </span>
          <button
            className={`bookmark-btn ${Bookmarked ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              handleBookmarkClick(id);
            }}
          >
            {Bookmarked ? <IconBookmarkFilled size={18} /> : <IconBookmark size={18} />}
          </button>
        </div>
      </div>

      <div className="card-body-content">
        <div className="card-header-row">
          <div className="name-group">
            <h3 className="tool-name">
              {name}
              {verified && <IconCircleCheckFilled size={16} className="verified-icon" />}
            </h3>
            <p className="tool-tagline">{tagline}</p>
          </div>
          <div className="rating-group">
            <IconStarFilled size={14} className="star-icon" />
            <span className="rating-value">{rating}</span>
          </div>
        </div>

        <p className="tool-description">{description}</p>

        <div className="card-tags">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="tag-pill">{tag}</span>
          ))}
        </div>

        <div className="card-footer-row">
          <div className="stats-group">
            <IconBookmarkFilled size={14} className="fav-icon" />
            <span className="fav-count">{favorites?.toLocaleString()}</span>
          </div>
          <a
            href={visitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="visit-site-btn"
            onClick={(e) => e.stopPropagation()}
          >
            Visit Website <IconExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

