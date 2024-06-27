import React, { memo, useState } from 'react'
import settingicons from '@/assets/Settings.svg'
import SettingsModal from './SettingsModal'

const SettingsButton = () => {
    const [open, setOpen] = useState<boolean>(false)

  return (
    <div className=''>
        <button onClick={() => setOpen(true)}
        className='size-[32px] '>
            <div className='size-[32px] flex justify-center items-center'>
                <img 
                src={settingicons} className='size-[20px]' />
            </div>
        </button>
        <SettingsModal setOpen={setOpen} open={open} />
    </div>
  )
}

export default memo(SettingsButton)