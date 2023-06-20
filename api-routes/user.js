import { supabase } from "@/lib/supabaseClient";

export const userCacheKey = "/profil";

export const getUser = async () => {
  const { data } = await supabase.from("users").select();

  return { data };
};

export async function getUserById(_, { arg: id }) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  return { data, error };
}

export const editUser = async (_, { arg: updatedUser }) => {
  const { data, error, status } = await supabase
    .from("users")
    .update({
      name: updatedUser.name,
    })
    .eq("id", updatedUser.id)
    .select()
    .single();

  return { data, error, status };
};
