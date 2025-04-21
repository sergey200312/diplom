const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const specialization = require('../enums/specialization');

const Employee = sequelize.define('Employee', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telegramId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialization: {
        type: DataTypes.ENUM(
          specialization.GASMAN, 
          specialization.LOCKSMITH
        ),
        allowNull: true
    },
    brigadeId: { 
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'Brigade', 
          key: 'id'
        }
      }
}, {
    timestamps: true,
});



module.exports = Employee;