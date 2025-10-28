import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header"; // Ensure this import is correct
import "./Home.css";
import WebFooter from "../../Components/Footer/Footer";
import AIImagecards from "../../Components/AIImagecards/AIImagecards";
import Carousel from "react-material-ui-carousel";
import SavedContext from "../../lib/SavedContext";
import YoutubeVideoCard from "../../Components/YoutubeVideoCard/YoutubeVideoCard";
import TrendingAI from "../../Components/TrendingAI/TrendingAI";
import AlertModal from "../../Components/AlertModal/AlertModal";

const items = [
  {
    Bookmarked: false,
    id: "1",
    Name: "AutoGPT",
    hashtag: "#autogpt #ai #openai",
    image: "/Assets/a1.webp",
    rating: 5,
    status: "free",
    visitLink:
      "https://github.com/Significant-Gravitas/AutoGPT?utm_source=futurepedia&utm_medium=marketplace&utm_campaign=futurepedia",
    description:
      "AutoGPT is a groundbreaking open-source platform designed to democratize the power of AI, making it accessible to everyone for both usage and development.",
    category: "Trending", // Example category
    toolCategory: "Research", // Example tool category
  },
  {
    Bookmarked: false,
    id: "2",
    Name: "ChatGPT",
    hashtag: "#chatgpt #ai #openai",
    image: "/Assets/chatgpt.png",
    rating: 5,
    status: "free",
    visitLink: "https://chatgpt.com/",
    description:
      "ChatGPT is a powerful AI conversational model developed by OpenAI, used widely for automating customer service and personal assistants.",
    category: "Popular",
    toolCategory: "Personal Assistant",
  },
  {
    Bookmarked: false,
    id: "3",
    Name: "AssemblyAI",
    hashtag: "#ai agents #transcriber",
    image: "/Assets/b4.avif",
    rating: 5,
    status: "free trial",
    visitLink:
      "https://www.assemblyai.com/?utm_source=futurepedia&utm_medium=cpc&utm_campaign=web_sponsor",
    description:
      "AssemblyAI is a cutting-edge tool that revolutionizes the field of speech recognition and analysis with its state-of-the-art Speech AI models.",
    category: "New",
    toolCategory: "Research",
  },
  {
    Bookmarked: false,
    id: "4",
    Name: "Tidalflow",
    hashtag: "#fitness #personal assistant #health",
    image: "/Assets/b2.avif",
    rating: 1,
    status: "free",
    visitLink: "https://www.futurepedia.io/tool/tidalflow",
    description:
      "Tidalflow is an innovative platform that helps individuals manage their fitness and personal health with AI-driven insights.",
    category: "Trending",
    toolCategory: "Personal Assistant",
  },
  {
    Bookmarked: false,
    id: "5",
    Name: "1PX.AI",
    hashtag: "#marketing #e-commerce #image editing",
    image: "/Assets/b1.avif",
    rating: 1,
    status: "paid",
    visitLink:
      "https://1px.ai/?utm_source=futurepedia&utm_medium=marketplace&utm_campaign=futurepedia",
    description:
      "1PX.AI is a cutting-edge AI tool designed to transform the way businesses and professionals handle image processing tasks.",
    category: "Popular",
    toolCategory: "Marketing",
  },
  {
    Bookmarked: false,
    id: "6",
    Name: "Thunderbit",
    hashtag: "#workflows #personalassistant #low-code/no-code",
    image: "/Assets/b5.avif",
    rating: 2,
    status: "free",
    visitLink: "",
    description:
      "Thunderbit is a powerful tool for creating workflows with minimal coding required, streamlining various business processes.",
    category: "New",
    toolCategory: "Startup Tools",
  },
  {
    Bookmarked: false,
    id: "7",
    Name: "BeforeSunset",
    hashtag: "#chatgpt #ai #openai",
    image: "/Assets/b6.avif",
    rating: 1,
    status: "freemium",
    visitLink: "",
    description:
      "BeforeSunset provides AI-driven solutions to enhance customer engagement and interaction.",
    category: "Popular",
    toolCategory: "Personal Assistant",
  },
  {
    Bookmarked: false,
    id: "8",
    Name: "Rapport",
    hashtag: "#ai agents #customer support #marketing",
    image: "/Assets/a2.webp",
    rating: 1,
    status: "freemium",
    visitLink: "",
    description:
      "Rapport provides AI-driven solutions to enhance customer engagement and interaction.",
    category: "Trending",
    toolCategory: "Marketing",
  },
  // Add more items as needed
];

