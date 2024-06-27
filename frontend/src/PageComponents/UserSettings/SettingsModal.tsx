import React, { Dispatch, SetStateAction, useState } from 'react'
import SettingSidebar from './SettingSidebar'
import MyAccount from './MyAccount'
import Profile from './Profile'

const SettingsModal = ({ 
    open, 
    setOpen
}: {
    // this is the types
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const [category, setCategory] = useState<string>('My Account')

    if(!open) return null

    return (
        <div className='w-full h-full fixed bg-lightgray flex z-30
        justify-center items-center top-0 left-0'>
            <div className='w-full h-full bg-lightgray flex'>
                <div className='flex justify-end w-[669px] bg-darkgray'>
                    <div className='h-full py-[60px] pl-[6px] pr-[20px]'>
                        <SettingSidebar category={category} setCategory={setCategory} />
                    </div>
                </div>
                <div className='flex justify-start w-[1251px] h-full overflow-y-auto custom-scrollbar'>
                    {category === 'My Account' && <MyAccount />}
                    {category === 'Profile'    && <Profile />  }
                    <div>
                        <button onClick={() => setOpen(false)}
                        className='fixed mt-[30px] size-[50px] border-2 border-slate-400 rounded-full'>
                            <span className='text-white text-lg font-bold'>Esc</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ) 
}

export default SettingsModal