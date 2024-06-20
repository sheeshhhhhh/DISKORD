import { pool } from './db.js'

const createSession = async () => {
    try {
        const query = `
            CREATE TABLE session (
                sid TEXT PRIMARY KEY,
                sess JSON NOT NULL,
                expire TIMESTAMP(6) NOT NULL
            );
        `

        await pool.query(query)

        console.log("Succesfully created Session table")
    } catch(error) {
        console.log("Error in creating Session table " + error.message)
    }
}

export default createSession