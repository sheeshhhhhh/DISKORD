import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import dotenv from 'dotenv'
import { pool } from '../DB/db.js'
import bcrypt from 'bcrypt'

dotenv.config()



passport.serializeUser((user, cb) => {
    cb(null, user)
})

passport.deserializeUser(async (user, cb) => {
    cb(null, user)
})

passport.use(new LocalStrategy(async function(username, password, cb) {
        if(!username || !password) return cb(null, false, { message : "please fill in all the fields"})
        const userQuery = await pool.query(`
            SELECT DISTINCT * 
            FROM users 
            WHERE username = $1 
            LIMIT 1;  
            `, [username]);
        const user = userQuery.rows[0]
        if (!user) return cb(null, false, { error : "username doesn't exist!" })
        
        const correctPassword = bcrypt.compareSync(password, user.password)

        if(!correctPassword) return cb(null, false, { error : "Incorrect Password"})
        
        return cb(null, user)
    }
))
