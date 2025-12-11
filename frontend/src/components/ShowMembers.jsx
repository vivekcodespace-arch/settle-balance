import React, { useEffect, useState } from 'react'
import apiClient from '../services/apiClient';

const ShowMembers = ({ isOpen, groupID, onClose }) => {
  if (!isOpen) return null;
  const [members, setMembers] = useState([])
  useEffect(() => {
    async function allmembers() {
      try {
        const res = await apiClient.get(`api/groups/${groupID}/members`, {
          groupId: groupID
        });
        setMembers(res.data);
        console.log(members);
      } catch (err) {
        console.log(err);
      }
    } allmembers();
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/3  bg-white p-4 rounded flex flex-col">

        <div className='w-full flex justify-end'>
          <button onClick={onClose} className="bg-red-500 text-white px-3 py-1 rounded">
            Close
          </button>
        </div>
        <div className="mt-3 flex flex-col gap-2">
          {members.length === 0 ? (
            <p className="text-gray-500 text-center">No members found.</p>
          ) : (
            members.map((member) => (
              <div
                key={member.users.id}
                className="p-2 border rounded flex justify-between items-center"
              >
                <span> {member.users.name || "Unknown User"} </span>
                <span> {member.users.email || "Unknown User"} </span>
                
              </div>
            ))
          )}
        </div>

      </div>
    </div>

  )
}

export default ShowMembers
