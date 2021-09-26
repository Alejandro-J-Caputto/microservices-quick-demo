import React from "react";

export const CommentList = ({ comments }) => {
  const renderedComments = comments.length
    ? comments.map((comment) => <li key={comment.id}>{comment.content}</li>)
    : null;
  return (
    <div>
      <ul>{renderedComments}</ul>
    </div>
  );
};
