import { userAuthContext } from '@/Context/AuthContext'
import { handleDragOver, handleDrop, handleFileChange } from '@/util/FileInput_utils'
import { useEffect, useState } from 'react'
import { ModalProps } from './AddServerModal'
import { IoCloudUploadOutline } from "react-icons/io5";

const CustomizeServer: React.FC<ModalProps> = ({ handleModalNumber }) => {
    const [title, setTitle] = useState<string>("")
    const [selectedFile, setselectedFile] = useState()
    const [file, setFile] = useState()
    const [loading, setLoading] = useState<boolean>(false)
    const { user } = userAuthContext()

    useEffect(() => {
        setTitle(user?.name + " server") 
        // this is just for default values of the title
    }, []) 

    const handleCreateServer = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (!title) return
            const formdata = new FormData();
            formdata.append('title', title)
            file && formdata.append('serverIcons', file) // did this because it errors without handling undefined but i want to make it optional
            const res: Response = await fetch('http://localhost:5000/api/server/createServer', {
                method: 'POST',
                body: formdata,
                credentials: 'include'
            })
            
            const data = await res.json()

            if(data.error) throw new Error(data.error)
            
            // do not know what to put yet do later!!!
        } catch (error) {
            console.log("error in the handleCreateServer: ", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-[440px] h-[404px] bg-gray-700 rounded-md'>
            <div className='flex flex-col items-center px-6 pt-6'>
                <h2 className='text-white font-bold text-2xl'>Customize Your Server</h2>
                <p className='text-slate-200 mt-1 text-center text-sm'>Give your new server a personality with a name and an icon.
                    You can always change it later.
                </p>
            </div>
            <div className='my-4 px-4 h-[200px]'>
                <div className='pt-1 flex justify-center'>

                    <label  
                    onDragOver={(e) => handleDragOver(e)}
                    onDrop={(event) => handleDrop({event, setFile, setselectedFile})}>
                        {!selectedFile ? 
                        <IoCloudUploadOutline size={60} className='text-gray-300' /> :
                        <img src={selectedFile} className='size-20 rounded-full'/>}
                        <input 
                        name='serverIcons'
                        hidden
                        onChange={(event) => handleFileChange({event, setFile, setselectedFile})}
                        type='file'
                       />
                    </label>

                </div>
                <form onSubmit={handleCreateServer}>

                    <h2 className='font-semibold text-[12px] text-slate-200 mb-2'>SERVER NAME</h2>
                    <input 
                    value={title}
                    onChange={(e:  React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    type="text" 
                    className='p-[10px] bg-gray-800 w-full rounded-sm outline-none text-white' />
                    <p className='text-xs text-slate-300 mt-2 pb-1'>By creating a server, you agree to Discord's
                        <a href='https://discord.com/guidelines'
                        className='text-xs text-blue-600 font-semibold hover:underline hover:underline-offset-1
                        '> Community Guidelines.</a>
                    </p>

                </form>
            </div>
            <div className='p-4 flex justify-between h-[70px] items-center bg-gray-800 rounded-b-md'>

                <button onClick={() => handleModalNumber(3)}
                className="text-white hover:underline hover:underline-offset-1">
                    Back
                </button>
                
                <button onClick={(e) => handleCreateServer(e)}
                className='bg-indigo-500 text-white text-base rounded-md px-4 py-[2px] font-bold h-[38px]'>
                    Create Server
                </button>

            </div>
        </div>
    )
}

export default CustomizeServer