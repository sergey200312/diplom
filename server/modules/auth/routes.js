const express = require('express');
const router = express.Router();
const authController = require('./controller');
const { registerValidator, loginValidator } = require('./validator');
const validate = require('../../middlewares/validate');

router.post('/login', loginValidator, validate, authController.login);
router.post('/register', registerValidator, validate, authController.register);


module.exports = router;