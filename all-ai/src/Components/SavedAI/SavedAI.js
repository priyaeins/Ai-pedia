import React, { useState, useEffect } from "react";
import AIImagecards from "../AIImagecards/AIImagecards";

function SavedAI({ handleBookmarkClick, cards }) {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = cards.filter((item) => item.Bookmarked === true);
    setFilteredData(filtered);
  });

  return (
    <div
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#cecece",
        color: "#04102c",
      }}
    >
      <h1
        style={{
          backgroundColor: "#cecece",
        }}
      >
        Saved AI
      </h1>
      {filteredData.length > 0 ? (
        filteredData.map((item) => (
          <AIImagecards
            item={item}
            key={item.id}
            handleBookmarkClick={() => handleBookmarkClick(item.id)}
          />
        ))
      ) : (
        <p>No saved AI tools found.</p>
      )}
    </div>
  );
}

export default SavedAI;
