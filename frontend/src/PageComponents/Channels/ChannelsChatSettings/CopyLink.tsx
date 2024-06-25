import React, { useEffect, useState } from 'react'

const CopyLink:React.FC<{serverId: string | undefined}> = ({ serverId }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [copied, setCopeid] = useState<boolean>(false)

    useEffect(() => {
        // this is suppoed to have i timer for copeid so that it won't be permanent
        if(!copied) return

        setTimeout(() => {
            setCopeid(false)
        }, 2000)
    }, [copied])

    const handleCopyLink = async () => {
        if(!serverId) return
        setLoading(true)
        try {
            const res: Response = await fetch(`http://localhost:5000/api/server/CreateLink/${serverId}`,{
                method: 'POST',
                credentials: 'include'
            })

            const data = await res.json()
            if(data.error) throw new Error(data.error)


            navigator.clipboard.writeText(data)
            setCopeid(true)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full mr-auto'>
            <button disabled={loading || copied}
            onClick={() => handleCopyLink()}
            className={`pr-[130px] text-slate-300 text-sm font-semibold my-[2px] py-[6px] pl-2 
            hover:bg-indigo-500 hover:text-white rounded-sm ${copied && 'pr-[80px]'}`}>
                {loading ? 'loading...' : copied ? 'Copeid Successful' : 'Copy Link'}
            </button>
        </div>
    )
}

export default CopyLink