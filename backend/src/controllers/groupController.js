import { supabase } from "../config/supabaseClient.js";

export async function createGroup(req, res) {
  const { name } = req.body;
  const userId = req.user.id;

  const { data, error } = await supabase
    .from("groups")
    .insert([{ name, created_by: userId }])
    .select()
    .single();

  if (error) return res.status(400).json({ error });

  res.json(data);
}

export async function addMember(req, res) {
  const { group_id, user_id } = req.body;

  const { data, error } = await supabase
    .from("group_members")
    .insert([{ group_id, user_id }])
    .select()
    .single();

  if (error) return res.status(400).json({ error });

  res.json(data);
}
