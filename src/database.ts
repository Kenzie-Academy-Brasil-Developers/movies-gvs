import { Client } from "pg";


export const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
})

const createTables = async () => {
    try {
        const queryString = (`
        CREATE TABLE IF NOT EXISTS movies( 
            id SERIAL PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            category VARCHAR(20) NOT NULL,
            duration INTEGER NOT NULL,
            price INTEGER NOT NULL
        );
        `)
        await client.query(queryString)
        console.log("Table aready to work !");
        
    } catch (error) {
        console.log(error);
        
    }
}

export const connectDb = async () => {
    try {
        client.connect()
        console.log("Database connected sucessfully!");
        await createTables()
    } catch (error) {
        console.log(error);
    }
}

