const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ConnectDB = require('./db/db');
const { sequelize } = require('./db/db');
ConnectDB();
const app = express();
const userRoutes = require('./routes/user.route');
const driverRoutes = require('./routes/driver.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


app.get('/api/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.json({
            status: 'healthy',
            database: 'connected (PostgreSQL)',
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
app.use("/api/drivers", driverRoutes);


module.exports = app;