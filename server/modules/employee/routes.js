const express = require('express');
const router = express.Router();
const employeeController = require('./controller');
const { employeeValidator } = require('./validator');
const validate = require('../../middlewares/validate');

router.post('/', employeeValidator, validate, employeeController.create);

router.get('/', employeeController.getAll )

router.get('/:id', employeeController.getById)

router.delete('/:id', employeeController.deleteId)

router.put('/:id', employeeController.update)


module.exports = router;