import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";
import IntroText from "@components/intro-text";
import { getPosts, postCacheKey } from "./api";
import useSWR from "swr";
import { useUser } from "@supabase/auth-helpers-react";
import BlogImageBanner from "@components/blog-image-banner";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function Blog() {
  const user = useUser();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: { data = [] } = {},
    error,
    isLoading,
  } = useSWR(postCacheKey, getPosts);

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <Heading>Recent Posts</Heading>
      <IntroText>
        Discover the freshest blog posts here! Discover tantalizing recipes,
        fresh summer ingredients, and traditional Swedish flavors that will
        elevate your dining experience. Join us as we celebrate the vibrant food
        culture of Midsummer and embark on a delicious journey!{" "}
      </IntroText>

      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        <div className={styles.searchIconContainer}>
          <BsSearch className={styles.searchIcon} />
        </div>
      </div>

      <div className={styles.posts}>
        {filteredData.map((post) => (
          <Link
            key={post.slug}
            className={styles.link}
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <div className={styles.image}>
                {post?.image && (
                  <BlogImageBanner
                    src={post.image}
                    alt={post.title}
                    noHover={false}
                  />
                )}
              </div>
              <time className={styles.date}>
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "2-digit",
                })}
              </time>
              <h3 className={styles.title}>{post.title}</h3>
              {user && user.id === post.author ? (
                <p className={styles.date}>
                  {" "}
                  Author:{" "}
                  <span className={styles.author}>
                    {" "}
                    {post.author_name}
                    <span className={styles.you}> (you)</span>
                  </span>
                </p>
              ) : (
                <p className={styles.date}>
                  {" "}
                  Author:{" "}
                  <span className={styles.author}>
                    {post.author_name ? post.author_name : "John Doe"}
                  </span>
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
