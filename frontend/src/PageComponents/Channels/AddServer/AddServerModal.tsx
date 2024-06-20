import { RxCross2 } from "react-icons/rx";

import MyOwnServer from '../../../assets/CreateServer_logo/CreateMyOwn_LOGO.svg';
import Friends from '../../../assets/CreateServer_logo/FRIENDS.svg';
import Gaming from '../../../assets/CreateServer_logo/GAMING.svg';
import LocalCommunity from '../../../assets/CreateServer_logo/LOCAL_COMMUNITY.svg';
import SchoolClub from '../../../assets/CreateServer_logo/SCHOOLCLUB.svg';
import StudyGroup from '../../../assets/CreateServer_logo/STUDYGROUP.svg';

import { useEffect, useRef, useState } from "react";
import Arrow_Logo from '../../../assets/CreateServer_logo/Arrow_LOGO.svg';
import CreateServer from "./CreateServer";
import CustomizeServer from "./CustomizeServer";
import JoinServer from "./JoinServer";

type TemplateType = {
    Logo: string,
    type: string
}

type HandleModalFunction = (number: number) => void;

export interface ModalProps {
    handleModalNumber: HandleModalFunction
}

const Template:TemplateType[] = [
    {Logo: Gaming, type: "Gaming"}, 
    {Logo: LocalCommunity, type: "Local Community"}, 
    {Logo: StudyGroup, type: "Study Group"}, 
    {Logo: SchoolClub, type: "School Club"}, 
    {Logo: Friends, type: "Friends"}
]

const AddServerModal = ({open, handleServerModalOpen}: any) => {
    const [modalNumber, setModalNumber] = useState<number>(1)

    if(!open) return null

    const handleModalNumber: HandleModalFunction = (number: number) => {
        if(modalNumber === number) return
        setModalNumber(number)
    }
    

    
    return (
        <div className='fixed inset-0 flex items-center justify-center h-screen w-full bg-black bg-opacity-50 z-[100]'>
            <div 
            className="w-full h-full transition-all duration-200 flex items-center justify-center">
                {modalNumber === 1 && <div className='flex flex-col items-center h-[558px] w-[440px] relative bg-gray-700 rounded-md'>
                    <div className='pt-6 px-4 flex flex-col items-center'>
                        <h2 className='text-white font-bold text-2xl'>Create Your Server</h2>
                        <p className='text-slate-300 text-center text-base mt-[8px]'>Your server is where you and your friends hang out. Make
                            <br/>yours and start talking.
                        </p>
                        <button onClick={() => handleServerModalOpen()}
                        className='absolute top-3 right-6'>
                            <RxCross2 size={30}/>
                        </button>
                    </div>
                    <div className='flex flex-col gap-2 mt-6 px-4 pb-2 max-h-[424px] overflow-auto custom-scrollbar'>
                        <button onClick={() => handleModalNumber(3)}
                        className='flex items-center border border-gray-500 rounded-lg hover:bg-slate-600'>   
                            <img src={MyOwnServer} className='ml-4 m-2' />
                            <h2 className='font-bold text-md text-white'>Create My Own</h2>
                            <img src={Arrow_Logo} className='ml-auto mr-[16px]' />
                        </button>
                        <div className='font-semibold text-[12px] text-slate-200 mt-4 mb-2'>START FROM A TEMPLATE</div>
                        {Template?.map((info, idx) => {
                            return(
                                <button key={idx} 
                                className='flex items-center border border-gray-500 rounded-lg w-[404px] hover:bg-slate-600'>   
                                    <img src={info.Logo} className='ml-4 m-2' />
                                    <h2 className='font-bold text-md text-white'>{info.type}</h2>
                                    <img src={Arrow_Logo} className='ml-auto mr-[16px]' />
                                </button>
                            )
                        })}
                    </div>
                    <div className='flex flex-col items-center bg-gray-800 w-full p-4 rounded-b-md'>
                        <h2 className='font-bold text-2xl text-white pb-2'>Have an invite already?</h2>
                        <button onClick={() => handleModalNumber(2)} 
                        className='font-semibold text-white px-4 py-[2px] w-full bg-gray-700 h-[38px] rounded-md 
                        hover:bg-gray-600'>
                            Join a Server
                        </button> 
                    </div>
                </div>}
                {modalNumber === 2 && <JoinServer handleModalNumber={handleModalNumber} />}
                {modalNumber === 3 && <CreateServer handleModalNumber={handleModalNumber} />}
                {modalNumber === 4 && <CustomizeServer handleModalNumber={handleModalNumber} />}
            </div>
            
        </div>
    )
}

export default AddServerModal