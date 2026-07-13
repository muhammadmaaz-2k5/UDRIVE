const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

class BlacklistToken extends Model {}

BlacklistToken.init({
    token: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'blacklistToken',
    tableName: 'blacklist_tokens',
    timestamps: false
});

module.exports = BlacklistToken;
