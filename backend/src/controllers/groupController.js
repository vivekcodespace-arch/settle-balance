import { useEffect } from "react";
import { supabase } from "../config/supabaseClient.js";

export async function createGroup(req, res) {
  const { name } = req.body;
  const userId = req.user.id;

  const { data: group, error: groupError } = await supabase
    .from("groups")
    .insert([{ name, created_by: userId }])
    .select()
    .single();

  if (groupError) return res.status(400).json({ message: "Group not created", error: groupError });

  //add the member who created the group in that group first

  const { error: memberError } = await supabase
    .from("group_members")
    .insert([{ group_id: group.id, user_id: userId }])
    .select()
    .single();

  if (memberError) return res.status(400).json({
    message: "Group created successfully but failed to add creator as member.",
    error: memberError
  })

  return res.json({
    success: true,
    message: "Group creation and member addition successful",
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

export async function getUserGroups(req, res) {
  const userId = req.user.id;

  // 1. Get all group_ids where user is a member
  const { data: memberships, error: mError } = await supabase
    .from("group_members")
    .select("group_id")
    .eq("user_id", userId)

  if (mError) return res.status(400).json({ error: mError })

  const groupIds = memberships.map(m => m.group_id);

  if (groupIds.length === 0) {
    return res.json([]);
  }

  const { data: groups, error: gError } = await supabase
    .from("groups")
    .select(`
    *,
    users:created_by (
      id,
      name,
      email
    )
  `)
    .in("id", groupIds);

  if (gError) return res.status(400).json({ error: gError });

  res.json(groups);


}

export async function getGropuDetails(req, res) {
  const { id } = req.params;
  const { data: group, error } = await supabase
    .from("groups")
    .select("*, users(*)")
    .eq("id", id)
    .single();

  if (error) return res.status(400).json({ error });

  res.json(group);
}

export async function getUserswithGroupId(req, res) {
  const { groupId } = req.params;
  const { data: users, error } = await supabase
    .from("group_members")
    .select("* , users(*)")
    .eq("group_id", groupId)
  if(error) return res.status(400).json({error});
  
  return res.json(users);
}

