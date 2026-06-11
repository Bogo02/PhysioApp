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
          <span onClick={() => navigate('/services')} style={{
            cursor: 'pointer', color: 'rgba(255,255,255,0.85)', fontWeight: '500', fontSize: '0.95rem'
          }}>Services</span>
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