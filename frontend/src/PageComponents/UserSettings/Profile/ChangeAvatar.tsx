import { Dispatch, SetStateAction } from 'react'
import { handleDragOver, handleDrop, handleFileChange } from '@/util/FileInput_utils'

const ChangeAvatar = ({
  setFile, 
  setselectedFile
} : {
  setFile: Dispatch<SetStateAction<string>>,
  setselectedFile: Dispatch<SetStateAction<string>>
}) => {

  return (
    <div aria-label='Avatar'
      className='pb-6 mb-6 border-b-[1px] border-slate-600'>
      <h3 className='font-bold text-slate-400 text-xs uppercase font-sans mb-2'>
        Avatar
      </h3>
      <div className='min-h-[32px]'>
        <label
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(event) => handleDrop({ event, setFile, setselectedFile})}
        >
          <span
          className='py-[6.5px] px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium
          rounded-sm min-h-[32px] h-full'>
              Change Avatar
          </span>
          <input 
          onChange={(event) => handleFileChange({event, setFile, setselectedFile})}
          hidden={true}
          type="file" />
        </label>
      </div>
  
    </div>
  )
}

export default ChangeAvatar