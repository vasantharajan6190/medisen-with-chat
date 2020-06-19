'use strict';

const Specialization = require("../models/specializations");

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.createTable("specializations",{
    spec_id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
  },
  specialization:{
     type:Sequelize.STRING(200),
     allowNull :false
  },
  createdAt:Sequelize.DATE,
  updatedAt:Sequelize.DATE
  })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable("Specializations")
  }
};
