const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  await fetch(`http://localhost:5000/events`, {
    method: "POST",
    body: JSON.stringify({
      data: {
        id,
        title,
      },
      type: "PostCreated",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  res.status(201).json(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("me dispare", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
