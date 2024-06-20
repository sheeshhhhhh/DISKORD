import { PropsWithChildren } from "react";
import { MdLogout } from "react-icons/md";

type LogoutTypes = {
  size: number,
} & PropsWithChildren



const Logout: React.FC<LogoutTypes & React.HTMLAttributes<HTMLDivElement>> = 
({children, size, ...props}) => {
  
  const handleLogout = async () => {
    try {
      const res: Response = await fetch("http://localhost:5000/api/auth/logout", {
        credentials: 'include'
      })

      const data = await res.json()
      if(data.error) throw new Error(data.error)

      window.location.assign('http://localhost:5173')
    } catch (error) {
      console.log(error)
      console.log(" Error logging out")
    }
  }

  return (
    <div  {...props} 
    onClick={() => handleLogout()}>
          {children}
          <MdLogout size={size} />
    </div>
  )
}

export default Logout