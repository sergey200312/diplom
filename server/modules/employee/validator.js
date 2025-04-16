const { body } = require('express-validator');
const specialization = require('../../enums/specialization');

const employeeValidator = [
    body('fullName')
    .notEmpty().withMessage('Поле "fullName" обязательно')
    .isString().withMessage('"fullName" должно быть строкой'),

  body('phone')
    .notEmpty().withMessage('Поле "phone" обязательно')
    .isMobilePhone().withMessage('Неверный формат телефона'),

  body('telegramId')
    .notEmpty().withMessage('Поле "telegramId" обязательно')
    .isString().withMessage('"telegramId" должно быть строкой'),

  body('specialization')
    .notEmpty().withMessage('Поле "specialization" обязательно')
    .isIn(Object.values(specialization)).withMessage('Недопустимое значение specialization'),
]

module.exports = {
    employeeValidator
}