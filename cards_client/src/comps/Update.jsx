import React, { useEffect } from "react";
import axios from "axios";

function UpdateColor({
  card,
  setCards,
  color,
  text,
  setSubmit,
  setIsUpdatingColor,
  setColor,
}) {
  const updating = async () => {
    await axios
      .put(`http://localhost:5000/cards/${card.id}`, {
        text: text?text:card.text,
        color: color ? color : card.color,
      })
      .then((response) => {
        setColor("");
        setSubmit(false);
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
  });

  return (
    <></>
  );
}

export default UpdateColor;
