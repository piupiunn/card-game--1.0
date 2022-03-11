import React from "react";
import "./SingCard.css";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div>
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={card.src} alt="card front" />
          <img
            className="back"
            onClick={handleClick}
            src="/img/backside.png"
            alt="card back"
          />
        </div>
      </div>
    </div>
  );
}
