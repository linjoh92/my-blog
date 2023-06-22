import { useRouter } from "next/router";
import BlogEditor from "@/components/blog-editor";
import { postCacheKey, editPosts, getPostBySlug } from "../../../../api-routes/posts";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { createSlug } from "@/utils/createSlug";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { userCacheKey, getUserById } from "../../../../api-routes/user";
import { useUser } from "@supabase/auth-helpers-react";

export default function EditBlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const user = useUser();
  const activeUserId = user?.id;

  const { data: { data: userData = {} } = {} } = useSWR(
    activeUserId ? userCacheKey : null,
    () => getUserById(null, { arg: activeUserId })
  );

  const {
    data: { data: post = {} } = {},
    error,
    isLoading,
  } = useSWR(slug ? `${postCacheKey}${slug}` : null, () =>
    getPostBySlug({ slug })
  );

  const { trigger: editTrigger } = useSWRMutation(
    `${postCacheKey}${slug}`,
    editPosts
  );

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const newSlug = createSlug(titleInput);

    const updatedPost = {
      author_name: userData.name,
      title: titleInput,
      slug: newSlug,
      body: editorContent,
      image: image,
      id: post && post.id,
    };

    const { data, error } = await editTrigger(updatedPost);
    if (!error) {
      router.push(`/blog/${newSlug}`);
    }
  };

  if (isLoading) {
    return "...loading";
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleGoBack = () => {
    router.push(`/blog/${slug}`);
  };

  return (
    <>
      <BlogEditor
        heading="Edit blog post"
        title={post && post.title}
        src={post && post.image}
        alt={post && post.title}
        content={post && post.body}
        buttonText="Save changes"
        onSubmit={handleOnSubmit}
        handleGoBack={handleGoBack}
        closeBtnText="Close"
      />
    </>
  );
}

// Detta har jag klipp rakt in från Alex förstår inte hel.

export const getServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { slug } = ctx.params;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("posts")
    .select()
    .single()
    .eq("slug", slug);

  const isAuthor = data.user_id === session.user.id;

  if (!isAuthor) {
    return {
      redirect: {
        destination: `/blog/${slug}`,
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};
