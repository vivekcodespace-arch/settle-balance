import React, { useState } from 'react'

const SignUp = () => {
  const [form, setForm] = useState({
    name:"",
    email:"",
    password:""
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("Form submitted")
  }
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen '>
      <div className='w-[20%] h-[60%]  border-gray-400 border px-10'>
        <form onSubmit={handleSubmit} >
          <p className='text-center text-4xl font-thin pb-10 pt-10'>Sign Up</p>

          {/* Name */} 
          <div className='mb-5'>
          
          <input type="text"
          className='w-full border-b border-gray-400 focus:border-blue-500 focus:outline-none pb-2'
          name='name'
          value={form.name}
          onChange={handleChange}
          placeholder='Name'
          required
           />
          </div>

          {/* Email */}
          <div className='mb-5'>
          
          <input type="text"
          className='w-full border-b border-gray-400 focus:border-blue-500 focus:outline-none pb-2'
          name='email'
          value={form.email}
          onChange={handleChange}
          required
          placeholder='Email'
           />
          </div>

          {/* Password */}
          <div className='mb-5'>
          
          <input type="password"
          name='password'
          className='w-full border-b focus:border-gray-400 focus:outline-none border-gray-400 pb-2'
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Password"
           />
          </div>

          {/* Submit */}
          <button type='submit' className=' text-center  w-full mt-8 bg-blue-500 py-1.5 text-white rounded-2xl active:scale-95 active:bg-blue-600 transition-all duration-150'> 
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
