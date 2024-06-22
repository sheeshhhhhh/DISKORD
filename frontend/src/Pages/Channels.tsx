import { userAuthContext } from '@/Context/AuthContext'
import ChannelsChat from '@/PageComponents/Channels/ChannelsChat'
import ChannelsSideBar from '@/PageComponents/Channels/ChannelSideBar/ChannelsSideBar'
import PersonalChat from '@/PageComponents/Channels/PersonalChat'
import { Route, Routes, useParams } from 'react-router-dom'

const Channels = () => {

  const { user } = userAuthContext()
  return (
    <div className='flex'>
      <ChannelsSideBar />
      <Routes>
        <Route path='@me/*' element={<PersonalChat />  } />
        <Route path=':id/*' element={ <ChannelsChat />} />
      </Routes>
    </div>
  )
}

export default Channels