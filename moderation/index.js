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
  const { type, data } = req.body;
  console.log("MODERATION", req.body);
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await fetch("http://localhost:5000/events", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        type: "CommentModerated",
        data: {
          id: data.id,
          postId: data.postId,
          status,
          content: data.content,
        },
      }),
    });
  }
  res.send({});
});

app.listen(4003, () => {
  console.log("Listening on port 4003");
});
