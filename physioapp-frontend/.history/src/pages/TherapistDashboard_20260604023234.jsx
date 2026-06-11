import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TherapistDashboard() {
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate= useNavigate()
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    useEffect(() => {
        if(!token) { navigate('/login'); return}
        if(role !=='THERAPIST') {navigate ('/dashboard'); return}

        axios.get('http://loaclhost:8080/api/appointments/therapist', {
            headers: {Authorization: 'Bearer ${token}'}
        })
        .then(res => {setAppointments(res.data);setLoading(false)})
        .catch(err => {console.error(err); setLoading(false)})
    }, [])

    const handleConfirm = async(id) => {
        try {
            await axios.put('http://localhose:8080/api/appointments/${id}/confirm', {}, {
                headers: {Authorization: 'Bearer ${token}'}
            })
        setAppointments(appointments.map(a =>a.id ===id ? {...a, status: 'CONFIRMED'}:a))
        }catch(err){
            alert('Failed to confirm appointment')
        }
    }
    const handleComplete = async(id) => {
        try{
            await axios.put('http://localhost:8080/api/appointments/${id}/complete',{}, {
                headers: {Authorization: 'Bearer ${token}'}
            })
        setAppointments(appointments.map(a => a.id === id ? {...a, status: 'COMPLETED'} : a))
        } catch(err){
            alert('Failed to complete appointment')
        }
    }
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
        <h2 style={{ margin: 0 }}>Cabinet Marcel — Therapist</h2>
        <button onClick={handleLogout} style={{
          padding: '0.5rem 1rem', background: 'white', color: '#2d6a2d',
          border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
        }}>Logout</button>
      </nav>

      <div style={{ padding: '2rem' }}>
        <h1>My Schedule</h1>
        {loading ? <p>Loading...</p> : appointments.length === 0 ? (
          <p style={{ color: '#64748b' }}>No appointments assigned yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {appointments.map(a => (
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
                    {new Date(a.appointmentDate).toLocaleString()}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem',
                    background: a.status === 'CONFIRMED' ? '#dcfce7' : a.status === 'PENDING' ? '#fef9c3' : '#f1f5f9',
                    color: a.status === 'CONFIRMED' ? '#166534' : a.status === 'PENDING' ? '#854d0e' : '#64748b'
                  }}>{a.status}</span>
                  {a.status === 'PENDING' && (
                    <button onClick={() => handleConfirm(a.id)} style={{
                      padding: '0.5rem 1rem', background: '#dcfce7', color: '#166534',
                      border: 'none', borderRadius: '4px', cursor: 'pointer'
                    }}>Confirm</button>
                  )}
                  {a.status === 'CONFIRMED' && (
                    <button onClick={() => handleComplete(a.id)} style={{
                      padding: '0.5rem 1rem', background: '#2d6a2d', color: 'white',
                      border: 'none', borderRadius: '4px', cursor: 'pointer'
                    }}>Complete</button>
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

export default TherapistDashboard