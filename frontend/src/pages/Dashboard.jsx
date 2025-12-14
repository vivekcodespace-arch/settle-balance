import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import apiClient from "../services/apiClient";
import CreateGroupModal from "../components/CreateGroupModal";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await apiClient.get("/api/groups/getUserGroups");
        setGroups(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchGroups();
  }, []);

  const handleCreateGroup = async (groupName) => {
    try {
      await apiClient.post("/api/groups/create", { name: groupName });
      setShowModal(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="sticky top-0 z-20 bg-white shadow-sm px-6 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">Splitwise Dashboard</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-blue-700 active:scale-95 transition"
          >
            + New Group
          </button>

          <div className="flex items-center gap-2">
            <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">
              {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600 active:scale-95 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <CreateGroupModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateGroup}
      />

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Your Groups
        </h2>

        {groups.length === 0 ? (
          <div className="text-gray-500 text-center mt-10">
            You are not part of any group yet.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {groups.map((group) => (
              <Link
                key={group.id}
                to={`/group/${group.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex justify-between items-center hover:shadow-md transition active:scale-[0.99]"
              >
                <div className="flex flex-col gap-1 w-[40%]">
                  <p className="font-medium text-gray-800 truncate">
                    {group.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Created on {new Date(group.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-sm text-gray-600 w-[30%] text-right">
                  Created by
                  <span className="font-medium text-gray-800 ml-1">
                    {group.users.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
