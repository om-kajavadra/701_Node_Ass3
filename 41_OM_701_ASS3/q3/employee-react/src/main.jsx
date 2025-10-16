import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import LeaveApp from './components/LeaveApp'
import 'bootstrap/dist/css/bootstrap.min.css'

function Protected({ children }){
  const token = localStorage.getItem('EMP_TOKEN')
  if(!token) return <Navigate to="/login" />
  return children
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/profile" element={<Protected><Profile/></Protected>} />
      <Route path="/leave" element={<Protected><LeaveApp/></Protected>} />
      <Route path="/" element={<Navigate to="/profile" />} />
    </Routes>
  </BrowserRouter>
)
