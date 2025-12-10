import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import apiClient from '../services/apiClient';
import CreateGroupModal from '../components/CreateGroupModal';
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const {logoutUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await apiClient.get("/api/groups/getUserGroups")
        setGroups(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchGroups();
  }, []);

  const handleCreateGroup = async (groupName) => {
    try{
      await apiClient.post("/api/groups/create" , {name : groupName});
      setShowModal(false);
      window.location.reload();
    }catch(err){
      console.log(err)
    }
  }
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  }
  return (
    <div>
      {/* Navbar */}

      <div className='bg-red-300 w-full h-10 flex justify-end gap-10 pr-32 items-center'>
        <button className='bg-white rounded-xl h-[80%] p-1.5 cursor-pointer active:scale-95' onClick={() => setShowModal(true)}>
          Create new Group
        </button>
        <div>
          <button className='rounded-xl bg-orange-600 p-1.5'>
            {user?.name}
          </button>
          <button onClick={handleLogout} className='rounded-xl bg-red-500 p-1.5 ml-2 active:scale-95 cursor-pointer'>Logout</button>
        </div>
      </div>


      <CreateGroupModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreateGroup}
      />
      {/* Body section */}
      <div>
        <div className='mb-2'>
          <h1 className='mt-3 mb-3'>Your Groups</h1>


          <div className='flex  flex-col gap-3 items-center ml-2 mr-2'>
            {groups.map(group => (
              <div key={group.id} className='flex w-full p-2 px-7 bg-green-200 rounded-2xl  border border-green-700 justify-between active:scale-95 cursor-pointer'>
                <div className='w-[40%]  px-5 wrap-anywhere'>{group.name}</div>
                <div className='w-[30%]'>Created on : {new Date(group.created_at).toLocaleDateString()}</div>
                <div className='w-[30%] text-end'>Created by : {group.users.name}</div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </div>
  )
}

export default Dashboard
