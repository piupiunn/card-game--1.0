import React from "react";
import "./SingCard.css";

/**Prop olarak card ve handleChoice i ekledik */
export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  /**Arka tarafın olduğu olduğu resme handleClick isimli eventListener atandı. handleClick fonksiyonu App.js de tanımlanan handleChoice fonksiyonunu çalıştıracak ve değer olarak card alacak. eventListenerin iklinci resme koyulmasının sebebi, aynı resimleri bulabilmek için önce arka taraf resmine tıklanacağı için. */
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
