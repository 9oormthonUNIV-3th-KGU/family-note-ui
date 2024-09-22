import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import Home from './pages/home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Search from './pages/search.tsx'
import Select from './pages/Select.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { useAuthContext } from './hooks/useAuthContext.ts'

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated } = useAuthContext()

  return isAuthenticated ? element : <Login />
}

const router = createBrowserRouter([
  { path: '/', element: <ProtectedRoute element={<Select />} /> },
  { path: '/home', element: <ProtectedRoute element={<Home />} /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <ProtectedRoute element={<Register />} /> },
  { path: '/search', element: <ProtectedRoute element={<Search />} /> },
  { path: '/select', element: <ProtectedRoute element={<Select />} /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
)
