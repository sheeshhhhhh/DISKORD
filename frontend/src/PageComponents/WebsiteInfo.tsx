import React from 'react'
import Logo from './Logo';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import X from '../assets/SocialMedia_logo/icons8-x-logo.svg'
import Facebook from '../assets/SocialMedia_logo/icons8-facebook.svg'
import Instagram from '../assets/SocialMedia_logo/icons8-instagram.svg'
import Youtube from '../assets/SocialMedia_logo/icons8-youtube.svg'
import Tiktok from '../assets/SocialMedia_logo/icons8-tiktok.svg'
import { userAuthContext } from '@/Context/AuthContext';

const WebsiteInfo = () => {
    const { user } = userAuthContext()
    // arrays all fake just for design
    const SocialMedias = {}; // made a mistake. fix later!
    const Product = ["Download", "Nitro", "Status", "App Directory", "New Mobile Experience"];
    const Company = ["About", "Jobs", "Brand", "Newsroom"];
    const Resources = ["College", "Support", "Safety", "Blog", "Feedback", "StreamKit", "Creators", "Community", "Developers", "Gaming"];

  return (
    <div className='bg-gray-800 px-[400px] py-[100px]'>
        <div className='flex gap-[150px] px-[40px]'>
            <div className='w-[380px] flex justify-start'>
                <div className='h-[32px] w-[240px] flex gap-4'>
                    <a href='https://x.com/discord' ><img className='size-[25px]' src={X} /></a>
                    <a href='https://www.instagram.com/discord/' ><img className='size-[25px]' src={Instagram} /></a>
                    <a href='https://www.facebook.com/discord/' ><img className='size-[25px]' src={Facebook} /></a>
                    <a href='https://www.youtube.com/discord' ><img className='size-[25px]' src={Youtube} /></a>
                    <a href='https://www.tiktok.com/@discord' ><img className='size-[25px]' src={Tiktok} /></a>
                </div>
            </div>
            <div className='flex gap-[80px]'>
                <div className='flex flex-col gap-1'>
                    <h2 className='ml-3 text-indigo-500 mb-[20px]'>Product</h2>
                    {Product?.map((info) => {
                        return <h2 className='text-white hover:underline hover:underline-offset-1 cursor-pointer'>{info}</h2>
                    })}
                </div>
                <div className='flex flex-col gap-1'>
                    <h2 className='ml-3 text-indigo-500 mb-[20px]'>Company</h2>
                    {Company?.map((info) => {
                        return <h2 className='text-white hover:underline hover:underline-offset-1 cursor-pointer'>{info}</h2>
                    })}
                </div>
                <div className='flex flex-col gap-1'>
                    <h2 className='ml-3 text-indigo-500 mb-[20px]'>Resources</h2>
                    {Resources?.map((info) => {
                        return <h2 className='text-white hover:underline hover:underline-offset-1 cursor-pointer'>{info}</h2>
                    })}
                </div>
            </div>
        </div>
        <Separator className='w-[1103px] my-[30px] bg-indigo-500'/>
        <div className='flex justify-between items-center'>
            <Logo />
            <div>
                {user ?
                <Link className='text-md font-bold text-white bg-indigo-500 py-[9px] px-[35px] rounded-full'
                to={`/channels/${user?.id}`}>
                    Go Chat?
                </Link> 
                : 
                <Link className='text-md font-bold text-white bg-indigo-500 py-[9px] px-[35px] rounded-full'
                to={'/login'}>
                    Login
                </Link>}
                
            </div>
        </div>
    </div>
  )
}


export default WebsiteInfo