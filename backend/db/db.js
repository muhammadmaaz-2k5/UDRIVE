const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DBCONNECTION, {
    dialect: 'postgres',
    logging: false
});

async function ConnectDB() {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL database connected successfully via Sequelize.');
        await sequelize.sync({ alter: true });
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the PostgreSQL database:', error.message);
    }
}

module.exports = ConnectDB;
module.exports.sequelize = sequelize;