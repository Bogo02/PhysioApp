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

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  const filtered = filter === 'ALL' ? appointments : appointments.filter(a => a.status === filter)

  return (
    <div>
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2rem', background: '#2d6a2d', color: 'white'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>AFYMO</h2>
        <button onClick={handleLogout} style={{
          padding: '0.5rem 1rem', background: 'white', color: '#2d6a2d',
          border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
        }}>Logout</button>
      </nav>

      <div style={{ padding: '2rem' }}>
        <h1>Admin Panel</h1>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map(s => (
            <div key={s} onClick={() => setFilter(s)} style={{
              padding: '1rem 1.5rem', borderRadius: '8px', cursor: 'pointer',
              background: filter === s ? '#2d6a2d' : 'white',
              color: filter === s ? 'white' : '#2d6a2d',
              border: '1px solid #2d6a2d', fontWeight: 'bold', minWidth: '100px', textAlign: 'center'
            }}>
              {s} {s === 'ALL' ? `(${appointments.length})` : `(${appointments.filter(a => a.status === s).length})`}
            </div>
          ))}
        </div>

        {/* Appointments list */}
        {loading ? <p>Loading...</p> : filtered.length === 0 ? (
          <p style={{ color: '#64748b' }}>No appointments found.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filtered.map(a => (
              <div key={a.id} style={{
                background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px',
                padding: '1.5rem', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <div>
                  <h3 style={{ margin: 0 }}>{a.service?.name}</h3>
                  <p style={{ margin: '0.25rem 0', color: '#64748b' }}>
                    Patient: {a.patient?.firstName} {a.patient?.lastName}
                  </p>
                  <p style={{ margin: '0.25rem 0', color: '#64748b' }}>
                    Therapist: {a.therapist?.user?.firstName} {a.therapist?.user?.lastName}
                  </p>
                  <p style={{ margin: '0.25rem 0', color: '#64748b' }}>
                    {new Date(a.appointmentDate).toLocaleString()}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem',
                    background: a.status === 'CONFIRMED' ? '#dcfce7' : a.status === 'PENDING' ? '#fef9c3' : a.status === 'COMPLETED' ? '#e0f2fe' : '#fee2e2',
                    color: a.status === 'CONFIRMED' ? '#166534' : a.status === 'PENDING' ? '#854d0e' : a.status === 'COMPLETED' ? '#0369a1' : '#991b1b'
                  }}>{a.status}</span>
                  {a.status === 'PENDING' && (
                    <button onClick={() => handleConfirm(a.id)} style={{
                      padding: '0.4rem 0.8rem', background: '#dcfce7', color: '#166534',
                      border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem'
                    }}>Confirm</button>
                  )}
                  {a.status === 'CONFIRMED' && (
                    <button onClick={() => handleComplete(a.id)} style={{
                      padding: '0.4rem 0.8rem', background: '#2d6a2d', color: 'white',
                      border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem'
                    }}>Complete</button>
                  )}
                  {(a.status === 'PENDING' || a.status === 'CONFIRMED') && (
                    <button onClick={() => handleCancel(a.id)} style={{
                      padding: '0.4rem 0.8rem', background: '#fee2e2', color: '#991b1b',
                      border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem'
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