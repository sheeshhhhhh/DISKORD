import React, { ChangeEvent } from 'react'

const Aboutme = ({
    handleAboutMe,
    aboutme
} : {
    handleAboutMe: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    aboutme: string
}) => {

  return (
    <div aria-label='About Me'
        className='pb-6 mb-6 border-slate-600'>
        <h3 className='font-bold text-slate-400 text-xs uppercase font-sans mb-2'>
          About Me
        </h3>
        <p className='text-sm text-slate-400 font-sans mb-4'>
          You can use markdowns and links you'd like.
        </p>
        <div className='h-[135px] w-[320px] flex bg-highdarkgray rounded-sm'>
            <textarea 
            onChange={handleAboutMe}
            value={aboutme}
            className='resize-none text-slate-200 outline-none 
            h-[135px] w-[300px] p-[10px] bg-highdarkgray custom-scrollbar rounded-l-sm'>
            </textarea>
            <div className='w-[20px] flex flex-col justify-end items-center'>
                <h2 className='text-white text-sm font-bold mb-2 mr-1'>{150 - aboutme.length}</h2>
            </div>
        </div>
    </div>
  )
}

export default Aboutme