import React, { useState } from "react";
import "./Ticket.css";

function Ticket({ ticket, showCheckbox }) {
  const { id, title, tag, userId } = ticket;

  let imageSource;
  if (userId === "usr-1")
    imageSource = "https://randomuser.me/api/portraits/women/74.jpg";
  if (userId === "usr-2")
    imageSource = "https://randomuser.me/api/portraits/men/65.jpg";
  if (userId === "usr-3")
    imageSource = "https://randomuser.me/api/portraits/men/73.jpg";
  if (userId === "usr-4")
    imageSource = "https://randomuser.me/api/portraits/women/67.jpg";
  if (userId === "usr-5")
    imageSource = "https://randomuser.me/api/portraits/men/29.jpg";

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <p className="ticket-id">{id}</p>
        <div className="user-circle">
          <img src={imageSource} alt="User" />
        </div>
      </div>
      <label className={`ticket-title ${isChecked ? "checked" : ""}`}>
        {showCheckbox && (
          <button className="checkbox-button" onClick={toggleCheckbox}>
            {isChecked ? "✓" : "○"}
          </button>
        )}
        <strong>{title}</strong>
      </label>
      {tag && (
        <p className="ticket-tags">
          {tag.map((tag, index) => (index === 0 ? tag : `, ${tag}`))}
        </p>
      )}
    </div>
  );
}

export default Ticket;
