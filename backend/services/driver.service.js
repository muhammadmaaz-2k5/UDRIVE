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
        firstname,
        lastname,
        email,
        password,
        vehicleColor: color,
        vehiclePlate: plate,
        vehicleCapacity: capacity,
        vehicleTypeName: vehicleType
    });
    return driver;
}