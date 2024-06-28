import express from 'express'
import multer from 'multer'

import diskstorage from '../utils/multerDiskStrorage.js'
import { ensureAuthenticated } from '../utils/ensureAuthenticated.js'
import handleError from '../utils/handleserverError.js'
import { pool } from '../DB/db.js'
import bcrypt from 'bcrypt'

const router = express.Router()
// WARNING !!! di pa to tested so make sure to test this after makagawa ng frontend!!!

// THIS IS THE UPDATE ON EVERY SINGLE ONE 

const upload = multer({ storage: diskstorage('backend/uploads/userIcons')})
//get AccountProfile
router.get('/getAccountProfile', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user?.id

        if(!userId) return handleError(res, "failed to get AccountProfileInfo")
        
        const getProfileInfo = await pool.query(`
            SELECT 
            u.id AS user_id, 
            u.name, 
            u.username, 
            COALESCE(ui.usericons, '') AS usericons, 
            COALESCE(ui.bannercolor, '') AS bannercolor, 
            COALESCE(ui.email, '') AS email 
            FROM 
                users u
            LEFT JOIN 
                userinfo ui ON u.id = ui.user_id
            WHERE 
                u.id = $1;
        `, [userId]) // reference https://chatgpt.com/c/4823fabb-e799-4ffe-a975-28fe9535c788
        const profileInfo = getProfileInfo.rows[0]
        
        if(!profileInfo)  return handleError(res, "failed to get AccountProfileInfo")

        res.status(200).json(profileInfo)
    } catch (error) {
        console.log(error)
        handleError(res, '', 500, "/getAccountProfile")
    }
})

// change password
router.post('/changePassword', ensureAuthenticated, async (req, res) => {
    try {
        const { password, newPassword } = req.body
        const user = req.user
        if(!user) return handleError(res, "Failed to changed password")
        // we are checking if oauth because we can't change password if it is because the account is not stored
        // in the data base but rather in the Oauth provider it just gives us a token
        if(user.auth_type === 'Oauth') return handleError(res, "Oauth can't Change password")

        // we are trying to change password 
        // and finding the user and checking if the previous password correct in WHERE
        const changePassword = await pool.query(`
            UPDATE users
            SET password = $1
            WHERE id = $2 AND password = $3
        `, [newPassword, user.id, password])

        if(!changePassword.rows[0]) return handleError(res, "Failed to changed password")
        
        res.status(200).json(changePassword.rows[0])
    } catch (error) {
        handleError(res, "", 500, "/changepassword")
    }
})
// set email
router.post('/changeEmail' , ensureAuthenticated, async (req, res) => {
    try {
        const { email, password } = req.body
        const userId = req.user?.id
        const currentPassword = req.user?.password
    
        if(!email) return handleError(res, "please fill in an email", 400)
    
        // ref: https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-upsert/
        // upsert is about inserting something. but if it already exist then we just update
        // we will know base on CONFLICT
        const upsertemail = await pool.query(`
            INSERT INTO users (email)
            VALUES ($1)
            WHERE id = $2
            ON CONFLICT (email)
            DO UPDATE SET email = $1
        `, [email, userId])
    
        if(!upsertemail.rows[0]) return handleError(res, "failed to update emaik", 400)
        
        res.status(200).json(upsertemail.rows[0])
    } catch (error) {
        handleError(res, "", 500, '/changeEmail')
    }
})
// set useranme if local auth
router.post('/changeUsername', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user?.id
        const userpassword = req.user?.password
        const { username, password } = req.body
        console.log(req.user)
        // verifying the password using the password from the session and password sent
        const verifypassword = bcrypt.compareSync(password, userpassword)
        if(!verifypassword) return handleError(res, "wrong password", 400)

        const changedUsername = await pool.query(`
            UPDATE users
            SET username = $1
            WHERE id = $2 
            RETURNING *;
        `, [username, userId])

        const updatedinfo = changedUsername.rows[0]

        if(!updatedinfo) return handleError(res, "Failed to update username", 400)
        
        // this is gonna save the infos to the sessions making sure that it is updated
        req.user = updatedinfo // getting the passport session which is being get to the database
        req.session.passport.user = updatedinfo // saving to the database
        req.session.save((err) => {
            if (err) {
                console.error('Failed to save session:', err);
                return res.status(500).json({ error: 'Failed to save session' });
            }
            res.status(200).json(updatedinfo.username);
        });
    } catch (error) {
        console.log(error)
        handleError(res, "", 500, '/changeUsername')
    }
})

// set name // still not sure if thisis part of single update or as a whole
router.post('/changeName', ensureAuthenticated, async (req, res) => {
    try {
        const userId = res.user?.id
        const { name } = req.body

        if(!name) return handleError(res, "Please fill in the name", 400)
        
        const changeName = await pool.query(`
            UPDATE users
            SET name = $1
            WHERE id = $2
        `, [name, userId])

        if(!changeName.rows[0]) return handleError(res, "Failed to updated name", 400)

        res.status(200).json(changeName.rows[0])
    } catch (error) {
        handleError(res, "", 500, '/changeName')
    }
})

// THIS IS THE UPDATE ON ALL ON JUST ONE
// DOESN'T MEAN USER NEED TO UPDATE ALL BUT JUST HANDLE ALL CHANGES IN ONE api

router.get('/getProfile', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user?.id

        const getUserProfile = await pool.query(`
            SELECT userIcons, name, aboutme, bannercolor
            FROM users
            WHERE id = $1
        `, [userId])

        if(!getUserProfile.rows[0]) return handleError(res, "Failed to get userProfile", 400)

        res.status(200).json(getUserProfile.rows[0])
    } catch (error) {
        handleError(res, "", 500, "/getProfile")
    }
})

router.post('/editProfile', upload.single('userIcons') ,ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user?.id
        const file = req.file
        const { name, aboutme, bannercolor } = req.body

        const userIconsLink = file ? 'http://localhost:5000/uploads/userIcons' + file.filename : null

        const editProfilequery = await pool.query(`
            UPDATE users 
            SET name = $1,
            aboutme = $2,
            bannercolor = $3
            userIcons = $4
            WHERE id = $5
        `, [name, aboutme, bannercolor, userIconsLink, userId])

        if(!editProfilequery.rows[0]) return handleError(res, "Failed to edit profile", 400)

        res.status(200).json(editProfilequery.rows[0])
    } catch (error) {
        handleError(res, "", 500, '/editProfile')
    }
})

export default router