import React, { useState } from "react";

const CreateGroupModal = ({ isOpen, onClose, onCreate }) => {
  const [groupName, setGroupName] = useState("");

  // If modal should NOT be visible → return null
  if (!isOpen) return null;

  return (
    // Background overlay
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

      {/* Modal box */}
      <div className="bg-white p-6 rounded-xl shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">Create New Group</h2>

        <input
          type="text"
          placeholder="Enter group name"
          className="w-full border p-2 rounded mb-4"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => {
              onCreate(groupName); // send group name to parent
              setGroupName("");    // clear input
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
