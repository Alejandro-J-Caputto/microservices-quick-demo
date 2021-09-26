const express = require("express");
const { randomBytes } = require("crypto");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const comments = commentsByPostId[req.params.id] || [];
  res.status(200).json({
    status: "success",
    data: comments,
  });
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[req.params.id] = comments;
  await fetch(`http://localhost:5000/events`, {
    method: "POST",
    body: JSON.stringify({
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: "pending",
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  res.status(201).json({
    status: "success",
    data: comments,
  });
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { postId, id, status } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
    await fetch(`http://localhost:5000/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "CommentUpdated",
        data: { id, status, postId, content: data.content },
      }),
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log("listening on port 4001");
});
