import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function BookAppointment() {
  const [therapists, setTherapists] = useState([])
  const [services, setServices] = useState([])
  const [therapistId, setTherapistId] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
  if (!token) { navigate('/login'); return }
  
  const fetchData = async () => {
    try {
      const [therapistsRes, servicesRes] = await Promise.all([
        axios.get('http://localhost:8080/api/therapists'),
        axios.get('http://localhost:8080/api/services')
      ])
      setTherapists(therapistsRes.data)
      setServices(servicesRes.data)
    } catch (err) {
      setError('Failed to load data. Make sure the backend is running.')
    }
  }
  fetchData()
}, [])

  const handleBook = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:8080/api/appointments/book', {
        therapistId, serviceId, appointmentDate: date, notes
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setSuccess(true)
      setTimeout(() => navigate('/appointments'), 2000)
    } catch (err) {
      setError('Failed to book appointment. Please try again.')
    }
  }
  const inputStyle = {
    width: '100%', padding: '0.65rem 1rem', borderRadius: '8px',
    border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem',
    boxSizing: 'border-box', outline: 'none'
  }

  const labelStyle = {
    color: '#444', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem'
  }

  return (
    <div style ={{minHeight: '100vh', background: '#f8fdf8'}}>
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2rem', background: '#2d6a2d', boxShadow: '0 2px 12px rgba(45,106,45,0.3)'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer', color:'white', fontSize: '1.5rem', fontWeight: '800'}} 
        onClick={() => navigate('/')}>AFYMO</h2>
        <button onClick={() => navigate('/appointments')} style={{
          padding: '0.5rem 1.25rem', background: 'transparent', color: 'white',
          border: '1.5px solid white', borderRadius: '999px', cursor: 'pointer'
        }}>Back to Appointments</button>
      </nav>
 <div className="hex-bg" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 2rem'}}>
        <div style = {{
          background: 'white', borderRadius: '20px', padding: '2.5rem',
          width: '100%', maxWidth: '500px',boxShadow: '0 4px 24px rgba(45,106,45,0.3)',
          border: '1px solid rgba(45,106,45,0.1)'
        }}>
        <h1 style={{ color: '#1a3a1a', margin: '0 0 0.5rem', fontSize: '1.8rem' }}>Book an Appointment</h1>
        {success && (
            <div style={{
              background: '#dcfce7', color: '#166534', padding: '0.75rem 1rem',
              borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: '600'
            }}>Appointment booked! Redirecting...</div>
          )}
          {error && (
            <div style={{
              background: '#fee2e2', color: '#991b1b', padding: '0.75rem 1rem',
              borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem'
            }}>{error}</div>
          )}
        <form onSubmit={handleBook} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div>
            <label style={labelStyle}>Therapist</label>
            <select value={therapistId} onChange={ e=> setTherapistId(e.target.value)} style={inputStyle}>
              <option value="">Select a therapist</option>
              {therapists.map(t => (
                <option key={t.id} value={t.id}>{t.user?.firstName} {t.user?.lastName} — {t.specialty}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Service</label>
            <select value={serviceId} onChange={ e=> setServiceId(e.target.value)} style={inputStyle}> 
            <option value="">Select a service</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name} — {s.durationMinutes} min — {s.price} RON</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Date & Time</label>
            <input type="datetime-local" value={date} onChange={ e=> setDate(e.target.value)} style={inputStyle}/>
          </div>
          <div>
            <label style={labelStyle}>Notes (optional)</label>
            <textarea value={notes} onChange={ e=> setNotes(e.target.value)} style={inputStyle}/>
          </div>
          <button type="submit" style={{
            width: '100%', padding: '0.85rem', background: '#2d6a2d',
            color: 'white', border: 'none', borderRadius: '999px', cursor: 'pointer',
            fontWeight: '700', fontSize: '1rem', fontFamily: 'inherit', marginTop: '0.5rem'
          }}>Book Appointment →</button>
        </form>
      </div>
      </div>
      </div>
    </div>
  )
}

export default BookAppointment