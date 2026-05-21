import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:8080/api/auth/register',{
                firstName,
                lastName,
                email,
                password
            })
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('role',response.data.role)
        navigate('/dashboard')
        } catch (err) {
            setError('Registration failed. Email may already be in use.')
        }
    }
    
    return (
        <div style = {{maxWidth: '400px',margin: '100px auto',padding:'2rem',border:'1px solid #ccc', borderRadius: '8px'}}>
            <h2>Register</h2>
            {error && <p style={{ color: 'red'}}>{error}</p>}
            <form onSubmit={handleRegister}>
            <div style={{marginBottom: '1rem'}}>
            <label>First Name</label>
            <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{display: 'block',width: '100%', padding: '0.5rem',marginTop: '0.25rem'}}
                />
            </div>
            <div style={{marginBottom: '1rem'}}>
                <label>Last Name</label>
            <input
                type = "text"
                value = {lastName}
                onChange ={(e) => setLastName(e.target.value)}
                style={{display :'block', width: '100%', padding:'0.5rem',marginTop: '0.25rem'}}
                />
            </div>
            <div style={{marginBottom: '1rem'}}>
                <label>Password</label>
                <input
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                style={{display:'block',width:'100%',padding: '0.5rem', marginTop: '0.25rem' }}
                />
            </div>
            <button type="submit" style={{width:'100%', padding: '0.75rem', background: '#1a3a6b',color:'white',border: 'none', borderRadius: '4px',cursor: 'pointer'}}>
                Register
            </button>   
            </form>
            <p style={{marginTop: '1rem',textAlign:'center'}}>
            Already have an account? <a href="/login">Login</a>
            </p>
            </div>  
    )
}

export default Register