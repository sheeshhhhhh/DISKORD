import React from 'react'
import { Link } from 'react-router-dom'

const NavLinks = () => {

    const navLinks = ["Download", "Nitro", "Discover", "Safety", "Blog"]

  return (
    <div className=' w-[600px]'>
        <div className='flex justify-between'>
            {
                navLinks?.map((link) => {
                    return (
                    <Link to={`/${link}`}>
                        <h2 className='text-white font-bold text-md hover:underline hover:underline-offset-2'>
                            {link}
                        </h2>
                    </Link>
                    )
                })
            }
        </div>
    </div>
  )
}

export default NavLinks