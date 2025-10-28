import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import WebFooter from "../../Components/Footer/Footer";
import AIImagecards from "../../Components/AIImagecards/AIImagecards";
import BasicSelect from "../../Components/BasicSelect";
import "./AIAgent.css";
import TrendingAI from "../../Components/TrendingAI/TrendingAI";
import ReactPaginate from "react-paginate";
import AIEdu from "../../Components/AIEdu";
import AlertModal from "../../Components/AlertModal";

const newItems = [
  {
    Bookmarked: false,
    id: "9",
    Name: "AgentVerse",
    hashtag: "#ai agents#workflows #startup tools",
    image: "/Assets/a3.webp",
    rating: 5,
    category: "Trending",
    toolCategory: "startup tools",
    status: "paid",
    visitLink:
      "https://agentverse.ai/?utm_source=futurepedia&utm_medium=marketplace&utm_campaign=futurepedia",
    description:
      "AgentVerse is a cutting-edge AI tool designed to revolutionize the way we interact with digital agents. Developed by Fetch.ai, it offers a unique platform where users can explore, create, and manage AI agents with ease.",
  },
  {
    Bookmarked: false,
    id: "10",
    Name: "Baby AGI",
    category: "Trending",
    toolCategory: "research",
    hashtag: "#research#education",
    image: "/Assets/a1.webp",
    rating: 5,
    status: "free",
    visitLink:
      "https://github.com/yoheinakajima/babyagi?utm_source=futurepedia&utm_medium=marketplace&utm_campaign=futurepedia",
    description:
      "Baby AGI is an innovative AI tool that is designed to push the boundaries of artificial general intelligence (AGI). ",
  },
  {
    Bookmarked: false,
    id: "11",
    Name: "Kintext",
    category: "New",
    toolCategory: "research",
    hashtag: "#ai agents #transcriber",
    image: "/Assets/b4.avif",
    rating: 0,
    status: "paid",
    visitLink:
      "https://kintext.com/?utm_source=futurepedia&utm_medium=marketplace&utm_campaign=futurepedia",
    description:
      "Kintext is an innovative AI assistant designed specifically for parenting. It blends artificial intelligence with empathetic understanding to assist with parenting tasks.",
  },
  {
    Bookmarked: false,
    id: "12",
    Name: "Stratup.ai",
    category: "New",
    toolCategory: "research",
    hashtag: "#startup tools #ai agents #research",
    image: "/Assets/a6.svg",
    rating: 5,
    status: "free",
    visitLink:
      "https://stratup.ai/?utm_source=futurepedia&utm_medium=marketplace&utm_campaign=futurepedia",
    description:
      "Stratup.ai is a groundbreaking AI-powered tool designed to revolutionize the way entrepreneurs and innovators approach the ideation process.",
  },
  {
    Bookmarked: false,
    id: "13",
    Name: "Meshy",
    category: "Popular",
    toolCategory: "design",
    hashtag: "#3D#design generators #ai agents",
    image: "/Assets/a7.svg",
    rating: 5,
    status: "freemium",
    visitLink:
      "https://www.meshy.ai/?utm_source=futurepedia&utm_medium=ads&utm_campaign=Meshy-4",
    description:
      "Meshy is a cutting-edge AI tool that reshapes 3D content creation. It uses AI to transform text and images into detailed 3D models and textures.",
  },
  {
    Bookmarked: false,
    id: "14",
    Name: "Inworld",
    hashtag: "#avatars#ai agents#workflows",
    image: "/Assets/b5.avif",
    category: "New",
    toolCategory: "avatars",
    rating: 2,
    status: "freemium",
    visitLink:
      "https://www.inworld.ai/?utm_source=futurepedia&utm_medium=marketplace&utm_campaign=futurepedia",
    description:
      "Inworld is an AI engine designed to revolutionize game development by introducing dynamic non-player characters (NPCs) and evolving game worlds.",
  },
  {
    Bookmarked: false,
    id: "15",
    Name: "Olympia",
    hashtag: "#email assistant#personal assistant",
    category: "Popular",
    toolCategory: "personal assistant",
    image: "/Assets/a11.svg",
    rating: 5,
    status: "paid",
    visitLink:
      "https://olympia.chat/?utm_source=futurepedia&utm_medium=marketplace&utm_campaign=futurepedia",
    description:
      "Olympia introduces virtual team members with human-like capabilities, revolutionizing virtual team dynamics for solopreneurs and startups.",
  },
  {
    Bookmarked: false,
    id: "16",
    Name: "Circleback.ai",
    hashtag: "#personal assistant#transcriber#ai agents",
    category: "Popular",
    toolCategory: "personal assistant",
    image: "/Assets/a9.svg",
    rating: 1,
    status: "free",
    visitLink:
      "https://www.circleback.ai/?utm_source=futurepedia&utm_medium=marketplace&utm_campaign=futurepedia",
    description:
      "Circleback.AI revolutionizes meeting notes and action item handling by providing concise records of discussions.",
  },

  // Add more items as needed
];

