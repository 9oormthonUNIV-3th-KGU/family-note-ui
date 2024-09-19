import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import Home from './pages/home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Search from './pages/search.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'

const router = createBrowserRouter([
  { path: '/home', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/search', element: <Search /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
)
