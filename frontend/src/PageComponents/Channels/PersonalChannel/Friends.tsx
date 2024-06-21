import { useState } from 'react'
import FriendsMain from './FriendsMain'
import { Me_logo } from '../PersonalChat'
import { Separator } from '@/components/ui/separator'

const Friends = () => {
    const [category, setCategory] = useState<string>()
    const categorytypes: string[] = ["Online", "All", "Pending", "Blocked"]
    const example: any[] = []

    return (
        <div className='flex flex-col flex-1 max-w bg-darkgray '>
            <div className='h-[48px] p-2 flex items-center justify-start border-b-[1px] border-gray-900'>
                <div className='h-[31px]'>
                    <Me_logo />
                </div>
                <h2 className="font-semibold text-white">Friends</h2>
                <Separator orientation='vertical' className='mx-2'/>
                <div className='flex items-center'>
                    {categorytypes.map((type) => {
                        const selected = category === type
                        return (
                            <div className={`px-2 py-[2px] mx-2 hover:bg-gray-600 rounded-sm ${selected && 'bg-gray-600'}`}>
                                <button onClick={() => setCategory(type)}
                                className={`text-slate-300 font-semibold hover:text-slate-200 ${selected && 'text-white'}`}>
                                    {type}
                                </button>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='flex flex-1'>
                <div className='max-w-[1188px] flex-1 border-white border-r-[1px]'>
                    <div className='mx-auto flex flex-col justify-center items-center w-[440px] h-full'>
                        <FriendsMain />
                    </div>
                </div>
                {example.length === 0 ? <div className='max-w-[418px] h-full flex flex-col p-4 pr-2'>
                    <h2 className='text-xl font-bold text-white text-start w-[385px] mt-2 mb-4'>Active Now</h2>
                    <div className='p-4 flex flex-col items-center'>
                        <h2 className='text-lg text-white font-bold'>It's quiet for now...</h2>
                        <p className='text-sm text-center text-slate-200'>When a friend starts an activity—like playing a game or hanging out on voice—we’ll show it here!</p>
                    </div>
                </div>
                :
                <div>

                </div>
                }
            </div>
        </div>
    )
}

export default Friends