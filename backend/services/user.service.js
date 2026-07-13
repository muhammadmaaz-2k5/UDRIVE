const User = require('../models/user.model');

module.exports.createUser = async ({
    firstname,
    lastname,
    email,
    password
}) => {
    if (!firstname || !email || !password) throw new Error("All fields are required");
    const user = await User.create({
        firstname,
        lastname,
        email,
        password
    });
    return user;
};

module.exports.getAllUsers = async () => {
    const users = await User.findAll();
    return users;
};