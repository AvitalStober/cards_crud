import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateColor from "./Update";
import DeleteCard from "./DeleteCard";

let colorsArray = ["red", "blue", "green", "pink", "yellow"];

function Cards() {
  const [cards, setCards] = useState([]);
  const [isUpdatingColor, setIsUpdatingColor] = useState(false);
  const [isUpdatingText, setIsUpdatingText] = useState(false);

  const [submit, setSubmit] = useState(false);
  const [deleteCard, setDeleteCard] = useState(false);

  const [color, setColor] = useState("");
  const [text, setText] = useState("");
  const [cardId, setCardId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/cards")
      .then((response) => setCards(response.data));
  }, []);

  const updateColor = (id) => {
    setCardId(id);
    setIsUpdatingColor(true);
  };

  const updateText = (id, text) => {
    setText(text);
    setCardId(id);
    setIsUpdatingText(true);
  };

  const handleColorClick = (color) => {
    setColor(color);
  };

  const handleTextSend = () => {
    setIsUpdatingText(false);
    setSubmit(true);
  };

  const handleDelete = (id) => {
    setCardId(id);
    setDeleteCard(true);
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
              {!isUpdatingText || !(cardId === card.id) ? (
                <h2
                  className="cardText"
                  onClick={() => updateText(card.id, card.text)}
                >
                  {card.text}
                </h2>
              ) : (
                <div className="updateTextInput">
                  <input
                    style={{ backgroundColor: card.color, color: "white" }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <button onClick={handleTextSend}>Send</button>
                  <button onClick={() => setIsUpdatingText(false)}>
                    Cancel
                  </button>
                </div>
              )}
              {!isUpdatingColor || !(cardId === card.id) ? (
                <div className="squereIcons">
                  <div
                    className="circle icon"
                    onClick={() => updateColor(card.id)}
                  >
                    ◯
                  </div>

                  <div
                    className="garbageIcon icon"
                    onClick={() => handleDelete(card.id)}
                  >
                    🗑️
                  </div>
                </div>
              ) : (
                <div className="circlesToPick">
                  {colorsArray.map((color) => (
                    <div
                      key={color}
                      className="pickingColor"
                      style={{
                        background: color,
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
            {(color || submit) && cardId === card.id && (
              <UpdateColor
                card={card}
                setCards={setCards}
                color={color}
                text={text}
                setSubmit={setSubmit}
                setCardId={setCardId}
                setColor={setColor}
                setIsUpdatingColor={setIsUpdatingColor}
              />
            )}
            {deleteCard && <DeleteCard id={cardId} setCards={setCards} setDeleteCard={setIsUpdatingColor} />}
          </div>
        ))}
        <div className=""></div>
      </div>
    </div>
  );
}

export default Cards;
