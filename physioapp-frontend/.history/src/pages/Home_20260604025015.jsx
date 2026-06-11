import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
const [token, setToken] = useState(localStorage.getItem('token'))
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
        padding: '1rem 2rem', background: '#2d6a2d', color: 'white',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>AFYMO</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={() => navigate('/services')} style={{
            padding: '0.5rem 1.25rem', background: 'transparent', color: 'white',
            border: '1px solid white', borderRadius: '4px', cursor: 'pointer'
          }}>Services</button>
          {token ? (
            <>
              <button onClick={() => navigate('/dashboard')} style={{
                padding: '0.5rem 1.25rem', background: 'transparent', color: 'white',
                border: '1px solid white', borderRadius: '4px', cursor: 'pointer'
              }}>Dashboard</button>
              <button onClick={() => { localStorage.clear(); navigate('/') }} style={{
                padding: '0.5rem 1.25rem', background: 'white', color: '#2d6a2d',
                border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
              }}>Logout</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} style={{
                padding: '0.5rem 1.25rem', background: 'transparent', color: 'white',
                border: '1px solid white', borderRadius: '4px', cursor: 'pointer'
              }}>Login</button>
              <button onClick={() => navigate('/register')} style={{
                padding: '0.5rem 1.25rem', background: 'white', color: '#2d6a2d',
                border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
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
                borderRadius: '8px', textAlign: 'center', color: 'white'
              }}>
                <h1 style={{ margin: 0, fontSize: '2.2rem' }}>{slide.title}</h1>
                <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>{slide.subtitle}</p>
                {token ? (
                  <button onClick={() => navigate('/appointments/book')} style={{
                    marginTop: '1rem', padding: '0.75rem 2rem', background: '#2d6a2d',
                    color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
                    fontSize: '1rem', fontWeight: 'bold'
                  }}>Book an Appointment</button>
                ) : (
                  <button onClick={() => navigate('/register')} style={{
                    marginTop: '1rem', padding: '0.75rem 2rem', background: '#2d6a2d',
                    color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer',
                    fontSize: '1rem', fontWeight: 'bold'
                  }}>Get Started</button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Services Section */}
      <div style={{ padding: '3rem 2rem', textAlign: 'center', background: '#f8faff' }}>
        <h2 style={{ color: '#2d6a2d', marginBottom: '2rem' }}>Our Services</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { title: 'Sports Recovery', desc: 'Specialized treatment for sports injuries and post-injury recovery.' },
            { title: 'Manual Therapy', desc: 'Hands-on joint and muscle treatment for pain relief.' },
            { title: 'Electrotherapy', desc: 'Pain relief and muscle stimulation using electrical currents.' },
            { title: 'Pediatric Physio', desc: 'Gentle physiotherapy tailored for children and adolescents.' },
          ].map((s, i) => (
            <div key={i} style={{
              background: 'white', padding: '1.5rem', borderRadius: '8px',
              width: '220px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <h3 style={{ color: '#2d6a2d' }}>{s.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <button onClick={() => navigate('/services')} style={{
          marginTop: '2rem', padding: '0.75rem 2rem', background: '#2d6a2d',
          color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem'
        }}>View All Services</button>
      </div>

      {/* Meet the Team Section */}
      <div style={{ padding: '3rem 2rem', textAlign: 'center', background: 'white' }}>
        <h2 style={{ color: '#2d6a2d', marginBottom: '2rem' }}>Meet the Team</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {[
            { name: 'Ion Popescu', specialty: 'Sports Recovery', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200' },
            { name: 'Maria Ionescu', specialty: 'Neurological Rehab', img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200' },
            { name: 'Alexandru Dumitrescu', specialty: 'Pediatric Physio', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200' },
          ].map((t, i) => (
            <div key={i} style={{
              background: '#f8faff', padding: '1.5rem', borderRadius: '8px',
              width: '200px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
            }}>
              <img src={t.img} alt={t.name} style={{
                width: '100px', height: '100px', borderRadius: '50%',
                objectFit: 'cover', marginBottom: '1rem'
              }} />
              <h3 style={{ color: '#2d6a2d', margin: '0 0 0.25rem' }}>{t.name}</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>{t.specialty}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        padding: '3rem 2rem', textAlign: 'center',
        background: '#2d6a2d', color: 'white'
      }}>
        <h2 style={{ margin: '0 0 1rem' }}>Ready to start your recovery?</h2>
        <p style={{ margin: '0 0 1.5rem', color: '#cadcfc' }}>Book an appointment today and take the first step.</p>
        {token ? (
          <button onClick={() => navigate('/appointments/book')} style={{
            padding: '0.75rem 2rem', background: 'white', color: '#2d6a2d',
            border: 'none', borderRadius: '4px', cursor: 'pointer',
            fontSize: '1rem', fontWeight: 'bold'
          }}>Book Now</button>
        ) : (
          <button onClick={() => navigate('/register')} style={{
            padding: '0.75rem 2rem', background: 'white', color: '#2d6a2d',
            border: 'none', borderRadius: '4px', cursor: 'pointer',
            fontSize: '1rem', fontWeight: 'bold'
          }}>Get Started</button>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        background: '#0f2040', color: 'white', textAlign: 'center',
        padding: '1.5rem', marginTop: '0'
      }}>
        <p style={{ margin: 0 }}>© 2026 AFYMO — All rights reserved</p>
      </footer>
    </div>
  )
}

export default Home