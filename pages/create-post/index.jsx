import BlogEditor from "@/components/blog-editor";
import { createSlug } from "@/utils/createSlug";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";
import { 
  addPosts, 
  postCacheKey 
} from "../blog/api";
import { useUser } from '@supabase/auth-helpers-react'

export default function CreatePost() {
  const router = useRouter();
  const user = useUser();

  const { trigger: addTrigger} = useSWRMutation(
    postCacheKey,
    addPosts,
  );

  const handleOnSubmit = async ({ editorContent, titleInput, image}) => {
    const slug = createSlug(titleInput);

    const newPost = {
      title: titleInput,
      slug,
      author: user.id,
      user_id: user.id,
      body: editorContent,
      image,
    };

    const { error } = await addTrigger(newPost);

    if (!error) {
      router.push(`/blog/${slug}`);
    }
   };

  return (
    <>
      <div>
        <BlogEditor
          heading="Create post"
          onSubmit={handleOnSubmit}
          buttonText="Upload post"
        />
      </div>
    </>
  );
}
