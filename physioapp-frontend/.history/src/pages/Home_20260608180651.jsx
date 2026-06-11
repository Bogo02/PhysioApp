import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const [token] = useState(localStorage.getItem('token'))

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200',
      title: 'Professional Physiotherapy Care',
      subtitle: 'Helping you recover and move better'
    },
    {
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200',
      title: 'Expert Therapists',
      subtitle: 'Qualified specialists dedicated to your recovery'
    },
    {
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200',
      title: 'Modern Treatment Methods',
      subtitle: 'Using the latest techniques for the best results'
    },
  ]

  return (
    <div>
      {/* Navbar */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.2rem 4rem', background: '#2d6a2d', color: 'white',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 2px 12px rgba(45,106,45,0.3)'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer', color: 'white', fontSize: '1.5rem', fontWeight: '800' }}
          onClick={() => navigate('/')}>AFYMO</h2>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <button onClick={() => navigate('/services')} style={{
          padding: '0.5rem 1.25rem', background: 'white', color: '#2d6a2d',
          border: 'none', borderRadius: '999px', cursor: 'pointer', fontWeight: '700'
        }}>Services</button>
        </div>
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

      {/* Carousel */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        loop
        style={{ height: '550px' }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div style={{
              height: '550px',
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                background: 'rgba(0,0,0,0.5)', padding: '2rem 3rem',
                borderRadius: '16px', textAlign: 'center', color: 'white'
              }}>
                <h1 style={{ margin: 0, fontSize: '2.2rem' }}>{slide.title}</h1>
                <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{slide.subtitle}</p>
                {token ? (
                  <button onClick={() => navigate('/appointments/book')} style={{
                    marginTop: '1rem', padding: '0.75rem 2rem', background: '#2d6a2d',
                    color: 'white', border: 'none', borderRadius: '999px', cursor: 'pointer',
                    fontSize: '1rem', fontWeight: '700'
                  }}>Book an Appointment</button>
                ) : (
                  <button onClick={() => navigate('/register')} style={{
                    marginTop: '1rem', padding: '0.75rem 2rem', background: '#2d6a2d',
                    color: 'white', border: 'none', borderRadius: '999px', cursor: 'pointer',
                    fontSize: '1rem', fontWeight: '700'
                  }}>Get Started</button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Services Section */}
      <div className="hex-bg" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#2d6a2d', marginBottom: '0.5rem', fontSize: '2rem' }}>Our Services</h2>
        <p style={{ color: '#888', marginBottom: '2rem' }}>Treatments tailored to your recovery needs</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { title: 'Sports Recovery', desc: 'Specialized treatment for sports injuries and post-injury recovery.', icon: '⚡' },
            { title: 'Manual Therapy', desc: 'Hands-on joint and muscle treatment for pain relief.', icon: '🤲' },
            { title: 'Electrotherapy', desc: 'Pain relief and muscle stimulation using electrical currents.', icon: '💡' },
            { title: 'Pediatric Physio', desc: 'Gentle physiotherapy tailored for children and adolescents.', icon: '🌱' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'white', padding: '1.5rem', borderRadius: '16px',
              width: '220px', boxShadow: '0 4px 16px rgba(45,106,45,0.1)',
              border: '1px solid rgba(45,106,45,0.1)'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{s.icon}</div>
              <h3 style={{ color: '#2d6a2d', margin: '0 0 0.5rem' }}>{s.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <button onClick={() => navigate('/services')} style={{
          marginTop: '2rem', padding: '0.75rem 2rem', background: '#2d6a2d',
          color: 'white', border: 'none', borderRadius: '999px', cursor: 'pointer',
          fontSize: '1rem', fontWeight: '700'
        }}>View All Services</button>
      </div>

      {/* Meet the Team Section */}
      <div className="hex-bg" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#2d6a2d', marginBottom: '0.5rem', fontSize: '2rem' }}>Meet the Team</h2>
        <p style={{ color: '#888', marginBottom: '2rem' }}>Qualified specialists dedicated to your recovery</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { name: 'Ion Popescu', specialty: 'Sports Recovery', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200' },
            { name: 'Maria Ionescu', specialty: 'Neurological Rehab', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200' },
            { name: 'Alexandru Dumitrescu', specialty: 'Pediatric Physio', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200' },
          ].map((t, i) => (
            <div key={i} style={{
              background: 'white', padding: '1.5rem', borderRadius: '16px',
              width: '200px', boxShadow: '0 4px 16px rgba(45,106,45,0.1)',
              border: '1px solid rgba(45,106,45,0.1)'
            }}>
              <img src={t.img} alt={t.name} style={{
                width: '100px', height: '100px', borderRadius: '50%',
                objectFit: 'cover', marginBottom: '1rem',
                border: '3px solid #2d6a2d'
              }} />
              <h3 style={{ color: '#2d6a2d', margin: '0 0 0.25rem' }}>{t.name}</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{t.specialty}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        padding: '4rem 2rem', textAlign: 'center',
        background: '#2d6a2d', color: 'white'
      }}>
        <h2 style={{ margin: '0 0 1rem', fontSize: '2rem' }}>Ready to start your recovery?</h2>
        <p style={{ margin: '0 0 1.5rem', color: '#a8d5a8', fontSize: '1.05rem' }}>
          Book an appointment today and take the first step.
        </p>
        {token ? (
          <button onClick={() => navigate('/appointments/book')} style={{
            padding: '0.85rem 2.5rem', background: 'white', color: '#2d6a2d',
            border: 'none', borderRadius: '999px', cursor: 'pointer',
            fontSize: '1rem', fontWeight: '700'
          }}>Book Now →</button>
        ) : (
          <button onClick={() => navigate('/register')} style={{
            padding: '0.85rem 2.5rem', background: 'white', color: '#2d6a2d',
            border: 'none', borderRadius: '999px', cursor: 'pointer',
            fontSize: '1rem', fontWeight: '700'
          }}>Get Started →</button>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        background: '#0f2a0f', color: '#888', textAlign: 'center',
        padding: '2rem'
      }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>© 2026 AFYMO — All rights reserved</p>
      </footer>
    </div>
  )
}

export default Home