const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const driverController = require('../controllers/driver.controller');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('fullName.lastName').isLength({ min: 3 }).withMessage('Last name must be at least 3 characters long'),
    body('vehicleType.color').isLength({ min: 2 }).withMessage('Vehicle color must be at least 2 characters long'),
    body('vehicleType.plate').isLength({ min: 2 }).withMessage('Vehicle plate must be at least 2 characters long'),
    body('vehicleType.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicleType.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type'),
], driverController.registerDriver);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], driverController.loginDriver);

const authMiddleware = require('../middlewares/auth.middleware');

router.get('/profile', authMiddleware.authDriver, driverController.getDriverProfile);

router.get('/logout', authMiddleware.authDriver, driverController.logoutDriver);

module.exports = router;