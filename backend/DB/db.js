import pg from 'pg'

// we need to import main pg and just get the Pool from pg using objects getting something(i don't know what's its called)
const { Pool } = pg

/*
 then just initialiaze the pool 
 warning: migth want to use env
*/
export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "sideproject2024",
    password: "Renato000"
})
