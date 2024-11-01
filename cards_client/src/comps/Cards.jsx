
import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateColor from "./Update";
import DeleteCard from "./DeleteCard";
import AddCard from "./AddCard";
import ColorPicker from "./ColorPicker";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "CARD";

function Cards() {
  const [cards, setCards] = useState([]);
  const [isUpdatingColor, setIsUpdatingColor] = useState(false);
  const [isUpdatingText, setIsUpdatingText] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [submit, setSubmit] = useState(false);
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

  const handleTextSend = () => {
    setIsUpdatingText(false);
    setSubmit(true);
  };

  const handleAdd = () => {
    setIsAdding(true);
  };

  const moveCard = (fromIndex, toIndex) => {
    const updatedCards = [...cards];
    const [movedCard] = updatedCards.splice(fromIndex, 1);
    updatedCards.splice(toIndex, 0, movedCard);
    
    axios
      .put("http://localhost:5000/cards", { oldIndex:fromIndex, newIndex:toIndex })
      .then(() => console.log("did it well"));

    setCards(updatedCards);
  };

  const DraggableCard = ({ card, index }) => {
    const [, ref] = useDrag({
      type: ItemType,
      item: { id: card.id, index },
    });

    const [, drop] = useDrop({
      accept: ItemType,
      hover(item) {
        if (item.index !== index) {
          moveCard(item.index, index);
          item.index = index;
        }
      },
    });

    return (
      <div
        ref={(node) => ref(drop(node))}
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
                type="text"
                style={{ backgroundColor: card.color, color: "white" }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button onClick={handleTextSend}>Send</button>
              <button onClick={() => setIsUpdatingText(false)}>Cancel</button>
            </div>
          )}
          {!isUpdatingColor || !(cardId === card.id) ? (
            <div className="squereIcons">
              <div className="circle icon" onClick={() => updateColor(card.id)}>
                ◯
              </div>
              <DeleteCard
                id={card.id}
                setCards={setCards}
                setDeleteCard={setIsUpdatingColor}
              />
            </div>
          ) : (
            <div className="circlesToPick">
              <ColorPicker setColor={setColor} type={"update"} />
              <button onClick={() => setIsUpdatingColor(false)}>Cancel</button>
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
            setText={setText}
            setIsUpdatingColor={setIsUpdatingColor}
          />
        )}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div className="cards">
          {cards.map((card, index) => (
            <DraggableCard key={card.id} card={card} index={index} />
          ))}
        </div>
        {isAdding && <AddCard setIsAdding={setIsAdding} setCards={setCards} />}
        <div className="addingCard oneCard" onClick={handleAdd}>
          +
        </div>
      </div>
    </DndProvider>
  );
}

export default Cards;
