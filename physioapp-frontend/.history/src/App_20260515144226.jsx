import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register feom './pages/Register'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App