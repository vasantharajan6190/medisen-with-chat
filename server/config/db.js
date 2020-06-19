const { Sequelize } = require('sequelize');
module.exports= new Sequelize('medisen', 'postgres', 'password', {
    host: 'localhost',
    dialect:'postgres'
  });
  