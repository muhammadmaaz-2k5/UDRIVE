import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignUp from './pages/UserSignup'
import DriverLogin from './pages/Driverlogin'
import DriverSignUp from './pages/DriverSignup'
import UserHome from './pages/UserHome'
import DriverHome from './pages/DriverHome'
import UserProtectWrapper from './components/UserProtectWrapper'
import DriverProtectWrapper from './components/DriverProtectWrapper'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="/driver/login" element={<DriverLogin />} />
        <Route path="/driver/signup" element={<DriverSignUp />} />

        <Route path="/user-home" element={
          <UserProtectWrapper>
            <UserHome />
          </UserProtectWrapper>
        } />

        <Route path="/driver-home" element={
          <DriverProtectWrapper>
            <DriverHome />
          </DriverProtectWrapper>
        } />
      </Routes>
    </div>
  );
};

export default App;