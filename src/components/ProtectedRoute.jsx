import React, { Children } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const {session} = useAuth()
    console.log(session)
  if(session===undefined){
    return <div>Loading...</div>
  }
  return session? <> {children} </> : <Navigate to="/signin"/>
    
}

export default ProtectedRoute