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
        <div className='bg-blue-500 w-screen h-screen flex justify-center items-center'>
            <div className='bg-amber-50 w-1/4 h-1/2 flex flex-col'>

                <h1 className="font-orbitron  bg-blue-100 text-3xl text-center ">Settle Balance</h1>
                <div className='flex flex-col bg-red-300 h-full w-full justify-center items-center gap-20 text-2xl'>
                    <Link to="/login" className='font-orbitron border-2 w-[80%] text-center hover:border-blue-700'>Login</Link>
                    <Link to="/signup" className='font-orbitron border-2 w-[80%] text-center hover:border-blue-700'>SignUp</Link>    
                </div>
            </div>
        </div>
    )
}

export default Home
