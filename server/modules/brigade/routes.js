const express = require('express');
const router = express.Router();
const brigadeController = require('./controller');

router.post('/create', brigadeController.create);

router.get('/', brigadeController.getAll)

module.exports = router