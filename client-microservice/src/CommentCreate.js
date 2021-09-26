import React, { useState } from "react";

export const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(content);
    const body = {
      content,
    };
    await fetch(`http://localhost:4001/posts/${postId}/comments`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setContent("");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor=""> New Comment</label>
          <input
            className="form-control"
            type="text"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <button className="btn btn-danger">Submit</button>
      </form>
    </div>
  );
};
