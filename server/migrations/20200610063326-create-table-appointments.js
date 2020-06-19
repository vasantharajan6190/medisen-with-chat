'use strict';

const { query } = require("../config/db");

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable("appointments",{
    app_id:{
      type:Sequelize.INTEGER,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
  },
  pat_id:{
   type:Sequelize.INTEGER,
   references:{
       model:"patients",
       key:"pat_id"
   }
  },
  doc_id:{
      type:Sequelize.INTEGER,
      references:{
          model:"doctors",
          key:"doc_id"
      }
     },
     cli_id:{
      type:Sequelize.INTEGER,
      references:{
          model:"clinics",
          key:"cli_id"
      }
     },
  createdAt:Sequelize.DATE,
  updatedAt:Sequelize.DATE
   })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("appointments")
  }
};
