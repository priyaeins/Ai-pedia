import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconBookmarkFilled } from "@tabler/icons-react";
import SavedAI from "../SavedAI/SavedAI";
import "./Header.css";
import AlertModal from "../AlertModal/AlertModal";

export default function Header({ handleBookmarkClick, cards }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [alertModalVisible, setAlertModalVisible] = useState(false); // Modal visibility
  const [alertMessage, setAlertMessage] = useState(""); // Modal message

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLogin(loggedInStatus === "true");
  }, []);

  // Handle Logout Click (trigger the AlertModal)
  const handleLogoutClick = () => {
    const message = "Are you sure you want to log out?";
    setAlertMessage(message); // Set the alert message for the modal
    setAlertModalVisible(true); // Show the alert modal
  };

  // Handle AlertModal Close (logout confirmation)
  const handleAlertModalClose = (confirmed) => {
    setAlertModalVisible(false); // Close the modal

    if (confirmed) {
      // Proceed with logout if user confirms
      console.log("User confirmed logout");
      setIsLogin(false); // Update state to reflect logout
      localStorage.setItem("isLoggedIn", "false"); // Update localStorage
      navigate("/login"); // Redirect to login page
    } else {
      // Handle if user cancels logout
      console.log("User canceled logout");
    }
  };

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  const handleOnClick = () => {
    if (isLogin) {
      handleLogoutClick(); // Show logout confirmation modal
    } else {
      navigate("/login"); // Navigate to the login screen
    }
  };

  const handleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="header">
      <div className="logo">
        <img
          style={{ width: 180, height: 90, padding: 20 }}
          src="/Assets/logo.png"
          alt="all ai"
          onClick={() => navigate("/")}
        />
      </div>
      <nav className="navLinks">
        <div onClick={() => navigate("/AITools")}>AI Tools</div>
        <div onClick={() => navigate("/AIAgent")}>AI Agent</div>
        <div onClick={() => navigate("/AITutorials")}>AI Tutorials</div>
      </nav>
      <div
        className="login-container"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <div
          className="saved-ai-icon"
          style={{ display: "flex", alignItems: "center" }}
          onClick={handleModal} // Open modal on click
        >
          <IconBookmarkFilled />
        </div>

        {/* Modal for SavedAI */}
        {showModal && (
          <div className="saved-modal">
            <div className="saved-modal-content">
              <span className="saved-close" onClick={closeModal}>
                &times;
              </span>
              <section>
                <div
                  className="saved-modalSection"
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: "40px",
                    width: "25%",
                    margin: " 0 38%",
                    justifyContent: "center",
                  }}
                >
                  <SavedAI
                    handleBookmarkClick={handleBookmarkClick}
                    cards={cards}
                  />
                </div>
              </section>
            </div>
          </div>
        )}

        <div>
          <button
            type="button"
            className="login-btn"
            id="login1"
            style={{ marginLeft: "20px", width: 130 }}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={handleOnClick}
          >
            {isLogin
              ? isHovered
                ? "LOGOUT"
                : "CLICK ME"
              : isHovered
                ? "LOGIN"
                : "CLICK ME"}
          </button>

          {/* AlertModal for logout confirmation */}
          {alertModalVisible && (
            <AlertModal
              visible={alertModalVisible}
              description={alertMessage}
              onClose={handleAlertModalClose}
              buttonok={"Logout"}
            />
          )}
        </div>
      </div>
    </div>
  );
}
