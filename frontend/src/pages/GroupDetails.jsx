import React, { useEffect, useState ,useContext} from 'react'
import { useAsyncError, useParams } from 'react-router-dom'
import apiClient from '../services/apiClient';

import AddMemberModal from '../components/AddMemberModal';
import ShowMembers from '../components/ShowMembers';
import AddExpense from '../components/AddExpense';
import ShowStatus from '../components/ShowStatus';
import { AuthContext } from '../context/AuthContext';

const GroupDetails = () => {
    const { user } = useContext(AuthContext);
    const { groupId } = useParams();
    const [groupDetails, setGroupDetails] = useState(null);
    const [showAddMember, setShowAddMember] = useState(false);
    const [showMembers, setShowMembers] = useState(false);
    const [showAddExpense, setShowAddExpense] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [showStatus, setShowStatus] = useState(false);
    useEffect(() => {
        async function getGroupDetails() {
            try {
                const res = await apiClient(`/api/groups/${groupId}`);
                setGroupDetails(res.data)

            } catch (err) {
                console.log(err);
            }
        }
        getGroupDetails();
    }, [groupId]);
    useEffect(() => {
        console.log("here");
        console.log(user);
        console.log('end')
        console.log(groupDetails);
    }, [groupDetails])
    // if(!groupDetails) return <p> Loading...</p>

    async function fetchExpenses() {
        try {
            const res = await apiClient.get(`/api/expenses/${groupId}`);
            setExpenses(res.data);
            console.log("Expenses:", res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchExpenses();
    }, [groupId]);

    return (
        <div >
            {/* Navbar */}
            <div className='bg-red-400 w-full flex justify-between p-1.5 gap-2'>
                <div className='group-name font-bold text-xl p-1.5 ml-3'>
                    <h1>{groupDetails === null ?
                        (<p>Loading...</p>) :
                        (<p>{groupDetails.name}</p>)
                    }</h1>
                </div>

                <div className='flex gap-2 '>
                    <button className='bg-amber-400 p-1.5 rounded-xl active:scale-95'
                        onClick={() => setShowStatus(true)}>
                        Show Status
                    </button>
                    <button className='bg-amber-700 p-1.5 rounded-xl active:scale-95'
                        onClick={() => setShowAddExpense(true)}>
                        +Add Expense
                    </button>

                    <button onClick={() => setShowMembers(true)}
                        className='rounded-xl bg-green-500 active:scale-95 p-1.5 cursor-pointer'>
                        Show Memeber
                    </button>
                    <button onClick={() => setShowAddMember(true)}
                        className='rounded-xl bg-green-600 p-1.5 active:scale-95 cursor-pointer'>
                        + Add Member
                    </button>
                </div>

            </div>
            {/* This shows the status of the person in the group */}
            {
                showStatus && groupDetails ? (
                    <ShowStatus
                        isOpen={showStatus}
                        onClose={() => setShowStatus(false)}
                        groupId={groupId}
                        userId={user.id}
                    />
                ) : null
            }

            {/* Add member section */}
            <AddMemberModal isOpen={showAddMember} onClose={() => setShowAddMember(false)} groupID={groupId} />

            {/* Show memebers */}
            <ShowMembers isOpen={showMembers} groupID={groupId} onClose={() => setShowMembers(false)} />

            {/* This section for add expene component */}
            <AddExpense isOpen={showAddExpense} group_id={groupId} onClose={() => setShowAddExpense(false)} refreshExpenses={fetchExpenses} />


            {/* Main section */}

            <div>
                {/* This section shows all the transactions related to that group. */}
                <div className="mt-6 px-4">
                    <h2 className="text-xl font-semibold mb-3">Transactions</h2>

                    {expenses.length === 0 ? (
                        <p className="text-gray-500">No expenses yet.</p>
                    ) : (
                        <div className="space-y-3">

                            {expenses.map(exp => (
                                <div key={exp.id} className="p-3 bg-white rounded shadow flex justify-between">

                                    <div>
                                        <p className="font-bold">{exp.description}</p>
                                        <p className="text-sm text-gray-500">
                                            Paid by {exp.users.name}
                                        </p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-green-600 font-semibold">₹{exp.amount}</p>
                                        <p className="text-gray-500 text-sm">
                                            {new Date(exp.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                </div>
                            ))}

                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default GroupDetails
