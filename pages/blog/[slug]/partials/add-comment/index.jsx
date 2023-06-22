import { useRef } from "react";
import Button from "@components/button";
import Input from "@components/input";
import Label from "@components/label";
import TextArea from "@components/text-area";
import styles from "./add-comment.module.css";
import useSWRMutation from "swr/mutation";
import { addComment, commentsCacheKey } from "../../../../../api-routes/comments";
import { useUser } from "@supabase/auth-helpers-react";

export default function AddComment({ postId }) {
  const formRef = useRef(); // create a reference
  const user = useUser();

  const { trigger: addTrigger } = useSWRMutation(commentsCacheKey, addComment);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { author, comment } = Object.fromEntries(formData);
    const commentData = {
      author,
      comment,
      post_id: postId,
      ...{ author_id: user?.id ?? null },
    };

    const { data, error } = await addTrigger(commentData);

    if (!error) {
      formRef.current.reset();
      console.log(commentData);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Add a comment</h3>
      <form ref={formRef} className={styles.form} onSubmit={handleOnSubmit}>
        <div className={styles.inputContainer}>
          <Label htmlFor="author">Author</Label>
          <Input id="author" name="author" />
        </div>

        <div className={styles.inputContainer}>
          <Label htmlFor="comment">Comment</Label>
          <TextArea id="comment" name="comment" />
        </div>

        <Button className={styles.addCommentButton} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
