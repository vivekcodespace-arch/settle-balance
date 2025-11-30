import React from 'react'
import { useState } from 'react'
import apiClient from '../services/apiClient';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {loginUser} = useContext(AuthContext)
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("")
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await apiClient.post("/api/auth/login",form);

      const {user, token} = res.data;
      loginUser(user, token);
      
      navigate("/dashboard")

      
    }catch(err){
      console.log(err)
      setError(err.response?.data?.message || "SingUp failed");
    }
  }

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <div className='w-[20%] h-[60%]  border-gray-400 border px-10 border-trace'>
        <form onSubmit={handleSubmit}>
          <p className='text-center text-4xl font-thin pb-10 pt-10 font-orbitron'>Log In</p>
          {/* Email */}
          <div className='mb-5'>
           
            <input type="text"
            name='email'
            className='font-orbitron w-[90%] border-b border-gray-400 focus:border-blue-500 focus:outline-none pb-2'
            value={form.email}
            placeholder='Email'
            required
            onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className='mb-5'>
            
            <input type="password"
            name='password'
            value={form.password}
            className='font-orbitron w-[90%] border-b border-gray-400 focus:border-blue-500 focus:outline-none pb-2'
            placeholder='Password'
            required
            onChange={handleChange}

            />
          </div>

          <button className=' text-center  w-full mt-14 bg-blue-500 py-1.5 text-white font-orbitron rounded-2xl active:scale-95 active:bg-blue-600 transition-all duration-150'>
            Login
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
