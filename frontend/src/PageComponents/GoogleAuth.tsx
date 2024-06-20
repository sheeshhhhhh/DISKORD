import { Button } from '@/components/ui/button'
import React from 'react'

const GoogleAuth = () => {

    const handleGoogleAuth = () => {
        window.location.assign('http://localhost:5000/api/auth/google')
    }

    return (
        <div className='flex justify-center'>
            <Button
            type='button'
            size={'lg'}
            onClick={() => handleGoogleAuth()}
            className='w-[250px] '
            >
                <img
                src='/googleicon.png'
                alt='google Icon'
                className='h-5 sm:h-8' 
                />
                <h1 className='font-semibold'>Google</h1>
            </Button>
        </div>
    )
}

export default GoogleAuth