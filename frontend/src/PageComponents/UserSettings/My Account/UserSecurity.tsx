import React, { useState } from 'react'
import MyAccountDisplay from '@/assets/SettingsDisplay.svg'
import { userAuthContext } from '@/Context/AuthContext'
import ChangePasswordModal from './ChangePasswordModal'


const UserSecurity = () => {
    const [changePasswordModal, setChangePasswordModal] = useState<boolean>(false)

    const { user } = userAuthContext()

    return (
        <div className='mt-10 relative'>
            <div className='h-[44px]'>
                <h2 className='text-xl text-white font-medium font-sans mb-5'>Password and Authentication</h2>
            </div>
            <div>
                <button
                onClick={() => setChangePasswordModal(true)}
                className='py-[2px] px-4 mb-7 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium
                rounded-sm h-[32px] max-w-[160px]'>
                    Changed Password
                </button>
            </div>
            <div className='flex'>
                <div className='w-[486px] mr-5'>
                    <h2 className='text-slate-400 font-bold text-xs uppercase font-sans mb-2'>
                        Authenticator app
                    </h2>
                    <p className='text-slate-400 text-sm mb-5 font-sans'>
                        Protect your Discord Account with an extra layer of security. Once configured, you'll
                        be required to enter your password and complete one additional step in order to sign in
                    </p>
                    <button 
                    
                    className='py-[2px] px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium
                    rounded-sm h-[32px]'>
                        Enable Authenticator App
                    </button>
                    <div className='mt-8'>
                        <h2 className='text-slate-400 font-bold text-xs uppercase font-sans mb-2'>
                            Security keys
                        </h2>
                        <p className='text-slate-400 text-sm mb-2'>
                            Add an additional layer of protection to your account with a Security Key
                        </p>
                        <button 
                    
                        className='py-[2px] px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium
                        rounded-sm h-[32px]'>
                            Register a Security Key
                        </button>
                    </div>
                </div>
                <div className='flex items-center'>
                    <img src={MyAccountDisplay} className='h-[60px]'/>
                </div>
            </div>
            <div className='mt-10'>
                <h2 className='text-slate-400 font-bold text-xs uppercase font-sans mb-2'>
                    Account removal
                </h2>
                <p className='text-slate-400 text-sm mb-4'>
                    Disabling your account means you can recover it at any time after taking this action
                </p>
                <div className='flex '>
                    <button className='bg-red-600 hover:bg-red-800 px-4 py-[2px] mr-4 rounded-sm'>
                        <p className='text-white'>Disable Account</p>
                    </button>
                    <button className='bg-transparent hover:bg-red-600 px-4 py-[2px] rounded-sm border-[1px] border-red-600'>
                        <p className='text-white'>Delete Account</p>
                    </button>
                </div>
            </div>
            {changePasswordModal &&
            <ChangePasswordModal setChangePasswordModal={setChangePasswordModal} />}
        </div>
    )
}

export default UserSecurity