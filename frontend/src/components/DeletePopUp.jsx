import React, { useState } from 'react'
import apiClient from '../services/apiClient'

const DeletePopUp = ({ isOpen, group_id, user, onClose, refreshMembers}) => {
    const [Error, setError] = useState("");
    
    // router.delete("/:groupId/members/:userId", protect, deleteUserfromGroup);
    async function handleDelete(){
        try{
            await apiClient.delete(`/api/groups/${group_id}/members/${user?.id}`);
            alert("User deleted successfully");
            onClose();
            refreshMembers();
        }catch(err){
            console.log(err);
            setError(err);
        }
    }
    return (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center ">

            <div className='bg-white w-1/3 flex flex-col p-5 text-center rounded-2xl'>
                <div className='text-2xl font-bold'>Do you really want to delete?</div>
                <div className='mt-4 flex justify-center gap-2 px-5'>
                    <button onClick={handleDelete}
                        className='rounded-xl bg-green-400 p-1.5 active:scale-95'>
                        Confirm
                    </button>
                    <button onClick={onClose} className='rounded-xl bg-red-500 p-1.5 active:scale-95'>
                        Cancel
                    </button>

                </div>
                {Error && 
                    <div>
                        <p>{Error}</p>
                    </div>
                }
            </div>

        </div>
    )
}

export default DeletePopUp
