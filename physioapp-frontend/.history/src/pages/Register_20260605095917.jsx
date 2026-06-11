import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        firstName, lastName, email, password
      })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', response.data.role)
      localStorage.setItem('email', response.data.email)
      navigate('/')
    } catch (err) {
      setError('Registration failed. Email may already be in use.')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#2d6a2d',
      backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.03) 20px, rgba(255,255,255,0.03) 21px)'
    }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.2rem 4rem', background: 'rgba(0,0,0,0.15)'
      }}>
        <h2 style={{ margin: 0, cursor: 'pointer', color: 'white', fontSize: '1.5rem', fontWeight: '800' }}
          onClick={() => navigate('/')}>AFYMO</h2>
        <button onClick={() => navigate('/login')} style={{
          padding: '0.5rem 1.25rem', background: 'transparent', color: 'white',
          border: '1.5px solid white', borderRadius: '999px', cursor: 'pointer', fontWeight: '600'
        }}>Login</button>
      </nav>

      {/* Form */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: 'calc(100vh - 80px)', padding: '2rem'
      }}>
        <div style={{
          background: 'white', borderRadius: '20px', padding: '2.5rem',
          width: '100%', maxWidth: '420px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
        }}>
          <h2 style={{ color: '#1a3a1a', margin: '0 0 0.5rem', fontSize: '1.8rem', fontWeight: '800' }}>
            Create Account
          </h2>
          <p style={{ color: '#888', margin: '0 0 1.5rem', fontSize: '0.9rem' }}>
            Join AFYMO and start your recovery journey
          </p>

          {error && (
            <div style={{
              background: '#fee2e2', color: '#991b1b', padding: '0.75rem 1rem',
              borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem'
            }}>{error}</div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ color: '#444', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>
                  First Name
                </label>
                <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                  placeholder="Ion"
                  style={{
                    width: '100%', padding: '0.65rem 1rem', borderRadius: '8px',
                    border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem',
                    boxSizing: 'border-box', outline: 'none'
                  }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ color: '#444', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>
                  Last Name
                </label>
                <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                  placeholder="Popescu"
                  style={{
                    width: '100%', padding: '0.65rem 1rem', borderRadius: '8px',
                    border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem',
                    boxSizing: 'border-box', outline: 'none'
                  }} />
              </div>
            </div>

            <div>
              <label style={{ color: '#444', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>
                Email
              </label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="ion@email.com"
                style={{
                  width: '100%', padding: '0.65rem 1rem', borderRadius: '8px',
                  border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem',
                  boxSizing: 'border-box', outline: 'none'
                }} />
            </div>

            <div>
              <label style={{ color: '#444', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '0.4rem' }}>
                Password
              </label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '0.65rem 1rem', borderRadius: '8px',
                  border: '1.5px solid #e2e8f0', fontFamily: 'inherit', fontSize: '0.9rem',
                  boxSizing: 'border-box', outline: 'none'
                }} />
            </div>

            <button type="submit" style={{
              width: '100%', padding: '0.85rem', background: '#2d6a2d', color: 'white',
              border: 'none', borderRadius: '999px', cursor: 'pointer',
              fontWeight: '700', fontSize: '1rem', fontFamily: 'inherit', marginTop: '0.5rem'
            }}>Create Account →</button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#888', fontSize: '0.9rem' }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={{
              color: '#2d6a2d', fontWeight: '600', cursor: 'pointer'
            }}>Login</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register