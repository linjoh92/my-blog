import { supabase } from "@/lib/supabaseClient";
import { uploadImage } from "../../utils/uploadImage";

export const postCacheKey = "/blogg/post";
export const commentsCacheKey = "/blogg/comments";
export const replyCacheKey = "/blogg/comments/reply";

export async function getPosts() {
  const { data } = await supabase
    .from("posts")
    .select()
    .order("created_at", { ascending: false });

  return { data: data || [] };
}

export async function getPostBySlug({ slug }) {
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("slug", slug)
    .single();

  return { data, error };
}

export async function deletePosts(_, { arg: id }) {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .select()
    .eq("id", id);

  return { data, error };
}

export const addPosts = async (_, { arg: newPost }) => {
  let image = "";

  if (newPost?.image) {
    const { publicUrl, error } = await uploadImage(newPost?.image);

    if (!error) {
      image = publicUrl;
    }
  }

  const { data, error, status } = await supabase
    .from("posts")
    .insert({ ...newPost, image })
    .select()
    .single();

  return { error, status, data };
};

export const editPosts = async (_, { arg: updatedPost }) => {
  let image = updatedPost?.image ?? "";

  const isNewImage = typeof image === "object" && image !== null;

  if (isNewImage) {
    const { publicUrl, error } = await uploadImage(updatedPost?.image);

    if (!error) {
      image = publicUrl;
    }
  }

  const { data, error, status } = await supabase
    .from("posts")
    .update({ ...updatedPost, image })
    .eq("id", updatedPost.id)
    .select()
    .single();

  return { data, error, status };
};

export async function getCommentsByPostId(postId) {
  const { data, error } = await supabase
    .from("comments")
    .select()
    .eq("post_id", postId);

  return data || [];
}

export const addComment = async (_, { arg: commentData }) => {
  const { data, error } = await supabase
    .from("comments")
    .insert({ ...commentData })
    .single()
    .select("*");

  return { error, data };
};

export async function deleteComments(_, { arg: id }) {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .select()
    .eq("id", id);

  return { data, error };
}

export async function getReplysByCommentId(commentId) {
  const { data, error } = await supabase
    .from("reply")
    .select()
    .eq("comment_id", commentId);

  return data || [];
}

export const addReply = async (_, { arg: replyData }) => {
  const { data, error } = await supabase
    .from("reply")
    .insert({ ...replyData })
    .single()
    .select("*");

  return { error, data };
};

export async function deleteReply(_, { arg: id }) {
  const { data, error } = await supabase
    .from("reply")
    .delete()
    .select()
    .eq("id", id);

  return { data, error };
}
