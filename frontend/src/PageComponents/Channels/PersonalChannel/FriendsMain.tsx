import React from 'react'
import FriendsMain_logo from '@/assets/PersonalChannel/FriendsMain_Logo.svg'

const FriendsMain = () => {

    // this should be dynamic and base on what is on the category

  return (
    <div>
        <img src={FriendsMain_logo} className='mb-10'/>
        <p className='text-slate-300 text-center mt-2'>No one's around to play with Wumpus.</p>
    </div>
  )
}

export default FriendsMain
