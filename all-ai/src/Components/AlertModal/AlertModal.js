import React from "react";
import "./AlertModal.css"; // Make sure to import the CSS file

function AlertModal({ description, onClose, buttonok, buttoncancel = null }) {
  return (
    // alert
    <div className="alert-modal">
      <div className="alert-modal-content">
        <h3>{description}</h3>
        <button onClick={() => onClose(true)}>{buttonok}</button>
        {buttoncancel && (
          <button onClick={() => onClose(false)}>{buttoncancel}</button>
        )}
      </div>
      <span className="close-button" onClick={() => onClose(false)}>
        X
      </span>
    </div>
  );
}

export default AlertModal;
