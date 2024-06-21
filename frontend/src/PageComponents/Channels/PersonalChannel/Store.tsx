import React from 'react'
import Headers from './Headers'
import { Nitro_logo } from '../PersonalChat'

const Store = () => {
  return (
    <div className='h-screen w-full flex flex-col bg-darkgray'>
        <Headers text='Nitro'>
            <Nitro_logo />
        </Headers>
        <div className='flex-1'>
            <h2>Hello</h2>
        </div>
    </div>
  )
}

export default Store