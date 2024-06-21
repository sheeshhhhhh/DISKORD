import { User, userAuthContext } from '@/Context/AuthContext'
import React from 'react'
import { useParams } from 'react-router-dom'

// all the component is gonna be in serverChannels
const ChannelsChat = () => {
  const { id } = useParams()
  // do later
  return (
    <div className='flex flex-row h-screen w-full'>
      <div className='flex flex-col min-w-[240px] w-[240px] bg-gray-800'>
        
      </div>
    </div>
  )
}

export default ChannelsChat