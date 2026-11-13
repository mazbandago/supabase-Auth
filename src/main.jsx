import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './myRouter'
import { RouterProvider } from 'react-router-dom'
import AuthcontextProvider from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthcontextProvider>
      <RouterProvider router={router} />
    </AuthcontextProvider>
  </StrictMode>,
)