export default function Home() {
  const [saved, setSaved] = useState();
  const [cards, setCards] = useState(items);
  const [showModal, setShowModal] = useState(false);
  const [filteredCards, setFilteredCards] = useState([]);
  const [toolCategories, setToolCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const handleToolCategoryChange = (toolCategory) => {
    setSelectedCategory(toolCategory);
    const filtered = toolCategory
      ? cards.filter((card) => card.toolCategory === toolCategory)
      : cards; // Show all if no category selected
    setFilteredCards(filtered);
  };

  useEffect(() => {
    const fetchSavedData = async () => {
      try {
        const savedData = await SavedContext.saved.retrieve();
        setCards(savedData); // Set cards to the saved data
        setFilteredCards(savedData); // Set filteredCards initially
        localStorage.setItem("cards", JSON.stringify(savedData));
      } catch (error) {
        console.error("Failed to retrieve saved data:", error);
      }
    };
    fetchSavedData();

    // Set tool categories
    setToolCategories(["Chatbots", "Research", "Design", "Marketing"]);
  }, []);

  // Update filteredCards whenever the selected category or cards change
  useEffect(() => {
    handleToolCategoryChange(selectedCategory);
  }, [cards, selectedCategory]);

  const handleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleClickOutside = (event) => {
    const modal = document.getElementById("myModal");
    if (modal && event.target === modal) {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showModal]);
  const handleBookmarkClick = (id) => {
    setCards((prevCards) => {
      return prevCards.map((card) => {
        if (card.id === id) {
          // If the card is currently bookmarked
          if (card.Bookmarked) {
            const message = `Do you want to unsave ${card.Name}?`;
            setAlertMessage(message); // Set alert message
            setAlertModalVisible(true); // Show the alert modal
            setPendingUnbookmarkId(id); // Store the id of the card to be unbookmarked
          } else {
            // If the card is not bookmarked, just update the state
            return { ...card, Bookmarked: true };
          }
        }
        return card;
      });
    });
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
    } else {
    }
    setPendingUnbookmarkId(null); // Reset the pending ID
  };
  return (
    <>
      <Header handleBookmarkClick={handleBookmarkClick} cards={cards} />
      <div className="HeroContainer">
        <img className="heroBg" src="/Assets/background.png" alt="Hero Image" />
        <div className="heroText">
          <p className="heroTitle" style={{ marginBottom: "2px" }}>
            Boost Productivity. Embrace AI.
          </p>
          <h3 className="heroSubTitle">
            Discover how 10M+ professionals and businesses are leveraging AI to
            enhance revenue, efficiency, and savings.
          </h3>
          <button onClick={handleModal} className="heroBtn">
            Get Started
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal" id="myModal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <section>
              <div className="modalSection">
                <div className="modalText">
                  <h1>World of AI</h1>
                  <h3 className="modalH1">Get personalized recommendations</h3>
                  <h5>
                    Based on your profile and preferences, we’ll recommend tools
                    that can help you work smarter.
                  </h5>
                  <h3 className="modalH1">Save your favorites</h3>
                  <h5>
                    Create a shortlist of interesting AI tools, plugins, and
                    content.
                  </h5>
                  <h3 className="modalH1">Rate & review AI tools</h3>
                  <h5>
                    Share your experiences and help others try tools that will
                    work for them.
                  </h5>
                </div>
                <div className="modalImgDiv">
                  <img
                    className="modalImg"
                    src="/Assets/1.jpg"
                    alt="AI tools"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {alertModalVisible && (
        <AlertModal
          description={alertMessage}
          onClose={handleAlertModalClose}
          buttonok="Yes"
        />
      )}

      <section className="carouselContainer">
        <div
          className="carouselInner"
          style={{
            display: "flex",
            overflowX: "auto", // Enable horizontal scrolling
            padding: "10px 0", // Optional padding for aesthetic spacing
            gap: "10px", // Spacing between cards
          }}
        >
          {filteredCards.map((card) => (
            <AIImagecards
              key={card.id}
              item={card}
              setCards={setCards}
              cards={filteredCards} // use filtered cards
              handleBookmarkClick={handleBookmarkClick}
            />
          ))}
        </div>
      </section>
      <div>
        <YoutubeVideoCard />
      </div>

      <div>
        <TrendingAI
          cards={cards}
          handleToolCategoryChange={handleToolCategoryChange}
        />
      </div>
      <WebFooter />
    </>
  );
}
