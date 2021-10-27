import React from 'react';
import Comment from '../Comment/Comment';

const Comments = ({ comments, post, setPost }) => (
  <>
    {comments.map((comment) => (
      <Comment
        comment={comment}
        key={comment._id}
        post={post}
        setPost={setPost}
      />
    ))}
  </>
);

export default Comments;
