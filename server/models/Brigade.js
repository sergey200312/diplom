const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

module.exports = (sequelize, DataTypes) => {
  const Brigade = sequelize.define('Brigade', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'brigades'
  });

  Brigade.associate = function(models) {
    Brigade.hasMany(models.Employee, {
      foreignKey: 'brigadeId',
      as: 'employees'
    });
  };

  return Brigade;
};
