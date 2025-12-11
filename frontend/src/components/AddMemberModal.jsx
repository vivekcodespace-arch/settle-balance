import React, { useEffect, useState } from 'react'
import apiClient from '../services/apiClient';

const AddMemberModal = ({isOpen, onClose, groupID}) => {
  if(!isOpen) return null;
  const [users, setUsers] = useState([])

  useEffect(()=>{
    async function fetchAllusers() {
      try{
        const res = await apiClient.get("/api/users/all");
        setUsers(res.data);
      }catch(err){
        console.log(err);
      }

    }fetchAllusers();
  },[]);

  async function addMember (userID){
    try{
      await apiClient.post("/api/group/add-member",{
        group_id: groupID,
        user_id: userID
      })
      alert("Member added!");
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
      <div className="bg-white w-1/3 p-5 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Select a User</h2>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {users.map((user) => (
            <button
              key={user.id}
              className="w-full bg-gray-200 p-2 rounded-lg hover:bg-gray-300 active:scale-95"
              onClick={() => addMember(user.id)}
            >
              {user.name} ({user.email})
            </button>
          ))}
        </div>

        <button 
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default AddMemberModal
