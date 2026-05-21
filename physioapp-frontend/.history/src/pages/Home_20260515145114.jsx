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
}