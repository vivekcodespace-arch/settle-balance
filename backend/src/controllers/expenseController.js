import { supabase } from "../config/supabaseClient.js";

export async function addExpense(req, res) {
  const { group_id, paid_by, amount, description, split_between } = req.body;
  // 1. Insert Expense
  const { data: expense, error: expError } = await supabase
    .from("expenses")
    .insert([{ group_id, paid_by, amount, description, split_between }])
    .select()
    .single();

  if (expError) return res.status(400).json({ error: expError });

  for (const user in split_between) {
    if (user === paid_by) continue;

    let user1, user2, value;

    if (paid_by < user) {
      user1 = paid_by;
      user2 = user;
      value = -split_between[user2]; //user1 owes user2
    }
    else {
      user1 = user;
      user2 = paid_by;
      value = split_between[user1]; //user2 owe user1
    }

    // Check if balance row exists

    const { data: existing } = await supabase
      .from("balances")
      .select("*")
      .eq("group_id", group_id)
      .eq("user1", user1)
      .eq("user2", user2)
      .single();

    if (existing) {
      // Update amount
      await supabase
        .from("balances")
        .update({ amount: existing.amount + value })
        .eq("group_id", group_id)
        .eq("user1", user1)
        .eq("user2", user2);
    } else {
      // Create balance row
      await supabase
        .from("balances")
        .insert([{ group_id, user1, user2, amount: value }]);
    }
  }

  res.json({ message: "Expense added & balances updated", expense });
}


export async function getExpenses(req, res) {
  const { group_id } = req.params;

  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("group_id", group_id);

  if (error) return res.status(400).json({ error });

  res.json(data);
}
