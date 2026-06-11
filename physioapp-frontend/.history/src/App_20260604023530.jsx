import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import BookAppointment from './pages/BookAppointment'
import Profile from './pages/Profile'
import Services from './pages/Services'
import TherapistDashboard from './pages/TherapistDashboard'
import AdminPanel from './pages/AdminPanel'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/book" element={<BookAppointment />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/services" element={<Services />} />
        <Route path="/therapist" element={<TherapistDashboard/>} />
        <Route path="/admin" element={<AdminPanel/>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App