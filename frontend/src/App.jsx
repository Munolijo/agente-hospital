import { Navigate, Outlet, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  const token = localStorage.getItem('access_token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  function handleLogout() {
    localStorage.removeItem('access_token')
    navigate('/login', { replace: true })
  }

  return (
    <div style={{ padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2>Agente del hospital</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>
      <Outlet />
    </div>
  )
}

export default App