import React from 'react'
import { serverinfo } from '../ChannelsChat'

type CantFindChannelType = {
  serverIcons: string | null | undefined,
  title: string | undefined
}

const CantFindChannel: React.FC<CantFindChannelType> = ({ title, serverIcons }) => {
  return (
    <div className='h-full flex flex-col justify-center items-center flex-1 bg-darkgray'>
      <div className='flex flex-col gap-2 text-center'>
        <h2 className='text-slate-300 font-semibold text-2xl'>
            You're in The
          <span className='text-white font-bold'> { title } </span>
            Server 
        </h2>
        <p className='text-slate-200 text-lg'>Please select the channels that you want to go into</p>
      </div>
    </div>
  )
}

export default CantFindChannel