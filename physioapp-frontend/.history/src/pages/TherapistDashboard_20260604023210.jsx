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
}