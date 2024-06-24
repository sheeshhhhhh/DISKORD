import React, { useEffect } from 'react'
import { channelsType, serverinfo } from '../ChannelsChat'
import { FaHashtag } from "react-icons/fa6";
import Messages from './Messages';
import SendMessage from './SendMessage';
import { useParams } from 'react-router-dom';
import CantFindChannel from './CantFindChannel';
import { useSocketContext } from '@/Context/SocketContext';

type ChannelsMainChatType = {
    channels: channelsType[] | undefined,
    id: string | undefined
}

const ChannelsMainChat: React.FC<ChannelsMainChatType> = ({ channels, id }) => {
    const { channelid } = useParams() 
    // if there is channels and channel id then find the object but
    // finding the channel that is selected
    const channel = channels && channels.find(channel => Number(channelid) == channel.id)


    if(!channel) return <CantFindChannel />


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
            <div className='flex-1 max-w-[1591px] flex flex-col'>
                <div className='flex-1 overflow-auto max-h-[803px]'>
                    <Messages  channelId={channel.id} />
                </div>
                <div className='min-h-[68px] px-4'>
                    <SendMessage channelId={channel.id} />
                </div>
            </div>
        </div>
    )
}

export default ChannelsMainChat