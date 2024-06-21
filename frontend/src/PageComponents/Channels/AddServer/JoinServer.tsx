import { useState } from "react"
import Arrow_Logo from '../../../assets/CreateServer_logo/Arrow_LOGO.svg'
import Compass from '../../../assets/CreateServer_logo/Compass_LOGO.svg'
import { ModalProps } from "./AddServerModal"

const JoinServer: React.FC<ModalProps> = ({handleModalNumber}) => {
    const [serverLink, setServerLink] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [notValid, setNotValid] = useState<boolean>(false)

    // join server is not yet implmented so make sure to have a link save in the data base to be copied to.

    const handleJoinServer = async () => {
        setLoading(true)

        try {
            const res:Response = await fetch(`http://localhost:5000/api/server/Join_Server/${serverLink}`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials: 'include'
            })

            const data = await res.json()

            if(data.error) throw new Error(data.error)

            // console.log(data.serverid) // might redirect to the main server that he joined in
        } catch (error: any) {
            setNotValid(true)
        } finally {
            setLoading(false)
        }
        // make a backend that will join him server in the 
    }

  return (
    <div className='bg-gray-700 rounded-md h-[440px] w-[436px]'>
        <div className='p-4 flex flex-col items-center'>
            <h2 className='font-bold text-2xl text-white mt-6 mb-2'>Join Server</h2>
            <p className="text-slate-300 text-center text-base mt-2">Enter an invite below to join an existing server</p>
        </div>
        <div className="pr-4 pl-4 mb-4">
            <h2 className={`font-semibold text-[12px] text-slate-200 mb-2 ${notValid ? 'text-red-600' : ""}`}>INVITE LINK 
                <span className=' text-red-700'>{notValid ? " - The invite is invalid or has expired." : "*" }</span>
            </h2>
            <input value={serverLink}
            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setServerLink(e.target.value)}
            className='p-[10px] bg-gray-800 w-full rounded-sm outline-none text-white'
            type="text" placeholder='https://discord.gg/HelloWorld' />
        </div>
        <div className="pr-4 pl-4 mb-4">
            <h2 className='font-semibold text-[12px] text-slate-200 mb-2'>INVITE SHOULD LOOK LIKE</h2>
            <div className="text-white text-sm">hElloWorld</div>
            <div className="text-white text-sm">https://discord.gg/hTKzmak</div>   
            <div className="text-white text-sm">https://discord.gg/cool-people</div>
        </div>
        <div className="px-4">
            <div className='flex items-center border border-gray-500 rounded-lg hover:bg-slate-600 mb-4 px-4'>   
                <img src={Compass} className='ml-4 m-2' />
                <div>
                    <h2 className='font-bold text-md text-white'>Don't have an Invite?</h2>
                    <p className="text-white text-xs">Check out Discoverable communities in Server Discoveries</p>
                </div>
                <img src={Arrow_Logo} className='ml-auto mr-[16px]' />
            </div>
        </div>
        <div className='p-4 h-[70px] flex justify-between items-center bg-gray-800 rounded-b-md'>
            <button onClick={() => handleModalNumber(1)}
            className="text-white hover:underline hover:underline-offset-1">
                Back
            </button>
            
            <button disabled={loading}
            onClick={() => handleJoinServer()}
            className='bg-indigo-500 text-white text-base rounded-md px-4 py-[2px] font-bold h-[38px]'>
                Join Server
            </button>
        </div>
    </div>
  )
}

export default JoinServer