export default function AIAgent() {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [toolCategories, setToolCategories] = useState([]);
  const itemsPerPage = 8; // Set itemsPerPage directly here

  const fetchCards = async () => {
    const storedCards = JSON.parse(localStorage.getItem("cards")) || [];
    const updatedCards = mergeItems(storedCards, newItems);
    setCards(updatedCards);
    setFilteredCards(updatedCards); // Set filteredCards initially
    localStorage.setItem("cards", JSON.stringify(updatedCards));
    setCategories(["Trending", "Popular", "New"]);
    setToolCategories([
      "Personal Assistant",
      "Research",
      "Design",
      "Marketing",
      "Startup tools",
      "Avatars",
    ]);
  };

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = filteredCards.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredCards.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredCards.length;
    setItemOffset(newOffset);
  };

  console.log(currentItems); // Ensure this shows the correct data

  useEffect(() => {
    fetchCards();
  }, []);
  const mergeItems = (existingItems, newItems) => {
    const allItems = [...existingItems];

    newItems.forEach((newItem) => {
      const exists = existingItems.some((item) => item.id === newItem.id);
      if (!exists) {
        allItems.push(newItem);
      }
    });

    return allItems;
  };

  console.log(cards, "cards");
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered = category
      ? cards.filter((card) => card.category === category)
      : cards; // Show all if no category selected
    setFilteredCards(filtered);
    setItemOffset(0);
  };

  console.log(cards, "hello");
  const handleToolCategoryChange = (toolCategory) => {
    setSelectedCategory(toolCategory);
    const filtered = toolCategory
      ? cards.filter((card) => card.toolCategory === toolCategory.toLowerCase())
      : cards; // Show all if no category selected
    setFilteredCards(filtered);
    setItemOffset(0);
  };

  const handleBookmarkClick = (id) => {
    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        if (card.Bookmarked) {
          const message = `Do you want to unsave ${card.Name}?`;
          setAlertMessage(message); // Set alert message
          setAlertModalVisible(true); // Show the alert modal
          setPendingUnbookmarkId(id); // Store the id of the card to be unbookmarked
          return card; // Return original card until user confirms
        } else {
          return { ...card, Bookmarked: true }; // Bookmark the card if not already bookmarked
        }
      }
      return card; // Return other cards as is
    });

    setCards(updatedCards);
    setFilteredCards(updatedCards); // Ensure filtered cards are updated as well
    localStorage.setItem("cards", JSON.stringify(updatedCards)); // Update localStorage
  };

  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [pendingUnbookmarkId, setPendingUnbookmarkId] = useState(null);

  const handleAlertModalClose = (confirmed) => {
    setAlertModalVisible(false); // Close the modal
    if (confirmed && pendingUnbookmarkId !== null) {
      // Update the state to unbookmark the card if confirmed
      setCards((prevCards) =>
        prevCards.map((card) => {
          if (card.id === pendingUnbookmarkId) {
            return { ...card, Bookmarked: false }; // Unbookmark the card
          }
          return card;
        })
      );
      console.log("User confirmed action");
    } else {
      console.log("User denied action");
    }
    setPendingUnbookmarkId(null); // Reset the pending ID
  };

  const handleScrollTo = (sectionId) => {
    window.scrollTo({
      top: document.getElementById(sectionId).offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Header handleBookmarkClick={handleBookmarkClick} cards={cards} />
      <div style={{ textAlign: "left", margin: "30px", color: "#fff" }}>
        <h1>AI Agent Tools - Revolutionizing Automation & Productivity</h1>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                textAlign: "justify",
                fontWeight: "normal",
                marginRight: "30px",
              }}
            >
              Embark on a transformative journey with automation tools that have
              evolved significantly through AI agent technology...
            </h3>
            <div>
              <BasicSelect
                handleBusinessOperations={() =>
                  handleScrollTo("business-operations")
                }
                handleAutomationTools={() => handleScrollTo("automation-tools")}
                handleFunction={() => handleScrollTo("future-prospects")}
              />
            </div>
          </div>
          <img className="aiagentImg" src="/Assets/agent.avif" alt="aiagent" />
        </div>
      </div>

      <TrendingAI
        cards={cards}
        buttonActive={selectedCategory}
        handleToolCategoryChange={handleToolCategoryChange}
      />

      <div id="business-operations" className="categorydiv">
        <div onClick={() => handleCategoryChange("Trending")}>Trending</div>
        <div onClick={() => handleCategoryChange("Popular")}>Popular</div>
        <div onClick={() => handleCategoryChange("New")}>New</div>
        <div onClick={() => handleCategoryChange(null)}>All</div>
      </div>

      <div id="automation-tools">
        <div
          style={{
            display: "flex",
            padding: "10px 0",
            gap: "10px",
            flexWrap: "wrap",
            margin: "6%",
          }}
        >
          {currentItems.map((card) => (
            <AIImagecards
              key={card.id}
              item={card}
              setCards={setCards}
              cards={filteredCards} // use filtered cards
              handleBookmarkClick={handleBookmarkClick}
            />
          ))}
        </div>
        {alertModalVisible && (
          <AlertModal
            description={alertMessage}
            onClose={handleAlertModalClose}
            buttonok="Yes"
          />
        )}

        <div className="pagination-container">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="pagination" // Add class for styling
            pageClassName="pagination-button"
            previousClassName="pagination-button"
            nextClassName="pagination-button"
            activeClassName="active-page"
          />
        </div>
      </div>
      <AIEdu />
      <WebFooter />
    </>
  );
}
