import { supabase } from "@/lib/supabaseClient";

export const replyCacheKey = "/blogg/comments/reply";

export const addReply = async (_, { arg: replyData }) => {
  const { data, error } = await supabase
    .from("reply")
    .insert({ ...replyData })
    .single()
    .select("*");

  return { error, data };
};

export async function getReplysByCommentId(commentId) {
  const { data, error } = await supabase
    .from("reply")
    .select()
    .eq("comment_id", commentId);

  return data || [];
}

export async function deleteReply(_, { arg: id }) {
  const { data, error } = await supabase
    .from("reply")
    .delete()
    .select()
    .eq("id", id);

  return { data, error };
}
