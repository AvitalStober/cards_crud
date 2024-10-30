import React, { useEffect } from "react";
import axios from "axios";

function UpdateColor({
  card,
  cards,
  setCards,
  color,
  setIsUpdatingColor,
  setColor,
  setCardId,
}) {
  const updating = async () => {
    console.log(card.id, card.text, card.color);
    await axios
      .put(`http://localhost:5000/cards/${card.id}`, {
        text: card.text,
        color: color ? color : card.color,
      })
      .then((response) => {
        setColor("");
        setCards(response.data);
        setIsUpdatingColor("");
        // setCardId('');
      })
      .catch((error) => {
        console.error("There was an error updating the card!", error);
      });
  };

  useEffect(() => {
    updating();
  }, []);

  return null;
}

export default UpdateColor;
