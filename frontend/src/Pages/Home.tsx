import Nav from '@/PageComponents/Nav'
import React from 'react'

import Image from '../assets/DISKORD_HEADER.svg'
import WebsiteInfo from '@/PageComponents/WebsiteInfo'
import Video from '../assets/HomePage_Video.mp4'
import Video2 from '@/assets/HomePage_Video2.mp4'

const Home = () => {
  return (
    <div className='bg-gray-800 h-[665px]' >
      <Nav />
      <div className='flex justify-center py-[117px] animate-opacity-animation'>
        <div className='flex gap-[30px]'>
          <div className='flex flex-col gap-6'>
            <h2 className='font-bold text-white text-[3.125rem]'>
              GROUP CHAT <br/> THAT'S ALL <br/> FUN & GAMES
            </h2>
            <p className='font-semibold text-white text-lg' >
              An adventure awaits. Please login or signup 
              <br/> to chat with your friends or find a new ones
            </p>
          </div>
          <img className='h-[350px]' src={Image} />
        </div>
      </div>
      <div className='pt-[188px] pb-[112px] bg-gray-800 '>
        <div className='px-[40px]'>
          <div className='mx-[261.5px] max-w-[1300px] glassmorphism p-[16px] pr-[60px] rounded-[75px]'>
            <div className='h-[600px] w-[1224px] flex items-center gap-[3.5rem]'>
              <div className='w-[778px] rounded-[60px]'>
                <video className='rounded-[60px]' autoPlay muted loop>
                  <source src={Video} type='video/mp4'></source>
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className='max-w-[391px]'>
                <h1 className='uppercase font-bold text-[2.25rem] text-white mb-4'>Make your <br/>Group Chats <br/>More Fun</h1>
                <p className='text-white text-2xl'
                >Use custom emojis, stickers, soundbars effects and more to add your personality to your voice, video or text chat. 
                  Set your avatar and a custom status, and write your own profile to show up in chat your way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='pt-[188px] pb-[112px] bg-gray-800 '>
        <div className='px-[40px]'>
          <div className='mx-[261.5px] max-w-[1300px] glassmorphism p-[16px] pl-[60px] rounded-[75px]'>
            <div className='h-[600px] w-[1224px] flex flex-row-reverse items-center gap-[3.5rem]'>
              <div className='w-[778px] rounded-[60px]'>
                <video className='rounded-[60px]' autoPlay muted loop>
                  <source src={Video2} type='video/mp4'></source>
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className='max-w-[391px]'>
                <h1 className='uppercase font-bold text-[2.25rem] text-white mb-4'>Make your <br/>Group Chats <br/>More Fun</h1>
                <p className='text-white text-2xl'
                >Use custom emojis, stickers, soundbars effects and more to add your personality to your voice, video or text chat. 
                  Set your avatar and a custom status, and write your own profile to show up in chat your way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <WebsiteInfo />
      </div>
    </div>
  )
}

export default Home