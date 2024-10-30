import React from "react";
import axios from "axios";

function UpdateColor({
  card,
  setCards,
  color,
  text,
  setSubmit,
  setIsUpdatingColor,
  setColor,
  setText
}) {

    axios
      .put(`http://localhost:5000/cards/${card.id}`, {
        text: text?text:card.text,
        color: color ? color : card.color,
      })
      .then((response) => {
        setColor("");
        setText('');
        setSubmit(false);
        setCards(response.data);
        setIsUpdatingColor("");
      })
      .catch((error) => {
        console.error("There was an error updating the card!", error);
      });

  return (
    <></>
  );
}

export default UpdateColor;
