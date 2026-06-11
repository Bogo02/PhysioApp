import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Appointments(){
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if(!token) {navigate('/login'); return }
        setLoading(false)
    }, [])

    const handleCancel = async(id) =>{
        try{
            await axios.put('http://localhost:8080/api/appointments/${id}/cancel', {} , {
            headers: {Authorization: 'Bearer ${token}' }
            })
            setAppointments(appointments.filter(a => a.id !== id )) 
        } catch (err) {
            alert('Failed to cancel appointment')
        }
    }
return (
    <div>
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2rem', background: '#2d6a2d', color: 'white'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>Cabinet Marcel</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/dashboard')} style={{
            padding: '0.5rem 1rem', background: 'transparent', color: 'white',
            border: '1px solid white', borderRadius: '4px', cursor: 'pointer'
          }}>Dashboard</button>
          <button onClick={() => navigate('/appointments/book')} style={{
            padding: '0.5rem 1rem', background: 'white', color: '#2d6a2d',
            border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
          }}>+ Book New</button>
        </div>
      </nav>

      <div style={{ padding: '2rem' }}>
        <h1>My Appointments</h1>
        {loading ? <p>Loading...</p> : appointments.length === 0 ? (
          <div style={{
            background: '#f8faff', border: '1px solid #e2e8f0',
            borderRadius: '8px', padding: '2rem', textAlign: 'center', color: '#64748b'
          }}>
            <p>You have no appointments yet.</p>
            <button onClick={() => navigate('/appointments/book')} style={{
              padding: '0.75rem 1.5rem', background: '#2d6a2d', color: 'white',
              border: 'none', borderRadius: '4px', cursor: 'pointer'
            }}>Book an Appointment</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {appointments.map(a => (
              <div key={a.id} style={{
                background: 'white', border: '1px solid #e2e8f0',
                borderRadius: '8px', padding: '1.5rem',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                <div>
                  <h3 style={{ margin: 0 }}>{a.service?.name}</h3>
                  <p style={{ margin: '0.25rem 0', color: '#64748b' }}>
                    Therapist: {a.therapist?.user?.firstName} {a.therapist?.user?.lastName}
                  </p>
                  <p style={{ margin: '0.25rem 0', color: '#64748b' }}>
                    Date: {new Date(a.appointmentDate).toLocaleString()}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem',
                    background: a.status === 'CONFIRMED' ? '#dcfce7' : a.status === 'PENDING' ? '#fef9c3' : '#fee2e2',
                    color: a.status === 'CONFIRMED' ? '#166534' : a.status === 'PENDING' ? '#854d0e' : '#991b1b'
                  }}>{a.status}</span>
                  {(a.status === 'PENDING' || a.status === 'CONFIRMED') && (
                    <button onClick={() => handleCancel(a.id)} style={{
                      padding: '0.5rem 1rem', background: '#fee2e2', color: '#991b1b',
                      border: 'none', borderRadius: '4px', cursor: 'pointer'
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