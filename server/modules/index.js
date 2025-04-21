const express = require('express');
const router = express.Router();

const authRoutes = require('./auth/routes');
const employeeRoutes = require('./employee/routes');
const brigadeRoutes = require('./brigade/routes');

router.use('/auth', authRoutes);
router.use('/employee', employeeRoutes);
router.use('/brigade', brigadeRoutes);   

module.exports = router;