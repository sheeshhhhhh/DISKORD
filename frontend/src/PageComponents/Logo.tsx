import Image from '../assets/DISKORD_LOGO.svg'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <Link className='flex flex-row w-[200px]'
        to='/'>
            <img className='size-10' src={Image} />
            <h2 className='font-bold text-white text-3xl'>Diskord</h2>
    </Link>
  )
}

export default Logo