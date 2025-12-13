import React, { useEffect, useState } from 'react';
import apiClient from '../services/apiClient';

const AddExpense = ({ isOpen, onClose, group_id }) => {
  if (!isOpen) return null;

  const [members, setMembers] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");
  const [split, setSplit] = useState({});

  useEffect(() => {
    async function allmembers() {
      try {
        const res = await apiClient.get(`api/groups/${group_id}/members`);
        setMembers(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    allmembers();
  }, [group_id]);

  useEffect(() => {
    const initialSplit = {};
    members.forEach((m) => {
      initialSplit[m.users.id] = 0;
    });
    setSplit(initialSplit);
  }, [members]);

  const handleSplitChange = (userId, value) => {
    setSplit(prev => ({
      ...prev,
      [userId]: Number(value)
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      group_id,
      paid_by: paidBy,
      amount: Number(amount),
      description,
      split_between: split,
    };

    console.log("Sending:", payload);

    try {
      await apiClient.post("/api/expenses/add", payload);
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-1/3 p-4 rounded-xl shadow-lg">

        <div className="flex justify-end">
          <button onClick={onClose} className="bg-red-500 text-white px-3 py-1 rounded">
            Close
          </button>
        </div>

        <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 border mb-3 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Total Amount"
          className="w-full p-2 border mb-3 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="w-full p-2 border mb-3 rounded"
          value={paidBy}
          onChange={(e) => setPaidBy(e.target.value)}
        >
          <option value="">Paid By</option>
          {members.map((m) => (
            <option key={m.users.id} value={m.users.id}>
              {m.users.name}
            </option>
          ))}
        </select>

        <div className="space-y-2 max-h-40 overflow-y-auto mb-4">
          {members.map((m) => (
            <div key={m.users.id} className="flex justify-between items-center">
              <p>{m.users.name}</p>
              <input
                type="number"
                className="w-24 p-1 border rounded"
                value={split[m.users.id]}
                onChange={(e) => handleSplitChange(m.users.id, e.target.value)}
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 active:scale-95"
        >
          Add Expense
        </button>

      </div>
    </div>
  );
}

export default AddExpense;
