const Driver = require('../models/driver.model');

module.exports.createDriver = async ({
    firstname,
    lastname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType
}) => {
    if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error("All fields are required");
    }
    const driver = await Driver.create({
        fullName: {
            firstName: firstname,
            lastName: lastname
        },
        email,
        password,
        vehicleType: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });
    return driver;
}