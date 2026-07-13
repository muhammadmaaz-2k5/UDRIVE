const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const driverModel = require('../models/driver.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access: No token provided' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ where: { token } });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized access: Token is invalid' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findByPk(decoded._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized access: Invalid token' });
    }
};

module.exports.authDriver = async (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access: No token provided' });
    }

    const isBlacklisted = await blacklistTokenModel.findOne({ where: { token } });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized access: Token is invalid' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const driver = await driverModel.findByPk(decoded._id);

        if (!driver) {
            return res.status(404).json({ message: 'Driver not found' });
        }

        req.driver = driver;
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized access: Invalid token' });
    }
};
