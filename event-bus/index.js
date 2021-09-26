const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.post("/events", async (req, res) => {
  const event = req.body;
  fetch("http://localhost:4000/events", {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });
  fetch("http://localhost:4001/events", {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });
  fetch("http://localhost:4002/events", {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });
  fetch("http://localhost:4003/events", {
    method: "POST",
    body: JSON.stringify(event),
    headers: {
      "Content-Type": "application/json",
    },
  });
});

app.listen(5000, () => {
  console.log("listening on port 5000");
});
