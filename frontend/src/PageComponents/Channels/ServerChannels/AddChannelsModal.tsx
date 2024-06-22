import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaHashtag } from 'react-icons/fa6'
import { PiSpeakerHighBold } from "react-icons/pi";

type AddChannelsModalType = {
    open: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>,
    id: string | undefined
}



const AddChannelsModal: React.FC<AddChannelsModalType> = ({open, setOpenModal, id}) => {
    const [channelName, setChannelName] = useState<string>("")
    const [channelType, setChannelType] = useState<'Text' | 'Voice'>('Text')
    const [loading, setLoading] = useState<boolean>(false)

    const handleCreateChannel = async () => {
        setLoading(true)
        try {
            const res: Response = await fetch(`http://localhost:5000/api/server/CreateChannel/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    channeltype: channelType,
                    channelname: channelName
                }),
                credentials: 'include'
            })

            const data = await res.json()

            if(data.error) throw new Error(data.error)

            window.location.assign("http://localhost:5173/channels/20/" + data.id)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    if(!open) return null

    return (
        <div className='w-full h-screen fixed bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='w-[460px] h-[482px] flex flex-col bg-lightgray rounded-md'>
                <div className='p-4 flex justify-start relative'>
                    <div className='max-w-[460px]'>
                        <h2 className='text-white text-semibold text-2xl'>Create Channel</h2>
                        <p className='text-slate-400 text-xs'>in Text Channels</p>
                    </div>
                </div>
                <div className='px-4'>
                    <div className='flex flex-col mb-3'>
                        <h2 className='uppercase text-slate-400 text-xs font-bold mb-2' >Channel Type</h2>
                        <div onClick={() => setChannelType('Text')}
                        className='py-[10px] px-3 flex justify-between rounded-sm bg-darkgray mb-2 cursor-pointer'>
                            <div className='flex items-center'>
                                <div>
                                    <FaHashtag size={20} className='text-gray-400 mr-3' />
                                </div>
                                <div>
                                    <h2 className='text-white text-xl font-semibold'>Text</h2>
                                    <p className='text-sm text-slate-400'>Send messages, images, GIFS, emoji, opinion, and puns</p>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <input 
                                checked={channelType === 'Text'}
                                type="checkbox" />
                            </div>
                        </div>
                        <div onClick={() => setChannelType('Voice')}
                        className='py-[10px] px-3 flex justify-between rounded-sm bg-darkgray cursor-pointer'>
                            <div className='flex items-center'>
                                <div>
                                    <PiSpeakerHighBold size={20} className='text-gray-400 mr-3' />
                                </div>
                                <div>
                                    <h2 className='text-white text-xl font-semibold'>Voice</h2>
                                    <p className='text-sm text-slate-400'>Hangout out together with voice, video, and screen share</p>
                                </div>
                            </div>
                            <div className='flex justify-center'>
                                <input 
                                checked={channelType === 'Voice'}
                                type="checkbox" />
                            </div>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <h2 className='text-gray-200 font-bold text-xs uppercase mb-2'>Channel name</h2>
                        <div className='flex h-[40px] relative '>
                            <FaHashtag className='absolute top-3 left-2 text-slate-300' />
                            <input 
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setChannelName(e.target.value)}
                            value={channelName}
                            placeholder='new-channel'
                            className='text-slate-300 p-[10px] pl-7 w-full outline-none rounded-sm bg-highdarkgray' />
                        </div>
                    </div>
                    <div className='mb-4'>
                        <div className='flex justify-between'>
                            <h2 className='text-lg text-white font-semibold'>Private Channel</h2>
                            <input type='checkbox' />
                        </div>
                        <p className='mt-2 text-sm text-slate-400'>Only selected members and roles will be able to view this channel.</p>
                    </div>
                </div>
                <div className='bg-darkgray p-4 rounded-b-md h-full flex justify-end'>
                    <button onClick={() => setOpenModal(false)}
                    className='text-white px-4 py-[2px] font-semibold hover:underline
                    text-sm'>Cancel
                    </button>
                    <button onClick={() => handleCreateChannel()}
                    disabled={!channelName || loading}
                    className={`w-[129px] px-4 py-[2px] text-sm bg-indigo-500 rounded-sm hover:bg-indigo-600
                    font-semibold text-white ${!channelName && 'opacity-50'}`}>
                        {loading ? <span className='animate-spin'>loading...</span> : "Create Channel"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddChannelsModal