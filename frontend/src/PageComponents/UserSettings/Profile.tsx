import React, { useState } from 'react'

const Profile = () => {
  const [type, setType] = useState<'UserProfile' | 'ServerProfile'>('UserProfile')
  
  return (
    <div className='py-[60px] pl-10 pr-[10px] w-[660px]'>
        <h2 className='mb-5 text-xl font-bold text-white'>
          Profile
        </h2>

        <div className='flex justify-start mt-6 mb-4 pt-[6px] cursor-default 
        border-b-[1px] border-slate-600'>
          <div className={`pb-4 mr-4 text-slate-400 font-medium 
           ${type === 'UserProfile' ? 'text-white' : 'hover:text-slate-300'}`}>
            User Profile
          </div>
          <div className={`pb-4 mx-4 text-slate-400 font-medium 
           ${type === 'ServerProfile' ? 'text-white' : 'hover:text-slate-300'}`}>
            Server Profiles
          </div>
        </div>
    </div>
  )
}

export default Profile