import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

type changePasswordType = {
    password: string,
    newPassword: string,
    confirmNewPassword: string
}

const ChangePasswordModal = ({
    setChangePasswordModal
} : {
    setChangePasswordModal: Dispatch<SetStateAction<boolean>>
}) => {
    const [message, setMessage] = useState<string>('')
    const [input, setInput] = useState<changePasswordType>({
        password: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    useEffect(() => {
        if(!message) return
        setTimeout(() => {
            setMessage('')
        }, 2000)
        return
    }, [message])
    
    const handleChangePassword = async () => {
        // return string later for message state
        if(!input.password || !input.newPassword || !input.confirmNewPassword) return setMessage("Please fill in all the fields")
        if(input.newPassword !== input.confirmNewPassword) return setMessage("new password and confirm password is not the same")
        try {
            const res: Response = await fetch("http://localhost:5000/api/user/changePassword", {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(input),
                credentials: 'include'
            })

            const data = await res.json()

            if(data.error) throw new Error(data.error) 
            
            setChangePasswordModal(false)
        } catch (error: any) {
            setMessage(error.message)
            console.log(error)
        }
    }

  return (
    <div role='dialog' aria-modal={true} 
    className='fixed flex w-full h-full inset-0 justify-center items-center z-50'>
        <div className='w-full h-full bg-black opacity-50 absolute'></div>
        {/* make sure to have different modal background so that it won't affact the main container */}
        <div className='bg-lightgray w-[440px] flex flex-col rounded-lg z-[60] opacity-100'>
            <div className='px-4 py-6 flex flex-col items-center relative'>
                <h2 className='text-2xl text-white font-bold font-sans'>Update your password</h2>
                <p className='text-slate-400 font-sans mt-2'>Enter your current password and new password</p>
                <button
                onClick={() => setChangePasswordModal(false)}
                className='absolute right-5'>
                    <RxCross2 size={25} />
                </button>
            </div>
            <div className='px-4 pb-4'>
                <div>
                    <h2 className='text-slate-400 font-bold text-xs uppercase font-sans mb-2'>Current Password</h2>
                    <div>
                        <input 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput({...input, password: e.target.value})}
                        value={input.password}
                        className='p-[10px] h-[40px] w-full rounded-sm bg-highdarkgray text-slate-400 
                        outline-none'
                        type="password" />
                    </div>
                </div>
                <div className='mt-4'>
                    <h2 className='text-slate-400 font-bold text-xs uppercase font-sans mb-2'>New Password</h2>
                    <div>
                        <input 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput({...input, newPassword: e.target.value})}
                        value={input.newPassword}
                        className='p-[10px] h-[40px] w-full rounded-sm bg-highdarkgray text-slate-400 
                        outline-none'
                        type="password" />
                    </div>
                </div>
                <div className='mt-4'>
                    <h2 className='text-slate-400 font-bold text-xs uppercase font-sans mb-2'>Confirm New Password</h2>
                    <div>
                        <input 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput({...input, confirmNewPassword: e.target.value})}
                        value={input.confirmNewPassword}
                        className='p-[10px] h-[40px] w-full rounded-sm bg-highdarkgray text-slate-400 
                        outline-none'
                        type="password" />
                    </div>
                </div>
                {message && <h2 className='text-white my-1'>{message}</h2>}
            </div>
            <div className='p-4 h-[70px] rounded-b-lg bg-darkgray flex justify-end'>
                <button
                onClick={() => setChangePasswordModal(false)}
                className='px-4 py-[2px] mr-2 h-full'>
                    <p className='text-white hover:underline font-medium text-sm font-sans'>Cancel</p>
                </button>

                <button
                onClick={() => handleChangePassword()}
                className='px-4 py-[2px] h-full bg-indigo-500 hover:bg-indigo-700 rounded-sm transition-[background]'>
                    <p className='text-white font-medium text-sm font-sans mx-[16.25px]'>Done</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default ChangePasswordModal