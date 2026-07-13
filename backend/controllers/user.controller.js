const User = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }
    const { fullname, email, password } = req.body;
    const { firstname, lastname } = fullname || {};
    const hashedPassword = await User.hashPassword(password);
    const user = await userService.createUser({ firstname, lastname, email, password: hashedPassword });
    const token = user.generateAuthToken();
    res.cookie('token', token);
    res.status(201).json({ user, token });
}

module.exports.getAllUsers = async (req, res, next) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
}

module.exports.loginUser = async (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({ user, token });
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    const blacklistTokenModel = require('../models/blacklistToken.model');
    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out successfully' });
}