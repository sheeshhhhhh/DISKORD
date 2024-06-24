import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { MdKeyboardArrowDown } from "react-icons/md";
import ChannelsMainChat from './ServerChannels/ChannelsMainChat';
import { FaHashtag, FaPlus } from 'react-icons/fa6';
import AddChannelsModal from './ServerChannels/AddChannelsModal';
import lastelementofURL from '@/util/lastElementofURL';

export type channelsType = {
  id: number,
  name: string,
  description?: string | undefined
}

export type serverinfo = {
  id: number,
  title: string,
  owner: number,
  headerPhoto: string | null,
  serverIcons: string | null,
  is_member: boolean,
  channels: channelsType[]
}

// all the component is gonna be in serverChannels
const ChannelsChat = () => {
  const [server, setServer] = useState<serverinfo | undefined>()
  const [channelselected, setChannelSelected] = useState<number>(0)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { id } = useParams()
  
  const URL = useLocation()
  const selectedchannel = lastelementofURL(URL)

  useEffect(() => {
    const getserverinfo = async () => {
      try {
        const res: Response = await fetch(`http://localhost:5000/api/server/GetServer/${id}`, {
          credentials: 'include'
        })

        const data = await res.json()

        if(data.error) throw new Error(data.error)
        setServer(data)
      } catch (error) {
        console.log(error)
      }
    }
    
    getserverinfo()
    setOpenModal(false) // so that modal won't be open when we change channels
  }, [id])
 

  const handleserverSetting = () => {
    // do later
  }
  

  return (
    <div className='flex flex-row h-screen w-full'>
      <div className='flex flex-col min-w-[240px] w-[240px] bg-gray-800'>
        <nav className=' flex flex-col flex-1'>
          <div className='flex items-center justify-start h-[48px] border-b-[1px] border-gray-900
          hover:bg-gray-700 py-3 px-4'>
              <h2 className='text-white font-bold mr-auto'>{server?.title}</h2>
              <button onClick={() => handleserverSetting()}
              >
                <MdKeyboardArrowDown size={25} className='text-gray-200' />
              </button>
          </div>
          <div className='flex flex-col items-center pr-2 mt-3'>
            <div className='flex flex-row justify-between px-3 mb-2 cursor-pointer w-full group'>
              <h2 className='text-slate-400 text-sm font-bold uppercase group-hover:text-white'>Add Channel</h2>
              <button onClick={() => setOpenModal(true)} disabled={openModal}
              ><FaPlus size={15} className='text-slate-400 group-hover:text-white'/></button>
            </div>
            {server?.channels.map((channel: channelsType, idx) => {
                const selected = Number(selectedchannel) == channel.id
                return(
                  <Link 
                  onClick={() => setChannelSelected(idx)}
                  to={`../${id}/${channel.id}`}
                  key={channel.id}
                  className={`flex ml-2 w-full max-w-[220px] h-[32px] py-[1px] rounded-md px-2
                   items-center ${selected && 'bg-gray-700'}`}>
                    <FaHashtag size={15} className={`text-gray-400 mr-2 ${selected && 'text-white'}`} />
                    <h2 className={`text-slate-400 font-semibold ${selected && 'text-white'}`}>{channel.name}</h2>
                  </Link>
                )
            })}
          </div>
        </nav>
        <AddChannelsModal id={id} setOpenModal={setOpenModal}  open={openModal} />
      </div>
      <Routes>
        <Route path=':channelid' element={<ChannelsMainChat id={id}  channels={server?.channels} />} />
      </Routes>
    </div>
  )
}

export default ChannelsChat