
import { FaPlus } from "react-icons/fa";
import Friends from "./PersonalChannel/Friends";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Store from "./PersonalChannel/Store";
import Shop from "./PersonalChannel/Shop";
import lastelementofURL from "@/util/lastElementofURL";

interface logo_component {
    selected_cat?: boolean;
}

const PersonalChat = () => {
    const Options = [
        {logo: Me_logo, text: "Friends"},
        {logo: Nitro_logo, text: "Nitro"},
        {logo: Shop_logo, text: "Shop"},
    ]

    const URL = useLocation()
    const selected = lastelementofURL(URL)

    return (
        <div className='flex flex-row w-full h-screen h-full'>
            <div id="personalchat-sidebar" 
            className='flex flex-col min-w-[240px] w-[240px] bg-gray-800'>
                <nav className='relative flex flex-col flex-1'>
                    <div className='relative flex px-[10px] items-center justify-center h-[48px] border-b-[1px] border-gray-900'>
                        <button 
                        className='w-full bg-gray-900 px-[6px] py-[1px] h-[26px] rounded-md text-slate-400 text-sm text-start'>
                            Find or start a conversation
                        </button>
                    </div>
                    <div className="flex flex-col items-center pr-2">
                        {Options?.map((info) => {
                            const selected_cat = selected === info.text

                            return (
                                <Link to={'../@me/' + info.text} className='flex group w-full pl-2'>
                                    <div className={`flex items-center group-hover:bg-gray-700 rounded-md h-[42px] w-full cursor-pointer
                                         ${selected_cat && 'bg-gray-700'}`}>
                                        <div className='size-[32px] mr-3'>
                                            <info.logo selected_cat={selected_cat} />
                                        </div>
                                        <div className="flex items-start w-[156px]">
                                                <h2 className={`group-hover:text-white
                                                font-semibold text-slate-400  ${selected_cat && 'text-white'}`}>
                                                    {info.text}
                                                </h2>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                        
                        <h2 className="pt-[18px] pl-[18px] pb-1 pr-2 text-start w-full uppercase 
                        text-slate-400 text-xs font-bold flex items-center">
                            <span className="hover:text-slate-300 flex-1">Direct Message</span>
                            <div><FaPlus /></div>
                        </h2>

                        {/* implement a useeffect that gets friends that he can chat to and map it */}
                    </div>  
                </nav>
            </div>
            <Routes>
                <Route path={"Friends"} element={<Friends />}/>
                <Route path={"Nitro"} element={<Store />}/>
                <Route path={"Shop"} element={<Shop />}/>
            </Routes> 
        </div>
    )
}

// just logos
export const Me_logo: React.FC<logo_component> = ({selected_cat}) => {
    return (
        <div className="size-[32px] mr-3 flex justify-center items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" aria-hidden="true" 
            className={`text-gray-400 group-hover:text-white ${selected_cat && 'text-white'}`}>
            <path fill="currentColor" d="M13 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path fill="currentColor" d="M3 5v-.75C3 3.56 3.56 3 4.25 3s1.24.56 1.33 1.25C6.12 8.65 9.46 12 13 12h1a8 8 0 0 1 8 8 2 2 0 0 1-2 2 .21.21 0 0 1-.2-.15 7.65 7.65 0 0 0-1.32-2.3c-.15-.2-.42-.06-.39.17l.25 2c.02.15-.1.28-.25.28H9a2 2 0 0 1-2-2v-2.22c0-1.57-.67-3.05-1.53-4.37A15.85 15.85 0 0 1 3 5Z"/></svg>
        </div>
    )
}

export const Nitro_logo: React.FC<logo_component> = ({selected_cat}) => {
    console.log(selected_cat)
    return (
        <div className="size-[32px] mr-3 flex justify-center items-center">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" aria-hidden="true" 
           className={`text-gray-400 group-hover:text-white ${selected_cat && 'text-white'}`}>
            <path fill="currentColor" d="M15 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path fill="currentColor" fill-rule="evenodd" d="M7 4a1 1 0 0 0 0 2h3a1 1 0 1 1 0 2H5.5a1 1 0 0 0 0 2H8a1 1 0 1 1 0 2H6a1 1 0 1 0 0 2h1.25A8 8 0 1 0 15 4H7Zm8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" clip-rule="evenodd"/><path fill="currentColor" d="M2.5 10a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2h.5Z"/></svg>
        </div>
    )
}

export const Shop_logo: React.FC<logo_component> = ({selected_cat}) => {
    return (
        <div className="size-[32px] mr-3 flex justify-center items-center">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" aria-hidden="true" 
           className={`text-gray-400 group-hover:text-white ${selected_cat && 'text-white'}`}>
            <path fill="currentColor" d="M2.63 4.19A3 3 0 0 1 5.53 2H7a1 1 0 0 1 1 1v3.98a3.07 3.07 0 0 1-.3 1.35A2.97 2.97 0 0 1 4.98 10c-2 0-3.44-1.9-2.9-3.83l.55-1.98ZM10 2a1 1 0 0 0-1 1v4a3 3 0 0 0 3 3 3 3 0 0 0 3-2.97V3a1 1 0 0 0-1-1h-4Zm7 0a1 1 0 0 0-1 1v3.98a3.65 3.65 0 0 0 0 .05A2.95 2.95 0 0 0 19.02 10c2 0 3.44-1.9 2.9-3.83l-.55-1.98A3 3 0 0 0 18.47 2H17Z"/><path fill="currentColor" d="M21 11.42V19a3 3 0 0 1-3 3h-2.75a.25.25 0 0 1-.25-.25V16a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v5.75c0 .14-.11.25-.25.25H6a3 3 0 0 1-3-3v-7.58c0-.18.2-.3.37-.24a4.46 4.46 0 0 0 4.94-1.1c.1-.12.3-.12.4 0a4.49 4.49 0 0 0 6.58 0c.1-.12.3-.12.4 0a4.45 4.45 0 0 0 4.94 1.1c.17-.07.37.06.37.24Z"/></svg>
        </div>
    )
}

export default PersonalChat