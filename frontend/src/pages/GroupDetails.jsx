import React, { useEffect, useState } from 'react'
import { useAsyncError, useParams } from 'react-router-dom'
import apiClient from '../services/apiClient';

import AddMemberModal from '../components/AddMemberModal';
import ShowMembers from '../components/ShowMembers';
import AddExpense from '../components/AddExpense';

const GroupDetails = () => {
    const { groupId } = useParams();
    const [groupDetails, setGroupDetails] = useState(null);
    const [showAddMember, setShowAddMember] = useState(false);
    const [showMembers, setShowMembers] = useState(false);
    const [showAddExpense, setShowAddExpense] = useState(false);
    useEffect(() => {
        async function getGroupDetails() {
            try {
                const res = await apiClient(`/api/groups/${groupId}`);
                setGroupDetails(res.data)
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getGroupDetails();
    }, [groupId]);

    // if(!groupDetails) return <p> Loading...</p>

    return (
        <div >
            {/* Navbar */}
            <div className='bg-red-400 w-full flex justify-end-safe p-1.5 gap-2'>
                <button className='bg-amber-700 p-1.5 rounded-xl active:scale-95'
                    onClick={()=> setShowAddExpense(true)}>
                    +Add Expense
                </button>
                
                <button onClick={()=> setShowMembers(true)}
                    className='rounded-xl bg-green-500 active:scale-95 p-1.5 cursor-pointer'>
                    Show Memeber
                </button>
                <button onClick={() => setShowAddMember(true)} 
                    className='rounded-xl bg-green-600 p-1.5 active:scale-95 cursor-pointer'>
                    + Add Member
                </button>
            </div>
            {/* Add member section */}
            <AddMemberModal isOpen={showAddMember} onClose={() => setShowAddMember(false)} groupID={groupId} />

            {/* Show memebers */}
            <ShowMembers isOpen={showMembers} groupID={groupId} onClose={() => setShowMembers(false)}/>
            
            {/* This section for add expene component */}
            <AddExpense isOpen={showAddExpense} group_id={groupId} onClose={()=> setShowAddExpense(false)}/>


            {/* Main section */}

            <div>
                {/* This section shows all the transactions related to that group. */}
            </div>
        </div>
    )
}

export default GroupDetails
