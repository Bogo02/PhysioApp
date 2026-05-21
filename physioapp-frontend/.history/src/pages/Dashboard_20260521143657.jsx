import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
    const [role, setRole] = useState('')
    const [email, setEmail] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
            return
        }
        setRole(localStorage.getItem('role'))
        setEmail(localStorage.getItem('email'))
    }, [])

    const handleLogout = () =>{
        localStorage.clear()
        navigate('/')
    }

    return (
        <div>
            <nav style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'ceneter',
                padding: '1rem 2rem',background: '#1a3a6b', color: 'white'
            }}>
                <h2 style={{margin: 0}}>AFYMO</h2>
                <div style={{ display: 'flex', gap: '1rem',alignItems: 'center'}}>
                <span>{email}</span>
                <button onClick={() => navigate('/profile')} style={{
                 padding: '0.5rem 1rem', background: 'transparent', color:'white',
                 border: '1px solid white', borderRadius: '4px', cursor:'pointer'
                }}>Appointments</button>
                <button onClick={() => navigate('/profile')} style={{
                 padding: '0.5rem 1rem', background: 'transparent', color:'white',
                 border: '1px solid white', borderRadius: '4px', cursor:'pointer'
                }}>Profile</button>
                <button onClick={handleLogout} style={{
                    padding: '0.5rem 1rem', background: 'white', color: '#1a3a6b',
                    border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
                }}>Logout</button>
                </div>
            </nav>
<div style={{ padding: '2rem' }}>
        <h1>Welcome back!</h1>
        <p style={{ color: '#64748b' }}>Role: {role}</p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <div onClick={() => navigate('/appointments')} style={{
            background: '#1a3a6b', color: 'white', padding: '1.5rem', borderRadius: '8px',
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
            background: '#4a6fa5', color: 'white', padding: '1.5rem', borderRadius: '8px',
            cursor: 'pointer', width: '200px', textAlign: 'center'
          }}>
            <h3 style={{ margin: 0 }}>👤 My Profile</h3>
            <p style={{ margin: '0.5rem 0 0' }}>View account details</p>
          </div>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h2>Upcoming Appointments</h2>
          <div style={{
            background: '#f8faff', border: '1px solid #e2e8f0',
            borderRadius: '8px', padding: '1.5rem', color: '#64748b', textAlign: 'center'
          }}>
            <p>No upcoming appointments yet.</p>
            <button onClick={() => navigate('/appointments/book')} style={{
              padding: '0.75rem 1.5rem', background: '#1a3a6b', color: 'white',
              border: 'none', borderRadius: '4px', cursor: 'pointer'
            }}>Book your first appointment</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard