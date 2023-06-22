import { supabase } from "@/lib/supabaseClient";

export const commentsCacheKey = "/blogg/comments";

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


