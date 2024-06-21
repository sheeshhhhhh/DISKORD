import React, { PropsWithChildren } from 'react'

type HeadersType = {
    text: string,
} & PropsWithChildren

const Headers: React.FC<HeadersType> = ({text, children}) => {
  return (
    <div className='h-[48px] p-2 flex items-center justify-start border-b-[1px] border-gray-900'>
        <div className='h-[31px]'>
            {children}
        </div>
        <h2 className="font-semibold text-white">{text}</h2>
    </div>
  )
}

export default Headers