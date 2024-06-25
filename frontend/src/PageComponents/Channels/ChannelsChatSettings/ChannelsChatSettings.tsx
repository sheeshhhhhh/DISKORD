import React from 'react'
import LeaveServer from './LeaveServer'
import CopyLink from './CopyLink'

type ChannelsChatSettings = {
    openSettings: boolean,
    channelId: number,
    serverId: string | undefined,
}

const ChannelsChatSettings:React.FC<ChannelsChatSettings> = ({
    openSettings, channelId, serverId
}) => {

  return (
    <div className={`w-[220px] h-[348px] absolute left-[10px] top-14 ${openSettings ? '' : 'hidden'}`}>
        <div className='px-2 py-[10px] h-full w-full flex flex-col bg-superdark items-start rounded-md'>
            <CopyLink serverId={serverId} />
            <div className='w-full mr-auto'>
                <button className='pr-[80px] text-slate-300 text-sm font-semibold my-[2px] py-[6px] pl-2 
                hover:bg-indigo-500 hover:text-white rounded-sm'>
                    Edit Server Profile
                </button>
            </div>
            <LeaveServer channelId={channelId} />
        </div>
    </div>
  )
}

export default ChannelsChatSettings