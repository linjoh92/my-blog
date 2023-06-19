import React from "react";
import styles from "./replys.module.css";
import Reply from "../reply";
import {  
  getReplysByCommentId, 
  replyCacheKey 
} from "../../../../api";
import useSWR from "swr";

export default function Replys({ commentId , comment}) {
  const cacheKey = `${replyCacheKey}-${commentId}`;

  const { data: replys, error } = useSWR(cacheKey, () =>
  getReplysByCommentId(commentId),
  { refreshInterval: 0.1 } 
  );

  if (!replys && !error) {
    return <div>Loading replys...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.container}>
      {replys && replys.length > 0 && <h2 className={styles.rubrk}>Replys</h2>}
      {replys.map((reply) => (
        <Reply key={reply.id} {...reply} comment={comment}  />
      ))}
    </div>
  );
}