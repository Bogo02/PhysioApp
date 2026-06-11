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
        <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>AFYMO</h2>
        <button onClick={() => navigate('/appointments')} style={{
          padding: '0.5rem 1rem', background: 'transparent', color: 'white',
          border: '1px solid white', borderRadius: '4px', cursor: 'pointer'
        }}>Back to Appointments</button>
      </nav>

      <div style={{ maxWidth: '500px', margin: '2rem auto', padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
        <h1>Book an Appointment</h1>
        {success && <p style={{ color: 'green' }}>Appointment booked! Redirecting...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleBook}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Therapist</label>
            <select value={therapistId} onChange={(e) => setTherapistId(e.target.value)}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}>
              <option value="">Select a therapist</option>
              {therapists.map(t => (
                <option key={t.id} value={t.id}>{t.user?.firstName} {t.user?.lastName} — {t.specialty}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Service</label>
            <select value={serviceId} onChange={(e) => setServiceId(e.target.value)}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}>
              <option value="">Select a service</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.name} — {s.durationMinutes} min — {s.price} RON</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Date & Time</label>
            <input type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Notes (optional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
              style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem', height: '80px' }} />
          </div>
          <button type="submit" style={{
            width: '100%', padding: '0.75rem', background: '#2d6a2d',
            color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
          }}>Book Appointment</button>
        </form>
      </div>
    </div>
  )
}

export default BookAppointment