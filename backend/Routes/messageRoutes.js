import express from 'express'
import { ensureAuthenticated } from '../utils/ensureAuthenticated.js'
import handleError from '../utils/handleserverError.js'
import { pool } from '../DB/db.js'
import { io } from '../socket/socket.js'

const router = express.Router()

router.post("/AddMessage/:channelId", ensureAuthenticated, async (req, res) => {
    try {
        const { channelId } = req.params
        const userId = req.user?.id
        const { message } = req.body
        const addMessage = await pool.query(`
            INSERT INTO messages (channel_id, user_id, content)
            VALUES ($1, $2, $3) 
            RETURNING *, (SELECT name FROM users WHERE id = $2);
        `, [channelId, userId, message])
        const addMessageId = addMessage.rows[0].id;

        io.to(channelId.toString()).emit('message', addMessage.rows[0])
        if(!addMessageId) return handleError(res, "Failed to message", 400)

        res.status(200).json(addMessageId)
    } catch (error) {
        console.log(error)
        handleError(res, "", 500, "AddMessage/:channelId")
    }
})

router.post("/GetMessage/:channelId", ensureAuthenticated, async (req, res) => {
    try {
        const { channelId } = req.params 
        const { page } = req.body

        const offset = (page - 1) * 20
        
        // should also include user icons later add it
        const getMessages =  await pool.query(`
            SELECT m.id, m.channel_id, m.user_id, m.timestamp, m.content,
            s.name
            FROM messages m
            LEFT JOIN users s ON s.id = m.user_id 
            WHERE channel_id = $1
            ORDER BY timestamp ASC
            LIMIT $2 OFFSET $3;
        `, [channelId, 20, offset])
        
        // this is the socket that will make him joined a room with the channel ! 
        // SPECIFIED BY THE CHANNEL ID

        const result = getMessages.rows
        if(!result) return handleError(res, "failed to get messages", 400)
        
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        handleError(res, "", 500, "/GetMessage/channelId")
    }
})

export default router