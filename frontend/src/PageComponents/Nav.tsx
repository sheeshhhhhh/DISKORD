import React from 'react'
import { Link } from 'react-router-dom'
import NavLinks from './NavLinks'
import Logo from './Logo'
import { User, userAuthContext } from '@/Context/AuthContext'


const Nav = () => {
    const { user } = userAuthContext()
    // make sure the get the user and check if already logged in if loggedin then don't show login instead open chat

  return (
    <div className='h-[80px] mx-[300px] grid items-center bg-transparent'>
        <div className='flex justify-between items-center'>
            <div>
                <Logo />
            </div>
            <div>
                <NavLinks />
            </div>
            <div>
                {user ? 
                <Link className='text-md font-bold text-gray-800 bg-white py-[9px] px-[35px] rounded-full hover:text-indigo-500'
                to={`/channels/${user?.id}`}>
                    Go Chat?
                </Link>
                :
                <Link className='text-md font-bold text-gray-800 bg-white py-[9px] px-[35px] rounded-full hover:text-indigo-500'
                to={'/login'}>
                    Login
                </Link>}
                
            </div>
        </div>
    </div>
  )
}

export default Nav