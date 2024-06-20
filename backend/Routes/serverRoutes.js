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
                RETURNING id, title, serverIcons, HeaderPhoto;
        `, [title, '', serverIconsLink, user?.id])

        const insertquery =  await pool.query(`
            INSERT INTO Server_member (server_id, user_id) 
            VALUES ($1, $2);
        `, [create_server.rows[0].id, user?.id])

        if(!create_server) return handleError(res, "Failed to create a server", 400)
        
        await client.query('COMMIT');
        res.status(200).json(create_server.rows[0])
    } catch (error) {
        console.log(error)
        handleError(res, "", 500, "error in the /createServer controller")
    } finally {
        client.release()
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

export default router