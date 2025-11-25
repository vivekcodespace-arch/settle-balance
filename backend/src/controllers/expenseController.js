export async function addExpense(req, res) {
  const { group_id, amount, description, split_between } = req.body;

  const { data, error } = await supabase
    .from("expenses")
    .insert([
      {
        group_id,
        amount,
        description,
        split_between,
        paid_by: req.user.id
      }
    ])
    .select()
    .single();

  if (error) return res.status(400).json({ error });

  res.json(data);
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
