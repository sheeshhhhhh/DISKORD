import { User } from "@/Context/AuthContext"
import { useLocalStorage } from "./useLocalStorage"


export const handlegoogleauth = async() => {
    const { setItem } = useLocalStorage<User>('user')

    try {
        const res: Response = await fetch('http://localhost:5000/api/auth/check', {
            credentials: 'include'
        })

        const data = await res.json()

        if(data.error) throw new Error(data.error)
         
        // we need to make sure that undefined doesn't get on the local storage becaue 
        // in app.tsx we set !user which is gonna be false and it's gonna refresh infinitely
        if(data.user === undefined) return
        setItem(data.user)
        window.location.assign('http://localhost:5173');
    } catch (error) {
        console.log(error)
    }   
}