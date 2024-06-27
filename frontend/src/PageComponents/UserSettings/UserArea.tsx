import { userAuthContext } from '@/Context/AuthContext'
import React from 'react'

import userIcons from '@/assets/UserIcons.svg'
import deafenIcons from '@/assets/Deafen.svg'
import SettingsModal from './SettingsButton'
import SettingsButton from './SettingsButton'

const UserArea = () => {
    const { user, loading } = userAuthContext()


    if (loading || !user) return null

    return (
        <div className='px-2 pb-[1px] w-full h-[52px] flex justify-between items-center bg-lightgray'>
            <div className='flex mr-2 pl-[2px]'
            role='button' aria-expanded={false}>
                <div className='flex flex-col justify-center '>
                    <div className='size-[40px] rounded-full bg-superdark flex 
                     justify-center items-center'>
                        <img className='size-[30px]'
                        src={user.usericons ? user.usericons : userIcons} /> 
                    </div>
                </div>
                <div className='pl-2 py-1 mr-1 text-start'>
                    <h2 className='text-white text-xs'>{user?.name}</h2>
                    <p className='text-slate-300 text-xs'>Online</p>
                </div>
            </div>
            <div className='flex'>
                <button className='size-[32px] '>
                    <div className='size-[32px] flex justify-center items-center'>
                        <img 
                        src={deafenIcons} className='size-[20px]' />
                    </div>
                </button>
                <SettingsButton />
            </div>
        </div>
    )
}

export default UserArea