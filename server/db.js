const mysql = require('mysql2/promise')
const dotenv = require('dotenv')

dotenv.config()
let connection;

const initializeAndConnectDB = async() => {
    if(!connection){
        try {
            connection = await mysql.createConnection({
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE,
                port: process.env.DATABASE_PORT,
            })
            console.log('Database connection established');
        } catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    }

    return connection;
}

module.exports = initializeAndConnectDB
