import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'


const app = express()
const server = createServer(app)

/**
 * socket is use so that the server can send to the user
 * make sure to add listener in the client if you will add another
 * sender here in the backend
 */
const io = new Server(server)
// set userid and also get user id 
// so that we can identify the connections in socket io that is user.id

export const getReceiverSocketId = (ReceiverId) => {
    return userSocketMap[ReceiverId];
}

export const getSenderSocketId = (SenderId) => {
    return userSocketMap[SenderId];
}

const userSocketMap = {} // { userid: socketId}

io.on('connection', (socket) => {
//    console.log('user has connected ', socket.id)

    const userId = socket.handshake.query.userId // getting the userId through the first contact(handshake)
    if(userId !== undefined) userSocketMap[userId] = socket.id // adding the user to the userSocketMap with socked.id

    //ROOMS
    socket.on('JoinRoom', room => {
        // room name is base on channel id. all channel id is unique even though in different servers 
        socket.join(room)
        console.log(`${userId} joined room: ${room}`);
    })

    socket.on('LeaveRoom', room => {
        socket.leave(room)
        console.log(`${socket.id} left room: ${room}`);
    })


    // when user disconnect this will  be triggered
    socket.on('disconnect',  () => {
        console.log('user has disconnected ', socket.id)

        delete userSocketMap[userId]
    })
})


export { app, io, server }
