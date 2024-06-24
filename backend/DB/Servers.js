import { pool } from './db.js'

const createServers = async () => {
    try {

        // create the main server table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Servers (
                id SERIAL PRIMARY KEY NOT NULL,
                owner INTEGER REFERENCES users(id) NOT NULL,
                title VARCHAR(40) NOT NULL,
                headerPhoto VARCHAR(255),
                serverIcons VARCHAR(255)
            );
        `)
        
        // create the server_members table resposible for
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Server_member (
                server_id INTEGER REFERENCES servers(id) ON DELETE CASCADE,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                PRIMARY KEY (server_id, user_id)
            );
        `)
        
        //creates te channel table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS Channels (
                id SERIAL PRIMARY KEY NOT NULL,
                server_id INTEGER REFERENCES servers(id) ON DELETE CASCADE,
                created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
                name VARCHAR(40) NOT NULL,
                description VARCHAR(255)
            );
        `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Messages (
                id SERIAL PRIMARY KEY NOT NULL,
                channel_id INTEGER REFERENCES channels(id) ON DELETE CASCADE,
                user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
                content TEXT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );    
        `)

        console.log("Successfully created Servers table")
    } catch (error) {
        console.log("Error in creating Servers Table" + error.message)
    }
}

export default createServers