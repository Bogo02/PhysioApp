import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminPanel() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')
  const [showAddForm, setShowAddForm] = useState(false)
  const [addType, setAddType] = useState('THERAPIST')
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', specialty: '', bio: '' })
  const [addError, setAddError] = useState('')
  const [addSuccess, setAddSuccess] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    if (role !== 'ADMIN') { navigate('/dashboard'); return }

    axios.get('http://localhost:8080/api/appointments/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => { setAppointments(res.data); setLoading(false) })
    .catch(err => { console.error(err); setLoading(false) })
  }, [])

  const handleAddUser = async (e) => {
    e.preventDefault()
    try {
      const endpoint = addType === 'THERAPIST' ? '/api/admin/therapists' : '/api/admin/admins'
      await axios.post(`http://localhost:8080${endpoint}`, newUser, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAddSuccess(`${addType === 'THERAPIST' ? 'Therapist' : 'Admin'} added successfully!`)
      setNewUser({ firstName: '', lastName: '', email: '', password: '', specialty: '', bio: '' })
      setTimeout(() => { setAddSuccess(''); setShowAddForm(false) }, 3000)
    } catch (err) {
      setAddError('Failed to add user. Email may already exist.')
    }
  }

  const handleConfirm = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${id}/confirm`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'CONFIRMED' } : a))
    } catch (err) { alert('Failed to confirm') }
  }

  const handleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'COMPLETED' } : a))
    } catch (err) { alert('Failed to complete') }
  }

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'CANCELLED' } : a))
    } catch (err) { alert('Failed to cancel') }
  }

  const filtered = filter === 'ALL' ? appointments : appointments.filter(a => a.status === filter)

  const inputStyle = {
    width: '100%', padding: '0.65rem 1rem', borderRadius: '8px',
    border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem', boxSizing: 'border-box'
  }

  const labelStyle = {
    color: '#444', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fdf8' }}>
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.2rem 4rem', background: '#2d6a2d',
        boxShadow: '0 2px 12px rgba(45,106,45,0.3)'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer', color: 'white', fontSize: '1.5rem', fontWeight: '800' }}
          onClick={() => navigate('/')}>AFYMO</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/dashboard')} style={{
            padding: '0.5rem 1.25rem', background: 'transparent', color: 'white',
            border: '1.5px solid white', borderRadius: '999px', cursor: 'pointer', fontWeight: '600'
          }}>Dashboard</button>
          <button onClick={() => { localStorage.clear(); navigate('/') }} style={{
            padding: '0.5rem 1.25rem', background: 'white', color: '#2d6a2d',
            border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700'
          }}>Logout</button>
        </div>
      </nav>

      <div style={{ padding: '3rem 4rem' }}>
        <h1 style={{ color: '#1a3a1a', marginBottom: '2rem' }}>Admin Panel</h1>

        {/* Add User Buttons */}
        <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
          <button onClick={() => { setShowAddForm(addType === 'THERAPIST' ? !showAddForm : true); setAddType('THERAPIST'); setAddError(''); setAddSuccess('') }} style={{
            padding: '0.75rem 1.5rem', background: '#2d6a2d', color: 'white',
            border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700', fontFamily: 'inherit'
          }}>
            {showAddForm && addType === 'THERAPIST' ? '✕ Cancel' : '+ Add Therapist'}
          </button>
          <button onClick={() => { setShowAddForm(addType === 'ADMIN' ? !showAddForm : true); setAddType('ADMIN'); setAddError(''); setAddSuccess('') }} style={{
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
            marginBottom: '2rem', border: '1px solid rgba(45,106,45,0.1)',
            boxShadow: '0 4px 16px rgba(45,106,45,0.08)'
          }}>
            <h3 style={{ color: '#1a3a1a', margin: '0 0 1.5rem' }}>
              Add New {addType === 'THERAPIST' ? 'Therapist' : 'Admin'}
            </h3>
            {addSuccess && (
              <div style={{ background: '#dcfce7', color: '#166534', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontWeight: '600' }}>
                {addSuccess}
              </div>
            )}
            {addError && (
              <div style={{ background: '#fee2e2', color: '#991b1b', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem' }}>
                {addError}
              </div>
            )}
            <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>First Name</label>
                  <input value={newUser.firstName} onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
                    placeholder="Ion" style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Last Name</label>
                  <input value={newUser.lastName} onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
                    placeholder="Popescu" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="ion@physioapp.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <input type="password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="••••••••" style={inputStyle} />
              </div>
              {addType === 'THERAPIST' && (
                <>
                  <div>
                    <label style={labelStyle}>Specialty</label>
                    <input value={newUser.specialty} onChange={e => setNewUser({ ...newUser, specialty: e.target.value })}
                      placeholder="Sports Recovery" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Bio</label>
                    <textarea value={newUser.bio} onChange={e => setNewUser({ ...newUser, bio: e.target.value })}
                      placeholder="Brief description..."
                      style={{ ...inputStyle, height: '80px', resize: 'vertical' }} />
                  </div>
                </>
              )}
              <button type="submit" style={{
                padding: '0.75rem', background: '#2d6a2d', color: 'white',
                border: 'none', borderRadius: '999px', cursor: 'pointer',
                fontWeight: '700', fontFamily: 'inherit', marginTop: '0.5rem'
              }}>Add {addType === 'THERAPIST' ? 'Therapist' : 'Admin'} →</button>
            </form>
          </div>
        )}

        {/* Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: '0.5rem 1.25rem', borderRadius: '999px', cursor: 'pointer',
              background: filter === s ? '#2d6a2d' : 'white',
              color: filter === s ? 'white' : '#2d6a2d',
              border: '1.5px solid #2d6a2d', fontWeight: '600', fontSize: '0.85rem', fontFamily: 'inherit'
            }}>
              {s} ({s === 'ALL' ? appointments.length : appointments.filter(a => a.status === s).length})
            </button>
          ))}
        </div>

        {/* Appointments List */}
        {loading ? <p style={{ color: '#888' }}>Loading...</p> : filtered.length === 0 ? (
          <div className="hex-bg" style={{ borderRadius: '16px', padding: '3rem', textAlign: 'center', color: '#888' }}>
            <p>No appointments found.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.map(a => (
              <div key={a.id} style={{
                background: 'white', border: '1px solid rgba(45,106,45,0.1)', borderRadius: '16px',
                padding: '1.5rem', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
              }}>
                <div>
                  <h3 style={{ margin: 0, color: '#1a3a1a' }}>{a.service?.name}</h3>
                  <p style={{ margin: '0.25rem 0', color: '#888', fontSize: '0.9rem' }}>
                    Patient: {a.patient?.firstName} {a.patient?.lastName}
                  </p>
                  <p style={{ margin: '0.25rem 0', color: '#888', fontSize: '0.9rem' }}>
                    Therapist: {a.therapist?.user?.firstName} {a.therapist?.user?.lastName}
                  </p>
                  <p style={{ margin: '0.25rem 0', color: '#888', fontSize: '0.9rem' }}>
                    {new Date(a.appointmentDate).toLocaleString()}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600',
                    background: a.status === 'CONFIRMED' ? '#dcfce7' : a.status === 'PENDING' ? '#fef9c3' : a.status === 'COMPLETED' ? '#e0f2fe' : '#fee2e2',
                    color: a.status === 'CONFIRMED' ? '#166534' : a.status === 'PENDING' ? '#854d0e' : a.status === 'COMPLETED' ? '#0369a1' : '#991b1b'
                  }}>{a.status}</span>
                  {a.status === 'PENDING' && (
                    <button onClick={() => handleConfirm(a.id)} style={{
                      padding: '0.4rem 0.8rem', background: '#dcfce7', color: '#166534',
                      border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem', fontFamily: 'inherit'
                    }}>Confirm</button>
                  )}
                  {a.status === 'CONFIRMED' && (
                    <button onClick={() => handleComplete(a.id)} style={{
                      padding: '0.4rem 0.8rem', background: '#2d6a2d', color: 'white',
                      border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem', fontFamily: 'inherit'
                    }}>Complete</button>
                  )}
                  {(a.status === 'PENDING' || a.status === 'CONFIRMED') && (
                    <button onClick={() => handleCancel(a.id)} style={{
                      padding: '0.4rem 0.8rem', background: '#fee2e2', color: '#991b1b',
                      border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem', fontFamily: 'inherit'
                    }}>Cancel</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminPanel