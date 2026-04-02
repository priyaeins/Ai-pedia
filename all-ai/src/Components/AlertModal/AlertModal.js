import React from "react";
import { IconX, IconAlertCircle } from "@tabler/icons-react";
import "./AlertModal.css";

function AlertModal({ description, onClose, buttonok, buttoncancel = "Cancel" }) {
  return (
    <div className="alert-backdrop" onClick={() => onClose(false)}>
      <div className="alert-window" onClick={e => e.stopPropagation()}>
        <div className="alert-header">
          <div className="alert-icon-wrapper">
            <IconAlertCircle size={24} />
          </div>
          <button className="alert-close-btn" onClick={() => onClose(false)}>
            <IconX size={20} />
          </button>
        </div>
        <div className="alert-body">
          <p className="alert-desc">{description}</p>
        </div>
        <div className="alert-footer">
          {buttoncancel && (
            <button className="btn-cancel" onClick={() => onClose(false)}>
              {buttoncancel}
            </button>
          )}
          <button className="btn-confirm" onClick={() => onClose(true)}>
            {buttonok}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertModal;

