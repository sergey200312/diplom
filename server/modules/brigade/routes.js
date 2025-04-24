const express = require('express');
const router = express.Router();
const brigadeController = require('./controller');

router.post('/create', brigadeController.create);

router.get('/', brigadeController.getAll)

router.delete('/:id', brigadeController.deleteBrigade)

module.exports = router