import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../services/apiClient";

import AddMemberModal from "../components/AddMemberModal";
import ShowMembers from "../components/ShowMembers";
import AddExpense from "../components/AddExpense";
import ShowStatus from "../components/ShowStatus";
import { AuthContext } from "../context/AuthContext";

const GroupDetails = () => {
  const { user } = useContext(AuthContext);
  const { groupId } = useParams();

  const [groupDetails, setGroupDetails] = useState(null);
  const [showAddMember, setShowAddMember] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function getGroupDetails() {
      try {
        const res = await apiClient(`/api/groups/${groupId}`);
        setGroupDetails(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getGroupDetails();
  }, [groupId]);

  async function fetchExpenses() {
    try {
      const res = await apiClient.get(`/api/expenses/${groupId}`);
      setExpenses(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, [groupId]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white shadow-sm px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">
          {groupDetails ? groupDetails.name : "Loading..."}
        </h1>

        <div className="flex gap-2">
          <button
            onClick={() => setShowStatus(true)}
            className="px-4 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:scale-95 transition"
          >
            Status
          </button>

          <button
            onClick={() => setShowAddExpense(true)}
            className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition"
          >
            + Expense
          </button>

          <button
            onClick={() => setShowMembers(true)}
            className="px-4 py-1.5 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 active:scale-95 transition"
          >
            Members
          </button>

          <button
            onClick={() => setShowAddMember(true)}
            className="px-4 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 active:scale-95 transition"
          >
            + Member
          </button>
        </div>
      </div>

      {/* Modals */}
      {showStatus && groupDetails && (
        <ShowStatus
          isOpen={showStatus}
          onClose={() => setShowStatus(false)}
          groupId={groupId}
          userId={user.id}
        />
      )}

      <AddMemberModal
        isOpen={showAddMember}
        onClose={() => setShowAddMember(false)}
        groupID={groupId}
      />

      <ShowMembers
        isOpen={showMembers}
        groupID={groupId}
        onClose={() => setShowMembers(false)}
      />

      <AddExpense
        isOpen={showAddExpense}
        group_id={groupId}
        onClose={() => setShowAddExpense(false)}
        refreshExpenses={fetchExpenses}
      />

      {/* Transactions */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Transactions
        </h2>

        {expenses.length === 0 ? (
          <p className="text-gray-500 text-sm">No expenses yet.</p>
        ) : (
          <div className="space-y-3">
            {expenses.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex justify-between items-center hover:shadow-md transition"
              >
                <div className="flex flex-col gap-1">
                  <p className="font-medium text-gray-800">
                    {exp.description}
                  </p>
                  <p className="text-xs text-gray-500">
                    Paid by {exp.users.name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-green-600 font-semibold">
                    ₹{exp.amount}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(exp.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetails;
