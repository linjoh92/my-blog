import Button from "@components/button";
import styles from "./comment.module.css";
import { 
  commentsCacheKey,
  deleteComments,
} from "../../../api"; 
import useSWRMutation from "swr/mutation";
import { useUser } from '@supabase/auth-helpers-react'
import AddReply from "./add-reply";
import { useState } from "react";
import Replys from "./replys";

export default function Comment({ comment, created_at, author, id, author_id, post }) {
  const user = useUser();
  const [showReply, setShowReply] = useState(false);

  const { trigger: deleteTrigger } = useSWRMutation(
    commentsCacheKey, 
    deleteComments, {
  });

  const handleDelete = async () => {
    const { status, error } = await deleteTrigger(id);
    if (!error) {
      console.log("deleted comment")
    }
    if (error) {
      console.log(error)
    }
  };

  const handleAddReply = () => {
    setShowReply(!showReply);
  };

  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <div className={styles.authorDateContainer}>
        <p className={styles.author}>{author}</p>
        {user && user.id === author_id && (
          <span>(You)</span>
         )}
        <time className={styles.date}>
           {new Date(created_at).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: false
            })}
        </time>
      </div>
        <div className={styles.bothButtonContainer}>
        {user && (user.id === author_id || user.id === post.author) && (      
          <div className={styles.buttonContainer}>
            <Button onClick={handleDelete}>Delete</Button>
          </div>
        )}
        <div className={styles.buttonContainer}>
          <Button onClick={handleAddReply}>Reply</Button>
        </div>
      </div>
      
      <Replys commentId={id} comment={comment} />
      {showReply && <AddReply commentId={id} />}
    </div>
  );
}


