import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const [token] = useState(localStorage.getItem('token'))
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', date: '' })

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (token) {
      navigate('/appointments/book')
    } else {
      navigate('/register')
    }
  }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.2rem 4rem', background: 'white',
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 100
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer', color: '#1a3a1a', fontSize: '1.5rem' }}
          onClick={() => navigate('/')}>AFYMO</h2>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {['Services', 'About', 'Contact'].map(item => (
            <span key={item} onClick={() => navigate(`/${item.toLowerCase()}`)} style={{
              cursor: 'pointer', color: '#444', fontWeight: '500', fontSize: '0.95rem'
            }}>{item}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {token ? (
            <>
              <button onClick={() => navigate('/dashboard')} style={{
                padding: '0.5rem 1.25rem', background: 'transparent', color: '#2d6a2d',
                border: '1.5px solid #2d6a2d', borderRadius: '999px', cursor: 'pointer', fontWeight: '600'
              }}>Dashboard</button>
              <button onClick={() => { localStorage.clear(); navigate('/') }} style={{
                padding: '0.5rem 1.25rem', background: '#2d6a2d', color: 'white',
                border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '600'
              }}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} style={{
                padding: '0.5rem 1.25rem', background: 'transparent', color: '#2d6a2d',
                border: '1.5px solid #2d6a2d', borderRadius: '999px', cursor: 'pointer', fontWeight: '600'
              }}>Login</button>
              <button onClick={() => navigate('/register')} style={{
                padding: '0.5rem 1.25rem', background: '#2d6a2d', color: 'white',
                border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '600'
              }}>Register</button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '4rem 4rem', background: 'white', minHeight: '85vh', gap: '3rem'
      }}>
        {/* Left side */}
        <div style={{ flex: 1, maxWidth: '520px' }}>
          <span style={{
            background: '#e8f5e9', color: '#2d6a2d', padding: '0.4rem 1rem',
            borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600'
          }}>Professional Physiotherapy</span>
          <h1 style={{
            fontSize: '3.5rem', fontWeight: '800', color: '#1a3a1a',
            lineHeight: '1.15', margin: '1rem 0'
          }}>
            Recover.<br />Rebuild.<br />
            <span style={{ color: '#2d6a2d' }}>Rise Again.</span>
          </h1>
          <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            Expert physiotherapy care tailored to your needs. Our specialists help you recover faster and live pain-free.
          </p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button onClick={() => token ? navigate('/appointments/book') : navigate('/register')} style={{
              padding: '0.85rem 2rem', background: '#2d6a2d', color: 'white',
              border: 'none', borderRadius: '999px', cursor: 'pointer',
              fontWeight: '700', fontSize: '1rem'
            }}>Book Appointment</button>
            <button onClick={() => navigate('/services')} style={{
              padding: '0.85rem 2rem', background: 'transparent', color: '#2d6a2d',
              border: '1.5px solid #2d6a2d', borderRadius: '999px', cursor: 'pointer',
              fontWeight: '600', fontSize: '1rem'
            }}>Our Services</button>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem' }}>
            {[
              { number: '15+', label: 'Years Experience' },
              { number: '500+', label: 'Happy Patients' },
              { number: '3', label: 'Expert Therapists' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#2d6a2d' }}>{s.number}</div>
                <div style={{ fontSize: '0.85rem', color: '#888', fontWeight: '500' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - booking form + image */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '480px' }}>
          {/* Hero image */}
          <div style={{
            borderRadius: '20px', overflow: 'hidden', height: '300px',
            backgroundImage: 'url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800)',
            backgroundSize: 'cover', backgroundPosition: 'center'
          }} />

          {/* Quick booking form */}
          <div style={{
            background: 'white', borderRadius: '16px', padding: '1.5rem',
            boxShadow: '0 4px 24px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ margin: '0 0 1rem', color: '#1a3a1a', fontSize: '1.1rem' }}>Quick Appointment</h3>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input placeholder="Your Name" value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem' }} />
              <select value={formData.service}
                onChange={e => setFormData({ ...formData, service: e.target.value })}
                style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem', color: formData.service ? '#1a3a1a' : '#888' }}>
                <option value="">Select Service</option>
                <option>Initial Consultation</option>
                <option>Sports Massage</option>
                <option>Manual Therapy</option>
                <option>Electrotherapy</option>
                <option>Ultrasound Therapy</option>
              </select>
              <input type="date" value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                style={{ padding: '0.65rem 1rem', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem' }} />
              <button type="submit" style={{
                padding: '0.75rem', background: '#2d6a2d', color: 'white',
                border: 'none', borderRadius: '8px', cursor: 'pointer',
                fontWeight: '700', fontSize: '0.95rem', fontFamily: 'inherit'
              }}>Book Now →</button>
            </form>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div style={{ padding: '4rem', background: '#f8fdf8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ color: '#1a3a1a', fontSize: '2rem', margin: 0 }}>Physiotherapy <span style={{ color: '#2d6a2d' }}>Services</span></h2>
            <p style={{ color: '#888', marginTop: '0.5rem' }}>Treatments tailored to your recovery needs</p>
          </div>
          <button onClick={() => navigate('/services')} style={{
            padding: '0.6rem 1.5rem', background: '#2d6a2d', color: 'white',
            border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '600'
          }}>See All</button>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { title: 'Manual Therapy', desc: 'Hands-on treatment to restore mobility and reduce pain.', icon: '🤲' },
            { title: 'Sports Recovery', desc: 'Specialized care for sports injuries and post-injury recovery.', icon: '⚡' },
            { title: 'Electrotherapy', desc: 'Electrical stimulation for pain relief and muscle recovery.', icon: '💡' },
            { title: 'Pediatric Physio', desc: 'Gentle physiotherapy designed for children and teens.', icon: '🌱' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'white', padding: '1.5rem', borderRadius: '16px',
              flex: '1', minWidth: '200px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              cursor: 'pointer', transition: 'transform 0.2s'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{s.icon}</div>
              <h3 style={{ color: '#1a3a1a', margin: '0 0 0.5rem', fontSize: '1rem' }}>{s.title}</h3>
              <p style={{ color: '#888', fontSize: '0.875rem', margin: 0, lineHeight: '1.6' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Step Recovery Process */}
      <div style={{ padding: '4rem', background: 'white' }}>
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <h2 style={{ fontSize: '2rem', color: '#1a3a1a', marginBottom: '0.5rem' }}>
              Our 3-Step <span style={{ color: '#2d6a2d' }}>Recovery Process</span>
            </h2>
            <p style={{ color: '#888', marginBottom: '2rem', lineHeight: '1.7' }}>
              A structured approach to help you recover safely and effectively.
            </p>
            {[
              { step: '01', title: 'Assessment', desc: 'We evaluate your condition and create a personalized treatment plan.' },
              { step: '02', title: 'Treatment Plan', desc: 'Our therapists apply targeted treatments to address your specific needs.' },
              { step: '03', title: 'Continuous Support', desc: 'We monitor your progress and adjust the plan to ensure full recovery.' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: '40px', height: '40px', background: '#e8f5e9', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#2d6a2d', fontWeight: '800', fontSize: '0.85rem', flexShrink: 0
                }}>{s.step}</div>
                <div>
                  <h4 style={{ color: '#1a3a1a', margin: '0 0 0.25rem' }}>{s.title}</h4>
                  <p style={{ color: '#888', fontSize: '0.875rem', margin: 0, lineHeight: '1.6' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{
              borderRadius: '20px', overflow: 'hidden', height: '400px',
              backgroundImage: 'url(https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800)',
              backgroundSize: 'cover', backgroundPosition: 'center'
            }} />
          </div>
        </div>
      </div>

      {/* Meet the Team */}
      <div style={{ padding: '4rem', background: '#f8fdf8', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', color: '#1a3a1a', marginBottom: '0.5rem' }}>
          Meet the <span style={{ color: '#2d6a2d' }}>Team</span>
        </h2>
        <p style={{ color: '#888', marginBottom: '2.5rem' }}>Qualified specialists dedicated to your recovery</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { name: 'Ion Popescu', specialty: 'Sports Recovery', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200' },
            { name: 'Maria Ionescu', specialty: 'Neurological Rehab', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200' },
            { name: 'Alexandru Dumitrescu', specialty: 'Pediatric Physio', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200' },
          ].map((t, i) => (
            <div key={i} style={{
              background: 'white', padding: '1.5rem', borderRadius: '16px',
              width: '200px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
              <img src={t.img} alt={t.name} style={{
                width: '90px', height: '90px', borderRadius: '50%',
                objectFit: 'cover', marginBottom: '1rem'
              }} />
              <h3 style={{ color: '#1a3a1a', margin: '0 0 0.25rem', fontSize: '1rem' }}>{t.name}</h3>
              <p style={{ color: '#2d6a2d', fontSize: '0.85rem', margin: 0, fontWeight: '600' }}>{t.specialty}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{
        padding: '4rem', background: '#1a3a1a', color: 'white', textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>Ready to start your recovery?</h2>
        <p style={{ color: '#a8d5a8', marginBottom: '2rem', fontSize: '1.05rem' }}>
          Book an appointment today and take the first step towards a pain-free life.
        </p>
        <button onClick={() => token ? navigate('/appointments/book') : navigate('/register')} style={{
          padding: '0.85rem 2.5rem', background: '#2d6a2d', color: 'white',
          border: 'none', borderRadius: '999px', cursor: 'pointer',
          fontWeight: '700', fontSize: '1.05rem'
        }}>Get Started Today →</button>
      </div>

      {/* Footer */}
      <footer style={{
        background: '#111e11', color: '#888', textAlign: 'center', padding: '2rem'
      }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>© 2026 AFYMO — All rights reserved</p>
      </footer>
    </div>
  )
}

export default Home