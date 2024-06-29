import React, { Dispatch, SetStateAction, useState } from 'react'
import { ProfileTypeInfo } from './Profile'
import { SketchPicker } from 'react-color'
import color_cursor from '@/assets/Cross_cursor.png'
import { url } from 'inspector'

const ChangeBannerColor = ({
    setProfileInfo,
    profileInfo
} : {
    setProfileInfo: Dispatch<SetStateAction<ProfileTypeInfo | undefined>>,
    profileInfo: ProfileTypeInfo
}) => {
    const [colorOpen, setColorOpen] = useState<boolean>(true)
    if(!profileInfo) return

    const handleColorChange = (color: any) => {
        console.log(color.hex)
        setProfileInfo({
            ...profileInfo,
            bannercolor: color.hex
        })
    }

    return (
        <div aria-label='Banner Color'
        className='pb-6 mb-6 border-b-[1px] border-slate-600'>
            <h3 className='font-bold text-slate-400 text-xs uppercase font-sans mb-2'>
                Banner Color
            </h3>
            <label>
                <div onClick={() => setColorOpen(false)}
                style={{ backgroundColor: profileInfo.bannercolor }}
                className='m-[1px] h-[50px] w-[69px] bg-slate-200 rounded-md'></div>
                <div 
                hidden={colorOpen}
                className='fixed w-full h-full top-0 left-0'>
                    <div 
                    className='cursor-pointer relative left-[800px] top-[520px]'>
                        <SketchPicker 
                        color={profileInfo.bannercolor}
                        onChangeComplete={handleColorChange}
                        />
                        <button className='bg-darkgray w-[220px] py-1 rounded-b-md'
                        onClick={() => setColorOpen(true)}>
                            <span className='font-semibold text-white'>Confirm</span>
                        </button>
                    </div>
                </div>
            </label>
        </div>
    )
}

export default ChangeBannerColor