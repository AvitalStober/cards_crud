import React from "react";
import axios from "axios";

function DeleteCard({ id, setCards, setDeleteCard }) {


  const deleteCard = async () => {
    setDeleteCard(true);
    await axios
      .delete(`http://localhost:5000/cards/${id}`)
      .then((response) => {
        setCards(response.data);
        console.log(response.data);

        setDeleteCard(false);
      })
      .catch((error) => {
        console.error("There was an error deleting the card!", error);
      });
  };

  return (
    <div>
      <div className="garbageIcon icon" onClick={deleteCard}>
        🗑️
      </div>
    </div>
  );
}

export default DeleteCard;
