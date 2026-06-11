import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [role, setRole] = useState("USER"); 
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()
        try{
            const response = await axios.post('http://localhost:8080/api/auth/register',{
                firstName,
                lastName,
                email,
                password,
                role
            })
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('role',response.data.role)
        navigate('/')
        } catch (err) {
            setError('Registration failed. Email may already be in use.')
        }
    }
    
    return (
        <div style={{ padding: '1rem 2rem', background: '#2d6a2d' }}>
        <h2 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>AFYMO</h2>
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
            <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
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
            <button type="submit" style={{width:'100%', padding: '0.75rem', background: '#2d6a2d',color:'white',border: 'none', borderRadius: '4px',cursor: 'pointer'}}>
                Register
            </button>   
            </form>
            <p style={{marginTop: '1rem',textAlign:'center'}}>
            Already have an account? <a href="/login">Login</a>
            </p>
            </div>  
            </div>
    )
}

export default Register