import React from 'react'



const LeaveServer: React.FC<{channelId: number}> = ({ channelId }) => {

    const handleLeaveServer = async () => {
        try {
            if(!channelId) throw new Error("channel Id is undefined")

            const res: Response = 
            await fetch(`http://localhost:5000/api/server/leave/${channelId}`, {
                credentials: 'include'
            })
            
            const data = await res.json()

            if(data.error) throw new Error(data.error)

            window.location.assign('http://localhost:5173/channels/@me/Friends')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-full mr-auto'>
        <button onClick={() => handleLeaveServer()}
        className='pr-[115px] text-red-500 text-sm font-semibold my-[2px] py-[6px] pl-2 
       hover:bg-red-500 hover:text-white rounded-sm'>
            Leave Server
        </button>
    </div>
  )
}

export default LeaveServer