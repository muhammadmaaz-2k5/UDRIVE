const express = require('express');
const cors = require('cors');
const pool = require('./db/db');
const app = express();


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