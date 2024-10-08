import { Dispatch, SetStateAction, useState } from 'react'
import MyAccount from './My Account/MyAccount'
import Profile from './Profile/Profile'
import SettingSidebar from './SettingSidebar'

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
        <div className='w-full h-full fixed bg-lightgray flex z-20
        justify-center items-center top-0 left-0'>
            <div className='w-full h-full bg-lightgray flex'>
                <div className='flex justify-end w-[669px] bg-darkgray'>
                    <div className='h-full py-[60px] pl-[6px] pr-[20px]'>
                        <SettingSidebar category={category} setCategory={setCategory} />
                    </div>
                </div>
                <div className='flex justify-start w-[1251px] h-full overflow-y-auto custom-scrollbar'>
                    {category === 'My Account' && <MyAccount setCategory={setCategory} />}
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