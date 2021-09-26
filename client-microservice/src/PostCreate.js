import React, { useState } from "react";

export const PostCreate = () => {
  const [title, setTitle] = useState("");
  const handleTitleChange = (event) => {
    setTitle(() => {
      return event.target.value;
    });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const body = {
      title,
    };
    console.log(title);
    await fetch("http://localhost:4000/posts", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTitle(() => {
      return "";
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
