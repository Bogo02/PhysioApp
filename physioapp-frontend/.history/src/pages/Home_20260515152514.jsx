import {Swiper, SwiperSlide} from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import {useNavigate} from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

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
    return(
        <div>
            {/*Navbar*/}
        <nav style={{
            display:'flex',justifyContent:'space-between', alignItems: center,
            padding: '1rem 2 rem', background: '#1a3a6b',color: 'white', position: 'sticky',top:0,zIndex:100
        }}>
        <h2 style={{margin:0}}>AFYMO</h2>
        <div style={{display: 'flex', gap:'1rem'}}>
         <button onClick={() =>navigate('/login')} style={{
            padding: '0.5rem 1.25rem', background: 'trnsparent', color:'white',
            border: '1px solid white', borderRadius: '4px', cursor: 'pointer'
         }}>Login</button>
         <button onClick={() =>navigate('/register')} style={{
            padding: '0.5rem 1.25rem',background:'white',color: '#1a3a6b',
            border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'
         }}>Register</button>
        </div>
        </nav>

    {/*Carousel*/}
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{ delay:4000}}
      pagination={{clickable:true}}
      navigation
      loop
      style={{height: '550px'}}>
    
    {slides.map((slides,i) =>(
        <SwiperSlide key={i}>
            <div style={{
                height: '550px',
                backgroundImage:'url(${slide.image})',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display:'flex',
                alignItems:'center',
                justifyContent: 'center',
            }}>
            <div style={{
                background: 'rgba(0,0,0,0.5)', padding: '2rem 3rem',
                borderRadius: '8px',textAlign: 'center', color: 'white'
            }}>
                <h1 style= {{margin: 0, fontSize: '2.2rem'}}>{slides.title}</h1>
                <p style ={{fontSize: '1.2rem', marginTop: '0.5rem'}}>{slides.subtitle}</p>
                <button onClick={() => navigate('/register')} style={{
                    marginTop: '1rem', padding: '0.75rem 2rem', backgroiund: '#1a3a6b',
                    color: 'white', border: 'none', borderRadius:'4px', cursor: 'pointer',
                    fontSize:'1rem', fontWeight: 'bold'
                }}>Book an Appointment</button>
            </div>
        </div>
        </SwiperSlide>
    ))}
    </Swiper>

    {/*Services Section*/}
    <div style= {{padding: '3rem 2rem',textAlign:'center', background: '#f8faff'}}>
       <h2 style={{color: '#1a3a6b', marginBottom: '2rem'}}>Our Services</h2>
       <div style={{display: 'flex',justifyContent: 'center',gap: '2rem', flexwrap: 'wrap'}}>
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
                <h3 style={{ color: '#1a3a6b'}}>{s.title}</h3>
                <p style={{ color: '#64748b',fontSize: '0.9rem'}}>{s.desc}</p>
       </div>
          ))}
    </div>
    </div>

    {/*Footer*/}
    <footer style={{
        background: '#1a3a6b', color: 'white', textAlign: 'center',
        padding: '1.5rem', marginTop: '2rem'
    }}>
    <p style= {{margin:0}}>© 2026 AFYMO — All rights reserved</p>
    </footer>
    </div>
)
}

export default Home