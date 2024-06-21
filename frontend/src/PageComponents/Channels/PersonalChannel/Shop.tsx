import React from 'react'
import { Shop_logo } from '../PersonalChat'
import Headers from './Headers'

const Shop = () => {
  return (
    <div className='h-screen w-full flex flex-col bg-darkgray '>
        <Headers text='Shop'>
            <Shop_logo />
        </Headers>
        <div className='flex-1'>
            <h2>Hello</h2>
        </div>
    </div>
  )
}

export default Shop