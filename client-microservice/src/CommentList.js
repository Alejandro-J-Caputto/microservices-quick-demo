import React from "react";

export const CommentList = ({ comments }) => {
  console.log(comments);
  const renderedComments = comments.length
    ? comments.map((comment) => (
        <li key={comment.id}>
          {comment.status === "pending"
            ? "pending"
            : comment.status === "rejected"
            ? "blocked by moderators"
            : comment.content}
        </li>
      ))
    : null;
  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  );
};
