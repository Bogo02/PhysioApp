import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { navigate('/login'); return }
    setEmail(localStorage.getItem('email'))
    setRole(localStorage.getItem('role'))
  }, [])

  const handleLogout = () => { localStorage.clear(); navigate('/') }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fdf8' }}>
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.2rem 4rem', background: '#2d6a2d',
        boxShadow: '0 2px 12px rgba(45,106,45,0.3)'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer', color: 'white', fontSize: '1.5rem', fontWeight: '800' }}
          onClick={() => navigate('/')}>AFYMO</h2>
        <button onClick={() => navigate('/dashboard')} style={{
          padding: '0.5rem 1.25rem', background: 'transparent', color: 'white',
          border: '1.5px solid white', borderRadius: '999px', cursor: 'pointer', fontWeight: '600'
        }}>Dashboard</button>
      </nav>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 2rem' }}>
        <div style={{
          background: 'white', borderRadius: '20px', padding: '2.5rem',
          width: '100%', maxWidth: '500px', boxShadow: '0 4px 24px rgba(45,106,45,0.1)',
          border: '1px solid rgba(45,106,45,0.1)'
        }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%', background: '#2d6a2d',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', color: 'white', marginBottom: '1.5rem'
          }}>👤</div>

          <h1 style={{ color: '#1a3a1a', margin: '0 0 0.25rem', fontSize: '1.8rem' }}>My Profile</h1>
          <p style={{ color: '#888', margin: '0 0 2rem', fontSize: '0.9rem' }}>Your account details</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              background: '#f8fdf8', borderRadius: '12px', padding: '1rem 1.25rem',
              border: '1px solid rgba(45,106,45,0.1)'
            }}>
              <div style={{ color: '#888', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>EMAIL</div>
              <div style={{ color: '#1a3a1a', fontWeight: '600' }}>{email}</div>
            </div>
            <div style={{
              background: '#f8fdf8', borderRadius: '12px', padding: '1rem 1.25rem',
              border: '1px solid rgba(45,106,45,0.1)'
            }}>
              <div style={{ color: '#888', fontSize: '0.8rem', fontWeight: '600', marginBottom: '0.25rem' }}>ROLE</div>
              <div style={{ color: '#1a3a1a', fontWeight: '600' }}>{role}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => navigate('/appointments')} style={{
              flex: 1, padding: '0.75rem', background: '#2d6a2d', color: 'white',
              border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700'
            }}>My Appointments</button>
            <button onClick={handleLogout} style={{
              flex: 1, padding: '0.75rem', background: '#fee2e2', color: '#991b1b',
              border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700'
            }}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile