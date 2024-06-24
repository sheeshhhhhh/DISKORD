import express from 'express'
import multer from 'multer'
import crypto from 'crypto'


import { pool } from "../DB/db.js"
import { ensureAuthenticated } from '../utils/ensureAuthenticated.js'
import handleError from '../utils/handleserverError.js'

const router = express.Router()
// naka code palang di pa natetest dahil wala pang frontend
// for testing pa 
// also the create server is also for testing paden

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      return cb(null, 'backend/uploads/serverIcons')  
    },
    filename: function(req, file, cb) {
        const photoid = crypto.randomBytes(10).toString('hex')
        return cb(null, `${photoid}_${file.originalname}`)
    }
})

const upload = multer({ storage: storage})

router.post("/createServer", ensureAuthenticated, upload.single('serverIcons'), async (req, res) => {
    const client = await pool.connect()
    try {
        await client.query('BEGIN')

        const { title } = req.body
        const user = req.user
        const file = req.file
        const serverIconsLink = file ? `http://localhost:5000/uploads/serverIcons/${file.filename}` : ''

        const create_server = await pool.query(`
                INSERT INTO Servers (title, HeaderPhoto, serverIcons, owner) 
                VALUES ($1, $2, $3, $4)
                RETURNING id;
        `, [title, '', serverIconsLink, user?.id])

        const insertquery =  await pool.query(`
            INSERT INTO Server_member (server_id, user_id) 
            VALUES ($1, $2);
        `, [create_server.rows[0].id, user?.id])

        const inserGeneralChannel = await pool.query(`
            INSERT INTO channels (server_id, created_by, name)
            VALUES ($1, $2, $3)
            RETURNING id AS ChannelId;
        `, [create_server.rows[0].id, user?.id, "General"])

        if(!create_server || !inserGeneralChannel) return handleError(res, "Failed to create a server", 400)
        
        await client.query('COMMIT');
        res.status(200).json({
            channelId: inserGeneralChannel.rows[0].channelid,
            serverId: create_server.rows[0].id
        })
    } catch (error) {
        console.log(error)
        handleError(res, "", 500, "error in the /createServer controller")
    } finally {
        client.release()
    }
})

router.post("/CreateLink/:serverId", ensureAuthenticated, async(req, res) => {
    try {
        const { serverId } = req.params
        const userid = req.user?.id

        const get_server_owner = await pool.query(`
                SELECT owner 
                FROM id as servers
                WHERE $1 = id;
        `, [serverId])

        if(userid !== get_server_owner.rows[0]) return handleError(res, "not the owner", 400)
        const link = 'http://localhost:5000/invite/' +  crypto.randomBytes(10).toString('hex')
        const create_serverlink = await pool.query(`
                INSERT INTO serverlinks(link, server_id) 
                VALUES ($1, $2)
                RETURNING link;
        `, [serverId, link])

        if(!create_serverlink.rows[0]) return handleError(res, "failed to createLink", 400)

        req.status(200).json(create_serverlink.rows[0])
    } catch (error) {
        handleError(res, "", 500, "Error in the createLink/:serverId controller")
    }
})

router.post("/Join_Server/:serverid", ensureAuthenticated, async (req, res) => {
    try {
        const { serverid } = req.params
        const user = req.user

        if(!serverid || !user) return handleError(res, "failed to join", 400) 

        const insertquery = `
            INSERT INTO servers_members (server_id, user_id) 
            VALUSE ($1, $2);
        `

        await pool.query(insertquery, [serverid, user.id])

        res.status(200).json({ serverid : serverid})
    } catch (error) {
        handleError(req, "", 500, "Erron in the /Join_Server Controller")
    }
})

router.post("/GetAll_Servers", ensureAuthenticated, async (req, res) => {
    try {
        const userid = req.user.id
        console.log(userid)
        const query = `
            SELECT s.id, s.title, s.ServerIcons
            FROM servers s

            JOIN server_member sm ON s.id = sm.server_id 
            JOIN users u ON u.id = sm.user_id
            WHERE u.id = $1
        ` // get through chat gpt
        const result = await pool.query(query, [userid])
        const allservers = result.rows
        if (!allservers) return handleError(res, "Can'd find the servers. Try again")
        

        res.status(200).json(allservers)
    } catch (error) {
        console.log(error.message)
        handleError(res, "internal server error!", 500, " /GetAll_Servers Controller: ")
    }
})

router.get("/GetServer/:serverId", ensureAuthenticated, async(req, res) => {
    try {
        const { serverId } = req.params 
        const userId = req.user?.id

        const getServer = await pool.query(`
            SELECT s.id, s.title, s.owner, s.headerPhoto, s.serverIcons, 
                   CASE WHEN sm.user_id IS NOT NULL THEN true ELSE false END AS is_member,
                   c.id AS channel_id, 
                   c.name AS channel_name, 
                   c.description AS channel_description
            FROM servers s
            LEFT JOIN Server_member sm ON s.id = sm.server_id AND sm.user_id = $1
            LEFT JOIN channels c ON s.id = c.server_id
            WHERE s.id = $2;
        `, [userId, serverId])
        const result = getServer.rows[0]

        if(result.length === 0) return handleError(res, "Server Does not exist", 400)

        const serverDetails = {
            id: result.id,
            title: result.title,
            owner: result.owner,
            headerPhoto: result.headerphoto,
            serverIcons: result.servericons,
            is_member: result.is_member,
            channels: []
        };

        getServer.rows.forEach(row => {
            if (row.channel_id) {
                serverDetails.channels.push({
                    id: row.channel_id,
                    name: row.channel_name,
                    description: row.channel_description
                })
            }
        });

        res.status(200).json(serverDetails)
    } catch (error) {
        console.log(error.message)
        handleError(res, "", 500, "/GetServer/:serverId")
    }   
})

router.post("/CreateChannel/:id", ensureAuthenticated, async (req, res) => {
    try {
        const { channeltype, channelname } = req.body // do later the types kase di pa nakalagay sa database
        const { id } = req.params
        const userid = req.user?.id

        const createChannel = await pool.query(`
            INSERT INTO channels (server_id, created_by, name)
            VALUES ($1, $2, $3)
            RETURNING id;
        `, [id, userid, channelname])

        const newChannelId = createChannel.rows[0].id;
        if(!newChannelId) return handleError(res, "failed to create a server", 400)

        res.status(200).json({ id: newChannelId})
    } catch (error) {
        console.log(error)
        handleError(res, "", 500, "/CreateChannel/:id")
    }
})

export default router