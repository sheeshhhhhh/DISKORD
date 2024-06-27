import React, { useState } from 'react'

const Profile = () => {
  const [type, setType] = useState<'UserProfile' | 'ServerProfile'>('UserProfile')
  const [color, setColor] = useState<any>()
  
  return (
    <div className='py-[60px] pl-10 pr-[10px] w-[660px]'>
        <h2 className='mb-5 text-xl font-bold text-white'>
          Profile
        </h2>

        <div className='flex justify-start mt-6 mb-4 pt-[6px] cursor-default 
        border-b-[1px] border-slate-600'>
          <div className={`pb-4 mr-4 text-slate-400 font-medium 
           ${type === 'UserProfile' ? 'text-white border-b-2 border-indigo-400' : 
           'hover:text-slate-300 hover:border-b-2 hover: border-indigo-500'}`}>
            User Profile
          </div>
          <div className={`pb-4 mx-4 text-slate-400 font-medium 
           ${type === 'ServerProfile' ? 'text-white border-b-2 border-indigo-400' : 
           'hover:text-slate-300 hover:border-b-2 hover: border-indigo-500'}`}>
            Server Profiles
          </div>
        </div>

        <div>
          <div className='flex gap-[35px]'>
            <div className='w-[355px]'>
              <div aria-label='display Name'
              className='pb-6 mb-6 border-b-[1px] border-slate-600'>
                <h3 className='font-bold text-slate-400 text-xs uppercase font-sans mb-2'>
                  Display Name
                </h3>
                <div>
                  <input className='p-[10px] h-[40px] w-full rounded-sm bg-highdarkgray text-slate-400 
                  outline-none' 
                  type="text"  />
                </div>
              </div>
              <div aria-label='Pronouns'
              className='pb-6 mb-6 border-b-[1px] border-slate-600'>
                <h3 className='font-bold text-slate-400 text-xs uppercase font-sans mb-2'>
                  Pronouns
                </h3>
                <div>
                  <input 
                  placeholder='Add your pronouns'
                  className='p-[10px] h-[40px] w-full rounded-sm bg-highdarkgray text-slate-400 
                  outline-none' 
                  type="text"  />
                </div>
              </div>
              <div aria-label='Avatar'
              className='pb-6 mb-6 border-b-[1px] border-slate-600'>
                <h3 className='font-bold text-slate-400 text-xs uppercase font-sans mb-2'>
                  Avatar
                </h3>
                <div>
                  <button
                  
                  className='y-[2px] px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium
                  rounded-sm h-[32px]'>
                      Change Avatar
                  </button>
                </div>
              </div>
              <div aria-label='Banner Color'
              className='pb-6 mb-6 border-b-[1px] border-slate-600'>
                <h3 className='font-bold text-slate-400 text-xs uppercase font-sans mb-2'>
                  Banner Color
                </h3>
                <div>
                  {/* put a color changer library here */}
                </div>
              </div>
              <div aria-label='About Me'
              className='pb-6 mb-6 border-b-[1px] border-slate-600'>
                <h3 className='font-bold text-slate-400 text-xs uppercase font-sans mb-2'>
                  About Me
                </h3>
              </div>
            </div>

            <div>

            </div>
          </div>
        </div>
    </div>
  )
}

export default Profile