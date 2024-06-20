import Me_and_Friends_Logo from '../../../assets/CreateServer_logo/FORME_ANDFRIENDS_LOGO.svg'
import Club_or_Community_Logo from '../../../assets/CreateServer_logo/FOR_A_CLUB.svg'
import Arrow_Logo from '../../../assets/CreateServer_logo/Arrow_LOGO.svg'
import { ModalProps } from './AddServerModal'

const CreateServer: React.FC<ModalProps> = ({ handleModalNumber }) => {
  return (
    <div className='w-[440px] max-h-[396px] h-[396px] bg-gray-700 rounded-md'>
        <div className='pt-6 px-4 flex flex-col items-center'>
            <h2 className='font-bold text-2xl text-white'>Tell Us About Your Server</h2>
            <p className='mt-2 text-slate-300 text-center text-base'>In order to help you with your setup, is your new server for just a few friends or a larger community</p>
        </div>
        <div className='mt-6 px-4 pb-2 flex flex-col items-center gap-2 h-[200px]'>
            <button onClick={() => handleModalNumber(4)} // the two is supposed to be different. for now just make them both
            className='flex items-center border border-gray-500 rounded-lg hover:bg-slate-600 w-full'>   
                <img src={Me_and_Friends_Logo} className='ml-4 m-2' />
                <h2 className='font-bold text-md text-white '>For me and friends</h2>
                <img src={Arrow_Logo} className='ml-auto mr-[16px]' />
            </button>
            <button onClick={() => handleModalNumber(4)}
            className='flex items-center border border-gray-500 rounded-lg hover:bg-slate-600 w-full'>   
                <img src={Club_or_Community_Logo} className='ml-4 m-2' />
                <h2 className='font-bold text-md text-white'>For a club or community</h2>
                <img src={Arrow_Logo} className='ml-auto mr-[16px]' />
            </button>
        </div>
        <div className='bg-gray-800 h-[70px] p-4 rounded-b-md'>
            <button onClick={() => handleModalNumber(1)}
            className="text-white hover:underline hover:underline-offset-1">
                Back
            </button>
        </div>
    </div>
  )
}

export default CreateServer