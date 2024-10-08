import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'

const UsernameModal = ({
    setUsernameModal, 
    handleUsernameEdit
} : {
    setUsernameModal: Dispatch<SetStateAction<boolean>>,
    handleUsernameEdit: (username: string, password: string) => Promise<string>
}) => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    useEffect(() => {
        // created so that the message will disappear after 2 seconds
        if(!message) return

        setTimeout(() => {
            setMessage('')
        }, 2000)

        return
    }, [message])

    const handleDone = async () => {
        const message = await handleUsernameEdit(username, password)
        if (message === "Successfully updated username") {
            return setUsernameModal(false)
        }
        setMessage(message)
    }

  return (
    <div role='dialog' aria-modal={true}
    className='fixed flex w-full h-full  inset-0 justify-center items-center z-50'>
        <div className='w-full h-full bg-black opacity-50 absolute'></div>
        {/* make sure to have different modal so the it won't affect the main container which is below */}
        <div className='bg-lightgray w-[440px] flex flex-col rounded-lg z-[60] opacity-100'>
            <div className=' px-4 py-6 flex flex-col items-center relative'>
                <h2 className='text-2xl text-white font-bold font-sans'>Change your username</h2>
                <div>
                    <p className='text-slate-400 font-sans mt-2'>Enter a new Username and your existing password</p>
                </div>
                <button 
                onClick={() => setUsernameModal(false)}
                className='absolute right-5'>
                    <RxCross2 size={25}/>
                </button>
            </div>    
            <div className='pb-4 px-4'>
                <h2 className='text-slate-400 font-bold text-xs uppercase font-sans mb-2'>Username</h2>
                <div>
                  <input 
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  value={username}
                  placeholder='New username'
                  className='p-[10px] h-[40px] w-full rounded-sm bg-highdarkgray text-slate-400 
                  outline-none' 
                  type="text"  />
                </div>
                <div className='mt-4'>
                    <h2 className='text-slate-400 font-bold text-xs uppercase font-sans mb-2'>Current Password</h2>
                    <div>
                    <input 
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    value={password}
                    className='p-[10px] h-[40px] w-full rounded-sm bg-highdarkgray text-slate-400 
                    outline-none' 
                    type="password"  />
                    </div>
                </div>
                {message && <h2 className='text-white mt-1'>{message}</h2>}
            </div>
            <div className='p-4 h-[70px] rounded-b-lg bg-darkgray flex justify-end'>

                <button
                onClick={() => setUsernameModal(false)}
                className='px-4 py-[2px] mr-2 h-full'>
                    <p className='text-white hover:underline font-medium text-sm font-sans'>Cancel</p>
                </button>

                <button
                onClick={() => handleDone()}
                className='px-4 py-[2px] h-full bg-indigo-500 hover:bg-indigo-700 rounded-sm transition-[background]'>
                    <p className='text-white font-medium text-sm font-sans mx-[16.25px]'>Done</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default UsernameModal