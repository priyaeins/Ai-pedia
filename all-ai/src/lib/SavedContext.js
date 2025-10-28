import React, { createContext, useState, useEffect } from "react";

const SavedContext = createContext();

export const BookmarkProvider = ({ children }) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const storedCards = localStorage.getItem("cards");
    if (storedCards) {
      setCards(JSON.parse(storedCards));
    }
  }, []);

  const updateBookmarkStatus = (id, isBookmarked) => {
    const updatedCards = cards.map((card) =>
      card.id === id ? { ...card, Bookmarked: isBookmarked } : card
    );

    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards));
  };

  return (
    <SavedContext.Provider value={{ cards, updateBookmarkStatus }}>
      {children}
    </SavedContext.Provider>
  );
};
export default SavedContext;
