import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
      <div>
        {/* Navbar */}
        <div className='bg-red-300 w-full h-10 flex justify-end gap-10 pr-32 items-center'>
          <div className='bg-white rounded-xl h-[80%] p-1.5'>
            <p>Create new Group</p>
          </div>
          <div>
            <button className='rounded-xl bg-orange-600 p-1.5'>
              {user?.name}
            </button>
          </div>
        </div>
        {/* Body section */}
        <div>

        </div>
      </div>
  )
}

export default Dashboard
