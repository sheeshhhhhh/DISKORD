import { Separator } from '@/components/ui/separator'
import { useState } from 'react'
import Logout from '../../Logout'
import AddServerModal from '../AddServer/AddServerModal'
import ChannelServers from './ChannelServers'

const ChannelsSideBar = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleServerModalOpen = () => {
    setOpen((prev) => !prev)
  }

  return (
    <div>
        <div className='flex flex-col w-[72px] bg-gray-900 h-screen justify-between items-center py-2'>
            <ChannelServers handleServerModalOpen={handleServerModalOpen}/>
            <div>
              <div className='px-2'>
                <Separator className='before: bg-gray-700 h-[2px] rounded-3xl mb-2'></Separator>
              </div>
              <Logout className='flex justify-center items-center text-green-600 size-[50px] bg-gray-800 
              rounded-full  hover:rounded-[16px] hover:bg-green-600 hover:text-white transition-all ease-in-out duration- '
              size={30} />
            </div>
        </div>
        <AddServerModal open={open} handleServerModalOpen={handleServerModalOpen}/>
    </div>
  )
}

export default ChannelsSideBar