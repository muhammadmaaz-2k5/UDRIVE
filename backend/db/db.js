const { Pool } = require('pg');
require('dotenv').config();
// Setup database connection pool using environment variables
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10),
});
// Check database connection
async function connectDb() {
    try {
        const client = await pool.connect();
        console.log('Successfully connected to the database!');
        client.release();
    } catch (err) {
        if (err.code === '3D000') {
            console.log(`Database "${process.env.DB_NAME}" does not exist. Attempting to create it...`);
            try {
                // Connect to the default 'postgres' database to create the new database
                const tempPool = new Pool({
                    host: process.env.DB_HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: 'postgres',
                    port: parseInt(process.env.DB_PORT, 10),
                });
                const client = await tempPool.connect();
                await client.query(`CREATE DATABASE "${process.env.DB_NAME}"`);
                console.log(`Database "${process.env.DB_NAME}" created successfully!`);
                client.release();
                await tempPool.end();

                // Retry connection to the now created database
                const newClient = await pool.connect();
                console.log('Successfully connected to the database after creation!');
                newClient.release();
                return;
            } catch (createErr) {
                console.error('Failed to auto-create database:', createErr.message);
            }
        }
        console.error('Database connection error:', err.message);
        console.log('Will retry connection on client requests...');
    }
}

connectDb();

module.exports = pool;
