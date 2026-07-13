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
    res.status(201).json({ user, token });
}

module.exports.getAllUsers = async (req, res, next) => {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
}