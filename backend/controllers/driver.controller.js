const Driver = require('../models/driver.model');
const driverService = require('../services/driver.service');


const { validationResult } = require('express-validator');

module.exports.registerDriver = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicleType } = req.body;

    try {
        const hashedPassword = await Driver.hashPassword(password);
        const driver = await driverService.createDriver({
            firstname: fullName.firstName,
            lastname: fullName.lastName,
            email,
            password: hashedPassword,
            color: vehicleType.color,
            plate: vehicleType.plate,
            capacity: vehicleType.capacity,
            vehicleType: vehicleType.vehicleType
        });

        const token = driver.generateAuthToken();
        res.cookie('token', token);
        res.status(201).json({ token, driver });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports.loginDriver = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const driver = await Driver.findOne({ email }).select('+password');

        if (!driver) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await driver.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = driver.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json({ token, driver });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.getDriverProfile = async (req, res, next) => {
    res.status(200).json(req.driver);
}

module.exports.logoutDriver = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
    res.clearCookie('token');

    const blacklistTokenModel = require('../models/blacklistToken.model');
    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out successfully' });
}