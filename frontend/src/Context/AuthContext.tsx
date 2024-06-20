import { useLocalStorage } from "@/util/useLocalStorage";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react"

// this is use for the type of the users
export type User = {
    id: string, // don't know yet later
    name: string | undefined,
    auth_type: string,
}

// this is use for context typing
export type authType = {
    user: User | undefined,
    loading: boolean
}

const AuthContext = createContext<authType | undefined>(undefined);

/**
 * This is the custom hook for use Context
 * @returns id, name, authtype all String
 */
export const userAuthContext = () =>  {
    return useContext<any>(AuthContext)
}

export default function AuthContextProvider({children}: PropsWithChildren) {
    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User | undefined>(undefined) // implement checkinmg later on

    useEffect(() => {
        const checkUser = async () => {
            setLoading(true)
            try {
                const res: Response = await fetch('http://localhost:5000/api/auth/check', {
                    credentials: 'include'
                })

                const data = await res.json()
                
                if(data.error) throw new Error(data.error)
                setUser(data?.user)
            } catch (error) {
                console.log(error)
                console.log("error in the checkUser")
            } finally {
                setLoading(false)
            }
        }
        
        checkUser()
    }, [])

    return (
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

