import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./TrendingAI.css";

function TrendingAI({ cards, handleToolCategoryChange }) {
  const [filteredCards, setFilteredCards] = useState(cards);
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category
  const navigate = useNavigate(); // Create a navigate function

  const handleFilter = (toolCategories) => {
    const filtered = cards.filter(
      (card) => card.toolCategories === toolCategories
    );
    setFilteredCards(filtered);
    setSelectedCategory(toolCategories);
    handleToolCategoryChange(selectedCategory);

    // Navigate to AIAgent after handling the category change
    navigate("/AIAgent");
  };

  return (
    <section className="categoriesDiv">
      <div className="categoriesDiv1">
        <img
          className="categoriesImg1"
          src="./assets/flame.png"
          alt="Categories"
        />
        <h1 className="categoriesH1" style={{ color: "#fff" }}>
          Trending Categories
        </h1>
      </div>
      <h3 style={{ color: "#fff" }}>
        <center>
          Explore our editorial favorites and popular AI tools in these trending
          categories
        </center>
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          gap: "10px",
        }}
      >
        <button onClick={() => handleFilter("Research")}>Research</button>
        <button onClick={() => handleFilter("Personal Assistant")}>
          Personal Assistant
        </button>
        <button onClick={() => handleFilter("startup tools")}>
          startup tools
        </button>
        <button onClick={() => handleFilter("avatars")}>avatars</button>
        <button onClick={() => handleFilter("Design")}>Design</button>
      </div>
    </section>
  );
}

export default TrendingAI;
