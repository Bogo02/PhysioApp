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
        <button onClick={() => navigate('/dashboard')} style={{
          padding: '0.5rem 1rem', background: 'transparent', color: 'white',
          border: '1px solid white', borderRadius: '4px', cursor: 'pointer'
        }}>Dashboard</button>
      </nav>

      <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <h1>My Profile</h1>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#64748b', fontSize: '0.85rem' }}>EMAIL</label>
          <p style={{ margin: '0.25rem 0', fontWeight: 'bold' }}>{email}</p>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#64748b', fontSize: '0.85rem' }}>ROLE</label>
          <p style={{ margin: '0.25rem 0', fontWeight: 'bold' }}>{role}</p>
        </div>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/appointments')} style={{
            padding: '0.75rem 1.5rem', background: '#2d6a2d', color: 'white',
            border: 'none', borderRadius: '4px', cursor: 'pointer'
          }}>My Appointments</button>
          <button onClick={handleLogout} style={{
            padding: '0.75rem 1.5rem', background: '#fee2e2', color: '#991b1b',
            border: 'none', borderRadius: '4px', cursor: 'pointer'
          }}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default Profile