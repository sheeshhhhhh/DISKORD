import { useEffect, useState } from 'react'
import Direct_Message_Logo from '../../../assets/Direct_Message_Logo.svg'
import { Link } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { userAuthContext } from '@/Context/AuthContext'
import AddServerButton from '../AddServer/AddServerButton'
import Servericons from '@/assets/UserIcons.svg'

export type serversinfo = {
    id: number,
    title: string,
    servericons: string | undefined
}

const ChannelServers = ({ handleServerModalOpen } : any) => {
    const [servers, setServers] = useState<serversinfo[] | undefined>(undefined)
    const { user } = userAuthContext()

    useEffect(() => {
        const GetAllServer = async () => {
            try {
                const res: Response = await fetch("http://localhost:5000/api/server/GetAll_Servers", {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    credentials: "include"
                })

                const data:serversinfo[] = await res.json()
                setServers(data)
            } catch (error) {
                console.log(error)
            }
        }
        GetAllServer()
    }, [])

  return (
    <div className='flex flex-col gap-2 py-2 relative overflow-auto scrollbar-hide'>
        <div>
            <Link to={'/channels/@me/Friends'} className='flex justify-center items-center'>
                <img src={Direct_Message_Logo} className='bg-indigo-500 size-[48px] p-2  rounded-2xl' />
            </Link>
        </div>
        <div className='px-2'>
            <Separator className='before: bg-gray-700 before: h-[2px] '></Separator>
        </div>
        {servers !== undefined && servers?.map((info: serversinfo) => {
            return (
                <div>
                    <Link className='flex justify-center items-center size-[50px]
              rounded-full hover:rounded-[16px] transition-all duration-500 '
                    to={'/channels/' + info.id}>
                        <img src={info.servericons ? info.servericons : Servericons} 
                        className='size-[48px] rounded-full hover:rounded-2xl bg-lightgray' />
                    </Link>
                    {/* make sure to do the animation of title showing up when hovered */}
                </div>
            ) 
        })}
        <AddServerButton size={25} onClick={() => handleServerModalOpen()} />
    </div>
  )
}

export default ChannelServers