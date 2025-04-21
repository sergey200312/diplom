const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Brigade.js
const Brigade = sequelize.define('Brigade', {
  name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  description: {
      type: DataTypes.TEXT,
      allowNull: true
  }
});

// Ассоциации


module.exports = Brigade;
