const sequelize = require('../config/db');

// Импорт моделей
const User = require('./User');
const Request = require('./Request');
const Employee = require('./Employee');
const Brigade = require('./Brigade');

Brigade.hasMany(Employee, {
  foreignKey: 'brigadeId',
  as: 'Employees' // псевдоним для удобства
});

// Сотрудник принадлежит одной бригаде
Employee.belongsTo(Brigade, {
  foreignKey: 'brigadeId',
  as: 'Brigade'
});




module.exports = {
  sequelize,
  User,
  Request,
  Employee,
  Brigade,
};