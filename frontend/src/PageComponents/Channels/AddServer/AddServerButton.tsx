
import { FaPlus } from "react-icons/fa6";

type AddServerButtonType = {
    size: number
}

const AddServerButton: React.FC<AddServerButtonType & React.HTMLAttributes<HTMLDivElement> > = ({ size , ...props}) => {
    return (
      <div className="flex justify-center items-center text-green-600 size-[50px] bg-gray-800 
              rounded-full transition[border-radius] ease-in-out duration-100 hover:rounded-[16px] hover:bg-green-600 hover:text-white"
      {...props}>
          <FaPlus size={size} />
      </div>
    )
  }
  

export default AddServerButton