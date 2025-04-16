// models/Employee.js
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
    }
}, {
    timestamps: true,
});



module.exports = Employee;
