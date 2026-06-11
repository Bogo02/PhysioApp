import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function AdminPanel() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('ALL')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const [showAddForm, setShowAddForm] = useState(false)
  const [addType, setAddType] = useState('THERAPIST')
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', specialty: '', bio: '' })
  const [addError, setAddError] = useState('')
  const [addSuccess, setAddSuccess] = useState('')

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    if (role !== 'ADMIN') { navigate('/dashboard'); return }

    axios.get('http://localhost:8080/api/appointments/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => { setAppointments(res.data); setLoading(false) })
    .catch(err => { console.error(err); setLoading(false) })
  }, [])

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

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map(s => (
            <button key={s} onClick={() => setFilter(s)} style={{
              padding: '0.5rem 1.25rem', borderRadius: '999px', cursor: 'pointer',
              background: filter === s ? '#2d6a2d' : 'white',
              color: filter === s ? 'white' : '#2d6a2d',
              border: '1.5px solid #2d6a2d', fontWeight: '600', fontSize: '0.85rem',
              fontFamily: 'inherit'
            }}>
              {s} ({s === 'ALL' ? appointments.length : appointments.filter(a => a.status === s).length})
            </button>
          ))}
        </div>

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