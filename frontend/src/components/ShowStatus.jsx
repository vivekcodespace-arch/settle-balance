import React, { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const ShowStatus = ({ isOpen, onClose, groupId, userId }) => {
  if (!isOpen) return null;

  const [statusData, setStatusData] = useState(null);
  const [userMap, setUserMap] = useState({});


  useEffect(() => {
    async function loadStatus() {
      const res = await apiClient.get(`/api/expenses/${groupId}/status/${userId}`);
      setStatusData(res.data.status);
      const res2 = await apiClient.get(`/api/users/${userId}`);
      console.log("the owner of the groupd is", res2.data.name);
    }
    if (groupId && userId) loadStatus();
  }, [groupId, userId]);

  useEffect(() => {
    if (!statusData) return;

    async function fetchUsernames() {
      const entries = Object.keys(statusData);

      const requests = entries.map(uid =>
        apiClient.get(`/api/users/${uid}`)
      );

      const responses = await Promise.all(requests);

      const map = {};
      responses.forEach((res, index) => {
        map[entries[index]] = res.data.name;
      });

      setUserMap(map);
    }

    fetchUsernames();
  }, [statusData]);

  // if (!statusData) return <div>Loading...</div>;

  return (
    !statusData ? (
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div>Loading...</div>
      </div>
    ) : (
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
        <div className="bg-white p-4 rounded w-1/3">
          <button onClick={onClose} className="float-right">✖</button>
          <h2 className="text-xl mb-3">Your Balance Status</h2>

          {Object.entries(statusData).map(([uid, amt]) => {
            if (uid === userId) return null;   // ⬅️ hide self row

            return (
              <div key={uid} className="flex justify-between border-b py-2">
                <p>User: {userMap[uid] || "Loading..."}</p>
                <p className={amt > 0 ? "text-red-600" : "text-green-600"}>
                  {amt > 0
                    ? `You owe ₹${amt}`
                    : `owes you ₹${-amt}`}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
};

export default ShowStatus;
