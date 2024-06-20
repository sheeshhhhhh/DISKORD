import { pool } from './db.js'
import createServers from './Servers.js'
import createSession from './Session.js'

const createTables = async () => {

    try {
        
        // define the table here so that it is more manageable 

        await pool.query(`
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'auth_type') THEN
                    CREATE TYPE auth_type AS ENUM ('Local', 'Oauth');
                END IF;
            END
            $$;`)

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(40) NOT NULL,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255),
                auth_type auth_type,
                oauth_google_id VARCHAR(100) UNIQUE
            );
        `
        // this is gonna query what ever in the variable 

        await pool.query(createTableQuery)


        console.log("Successfully create The users table")
    } catch (error) {
        console.error('Error in creating the table. Error: ' +  error.message)
    } 
}

createSession();
createServers();
createTables();