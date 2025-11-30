import React from 'react'
import { useState } from 'react'

const Login = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
      <div className='w-[20%] h-[60%]  border-gray-400 border px-10 border-trace'>
        <form>
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
            name='pass'
            value={form.pass}
            className='font-orbitron w-[90%] border-b border-gray-400 focus:border-blue-500 focus:outline-none pb-2'
            placeholder='Password'
            required
            onChange={handleChange}

            />
          </div>

          <button className=' text-center  w-full mt-14 bg-blue-500 py-1.5 text-white font-orbitron rounded-2xl active:scale-95 active:bg-blue-600 transition-all duration-150'>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
