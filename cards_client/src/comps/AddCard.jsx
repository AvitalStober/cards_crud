import React, { useState } from "react";
import axios from "axios";
import ColorPicker from "./ColorPicker";

function AddCard({ setIsAdding, setCards }) {
  const [text, setText] = useState("");
  const [color, setColor] = useState("white");

  const handleTextSend = () => {
    if (text && color !== "white") {
      axios
        .post(`http://localhost:5000/cards`, { text: text, color: color })
        .then((response) => {
          setCards((prev) => [...prev, response.data]);
        })
        .catch((error) => {
          console.error("There was an error adding the card!", error);
        });
      setIsAdding(false);
    } else {
      alert("you have to pick color and write text");
    }
  };
  return (
    <div>
      <div className="oneCard addCard">
        <div className="updateTextInput">
          <input
            type="text"
            value={text}
            style={{backgroundColor: color}}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <ColorPicker setColor={setColor} type={"add"} />
        <button onClick={handleTextSend}>Send</button>
        <button onClick={() => setIsAdding(false)}>Cancle</button>
      </div>
    </div>
  );
}

export default AddCard;
