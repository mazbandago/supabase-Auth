import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const{signOut, session} = useAuth()
  const [error, setError] = useState(null)

  async function handleLogOut(e){
    e.preventDefault()
      const {error, success} = await signOut()
      if(success){
        navigate("/signin")
      } else {
      setError(error.message)
    }
  }

  return (
    <header className='bg-green-900 p-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-amber-500 font-mono font-semibold'><span className='font-bold text-black'>Sign in as:</span>{session?.user?.email}</h1>
        {error && <h2 className='text-xl text-red-500 font-medium '>{error}</h2>}
        <button onClick={handleLogOut} className='border px-2 rounded bg-white font-bold hover:bg-green-300'>Log Out</button>
      </div>
       <div className='flex items-center justify-center'>
          <svg
          width="28" 
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginRight: '8px' }}
          >
          <path d="M12 2v8M12 14v8M4.93 4.93l5.66 5.66M13.41 13.41l5.66 5.66M2 12h8M14 12h8M4.93 19.07l5.66-5.66M13.41 10.59l5.66-5.66" 
          stroke="#29d952" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
            <h1 className='text-white font-bold text-3xl'>
              Sales Team Dashboard
            </h1>
       </div>
    </header>
  )
}

export default Header