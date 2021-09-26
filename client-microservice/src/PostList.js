import React, { useEffect, useState } from "react";
import { CommentCreate } from "./CommentCreate";
import { CommentList } from "./CommentList";

export const PostList = () => {
  const [posts, setPosts] = useState({});
  const fetchPost = async () => {
    const response = await fetch("http://localhost:4002/posts");
    const data = await response.json();
    console.log(data);
    setPosts(data);
  };
  useEffect(() => {
    fetchPost();
  }, []);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentCreate postId={post.id} />
          <CommentList comments={post.comments} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};
