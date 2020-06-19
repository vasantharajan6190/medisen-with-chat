const db = require("../config/db")
const Sequelize = require("sequelize")

const Doctor = db.define("doctor",{
  doc_id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull:false
},
name:{
 type:Sequelize.STRING(200),
 allowNull:false
},
email:{
type:Sequelize.STRING(200),
allowNull:false,
unique:true
},
password:{
    type:Sequelize.STRING(200),
    allowNull:false
    },
age:{
    type:Sequelize.STRING(20),
    allowNull:false
    },
gender:{
    type:Sequelize.STRING(200),
    allowNull:false
    },
address:{
    type:Sequelize.STRING(200),
    allowNull:false
    },
mobile:{
        type:Sequelize.STRING(200),
        allowNull:false
        },
role:{
    type:Sequelize.STRING(200),
    allowNull:false
    },
mcino:{
    type:Sequelize.STRING(200),
    allowNull:false
    },
qualifications:{
    type:Sequelize.STRING(200),
    allowNull:false
     },
specializations:{
    type:Sequelize.STRING(200),
    allowNull:false
    },
from:{
    type:Sequelize.STRING(200),
    allowNull:false
    },
to:{
    type:Sequelize.STRING(200),
    allowNull:false
    },
    image:{
        type:Sequelize.STRING(500)
      },
      limit:{
        type:Sequelize.STRING(100)
    },
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE
})

module.exports = Doctor