import { supabase } from "../config/supabaseClient.js";

export async function showAllUsers(req, res){
  const {data: users, error} = await supabase
  .from("users")
  .select("*");

  if(error) return res.status(500).json({message:"Failed to fetch users",error});

  return res.json(users);

}

