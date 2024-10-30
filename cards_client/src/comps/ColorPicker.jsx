import React from "react";

let colorsArray = ["red", "blue", "green", "pink", "yellow"];

function ColorPicker({ setColor, type }) {
  return (
    <div>
      <div
        className={`${type === "add" ? "addColor" : "update"} circlesToPick`}
      >
        {colorsArray.map((color) => (
          <div
            key={color}
            className="pickingColor"
            style={{
              background: color,
            }}
            onClick={() => {
              setColor(color);
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
