import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const {user} = useContext(AuthContext);
    const navigate = useNavigate()
    useEffect(()=>{
        if(user){
            navigate("/dasboard")
        }
    },[user])

  return (
    <div className='bg-blue-500 w-screen h-screen flex justify-center items-center'>
        <div className='bg-amber-50 w-1/4 h-1/2 flex flex-col'>
            <button>Login</button>
            <button>Sign Up</button>
        </div>
    </div>
  )
}

export default Home
