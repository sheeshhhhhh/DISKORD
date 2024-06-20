import { pool } from './db.js'

const createServers = async () => {
    try {

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Servers (
                id SERIAL PRIMARY KEY NOT NULL,
                owner INTEGER REFERENCES users(id) NOT NULL,
                title VARCHAR(40) NOT NULL,
                headerPhoto VARCHAR(255),
                serverIcons VARCHAR(255)
            );
        `) // do later the channels

        await pool.query(`
            CREATE TABLE IF NOT EXISTS Server_member (
                server_id INTEGER REFERENCES servers(id) ON DELETE CASCADE,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                PRIMARY KEY (server_id, user_id)
            );
        `)
        
        console.log("Succesfully created Server Table")
    } catch (error) {
        console.log("Error in creating Servers Table" + error.message)
    }
}

export default createServers