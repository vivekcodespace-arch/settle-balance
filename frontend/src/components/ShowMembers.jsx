
import React, { useEffect, useState } from 'react'
import apiClient from '../services/apiClient';
import deleteIcon from '../assets/delete.png';
import DeletePopUp from './DeletePopUp';

const ShowMembers = ({ isOpen, groupID, onClose }) => {
  if (!isOpen) return null;
  const [members, setMembers] = useState([])
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  async function allmembers() {
    try {
      const res = await apiClient.get(`api/groups/${groupID}/members`);
      setMembers(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    allmembers();
  },[]);

  function handleDelete(user) {
    setDeletePopUp(true);
    setSelectedMember(user);

  }


  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center">
      <div className="w-1/3  bg-white p-4 rounded flex flex-col">

        <div className='w-full flex justify-end'>
          <button onClick={onClose} className="bg-red-500 text-white px-3 py-1 rounded active:scale-95">
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
                className="p-2 border rounded flex justify-between items-center bg-gray-100"
              >
                <span> {member.users.name || "Unknown User"} </span>
                <span> {member.users.email || "Unknown User"} </span>
                <img
                  src={deleteIcon}
                  onClick={() => handleDelete(member.users)}
                  alt='delete'
                  className='w-5 h-5 cursor-pointer' />

              </div>

            ))
          )}
        </div>
      </div>
      {/* Delete PopUp */}
      {deletePopUp &&
        <DeletePopUp isOpen={deletePopUp} onClose={() => setDeletePopUp(false)} group_id={groupID} user={selectedMember} 
        refreshMembers={allmembers}/>}

    </div>

  )
}

export default ShowMembers
