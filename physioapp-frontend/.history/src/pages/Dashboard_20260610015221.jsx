import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Dashboard() {
  const [role, setRole] = useState('')
  const [email, setEmail] = useState('')
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  // --- NEW STATE FOR MANAGEMENT FEATURES ---
  const [showAddForm, setShowAddForm] = useState(false)
  const [addType, setAddType] = useState('THERAPIST') // 'THERAPIST' or 'ADMIN'
  const [addSuccess, setAddSuccess] = useState('')
  const [addError, setAddError] = useState('')
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    specialty: '',
    bio: ''
  })

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

  // --- NEW HANDLER TO SUBMIT DATA TO SPRING BOOT ---
  const handleAddUser = (e) => {
    e.preventDefault()
    setAddError('')
    setAddSuccess('')

    // Payload configuration matching your Spring Boot validation constraints
    const payload = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: 'password123', // Your hardcoded fallback configuration
      role: addType,
      specialty: addType === 'THERAPIST' ? newUser.specialty : null,
      bio: addType === 'THERAPIST' ? newUser.bio : null
    }

    axios.post('http://localhost:8080/api/auth/register', payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => {
      setAddSuccess(`Successfully created new ${addType.toLowerCase()}!`)
      // Clear out inputs for the next input action cycle
      setNewUser({ firstName: '', lastName: '', email: '', specialty: '', bio: '' })
    })
    .catch(err => {
      console.error(err)
      setAddError(err.response?.data?.message || 'Failed to add user. Check API constraints.')
    })
  }

  // Toggle helper to cleanly balance UI actions between the buttons
  const toggleForm = (type) => {
    if (showAddForm && addType === type) {
      setShowAddForm(false)
    } else {
      setShowAddForm(true)
      setAddType(type)
    }
    // Clean status strings across toggles
    setAddError('')
    setAddSuccess('')
  }

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

        {/* --- INJECTED: MANAGEMENT ACTIONS (SECURED FOR ADMINS ONLY) --- */}
        {role === 'ADMIN' && (
          <>
            {/* Add User Buttons */}
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
              <button onClick={() => toggleForm('THERAPIST')} style={{
                padding: '0.75rem 1.5rem', background: '#2d6a2d', color: 'white',
                border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700', fontFamily: 'inherit'
              }}>
                {showAddForm && addType === 'THERAPIST' ? '✕ Cancel' : '+ Add Therapist'}
              </button>
              <button onClick={() => toggleForm('ADMIN')} style={{
                padding: '0.75rem 1.5rem', background: '#1a3a1a', color: 'white',
                border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700', fontFamily: 'inherit'
              }}>
                {showAddForm && addType === 'ADMIN' ? '✕ Cancel' : '+ Add Admin'}
              </button>
            </div>

            {/* Add User Form */}
            {showAddForm && (
              <div style={{
                background: 'white', borderRadius: '16px', padding: '2rem',
                marginBottom: '3rem', border: '1px solid rgba(45,106,45,0.1)',
                boxShadow: '0 4px 16px rgba(45,106,45,0.08)'
              }}>
                <h3 style={{ color: '#1a3a1a', margin: '0 0 1.5rem' }}>
                  Add New {addType === 'THERAPIST' ? 'Therapist' : 'Admin'}
                </h3>
                {addSuccess && <div style={{ background: '#dcfce7', color: '#166534', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: '600' }}>{addSuccess}</div>}
                {addError && <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>{addError}</div>}
                
                <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ color: '#444', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>First Name</label>
                      <input value={newUser.firstName} onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
                        placeholder="Ion" required
                        style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ color: '#444', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>Last Name</label>
                      <input value={newUser.lastName} onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
                        placeholder="Popescu" required
                        style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ color: '#444', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>Email</label>
                    <input type="email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="ion@physioapp.com" required
                      style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                  </div>
                  {addType === 'THERAPIST' && (
                    <>
                      <div>
                        <label style={{ color: '#444', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>Specialty</label>
                        <input value={newUser.specialty} onChange={e => setNewUser({ ...newUser, specialty: e.target.value })}
                          placeholder="Sports Recovery" required
                          style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ color: '#444', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>Bio</label>
                        <textarea value={newUser.bio} onChange={e => setNewUser({ ...newUser, bio: e.target.value })}
                          placeholder="Brief description..." required
                          style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box', height: '80px', resize: 'vertical' }} />
                      </div>
                    </>
                  )}
                  <p style={{ color: '#888', fontSize: '0.85rem', margin: 0 }}>
                    Default password will be: <strong>password123</strong>
                  </p>
                  <button type="submit" style={{
                    padding: '0.75rem', background: '#2d6a2d', color: 'white',
                    border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700', fontFamily: 'inherit'
                  }}>Add {addType === 'THERAPIST' ? 'Therapist' : 'Admin'} →</button>
                </form>
              </div>
            )}
          </>
        )}

        <div className="hex-bg" style={{ borderRadius: '50px', padding: '3rem' }}>
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
                  }}>
                    {a.status}
                  </span>
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