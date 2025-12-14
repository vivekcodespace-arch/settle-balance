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


export async function getGroupExpenses(req, res) {
  const { groupId } = req.params;

  const { data: expenses, error } = await supabase
    .from("expenses")
    .select(`
      *,
      users:paid_by(name)  -- get payer name
    `)
    .eq("group_id", groupId)
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error });

  res.json(expenses);
}

export async function getUserStatus(req, res) {
  const { groupId, userId } = req.params;

  // 1️⃣ Get all group members
  const { data: members, error: memError } = await supabase
    .from("group_members")
    .select("user_id")
    .eq("group_id", groupId);

  if (memError) return res.status(400).json({ error: memError });

  // Create status object = everyone starts at 0
  const status = {};
  members.forEach(m => {
    status[m.user_id] = 0;
  });

  // 2️⃣ Get all balances for this group
  const { data: balances, error: balError } = await supabase
    .from("balances")
    .select("*")
    .eq("group_id", groupId);

  if (balError) return res.status(400).json({ error: balError });

  // 3️⃣ Calculate user's personal balance with each other member
  balances.forEach(b => {
    if (b.user1 === userId) {
      status[b.user2] += b.amount;   // positive => user2 owes userId
    }
    else if (b.user2 === userId) {
      status[b.user1] -= b.amount;   // negative => userId owes user1
    }
  });

  return res.json({ status });
}

