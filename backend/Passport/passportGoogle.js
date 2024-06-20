import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from 'dotenv'
import { pool } from '../DB/db.js'

dotenv.config() // use so that we can access .env files or environmental variables

passport.serializeUser((user, cb) => {
     cb(null, user);
})

passport.deserializeUser((user, cb) => {
    cb(null, user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACKURL
    }, 
    async function(accessToken, refreshToken, profile, cb) {
        // we are trying to find the user using oauth_google_id this column is only for 
        // identifying the user but we will use primary serial id for the rest of the functionality
        const userQuery = await pool.query(`
            SELECT DISTINCT * 
            FROM users 
            WHERE oauth_google_id = $1 LIMIT 1;
        `, [profile.id])
        const user = userQuery.rows[0]
        if(!user) {
            const createUser = await pool.query(`
                INSERT INTO users (name, username, auth_type, oauth_google_id)
                VALUES ($1, $2, $3, $4)
            `, [profile?.displayName, profile?.displayName, 'Oauth', profile?.id])

            const newAccount = createUser.rows[0]

            if(!newAccount) return  cb(err, undefined)

            return cb(null, newAccount)
        }

        cb(null, user)
    }
))
