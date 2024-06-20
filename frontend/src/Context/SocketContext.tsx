import { io, Socket } from 'socket.io-client'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { authType, userAuthContext } from './AuthContext';

const SocketContext = createContext<any>(null);

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }: PropsWithChildren) => {
    const [socket, setSocket] = useState()
    const { user }: any = userAuthContext()

    // the problem is that it always disconnect whenever it is restarted which is bad
    // the user should be in session storage or local storage
    // remove use Effect
    useEffect(() => {
        if(user) {
            
            const socket:Socket = io('http://localhost:5000', {
                transports: ['websocket'],
                query: { userId: user?.id} // this handshake is important because we are sending our id 
                //so that it can connect socket id and user id that will be use to identify the two
            })
            socket.on("hello", (message) => {
                console.log(message)
            })
        }
    }, [user]) 
    
    return(
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}