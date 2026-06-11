import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Services() {
  const navigate = useNavigate()
  const [token] = useState(localStorage.getItem('token'))

  const services = [
    { name: 'Initial Consultation', duration: 60, price: 150, desc: 'A comprehensive first visit to assess your condition and create a personalized treatment plan.' },
    { name: 'Sports Massage', duration: 45, price: 120, desc: 'Deep tissue sports massage targeting muscle tension and aiding in sports injury recovery.' },
    { name: 'Electrotherapy', duration: 30, price: 100, desc: 'Pain relief and muscle stimulation using safe electrical currents for faster recovery.' },
    { name: 'Manual Therapy', duration: 60, price: 180, desc: 'Hands-on joint and muscle manipulation to restore mobility and reduce pain.' },
    { name: 'Ultrasound Therapy', duration: 30, price: 90, desc: 'Therapeutic ultrasound to promote tissue healing and reduce inflammation.' },
    { name: 'Pediatric Physiotherapy', duration: 45, price: 130, desc: 'Gentle, specialized physiotherapy for children and adolescents.',  },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f8fdf8' }}>
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.2rem 4rem', background: '#2d6a2d',
        boxShadow: '0 2px 12px rgba(45,106,45,0.3)'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer', color: 'white', fontSize: '1.5rem', fontWeight: '800' }}
          onClick={() => navigate('/')}>AFYMO</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {token ? (
            <>
              <button onClick={() => navigate('/dashboard')} style={{
                padding: '0.5rem 1.25rem', background: 'transparent', color: 'white',
                border: '1.5px solid white', borderRadius: '999px', cursor: 'pointer', fontWeight: '600'
              }}>Dashboard</button>
              <button onClick={() => { localStorage.clear(); navigate('/') }} style={{
                padding: '0.5rem 1.25rem', background: 'white', color: '#2d6a2d',
                border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700'
              }}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} style={{
                padding: '0.5rem 1.25rem', background: 'transparent', color: 'white',
                border: '1.5px solid white', borderRadius: '999px', cursor: 'pointer', fontWeight: '600'
              }}>Login</button>
              <button onClick={() => navigate('/register')} style={{
                padding: '0.5rem 1.25rem', background: 'white', color: '#2d6a2d',
                border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700'
              }}>Register</button>
            </>
          )}
        </div>
      </nav>

      <div style={{ padding: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ color: '#1a3a1a', textAlign: 'center', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Our Services</h1>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '3rem', fontSize: '1.05rem' }}>
          Professional physiotherapy treatments tailored to your needs
        </p>
        <div className="hex-bg" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', borderRadius: '20px', padding: '2rem' }}>
          {services.map((s, i) => (
            <div key={i} style={{
              background: 'white', border: '1px solid rgba(45,106,45,0.1)', borderRadius: '16px',
              padding: '1.5rem', width: '260px', boxShadow: '0 4px 16px rgba(45,106,45,0.08)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{s.icon}</div>
              <h3 style={{ color: '#2d6a2d', margin: '0 0 0.5rem', fontSize: '1.05rem' }}>{s.name}</h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem', lineHeight: '1.6' }}>{s.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: '600' }}>
                <span style={{ color: '#888' }}>⏱ {s.duration} min</span>
                <span style={{ color: '#2d6a2d' }}>{s.price} RON</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button onClick={() => token ? navigate('/appointments/book') : navigate('/register')} style={{
            padding: '0.85rem 2.5rem', background: '#2d6a2d', color: 'white',
            border: 'none', borderRadius: '999px', cursor: 'pointer', fontSize: '1rem', fontWeight: '700'
          }}>Book an Appointment →</button>
        </div>
      </div>

      <footer style={{ background: '#0f2a0f', color: '#888', textAlign: 'center', padding: '2rem', marginTop: '3rem' }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>© 2026 AFYMO — All rights reserved</p>
      </footer>
    </div>
  )
}

export default Services