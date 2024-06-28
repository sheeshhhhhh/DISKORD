import React, { Dispatch, SetStateAction } from 'react'

const SettingSidebar = ({ 
    category, setCategory
}: {
    category: string,
    setCategory: Dispatch<SetStateAction<string>>
}) => {

    const sidebarCategory = ['My Account', 'Profile', 'HypeSquad']

  return (
    <div className='flex flex-col custom-scrollbar w-[192px]'>
        <div className='mb-2'>
            <h2 className='px-[10px] pb-[6px] text-gray-400 text-xs font-sans font-bold uppercase'>user Settings</h2>
        </div>
        <div className='flex flex-col gap-[1px]'>
            {sidebarCategory?.map((info) => {
                const isSelected = info === category
                return (
                    <div 
                    onClick={() => setCategory(info)}
                    className={`px-[10px] py-[6px] w-full cursor-default rounded-sm 
                    hover:bg-lightgray ${isSelected && 'bg-hovercolor'}`}>
                        <h2 className={`text-slate-400 text-base font-semibold 
                        hover:text-slate-300 ${isSelected && 'text-white'}`}>
                            {info}
                        </h2>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default SettingSidebar