import { userAuthContext } from '@/Context/AuthContext'
import ChannelsChat from '@/PageComponents/Channels/ChannelsChat'
import ChannelsSideBar from '@/PageComponents/Channels/ChannelsSideBar'
import PersonalChat from '@/PageComponents/Channels/PersonalChat'
import { useParams } from 'react-router-dom'

const Channels = () => {

  const { user } = userAuthContext()
  const { channelid } = useParams()

  return (
    <div className='flex'>
      <ChannelsSideBar />
      {
        channelid == user.id ? // this will determine if we click to our personal chat
        <PersonalChat />  
        :
        <ChannelsChat  channelid={channelid} />
      }
    </div>
  )
}

export default Channels