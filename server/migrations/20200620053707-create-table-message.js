'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  return queryInterface.createTable("messages",{
    mess_id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull:false
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
        roomname:{
            type:Sequelize.STRING(100),
            allowNull:false
        },
        createdby:{
            type:Sequelize.STRING(200),
             allowNull:false
        },
        time:{
            type:Sequelize.STRING(200),
             allowNull:false
        },
        profileimg:{
            type:Sequelize.STRING(1000)
        },
        message:{
          type:Sequelize.STRING(1000),
          allowNull:false
        },
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE
  })
  },

  down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable("messages")
  }
};
