import Button from "@components/button";
import styles from "./reply.module.css";
import { 
  replyCacheKey,
  deleteReply,
} from "../../../../api"; 
import useSWRMutation from "swr/mutation";
import { useUser } from '@supabase/auth-helpers-react'

export default function Reply({ reply, created_at, author, id, author_id, comment }) {
  const user = useUser();

  const { trigger: deleteTrigger } = useSWRMutation(
    replyCacheKey, 
    deleteReply, {
  });

  const handleDelete = async () => {
    const { status, error } = await deleteTrigger(id);
    if (!error) {
      console.log("deleted reply")
    }
  };

  return (
    <div className={styles.container}>
      <p>{reply}</p>
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

      {user && (user.id === author_id || user.id === comment.author) && (      
      <div className={styles.buttonContainer}>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
      )}
    </div>
  );
}