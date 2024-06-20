import { useState } from 'react'
import './App.css'
import { Input } from '@/components/ui/input'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { authType, userAuthContext } from './Context/AuthContext'
import Home from './Pages/Home'
import { SocketProvider } from './Context/SocketContext'
import { handlegoogleauth } from './util/handlegoogleauth'
import Channels from './Pages/Channels'

function App() {
  const { loading, user } = userAuthContext()

  if(loading) return null

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
        <Route path='/setting'/>
        <Route path='/channels/:channelid' element={user ? <Channels /> : <Navigate to='/login' />}></Route>
      </Routes>
    </div>
  )
}

export default App
