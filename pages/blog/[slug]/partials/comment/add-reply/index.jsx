import { useState, useRef } from "react";
import Button from "@components/button";
import Input from "@components/input";
import Label from "@components/label";
import TextArea from "@components/text-area";
import styles from "./add-reply.module.css";
import useSWRMutation from "swr/mutation";
import { 
    addReply, 
    replyCacheKey
} from "../../../../../blog/api";
import { useUser } from '@supabase/auth-helpers-react'

export default function AddReply({ commentId }) {
  const formRef = useRef(); // create a reference
  const user = useUser();
  const [submitted, setSubmitted] = useState(false); // track form submission

  const { trigger: addTrigger } = useSWRMutation(
    replyCacheKey,
    addReply,
  );
  
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { author, reply } = Object.fromEntries(formData);
    const replyData = {
      author,
      reply,
      comment_id: commentId,
      ... {author_id: user?.id ?? null }
    };

    const { data, error } = await addTrigger(replyData);
    
    if (!error) {
      formRef.current.reset();
      setSubmitted(true); // set the submitted state to true
    }

    if (error) {
        console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      {!submitted && (
        <form ref={formRef} className={styles.form} onSubmit={handleOnSubmit}>
          <div className={styles.inputContainer}>
            <Label htmlFor="author">Author</Label>
            <Input id="author" name="author" />
          </div>

          <div className={styles.inputContainer}>
            <Label htmlFor="reply">Reply</Label>
            <TextArea id="reply" name="reply" />
          </div>

          <Button className={styles.addCommentButton} type="submit">
            Submit
          </Button>
        </form>
      )}
      {submitted}
    </div>
  );
}

