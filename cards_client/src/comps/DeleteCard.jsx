import React, { useEffect } from "react";
import axios from "axios";

function DeleteCard({ id, setCards, setDeleteCard }) {
  useEffect(() => {
    deleteCard();
  });

  const deleteCard = async () => {
    await axios
      .delete(`http://localhost:5000/cards/${id}`)
      .then((response) => {
        setCards(response.data);
        setDeleteCard(false);
      })
      .catch((error) => {
        console.error("There was an error updating the card!", error);
      });
  };

  return <div></div>;
}

export default DeleteCard;
