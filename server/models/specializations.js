const Sequelize = require("sequelize")
const db = require("../config/db")

const Specialization = db.define("specialization",{
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

module.exports = Specialization