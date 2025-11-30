import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [user])

    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='w-[20%] h-[40%] flex flex-col border border-gray-300 border-trace'>

                <h1 className="font-orbitron text-3xl text-center mt-4 ">Settle Balance</h1>
                <div className='flex flex-col h-full w-full justify-center items-center gap-15 text-2xl'>
                    <Link to="/login" className='font-orbitron w-[80%] text-center bg-blue-500 rounded-2xl text-white p-1.5 active:scale-95 active:bg-blue-600 transition-all duration-150'>Login</Link>
                    <Link to="/signup" className='font-orbitron w-[80%] text-center bg-blue-500 rounded-2xl text-white p-1.5 active:scale-95 active:bg-blue-600 transition-all duration-150'>SignUp</Link>    
                </div>
            </div>
        </div>
    )
}

export default Home
