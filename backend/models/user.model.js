const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class User extends Model {
    async comparePassword(password) {
        return await bcrypt.compare(password, this.password);
    }

    generateAuthToken() {
        return jwt.sign({ _id: this.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    }

    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
}

User.init({
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    socketId: {
        type: DataTypes.STRING
    },
    fullname: {
        type: DataTypes.VIRTUAL,
        get() {
            return {
                firstname: this.firstname,
                lastname: this.lastname
            };
        }
    }
}, {
    sequelize,
    modelName: 'user',
    timestamps: false
});

module.exports = User;
