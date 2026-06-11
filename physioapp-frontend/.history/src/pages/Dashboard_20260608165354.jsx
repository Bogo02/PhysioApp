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

  const handleLogout = () => { localStorage.clear(); navigate('/') }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fdf8' }}>
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.2rem 4rem', background: '#2d6a2d', color: 'white',
        boxShadow: '0 2px 12px rgba(45,106,45,0.3)'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer', color: 'white', fontSize: '1.5rem', fontWeight: '800' }}
          onClick={() => navigate('/')}>AFYMO</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem' }}>{email}</span>
          <button onClick={() => navigate('/appointments')} style={{
            padding: '0.5rem 1.25rem', background: 'transparent', color: 'white',
            border: '1.5px solid white', borderRadius: '999px', cursor: 'pointer', fontWeight: '600'
          }}>Appointments</button>
          <button onClick={() => navigate('/profile')} style={{
            padding: '0.5rem 1.25rem', background: 'transparent', color: 'white',
            border: '1.5px solid white', borderRadius: '999px', cursor: 'pointer', fontWeight: '600'
          }}>Profile</button>
          <button onClick={handleLogout} style={{
            padding: '0.5rem 1.25rem', background: 'white', color: '#2d6a2d',
            border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700'
          }}>Logout</button>
        </div>
      </nav>

      <div style={{ padding: '3rem 4rem' }}>
        <h1 style={{ color: '#1a3a1a', marginBottom: '0.25rem' }}>Welcome back!</h1>
        <p style={{ color: '#888', marginBottom: '2rem' }}>Role: {role}</p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {[
            { label: '📅 My Appointments', sub: 'View and manage', path: '/appointments', bg: '#2d6a2d' },
            { label: '➕ Book Appointment', sub: 'Schedule a new visit', path: '/appointments/book', bg: '#1a3a1a' },
            { label: '👤 My Profile', sub: 'View account details', path: '/profile', bg: '#3d8b3d' },
          ].map((card, i) => (
            <div key={i} onClick={() => navigate(card.path)} style={{
              background: card.bg, color: 'white', padding: '1.5rem 2rem',
              borderRadius: '16px', cursor: 'pointer', minWidth: '180px',
              boxShadow: '0 4px 16px rgba(45,106,45,0.2)'
            }}>
              <h3 style={{ margin: 0, fontSize: '1rem' }}>{card.label}</h3>
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.85rem', opacity: 0.8 }}>{card.sub}</p>
            </div>
          ))}
          {role === 'ADMIN' && (
            <div onClick={() => navigate('/admin')} style={{
              background: '#b85042', color: 'white', padding: '1.5rem 2rem',
              borderRadius: '16px', cursor: 'pointer', minWidth: '180px',
              boxShadow: '0 4px 16px rgba(184,80,66,0.2)'
            }}>
              <h3 style={{ margin: 0, fontSize: '1rem' }}>⚙️ Admin Panel</h3>
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.85rem', opacity: 0.8 }}>Manage everything</p>
            </div>
          )}
          {role === 'THERAPIST' && (
            <div onClick={() => navigate('/therapist')} style={{
              background: '#6d2e46', color: 'white', padding: '1.5rem 2rem',
              borderRadius: '16px', cursor: 'pointer', minWidth: '180px',
              boxShadow: '0 4px 16px rgba(109,46,70,0.2)'
            }}>
              <h3 style={{ margin: 0, fontSize: '1rem' }}>🗓️ My Schedule</h3>
              <p style={{ margin: '0.4rem 0 0', fontSize: '0.85rem', opacity: 0.8 }}>View appointments</p>
            </div>
          )}
        </div>

        <div className="hex-bg" style={{ borderRadius: '16px', padding: '2rem' }}>
          <h2 style={{ color: '#1a3a1a', marginBottom: '1.5rem' }}>Upcoming Appointments</h2>
          {appointments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>
              <p>No upcoming appointments yet.</p>
              <button onClick={() => navigate('/appointments/book')} style={{
                padding: '0.75rem 1.5rem', background: '#2d6a2d', color: 'white',
                border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700', marginTop: '1rem'
              }}>Book your first appointment</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {appointments.map(a => (
                <div key={a.id} style={{
                  background: 'white', border: '1px solid rgba(45,106,45,0.1)', borderRadius: '12px',
                  padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                }}>
                  <div>
                    <h3 style={{ margin: 0, color: '#1a3a1a' }}>{a.service?.name}</h3>
                    <p style={{ margin: '0.25rem 0', color: '#888', fontSize: '0.9rem' }}>
                      {a.therapist?.user?.firstName} {a.therapist?.user?.lastName}
                    </p>
                    <p style={{ margin: '0.25rem 0', color: '#888', fontSize: '0.9rem' }}>
                      {new Date(a.appointmentDate).toLocaleString()}
                    </p>
                  </div>
                  <span style={{
                    padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem',
                    background: a.status === 'CONFIRMED' ? '#dcfce7' : '#fef9c3',
                    color: a.status === 'CONFIRMED' ? '#166534' : '#854d0e', fontWeight: '600'
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