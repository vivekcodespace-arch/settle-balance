import React, { useState } from 'react'
import { useAsyncError, useLocation, useNavigate } from 'react-router-dom'
import apiClient from '../services/apiClient';

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  //get form data passed from signup
  const form = location.state?.form;

  const handleVerify = async () => {
    try{
      const res = await apiClient.post("/api/auth/verify-otp", {
        email: form.email,
        otp,
      });

      navigate("/dashboard")
    }catch(err){
      console.log(err);
      setError(err.response?.data?.message || "Invalid OTP")
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="p-6 bg-white rounded shadow-md w-1/3">
        <h1 className="text-2xl font-bold text-center">Enter OTP</h1>

        <input
          className="border p-2 w-full mt-4"
          placeholder="123456"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          onClick={handleVerify}
          className="mt-4 bg-blue-600 text-white w-full py-2 rounded"
        >
          Verify OTP
        </button>
      </div>
    </div>
  )
}

export default OtpVerification
