import React from 'react'

const DeletePopUp = ({ isOpen, group_id, user, onClose }) => {
    console.log(user)
    return (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex justify-center items-center ">

            <div className='bg-white w-1/3 flex flex-col p-5 text-center rounded-2xl'>
                <div className='text-2xl font-bold'>Do you really want to delete?</div>
                <div className='mt-4 flex justify-center gap-2 px-5'>
                    <button className='rounded-xl bg-green-400 p-1.5 active:scale-95'>
                        Confirm
                    </button>
                    <button onClick={onClose} className='rounded-xl bg-red-500 p-1.5 active:scale-95'>
                        Cancel
                    </button>

                </div>
            </div>

        </div>
    )
}

export default DeletePopUp
