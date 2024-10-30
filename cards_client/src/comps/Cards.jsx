import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateColor from "./UpdateColor";

let colorsArray = ["red", "blue", "green", "pink", "yellow"];

function Cards() {
  const [cards, setCards] = useState([]);
  const [isUpdatingColor, setIsUpdatingColor] = useState(false);
  const [color, setColor] = useState("");
  const [cardId, setCardId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/cards")
      .then((response) => setCards(response.data));
  }, []);

  useEffect(() => {
    console.log(cards);
    
  }, [cards]);

  const updateColor = (id) => {
    setCardId(id)
    setIsUpdatingColor(true);
  };

  const handleColorClick = (color) => {
    setColor(color);
  };

  return (
    <div>
      Cards
      <div className="cards">
        {cards.map((card) => (
          <div
            key={card.id}
            className="oneCard"
            style={{ backgroundColor: card.color }}
          >
            <div className="content">
              <h2 className="cardText">{card.text}</h2>
              {!isUpdatingColor || !(cardId === card.id) ?  (
                <div className="squereIcons">
                  <div
                    className="circle icon"
                    onClick={() => updateColor(card.id)}
                  >
                    ◯
                  </div>

                  <div className="garbageIcon icon">🗑️</div>
                </div>
              ) : (
                <div className="circlesToPick">
                  {colorsArray.map((color) => (
                    <div
                      key={color}
                      className="pickingColor"
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: color,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: "bold",
                      }}
                      onClick={() => {
                        handleColorClick(color);
                      }}
                    ></div>
                  ))}
                  <button onClick={() => setIsUpdatingColor(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
            {color && cardId === card.id && (
              <UpdateColor
                card={card}
                cards={cards}
                setCards={setCards}
                color={color}
                setCardId={setCardId}
                setColor={setColor}
                setIsUpdatingColor={setIsUpdatingColor}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
