import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";


// Protected Route component
function ProtectedRoute({children}){
  const {user} = useContext(AuthContext);
  if(!user){
    return <Home/>
  }
  return children;
}

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element ={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard/>
          </ProtectedRoute>
        }/>

        {/* Fallback */}
        <Route path="*" element={<Home/>}/>

      </Routes>
    </Router>
  )
}

export default App
