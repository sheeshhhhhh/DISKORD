import React from 'react'
import { channelsType, serverinfo } from '../ChannelsChat'
import { FaHashtag } from "react-icons/fa6";

type ChannelsMainChatType = {
    channel: channelsType | undefined,
}

const ChannelsMainChat: React.FC<ChannelsMainChatType> = ({ channel }) => {

    // return something when something is wrong or undefined

  return (
    <div className='flex flex-col flex-1 bg-darkgray'>
        <div className='h-[48px] p-2 flex items-center justify-start border-b-[1px] border-gray-900'>
            <div className='flex items-center'>
                <div className='flex items-center ml-2'>
                    <div>
                        <FaHashtag size={20} className='text-gray-400 mr-2' />
                    </div>
                    <div className='w-full'>
                        <h2 className='text-white font-bold text-base'>{channel?.name}</h2>
                    </div>
                </div>
                {channel?.description}
            </div>
        </div>
        <div className='flex-1'>
            
        </div>
    </div>
  )
}

export default ChannelsMainChat