import React, { useState, useEffect } from "react";
import VisitButtons from "../VisitBottons/VisitBottons";
import { useNavigate } from "react-router-dom";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react"; // Correct package import
import SavedAI from "../SavedAI/SavedAI";
import "./AIImagecards.css";
import ControlRating from "../Rating/Rating";

export default function AIImagecards(props) {
  const {
    id = "1",
    Name = "",
    image = "/Assets/bg.jpg",
    description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio,",
    rating = 5,
    status = "free", // Default status
    visit = "Visit", // Default value for visit button
    visitLink = "https://example.com", // Default visit link
    hashtag = "#hashtag",
    Bookmarked = false,
  } = props.item; // If props.item is undefined, provide defaults

  // If no valid card data, return null

  const handleBookMark = () => {
    // Call parent function passed via props to update bookmark state
    if (props.handleBookmarkClick) {
      props.handleBookmarkClick(id);
    }
  };

  // Function to get style based on status
  const getStatusStyle = (status) => {
    switch (status) {
      case "free":
        return { color: "green" };
      case "freeTrial":
        return { color: "blue" };
      case "freemium":
        return { color: "blue" };
      case "premium":
        return { color: "red" };
      case "paid":
        return { color: "orange" };
      default:
        return { color: "VeryDarkGreen" };
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h1 className="card-subtitle">{Name}</h1>
          <img src={image} className="card-image" alt="card" />
          <div
            style={{
              flex: 1,
              margin: "10px",
              marginTop: "20px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {hashtag}
          </div>
        </div>
        <div className="card-content">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <h2 className="card-title">Something Awesome</h2>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            {status && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <p
                  style={{
                    color: getStatusStyle(status).color,
                    backgroundColor: "lightgray",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontSize: "14px",
                  }}
                >
                  {status}
                </p>
              </div>
            )}
            <div
              style={{ cursor: "pointer", color: "gray" }}
              onClick={handleBookMark}
            >
              {Bookmarked ? <IconBookmarkFilled /> : <IconBookmark />}
            </div>
          </div>
          <p className="card-body">{description}</p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between", // Ensures items are spaced across the container
              alignItems: "center", // Vertically aligns the items
            }}
          >
            {/* ControlRating aligned to the flex start */}
            <ControlRating
              initialValue={rating} // Pass initial rating value
              readOnly={true}
              readOnlyLabel="Rating"
            />

            {/* VisitButtons aligned to the flex end */}
            <VisitButtons
              title={visit} // Pass the visit title from props
              onClick={() => window.open(visitLink, "_blank")} // Use visitLink from props
              style={{ marginLeft: "auto" }} // Aligns the button to the end of the flex container
            />
          </div>
        </div>
      </div>
    </div>
  );
}
