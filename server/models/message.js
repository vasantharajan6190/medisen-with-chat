const db = require("../config/db")
const Sequelize = require("sequelize")

const Message = db.define("message",{
  mess_id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull:false
},
pat_id:{
    type:Sequelize.INTEGER,
    autoIncrement:false,
    references:{
        model:"patients",
        key:"pat_id"
    }
   },
   doc_id:{
       type:Sequelize.INTEGER,
       autoIncrement:false,
       references:{
           model:"doctors",
           key:"doc_id"
       }
      },
      cli_id:{
       type:Sequelize.INTEGER,
       autoIncrement:false,
       references:{
           model:"clinics",
           key:"cli_id"
       }
      },
      roomname:{
          type:Sequelize.STRING(500),
          allowNull:false
      },
      createdby:{
          type:Sequelize.STRING(500),
           allowNull:false
      },
      time:{
          type:Sequelize.STRING(500),
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

module.exports = Message