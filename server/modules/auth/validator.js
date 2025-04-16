// modules/auth/auth.validator.js
const { body } = require('express-validator');

const registerValidator = [
  body('email').isEmail().withMessage('Некорректный email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Пароль должен быть не менее 6 символов'),
  body('username')
    .notEmpty()
    .withMessage('Имя пользователя обязательно'),
];

const loginValidator = [
    body('email').isEmail().withMessage('Введите корректный email'),
    body('password')
      .notEmpty()
      .withMessage('Пароль обязателен'),
  ];

module.exports = {
    registerValidator,
    loginValidator
}