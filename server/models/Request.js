const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const requestStatus = require('../enums/requestStatus');
const specialization = require('../enums/specialization');

const Request = sequelize.define('Request', {
  clientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM(requestStatus.NEW, requestStatus.ASSIGNED, requestStatus.DONE),
    defaultValue: requestStatus.NEW,
  },
  specialization: {
    type: DataTypes.ENUM(
      specialization.GASMAN, 
      specialization.LOCKSMITH
    ),
    allowNull: false,
  },
}, {
  timestamps: true, 
});


// Request.belongsToMany(User, { through: 'RequestWorker', as: 'workers' });

module.exports = Request;
