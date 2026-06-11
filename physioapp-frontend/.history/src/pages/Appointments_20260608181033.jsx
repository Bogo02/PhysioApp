import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    axios.get('http://localhost:8080/api/appointments/my', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => { setAppointments(res.data); setLoading(false) })
    .catch(err => { console.error(err); setLoading(false) })
  }, [])

  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'CANCELLED' } : a))
    } catch (err) { alert('Failed to cancel appointment') }
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
          <button onClick={() => navigate('/appointments/book')} style={{
            padding: '0.5rem 1.25rem', background: 'white', color: '#2d6a2d',
            border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700'
          }}>+ Book New</button>
        </div>
      </nav>

      <div style={{ padding: '3rem 4rem' }}>
        <h1 style={{ color: '#1a3a1a', marginBottom: '2rem' }}>My Appointments</h1>
        {loading ? <p style={{ color: '#888' }}>Loading...</p> : appointments.length === 0 ? (
          <div className="hex-bg" style={{
            borderRadius: '16px', padding: '3rem', textAlign: 'center', color: '#888'
          }}>
            <p style={{ marginBottom: '1rem' }}>You have no appointments yet.</p>
            <button onClick={() => navigate('/appointments/book')} style={{
              padding: '0.75rem 1.5rem', background: '#2d6a2d', color: 'white',
              border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700'
            }}>Book an Appointment</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {appointments.map(a => (
              <div key={a.id} style={{
                background: 'white', border: '1px solid rgba(45,106,45,0.1)', borderRadius: '16px',
                padding: '1.5rem', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.05)'
              }}>
                <div>
                  <h3 style={{ margin: 0, color: '#1a3a1a' }}>{a.service?.name}</h3>
                  <p style={{ margin: '0.25rem 0', color: '#888', fontSize: '0.9rem' }}>
                    Therapist: {a.therapist?.user?.firstName} {a.therapist?.user?.lastName}
                  </p>
                  <p style={{ margin: '0.25rem 0', color: '#888', fontSize: '0.9rem' }}>
                    {new Date(a.appointmentDate).toLocaleString()}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600',
                    background: a.status === 'CONFIRMED' ? '#dcfce7' : a.status === 'PENDING' ? '#fef9c3' : a.status === 'COMPLETED' ? '#e0f2fe' : '#fee2e2',
                    color: a.status === 'CONFIRMED' ? '#166534' : a.status === 'PENDING' ? '#854d0e' : a.status === 'COMPLETED' ? '#0369a1' : '#991b1b'
                  }}>{a.status}</span>
                  {(a.status === 'PENDING' || a.status === 'CONFIRMED') && (
                    <button onClick={() => handleCancel(a.id)} style={{
                      padding: '0.5rem 1rem', background: '#fee2e2', color: '#991b1b',
                      border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '600', fontSize: '0.85rem'
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

export default Appointments