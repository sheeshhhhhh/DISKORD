import { ChangeEvent, useEffect, useState } from 'react'
import ChangeAvatar from './ChangeAvatar'
import ChangeBannerColor from './ChangeBannerColor'
import Preview from './Preview'
import Aboutme from './Aboutme'

export type ProfileTypeInfo = {
  id: number,
  name: string,
  username: string,
  usericons: string,
  aboutme: string,
  bannercolor: string,
}

const Profile = () => {
  
  const [type, setType] = useState<'UserProfile' | 'ServerProfile'>('UserProfile')
  const [profileInfo, setProfileInfo] = useState<ProfileTypeInfo>()
  const [file, setFile] = useState<string>('')
  const [selectedFile, setselectedFile] = useState<string>('')
  
  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const res: Response = await fetch("http://localhost:5000/api/user/getProfile", {
          method: 'GET',
          credentials: 'include'
        })

        const data = await res.json()

        if(data.error) throw new Error(data.error)

        setProfileInfo(data)
      } catch (error) {
        console.log(error)
      }
    }
    handleGetProfile()
  }, [])

  const handleEditProfile = async () => {
    if(!profileInfo) return
    try {
      const formData = new FormData()
      // this is the only data that can be change // but the data that we requested is more because that is needed to be displayed
      formData.append('name', profileInfo.name ? profileInfo.name : profileInfo.username)
      formData.append('userIcons', file ? file : profileInfo.usericons)
      formData.append('bannercolor', profileInfo.bannercolor)
      formData.append('aboutme', profileInfo.aboutme)

      const res: Response = await fetch("http://localhost:5000/api/user/editProfile", {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      const data = await res.json()

      if(data.error) throw new Error(data.error)

      // just setting the value of the inputs but not needed as they are already changed
      setProfileInfo({
        ...profileInfo,
        aboutme: data.aboutme,
        bannercolor: data.bannercolor,
        name: data.name,
        usericons: data.usericons
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleAboutMe = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if(profileInfo?.aboutme === undefined) return

    setProfileInfo({
      ...profileInfo,
      aboutme: e.target.value
    })
  }

  if(!profileInfo) return (
    <div className='py-[60px] pl-10 pr-[10px] w-[700px]'></div>
  )
  
  return (
    <div className='py-[60px] pl-10 pr-[10px] w-[700px]'>
        <h2 className='mb-5 text-xl font-bold text-white'>
          Profile
        </h2>
        <div className='flex justify-start mt-6 mb-4 pt-[6px] cursor-default 
        border-b-[1px] border-slate-600'>
          <div className={`pb-4 mr-4 text-slate-400 font-medium 
           ${type === 'UserProfile' ? 'text-white border-b-2 border-indigo-400' : 
           'hover:text-slate-300 hover:border-b-2 hover: border-indigo-500'}`}>
            User Profile
          </div>
          <div className={`pb-4 mx-4 text-slate-400 font-medium 
           ${type === 'ServerProfile' ? 'text-white border-b-2 border-indigo-400' : 
           'hover:text-slate-300 hover:border-b-2 hover: border-indigo-500'}`}>
            Server Profiles
          </div>
        </div>

        <div>
          <div className='flex gap-[35px]'>
            <div className='w-[355px]'>
              <div aria-label='display Name'
              className='pb-6 mb-6 border-b-[1px] border-slate-600'>
                <h3 className='font-bold text-slate-400 text-xs uppercase font-sans mb-2'>
                  Display Name
                </h3>
                <div>
                  <input 
                  placeholder={profileInfo.username}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setProfileInfo({ ...profileInfo, name: e.target.value})}
                  value={profileInfo.name}
                  className='p-[10px] h-[40px] w-full rounded-sm bg-highdarkgray text-slate-400 
                  outline-none' 
                  type="text"  />
                </div>
              </div>
              <div aria-label='Pronouns'
              className='pb-6 mb-6 border-b-[1px] border-slate-600'>
                <h3 className='font-bold text-slate-400 text-xs uppercase font-sans mb-2'>
                  Pronouns
                </h3>
                <div>
                  <input 
                  placeholder='Add your pronouns'
                  className='p-[10px] h-[40px] w-full rounded-sm bg-highdarkgray text-slate-400 
                  outline-none' 
                  type="text"  />
                </div>
              </div>

              <ChangeAvatar 
              setFile={setFile}
              setselectedFile={setselectedFile} 
              />
              <ChangeBannerColor 
              setProfileInfo={setProfileInfo}
              profileInfo={profileInfo}
              />
              <Aboutme 
              handleAboutMe={handleAboutMe}
              aboutme={profileInfo.aboutme}
              />
            </div>
            <div className='w-[300px] '>
              <Preview 
              profileInfo={profileInfo} 
              />
            </div>
          </div>
        </div>
        <div className='bg-highdarkgray rounded-md mb-4 h-[48px] flex items-center px-4 justify-between'>
          <h2 className='text-white font-bold text-lg'>Careful - you have unsaved changes!</h2>
          <button onClick={() => handleEditProfile()}
          className=' bg-green-600 px-4 py-[2px] rounded-md text-sm text-white font-medium h-[33px]'>
            Save Changes
          </button>
        </div>
    </div>
  )
}

export default Profile