import React from 'react'
import { messageType } from './Messages'
import formatTime from '@/util/formatTime'

import UserIcons from '@/assets/UserIcons.svg'

const Message: React.FC<{message: messageType}> = ({message}) => {

  const formattedtime = formatTime(message.timestamp)
  const subtituteicons = UserIcons // this is just a subtitute because i forgot icons on user
  // but it can also be used when user does not have icons

  return (
    <div className='w-full mt-[17px] py-[2px] pr-12 pl-[72px] relative z-10'>
      <div className='absolute left-3 z-10'>
        <img src={subtituteicons} className='size-12 bg-highdarkgray p-2 rounded-full' />
      </div>
      <div className='flex flex-col gap-1 '>
        <div className='flex items-center'>
          <h3 className='font-semibold text-slate-400 hover:underline  cursor-pointer text-sm'>{message.name}</h3>
          <span className='ml-1 text-xs text-slate-400'>{formattedtime}</span>
        </div>
        <div>
          <span className='text-slate-200'>{message.content}</span>
        </div>
      </div>
    </div>
  )
}

export default Message