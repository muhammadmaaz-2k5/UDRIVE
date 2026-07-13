const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

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
        console.error('Database connection error:', err.message);
        console.log('Will retry connection on client requests...');
    }
}

connectDb();

app.use(express.json());

// Enable CORS for all requests so the frontend container can query this API
app.use(cors("*"));

app.get('/api/health', async (req, res) => {
    try {
        const dbResult = await pool.query('SELECT NOW()');
        res.json({
            status: 'healthy',
            databaseTime: dbResult.rows[0].now,
            environment: process.env.NODE_ENV
        });
    } catch (err) {
        res.status(500).json({
            status: 'unhealthy',
            dbError: err.message
        });
    }
});

app.get('/', (req, res) => {
    res.send('Uber Backend API is running!');
});

module.exports = app;