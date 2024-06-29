import { ProfileTypeInfo } from './Profile'
import userIcons from '@/assets/UserIcons.svg'

const Preview = ({
    profileInfo
} : {
    profileInfo: ProfileTypeInfo
}) => {
  return (
    <div>
        <h3 className='text-slate-400 font-bold text-xs uppercase font-sans mb-2'>Preview</h3>
        <div className='bg-highdarkgray flex flex-col gap-[8px] rounded-lg'>
          <header className='relative h-[150px]'>
            <div style={{ backgroundColor: profileInfo.bannercolor}}
            className='h-[105px] bg-slate-200 rounded-t-lg '></div>
            <div className='absolute top-[60px] left-[15px] size-[85px] p-2 bg-highdarkgray rounded-full'>
              <div className='bg-red-600 h-full w-full rounded-full flex items-center justify-center'>
                <img src={profileInfo.usericons ?  profileInfo.usericons : userIcons}
                className='rounded-full' />
              </div>
            </div>
          </header>
          <div className='px-4 pb-2 flex flex-col gap-[8px]'>
            <div>
              <h3 className='text-white text-xl font-bold font-sans'>{profileInfo.name ? profileInfo.name : profileInfo.username}</h3>
              <p className='text-slate-200 text-sm font-sans'>{profileInfo.username}</p>
            </div>
            <div className='w-full'>
              <p className='text-slate-200 text-sm font-sans'>{profileInfo.aboutme}</p>
            </div>
          </div>
          <div className='px-4 pb-4'>
            <button
            aria-label='example button'
            className='h-[32px] w-full bg-lightgray rounded-sm px-4 py-[2px] flex items-center justify-center'>
              <span className='text-slate-200 text-sm font-medium'>Example Button</span>
            </button>
          </div>
        </div>
    </div>
  )
}

export default Preview