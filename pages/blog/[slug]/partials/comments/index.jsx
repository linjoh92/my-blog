import React from "react";
import styles from "./comments.module.css";
import Comment from "../comment";
import { 
  getCommentsByPostId, 
  commentsCacheKey 
} from "../../../api";
import useSWR from "swr";

export default function Comments({ postId , post}) {
  const cacheKey = `${commentsCacheKey}-${postId}`;

  const { data: comments, error } = useSWR(cacheKey, () =>
  getCommentsByPostId(postId),
  { refreshInterval: 0.1 } 
  );

  if (!comments && !error) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} post={post}  />
      ))}
    </div>
  );
}


