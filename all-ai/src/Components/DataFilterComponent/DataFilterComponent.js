import React, { useState, useEffect } from "react";
import "./DataFilterComponent.css"; // Import the CSS file

const DataFilterComponent = ({ cards, categories, toolCategories }) => {
  const [filteredData, setFilteredData] = useState([]); // State for storing filtered data
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedToolCategory, setSelectedToolCategory] = useState("");

  // Load data from props
  useEffect(() => {
    if (cards && Array.isArray(cards)) {
      setFilteredData(cards);
    }
  }, [cards]);

  // Update filtered data whenever the search query, category, or tool category changes
  useEffect(() => {
    filterData(searchQuery, selectedCategory, selectedToolCategory);
  }, [searchQuery, selectedCategory, selectedToolCategory, cards]);

  // Function to filter data based on search query, category, and tool category
  const filterData = (query, category, toolCategory) => {
    let filtered = cards;

    // Filter by search query
    if (query) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    // Filter by tool category
    if (toolCategory) {
      filtered = filtered.filter((item) => item.toolCategory === toolCategory);
    }

    // Update the state with the filtered data
    setFilteredData(filtered);
  };

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handler for category dropdown change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handler for tool category dropdown change
  const handleToolCategoryChange = (e) => {
    setSelectedToolCategory(e.target.value);
  };

  // Handler for resetting filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedToolCategory("");
    setFilteredData(cards); // Reset to original data
  };

  return (
    <div className="filterContainer">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="input"
        aria-label="Search input"
      />

      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="select"
        aria-label="Select Category"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Tool Category Dropdown */}
      <select
        value={selectedToolCategory}
        onChange={handleToolCategoryChange}
        className="select"
        aria-label="Select Tool Category"
      >
        <option value="">All Tool Categories</option>
        {toolCategories.map((toolCategory) => (
          <option key={toolCategory} value={toolCategory}>
            {toolCategory}
          </option>
        ))}
      </select>

      <button onClick={resetFilters} className="resetButton">
        Reset Filters
      </button>

      {/* Render filtered data as image cards */}
      <div className="imageCardContainer">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div key={item.id} className="imageCard">
              <img src={item.imageUrl} alt={item.name} className="image" />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default DataFilterComponent;
