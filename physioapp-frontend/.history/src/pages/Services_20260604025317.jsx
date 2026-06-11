import { useNavigate } from 'react-router-dom'

function Services() {
  const navigate = useNavigate()

  const services = [
    { name: 'Initial Consultation', duration: 60, price: 150, desc: 'A comprehensive first visit to assess your condition and create a personalized treatment plan.' },
    { name: 'Sports Massage', duration: 45, price: 120, desc: 'Deep tissue sports massage targeting muscle tension and aiding in sports injury recovery.' },
    { name: 'Electrotherapy', duration: 30, price: 100, desc: 'Pain relief and muscle stimulation using safe electrical currents for faster recovery.' },
    { name: 'Manual Therapy', duration: 60, price: 180, desc: 'Hands-on joint and muscle manipulation to restore mobility and reduce pain.' },
    { name: 'Ultrasound Therapy', duration: 30, price: 90, desc: 'Therapeutic ultrasound to promote tissue healing and reduce inflammation.' },
    { name: 'Pediatric Physiotherapy', duration: 45, price: 130, desc: 'Gentle, specialized physiotherapy for children and adolescents.' },
  ]

  return (
    <div>
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2rem', background: '#2d6a2d', color: 'white'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>AFYMO</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/login')} style={{
            padding: '0.5rem 1rem', background: 'transparent', color: 'white',
            border: '1px solid white', borderRadius: '4px', cursor: 'pointer'
          }}>Login</button>
          <button onClick={() => navigate('/register')} style={{
            padding: '0.5rem 1rem', background: 'white', color: '#2d6a2d',
            border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
          }}>Register</button>
        </div>
      </nav>

      <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ color: '#2d6a2d', textAlign: 'center' }}>Our Services</h1>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '2rem' }}>
          Professional physiotherapy treatments tailored to your needs
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
          {services.map((s, i) => (
            <div key={i} style={{
              background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px',
              padding: '1.5rem', width: '260px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
            }}>
              <h3 style={{ color: '#2d6a2d', margin: '0 0 0.5rem' }}>{s.name}</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' }}>{s.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: '#64748b' }}>⏱ {s.duration} min</span>
                <span style={{ color: '#2d6a2d', fontWeight: 'bold' }}>{s.price} RON</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/appointments/book')} style={{
            padding: '0.75rem 2rem', background: '#2d6a2d', color: 'white',
            border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem'
          }}>Book an Appointment</button>
        </div>
      </div>
    </div>
  )
}

export default Services