// db.js
const { Sequelize } = require('sequelize');



const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432, 
});

module.exports = sequelize;
