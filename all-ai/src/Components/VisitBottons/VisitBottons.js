import React from "react";

// Destructure props from the component's arguments
export default function VisitButtons({ title, onClick }) {
  return (
    <button onClick={onClick} className="visit-button">
      {title}
    </button>
  );
}
