import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    setRole(localStorage.getItem('role'))
    setEmail(localStorage.getItem('email'))

    axios.get('http://localhost:8080/api/appointments/my', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setAppointments(res.data.filter(a => a.status === 'PENDING' || a.status === 'CONFIRMED')))
    .catch(err => console.error(err))
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div>
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2rem', background: '#2d6a2d', color: 'white'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>AFYMO</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>{email}</span>
          <button onClick={() => navigate('/appointments')} style={{
            padding: '0.5rem 1rem', background: 'transparent', color: 'white',
            border: '1px solid white', borderRadius: '4px', cursor: 'pointer'
          }}>Appointments</button>
          <button onClick={() => navigate('/profile')} style={{
            padding: '0.5rem 1rem', background: 'transparent', color: 'white',
            border: '1px solid white', borderRadius: '4px', cursor: 'pointer'
          }}>Profile</button>
          {role === 'ADMIN' && (
  <div onClick={() => navigate('/admin')} style={{
    background: '#b85042', color: 'white', padding: '1.5rem', borderRadius: '8px',
    cursor: 'pointer', width: '200px', textAlign: 'center'
  }}>
    <h3 style={{ margin: 0 }}>⚙️ Admin Panel</h3>
    <p style={{ margin: '0.5rem 0 0' }}>Manage everything</p>
  </div>
)}
{role === 'THERAPIST' && (
  <div onClick={() => navigate('/therapist')} style={{
    background: '#6d2e46', color: 'white', padding: '1.5rem', borderRadius: '8px',
    cursor: 'pointer', width: '200px', textAlign: 'center'
  }}>
    <h3 style={{ margin: 0 }}>🗓️ My Schedule</h3>
    <p style={{ margin: '0.5rem 0 0' }}>View appointments</p>
  </div>
)}
          <button onClick={handleLogout} style={{
            padding: '0.5rem 1rem', background: 'white', color: '#2d6a2d',
            border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
          }}>Logout</button>
        </div>
      </nav>

      <div style={{ padding: '2rem' }}>
        <h1>Welcome back!</h1>
        <p style={{ color: '#64748b' }}>Role: {role}</p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <div onClick={() => navigate('/appointments')} style={{
            background: '#2d6a2d', color: 'white', padding: '1.5rem', borderRadius: '8px',
            cursor: 'pointer', width: '200px', textAlign: 'center'
          }}>
            <h3 style={{ margin: 0 }}>📅 My Appointments</h3>
            <p style={{ margin: '0.5rem 0 0' }}>View and manage</p>
          </div>
          <div onClick={() => navigate('/appointments/book')} style={{
            background: '#2c5f2d', color: 'white', padding: '1.5rem', borderRadius: '8px',
            cursor: 'pointer', width: '200px', textAlign: 'center'
          }}>
            <h3 style={{ margin: 0 }}>➕ Book Appointment</h3>
            <p style={{ margin: '0.5rem 0 0' }}>Schedule a new visit</p>
          </div>
          <div onClick={() => navigate('/profile')} style={{
            background: '#3d8b3d', color: 'white', padding: '1.5rem', borderRadius: '8px',
            cursor: 'pointer', width: '200px', textAlign: 'center'
          }}>
            <h3 style={{ margin: 0 }}>👤 My Profile</h3>
            <p style={{ margin: '0.5rem 0 0' }}>View account details</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2>Upcoming Appointments</h2>
          {appointments.length === 0 ? (
            <div style={{
              background: '#f8faff', border: '1px solid #e2e8f0',
              borderRadius: '8px', padding: '1.5rem', color: '#64748b', textAlign: 'center'
            }}>
              <p>No upcoming appointments yet.</p>
              <button onClick={() => navigate('/appointments/book')} style={{
                padding: '0.75rem 1.5rem', background: '#2d6a2d', color: 'white',
                border: 'none', borderRadius: '4px', cursor: 'pointer'
              }}>Book your first appointment</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {appointments.map(a => (
                <div key={a.id} style={{
                  background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px',
                  padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  <div>
                    <h3 style={{ margin: 0 }}>{a.service?.name}</h3>
                    <p style={{ margin: '0.25rem 0', color: '#64748b' }}>
                      {a.therapist?.user?.firstName} {a.therapist?.user?.lastName}
                    </p>
                    <p style={{ margin: '0.25rem 0', color: '#64748b' }}>
                      {new Date(a.appointmentDate).toLocaleString()}
                    </p>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem',
                    background: a.status === 'CONFIRMED' ? '#dcfce7' : '#fef9c3',
                    color: a.status === 'CONFIRMED' ? '#166534' : '#854d0e'
                  }}>{a.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard