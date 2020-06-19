const Sequelize = require("sequelize")
const db = require("../config/db")

const Appointment = db.define("appointment",{
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

module.exports = Appointment