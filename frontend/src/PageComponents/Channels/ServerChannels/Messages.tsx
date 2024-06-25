import React, { useEffect, useState } from 'react'
import Message from './Message'
import { useSocketContext } from '@/Context/SocketContext'

type ComponentMessageType = {
  channelId: number
}

export type messageType = {
  id: number,
  channel_id: number,
  user_id: number,
  timestamp: string,
  content: string,
  name: string
}

const Messages: React.FC<ComponentMessageType> = ({ channelId }) => {
  const [messages, setMessages] = useState<messageType []>([])
  const [page, setPage] = useState<number>(1)
  const [previd, setPrevid] = useState<number>(0)

  const { socket } =  useSocketContext()


  useEffect(() => {
    if(!socket || !channelId) return

    const handleNewMessage = (message: messageType) => {
      // Check if the message id is the same as the previous id
      if (previd === message.id) return;

      // Update state with the new message
      setPrevid(message.id);
      setMessages(prevmessages => [...prevmessages, message]);
    };

    socket.on('message', handleNewMessage)

    socket.emit('JoinRoom', channelId.toString()) 

    return () => {
        socket.off('message', handleNewMessage);
        socket.emit('LeaveRoom', channelId.toString())
    };
  }, [socket, channelId, previd])


  useEffect(() => {
    const getMessages = async () => {
      try {
        const res:Response = await fetch(`http://localhost:5000/api/message/GetMessage/${channelId}`, {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json'
          }, 
          body: JSON.stringify({page: 1}),
          credentials: 'include'
        })
        
        const data = await res.json()

        if(data.error) throw new Error(data.error)

        setMessages(data)
      } catch (error) {
        console.log(error)
      }
    }

    getMessages()
  }, [channelId])

  return (
    <div>
      {messages?.map((message) => {
        return <Message key={message.id} message={message} />
      })}
    </div>
  )
}

export default Messages