import { pool } from './db.js'

const createServerLink = async () => {
    try {
        await pool.query(`CREATE TABLE IF NOT EXISTS serverlinks(
                id SERIAL PRIMARY KEY NOT NULL,
                link VARCHAR(255) NOT NULL,
                server_id INTEGER
            );`)

        console.log("Succesfully create the Server Link table")
    } catch (error) {
        console.log("Error in creating ServersLink Table" + error.message)
    }
}

export default createServerLink