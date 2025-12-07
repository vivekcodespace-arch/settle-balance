import { supabase } from "../config/supabaseClient.js";

export async function createGroup(req, res) {
  const { name } = req.body;
  const userId = req.user.id;

  const { data: group, error: groupError } = await supabase
    .from("groups")
    .insert([{ name, created_by: userId }])
    .select()
    .single();

  if (groupError) return res.status(400).json({ message:"Group not created",error:groupError});

  //add the member who created the group in that group first

  const {error: memberError} = await supabase
  .from("group_members")
  .insert([{ group_id: group.id, user_id: userId}])
  .select()
  .single();

  if(memberError) return res.status(400).json({
    message:"Group created successfully but failed to add creator as member.",
    error:memberError
  })

  return res.json({
    success: true,
    message:"Group creation and member addition successful",
    group
  })

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
