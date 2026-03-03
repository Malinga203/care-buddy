import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import SignUp from './pages/sign-up'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import RecepDashboard from './pages/recep-dashboard'
import MedicalRecords from './components/medicalRecords'
import Snowfall from 'react-snowfall'

function App() {
  

  return (
     
     
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/recep-dashboard/*" element={<RecepDashboard />} />
      </Routes>
    </BrowserRouter>
    
    
  )
}

export default App
