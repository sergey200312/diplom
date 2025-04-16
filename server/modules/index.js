const express = require('express');
const router = express.Router();

const authRoutes = require('./auth/routes');
const employeeRoutes = require('./employee/routes');

router.use('/auth', authRoutes);
router.use('/employee', employeeRoutes);


module.exports = router;