const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const ConnectDB = require('./db/db');
ConnectDB();
const app = express();
const userRoutes = require('./routes/user.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors("*"));


app.get('/api/health', async (req, res) => {
    try {
        const isConnected = mongoose.connection.readyState === 1;
        if (!isConnected) {
            throw new Error('Database is not connected');
        }
        res.json({
            status: 'healthy',
            database: 'connected',
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

app.use("/api/users", userRoutes);


module.exports = app;