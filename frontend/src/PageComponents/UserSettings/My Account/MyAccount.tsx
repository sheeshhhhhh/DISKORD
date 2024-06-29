
import { Dispatch, SetStateAction, useEffect } from 'react'
import AccountProfile from './AccountProfile'
import UserSecurity from './UserSecurity'

const MyAccount = ({ setCategory}: { setCategory: Dispatch<SetStateAction<string>> }) => {
    // all the logic will later be applied

    return (
            <div className='w-[740px] py-[60px] px-10 min-h-[1180px]'>
                <h2 className='mb-5 text-xl font-bold text-white'>
                    My Account
                </h2>
                <AccountProfile setCategory={setCategory} />
                <UserSecurity />
            </div>
    )
}

export default MyAccount