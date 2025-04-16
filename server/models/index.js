const sequelize = require('../config/db');

const Request = require('./Request');
const Employee = require('./Employee');
const User = require('./User')


module.exports = {
  sequelize,
  Request,
  Employee,
  User
};