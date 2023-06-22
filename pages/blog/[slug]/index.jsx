import { useRouter } from "next/router";
import styles from "./blog-post.module.css";
import Comments from "./partials/comments";
import AddComment from "./partials/add-comment";
import Button from "@components/button";
import Heading from "@components/heading";
import BlogImageBanner from "@components/blog-image-banner";
import { getPostBySlug, postCacheKey, deletePosts, getPosts } from "../../../api-routes/posts";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { GrFormPrevious } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { useUser } from "@supabase/auth-helpers-react";

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const user = useUser();

  const { data: postsData = [] } = useSWR(postCacheKey, getPosts);
  const posts = postsData.data || [];

  const { data, error } = useSWR(slug ? `${postCacheKey}${slug}` : null, () =>
    getPostBySlug({ slug })
  );

  const post = data?.data;

  const { trigger: deleteTrigger } = useSWRMutation(postCacheKey, deletePosts);
  const handleDeletePost = async () => {
    const { error } = await deleteTrigger(post.id);
    if (!error) {
      router.push("/blog");
    }
  };

  const handleEditPost = () => {
    router.push(`/blog/${slug}/edit`);
  };

  const currentIndex = posts.findIndex((p) => p.id === post?.id);

  const handleNextPost = () => {
    if (currentIndex !== -1 && currentIndex < posts.length - 1) {
      const nextPost = posts[currentIndex + 1];
      router.push(`/blog/${nextPost.slug}`);
    }
  };

  const handlePrevPost = () => {
    if (currentIndex !== -1 && currentIndex > 0) {
      const prevPost = posts[currentIndex - 1];
      router.push(`/blog/${prevPost.slug}`);
    }
  };

  const hasNextPost = currentIndex !== -1 && currentIndex < posts.length - 1;
  const hasPrevPost = currentIndex !== -1 && currentIndex > 0;

  if (!post && !error) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleGoBack = () => {
    router.push(`/blog/`);
  };

  console.log(post);

  return (
    <>
      <div className={styles.containerPosts}>
        <section className={styles.container}>
          <div className={styles.headingContainer}>
            <Button onClick={handleGoBack} className={styles.btnSize}>
              Back
            </Button>
            <Heading>{post.title}</Heading>
            <div className={styles.btnSize}></div>
          </div>
          {post?.image && (
            <BlogImageBanner src={post.image} alt={post.title} noHover={true} />
          )}
          <div className={styles.dateContainer}>
            <time className={styles.date}>
              {new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <div className={styles.textContainer}>
            <h3 style={{ marginBottom: "10px" }}>{post.title}</h3>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />

            {user && user.id === post.author ? (
              <span className={styles.author}> Author: You</span>
            ) : (
              <span className={styles.author}>
                {" "}
                Author: {post.author_name ? post.author_name : "John Doe"}
              </span>
            )}
          </div>

          {/* The Delete & Edit part should only be showed if you are authenticated and you are the author */}
          {user &&
            user.id === post.author && ( // Only show if authenticated and are the author
              <div className={styles.buttonContainer}>
                <Button onClick={handleDeletePost}>Delete</Button>
                <Button onClick={handleEditPost}>Edit</Button>
              </div>
            )}
          <div className={styles.pagnationConatiner}>
            <Button
              className={`${styles.pagnationPrev} ${
                !hasPrevPost && styles.disabled
              }`}
              onClick={handlePrevPost}
            >
              {" "}
              <GrFormPrevious />
              Prev
            </Button>
            <Button
              className={`${styles.pagnationNext} ${
                !hasNextPost && styles.disabled
              }`}
              onClick={handleNextPost}
            >
              Next
              <GrFormNext />
            </Button>
          </div>
        </section>

        <Comments postId={post.id} post={post} />
        <AddComment postId={post.id} />
      </div>
    </>
  );
}
