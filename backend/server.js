import express from 'express'
import { pool } from './DB/db.js'

import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'
import passport from 'passport'

import  { fileURLToPath} from 'url'
import { dirname } from 'path'

import './Passport/passportGoogle.js'
import './Passport/passportLocal.js'

import { app, server } from './socket/socket.js'

// tracking the dirname so for express.static
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

dotenv.config()

// Routes Imports 
import authRoutes from './Routes/authRoutes.js'
import serverRoutes from './Routes/serverRoutes.js'
import userRoutes from './Routes/userRoutes.js'
import messageRoutes from './Routes/messageRoutes.js'

import connectPgSimple from 'connect-pg-simple'

const PORT = process.env.PORT || 5000 

// made so that we can save the session even if nodemon restart the server
const pgSession = connectPgSimple(session)
app.use(session({
    store: new pgSession ({
        pool: pool,
        tableName: 'session'
    }),
    secret: 'keyboard cat', 
    resave: true, 
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000} // 30 days formula
}));



app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
}))

// for static routes
app.use('/uploads/serverIcons', express.static(__dirname + '/uploads/serverIcons'))
app.use('/uploads/userIcons', express.static(__dirname + '/uploads/userIcons'))

// ROUTES 
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/server", serverRoutes)
app.use("/api/message", messageRoutes)

server.listen(PORT, () => {
    console.log(`server is now running on PORT ${PORT}`)
})