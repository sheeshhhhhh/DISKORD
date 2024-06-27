import userIcons from '@/assets/UserIcons.svg'
import { useEffect } from 'react'
import MyAccountDisplay from '@/assets/SettingsDisplay.svg'

const MyAccount = () => {
    // all the logic will later be applied

    useEffect(() => {
        const getMyAccountinfo = () => {

        }
    }, [])

    return (
            <div className='w-[740px] py-[60px] px-10 min-h-[1180px]'>
                <h2 className='mb-5 text-xl font-bold text-white'>
                    My Account
                </h2>

                <div className='w-[660px] h-[473px] bg-highdarkgray rounded-xl relative'>
                    <div className={`h-[100px] bg-slate-200 rounded-t-lg`} aria-label='banner-color'></div>
                    <div className='h-[76px] pt-4 pr-4 pl-[120px]'>
                        <div className='absolute top-[75px] left-[15px] size-[95px] p-2 bg-highdarkgray rounded-full'>
                            <div 
                            aria-label='user background' 
                            className='bg-red-600 w-full h-full rounded-full flex items-center justify-center'>
                                <img src={userIcons}  />
                            </div>
                        </div>
                        <div className='flex items-start justify-between'>
                            <h2 className='text-white font-semibold text-lg'>name</h2>
                            <button className='py-[2px] px-4 w-[131px] h-[32px] text-sm text-white font-normal rounded-sm bg-indigo-500'>
                                Edit User Profile
                            </button>
                        </div>
                    </div>
                    <div className='p-4 bg-darkgray h-[270px] m-4 mt-2 rounded-lg'>
                        <div>
                            <div className='flex justify-between mb-6'>
                                <div>
                                    <h2 className='text-slate-400 font-bold text-xs uppercase font-sans'>Display Name</h2>
                                    <p className='text-white'>renn</p>
                                </div>
                                <button className='my-1 py-[2px] px-4 bg-hovercolor text-slate-200 rounded-sm'>
                                    Edit
                                </button>
                            </div>
                            <div className='flex justify-between mb-6'>
                                <div>
                                    <h2 className='text-slate-400 font-bold text-xs uppercase font-sans'>Username</h2>
                                    <p className='text-white'>renn0284</p>
                                </div>
                                <button className='my-1 py-[2px] px-4 bg-hovercolor text-slate-200 rounded-sm'>
                                    Edit
                                </button>
                            </div>
                            <div className='flex justify-between mt-6'>
                                <div>
                                    <h2 className='text-slate-400 font-bold text-xs uppercase font-sans'>Email</h2>
                                    <p className='text-white'>renatodsantosjr9@gmail.com</p>
                                </div>
                                <button className='my-1 py-[2px] px-4 bg-hovercolor text-slate-200 rounded-sm'>
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-10 relative'>
                    <div className='h-[44px]'>
                        <h2 className='text-xl text-white font-medium font-sans mb-5'>Password and Authentication</h2>
                    </div>
                    <div>
                        <button

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
                </div>
            </div>
    )
}

export default MyAccount