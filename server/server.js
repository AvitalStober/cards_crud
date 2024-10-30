const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let ID = 5;

let cards = [
  { id: 1, text: "a", color: "green" },
  { id: 2, text: "b", color: "pink" },
  { id: 3, text: "c", color: "yellow" },
  { id: 4, text: "d", color: "brown" },
];

app.get("/cards", (req, res) => {
  try {
    res.send(cards);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/cards/:id", (req, res) => {
  try {
    const card = cards.filter((book) => book.id == req.params.id)[0];
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.send(card);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/cards", (req, res) => {
  try {
    const { text, color } = req.body;

    const newCard = {
      id: ID++,
      text: text,
      color: color,
    };

    cards.push(newCard);
    res.status(201).json(newCard);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/cards/:id", (req, res) => {
  try {
    const { text, color } = req.body;

    const newCard = {
      id: parseInt(req.params.id),
      text: text,
      color: color,
    };

    const newArray = cards.map((book) =>
      book.id == req.params.id ? newCard : book
    );

    cards = newArray;

    res.send(cards);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/cards/:id", (req, res) => {
  try {
    const afterDelete = cards.filter((book) => book.id != req.params.id);
    cards = afterDelete;
    res.send(cards);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
