import { User } from "@/Context/AuthContext"

/**
 * this is a custom hook use for local storage
 * it has a type but it is mainly use for AuthContext
 * @param {key} string 
 * @returns 
 */
export const useLocalStorage = <T,>(key: string) => {
    
    const setItem: (value: T) => void = (value: unknown) => [
        window.localStorage.setItem(key, JSON.stringify(value))
    ]


    const getItem = (setLoading: any): T | undefined =>{
        try {
            const item = window.localStorage.getItem(key)
           
            if(item) {
                return JSON.parse(item)
            } else{
                 return undefined
            } 

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key)
        } catch (error) {
            console.log(error)
        }
    }

    return {setItem, getItem, removeItem}
}