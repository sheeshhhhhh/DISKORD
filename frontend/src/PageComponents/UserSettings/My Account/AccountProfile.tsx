import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import userIcons from '@/assets/UserIcons.svg'
import { userAuthContext } from '@/Context/AuthContext'
import { profile } from 'console'
import UsernameModal from './UsernameModal'
import EmailModal from './EmailModal'

type profileInfoType = {
    user_id: number,
    userIcons: string,
    bannerColor: string,
    name: string,
    username: string,
    email: string,
}

const AccountProfile = ({ setCategory } : { setCategory: Dispatch<SetStateAction<string>> }) => {
    const { user } = userAuthContext()
    const [usernameModal, setUsernameModal] = useState<boolean>(false)
    const [emailModal, setEmailModal] = useState<boolean>(false)
    const [ profileInfo, setProfileInfo ] = useState<profileInfoType>({
        user_id: user?.id,
        userIcons: '',
        bannerColor: '',
        name: '',
        username: '',
        email: '',
    })

    // getting the profileInfo to get the most updated information 
    useEffect(() => {
        const handleGetProfileInfo = async () => {
            try {
                const res: Response = await fetch('http://localhost:5000/api/user/getAccountProfile', {
                    method: 'GET',
                    credentials: 'include'
                })

                const data = await res.json()

                if(data.error) throw new Error(data.error)

                setProfileInfo(data)
            } catch (error) {
                console.log(error)
            }
        }
        handleGetProfileInfo()
    }, [])


    const handleUsernameEdit = async (username: string, password: string): Promise<string> => {
        if(!username || !password) return "Please fill in the fields"
        try {
            const res: Response = await fetch("http://localhost:5000/api/user/changeUsername", {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                credentials: 'include'
            })

            const data = await res.json()

            if(data.error) throw new Error(data.error)

            setProfileInfo({
                ...profileInfo,
                username: data
            })

            return "Successfully updated username"
        } catch (error: any) {
            console.log(error)
            return error.message
        }
    }

    // add later : 
    const handleEmailEdit = async (email: string, password: string): Promise<string> => {
        if(!email || !password) return "Please fill in the fields"
        try {
            const res: Response = await fetch("", {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                credentials: 'include'
            })

            const data = await res.json()

            if(data.error) throw new Error(data.error)

            return "Successfully updated email"
        } catch (error: any) {
            console.log(error)
            return error.message
        }
    }


    return (
        <div className='w-[660px] h-[473px] bg-highdarkgray rounded-xl relative z-10'>
            <div className={`h-[100px] bg-slate-200 rounded-t-lg`} aria-label='banner-color'></div>
            <div className='h-[76px] pt-4 pr-4 pl-[120px]'>
                <div className='absolute top-[75px] left-[15px] size-[95px] p-2 bg-highdarkgray rounded-full'>
                    <div 
                    aria-label='user background' 
                    className='bg-red-600 w-full h-full rounded-full flex items-center justify-center'>
                        <img src={profileInfo.userIcons ? profileInfo.userIcons : userIcons}  />
                    </div>
                </div>
                <div className='flex items-start justify-between'>
                    <h2 className='text-white font-semibold text-lg'>{profileInfo.name}</h2>
                    <button 
                    onClick={() => setCategory('Profile')}
                    className='py-[2px] px-4 w-[131px] h-[32px] text-sm text-white font-normal rounded-sm bg-indigo-500'>
                        Edit User Profile
                    </button>
                </div>
            </div>
            <div className='p-4 bg-darkgray h-[270px] m-4 mt-2 rounded-lg z-10'>
                <div>
                    <div className='flex justify-between mb-6'>
                        <div>
                            <h2 className='text-slate-400 font-bold text-xs uppercase font-sans mb-1'>Display Name</h2>
                            <p className='text-white'>{profileInfo.name}</p>
                        </div>
                        <button 
                        onClick={() => setCategory('Profile')} 
                        className='my-1 py-[2px] px-4 bg-hovercolor text-slate-200 rounded-sm'>
                            Edit
                        </button>
                    </div>
                    <div className='flex justify-between mb-6'>
                        <div>
                            <h2 className='text-slate-400 font-bold text-xs uppercase font-sans mb-1'>Username</h2>
                            <p className='text-white'>{profileInfo.username}</p>
                        </div>
                        <button onClick={() => setUsernameModal(true)}
                        className='my-1 py-[2px] px-4 bg-hovercolor text-slate-200 rounded-sm'>
                            Edit
                        </button>
                        {
                        usernameModal && 
                        <UsernameModal 
                        setUsernameModal={setUsernameModal} 
                        handleUsernameEdit={handleUsernameEdit} />}
                    </div>
                    <div className='flex justify-between mt-6'>
                        <div>
                            <h2 className='text-slate-400 font-bold text-xs uppercase font-sans mb-1'>Email</h2>
                            <p className='text-white'>{profileInfo.email ? profileInfo.email : "No Email "}</p>
                        </div>
                        <button onClick={() => setEmailModal(true)}
                        className='my-1 py-[2px] px-4 bg-hovercolor text-slate-200 rounded-sm'>
                            Edit
                        </button>
                        {emailModal && 
                        <EmailModal
                        setEmailModal={setEmailModal}
                        handleEmailEdit={handleEmailEdit} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountProfile