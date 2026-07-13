const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Driver extends Model {
    async comparePassword(password) {
        return await bcrypt.compare(password, this.password);
    }

    generateAuthToken() {
        return jwt.sign({ _id: this.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    }

    static async hashPassword(password) {
        return await bcrypt.hash(password, 10);
    }
}

Driver.init({
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
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
    status: {
        type: DataTypes.ENUM('online', 'offline'),
        defaultValue: 'offline'
    },
    vehicleColor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehiclePlate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicleCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vehicleTypeName: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    lat: {
        type: DataTypes.STRING
    },
    long: {
        type: DataTypes.STRING
    },
    fullName: {
        type: DataTypes.VIRTUAL,
        get() {
            return {
                firstName: this.firstname,
                lastName: this.lastname
            };
        }
    },
    location: {
        type: DataTypes.VIRTUAL,
        get() {
            return {
                lat: this.lat,
                long: this.long
            };
        }
    },
    vehicleType: { 
        type: DataTypes.VIRTUAL,
        get() {
            return {
                color: this.vehicleColor,
                plate: this.vehiclePlate,
                capacity: this.vehicleCapacity,
                vehicleType: this.vehicleTypeName
            };
        }
    }
}, {
    sequelize,
    modelName: 'driver',
    timestamps: false
});

module.exports = Driver;