import React from "react";
import { IconFlame, IconCode, IconPaint, IconMessageChatbot, IconSearch, IconUserCircle, IconChevronRight } from "@tabler/icons-react";
import "./TrendingAI.css";

const categoryData = [
  { name: "Chatbots", icon: <IconMessageChatbot size={32} />, count: "1,240 tools", color: "#E0F2FE" },
  { name: "Design", icon: <IconPaint size={32} />, count: "850 tools", color: "#F0FDF4" },
  { name: "Development", icon: <IconCode size={32} />, count: "620 tools", color: "#FEF2F2" },
  { name: "Search", icon: <IconSearch size={32} />, count: "120 tools", color: "#FFFBEB" },
  { name: "Writing", icon: <IconUserCircle size={32} />, count: "430 tools", color: "#F5F3FF" }
];

function TrendingAI({ handleToolCategoryChange }) {
  return (
    <section className="trending-categories-section">
      <div className="container">
        <div className="trending-header">
          <div className="title-with-icon">
            <div className="flame-icon-wrapper">
              <IconFlame size={24} className="flame-icon" />
            </div>
            <h2 className="trending-title">Trending Categories</h2>
          </div>
          <p className="trending-subtitle">
            Explore our editorial favorites and popular AI tools in these featured domains.
          </p>
        </div>

        <div className="categories-grid">
          {categoryData.map((cat, index) => (
            <div
              key={index}
              className="category-card"
              onClick={() => handleToolCategoryChange(cat.name)}
              style={{ "--cat-bg": cat.color }}
            >
              <div className="category-icon-box">
                {cat.icon}
              </div>
              <div className="category-info">
                <h4 className="category-name">{cat.name}</h4>
                <p className="category-count">{cat.count}</p>
              </div>
              <div className="category-arrow">
                <IconChevronRight size={20} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingAI;

