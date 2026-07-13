import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignup'
import DriverLogin from './pages/Driverlogin'
import DriverSignUp from './pages/DriverSignup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="/driver/login" element={<DriverLogin />} />
        <Route path="/driver/signup" element={<DriverSignUp />} />
      </Routes>
    </div>
  );
};

export default App;