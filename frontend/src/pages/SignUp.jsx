import React, { useContext, useState } from 'react'
import apiClient from '../services/apiClient';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from "react-router-dom"


const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [valid, setValid] = useState({
    name: false,
    email: false
  });

  const [error, setError] = useState("");
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateName = (name) => {
    return /^[A-Za-z ]{3,}$/.test(name);
  };
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {

    const { name, value } = e.target;
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log("Validation in progess.")
    //Live validation
    if (name === "name") {
      setValid((prev) => ({ ...prev, name: validateName(value) }));
      console.log(valid)
    }

    if (name === "email") {
      setValid((prev) => ({ ...prev, email: validateEmail(value) }));
      console.log(valid)
    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await apiClient.post('/api/auth/signup',form);
      
      const { user, token  } = res.data;
      loginUser(user, token);
      navigate("/dashboard");


      //verify-otp endpoint will login the user and sets the token to local

    }catch(err){
      console.log(err);
      setError(err.response?.data?.message || "SingUp failed");
    }
  }
  return (
    <div className='flex flex-col justify-center items-center w-screen h-screen '>
      <div className='w-[20%] h-[60%]  border-gray-400 border px-10 border-trace'>
        <form onSubmit={handleSubmit} >
          <p className='text-center text-4xl font-thin pb-10 pt-10 font-orbitron'>Sign Up</p>

          {/* Name */}
          <div className='mb-5 flex'>

            <input type="text"
              className='font-orbitron w-[90%] border-b border-gray-400 focus:border-blue-500 focus:outline-none pb-2'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder='Name'
              required
            />
            {valid.name && (
              <span className="text-green-600 text-xl p-0 font-bold ml-3">✓</span>
            )}
          </div>

          {/* Email */}
          <div className='mb-5 flex'>

            <input type="text"
              className='font-orbitron w-[90%] border-b border-gray-400 focus:border-blue-500 focus:outline-none pb-2'
              name='email'
              value={form.email}
              onChange={handleChange}
              required
              placeholder='Email'
            />
            {valid.email && (
              <span className=" text-green-600 text-xl font-bold ml-3">✓</span>
            )}
          </div>

          {/* Password */}
          <div className='mb-5'>

            <input type="password"
              name='password'
              className='font-orbitron w-full border-b focus:border-gray-400 focus:outline-none border-gray-400 pb-2'
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
          </div>

          {/* Submit */}
          <button type='submit' className=' text-center  w-full mt-8 bg-blue-500 py-1.5 text-white font-orbitron rounded-2xl active:scale-95 active:bg-blue-600 transition-all duration-150'>
            Create Account
          </button>
        </form>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  )
}

export default SignUp
