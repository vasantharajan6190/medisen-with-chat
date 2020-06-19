const bcrypt = require("bcrypt")
const Doctor  = require("../models/doctor")
const Patient = require("../models/patient")
const jwt = require("jsonwebtoken")
const tokengenerator = require("../utils/tokengenerator")
const Clinic = require("../models/clinic")
const Specialization = require("../models/specializations")
const Appointment = require("../models/appointment")
const fileUpload = require('express-fileupload')
const path = require("path")

async function signupdoc(body){
    const {name,email,password,age,gender,address,mobile,role,mcino,qualifications,specializations,from,to,limit} = body
    const ans = await Doctor.findAll({where:{email}})
if(ans.length>0){
    return "false"
}
else{
    if(mobile.length!==10){
        return "error"
    }
    else{
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt)
   const user = await Doctor.create({email,name,password:hashedpassword,age,gender,address,mobile,role,mcino,qualifications,specializations,from,to,limit})
   const token = tokengenerator(user.doc_id)
   return {backenddata:user,token}
    }
}
}

async function signuppat(body){
    const {name,email,password,age,gender,address,mobile,role,bloodpressure,bloodgroup,sugarlevel} = body
       const ans = await Patient.findAll({where:{email}})
   if(ans.length>0){
       return "false"
   }
   else{
       if(mobile.length!==10){
           return "error"
       }
       else{
       const salt = await bcrypt.genSalt(10);
       const hashedpassword = await bcrypt.hash(password,salt)
      const user = await Patient.create({email,name,password:hashedpassword,age,gender,address,mobile,role,bloodpressure,bloodgroup,sugarlevel})
      const token = tokengenerator(user.pat_id)
      return {backenddata:user,token}
       }
   }

}

async function signupcli(body){
    const {name,email,password,age,gender,address,mobile,role,clinicname,specializations,from,to,limit} = body
    const ans = await Clinic.findAll({where:{email}})
if(ans.length>0){
    return "false"
}
else{
    if(mobile.length!==10){
        return "error"
    }
    else{
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password,salt)
   const user = await Clinic.create({email,name,password:hashedpassword,age,gender,address,mobile,role,limit,clinicname,specializations,from,to})
   const token = tokengenerator(user.cli_id)
   return {backenddata:user,token}
    }
}
}

async function login(body){
    const {role,email,password} = body
    if(role==="patient"){
     const ans = await Patient.findAll({where:{email}})
     if(ans.length>0){
        const dbpassword = ans[0].password
        const passwordverify = await bcrypt.compare(password,dbpassword)
        if(passwordverify){
         const token = tokengenerator(ans.pat_id)
        return {ans,token}
        }
        else{
            return "incorrect"
        }
     }
     else{
          return "false"
     }
    }
    else if(role==="doctor"){
     const ans = await Doctor.findAll({where:{email}})
     if(ans.length>0){
        const dbpassword = ans[0].password
        const passwordverify = await bcrypt.compare(password,dbpassword)
        if(passwordverify){
         const token = tokengenerator(ans.doc_id)
         return {ans,token}
        }
        else{
            return "incorrect"
        }
     }
     else{
          return "false"
     }
    }
    else if(role==="clinic"){
     const ans = await Clinic.findAll({where:{email}})
     if(ans.length>0){
        const dbpassword = ans[0].password
        const passwordverify = await bcrypt.compare(password,dbpassword)
        if(passwordverify){
         const token = tokengenerator(ans.cli_id)
        return {ans,token}
        }
        else{
            return "incorrect"
        }
     }
     else{
          return "false"
     }
    }
}

async function getdoc(){
    const docs = await Doctor.findAll()
    return docs
}

async function getclinic(){
    const clinics = await Clinic.findAll()
    return clinics
}

async function updatetime(body){
    const {from,to,limit,id,role} = body
    if(role==="doctor"){
      const ans = await Doctor.update({from,to,limit},{where:{doc_id:id}})
      return (ans)
    }
    else if(role==="clinic"){
     const ans =await  Clinic.update({from,to,limit},{where:{cli_id:id}})
     return (ans)
    }
}

async function postspecialization(body){
    const {specialization} = body
        const ans= await Specialization.create({specialization})
        return (ans)
}

async function getspecialization(){
    const ans = await Specialization.findAll({attributes:["specialization"]})
    const result = ans.map(a=>(a.specialization))
    return (result)
}

async function createappointment(body){
    const {role,id,pat_id} = body
        if(role==="doctor"){
            const check = await Doctor.findAll({attributes:["limit"],where:{doc_id:id}})
            const lengthcheck = check[0].dataValues.limit
            const willcheck = await Appointment.findAll({attributes:["app_id"],where:{doc_id:id}})
            if(lengthcheck>=willcheck.length){
                const ans = await Appointment.create({pat_id,doc_id:id})
                return ans
            }
             return "false"
        }
        else if(role==="clinic"){
            const check = await Clinic.findAll({attributes:["limit"],where:{cli_id:id}})
            const lengthcheck = check[0].dataValues.limit
            const willcheck = await Appointment.findAll({attributes:["app_id"],where:{cli_id:id}})
            if(lengthcheck>=willcheck.length){
                const ans = await Appointment.create({pat_id,cli_id:id})
                return ans
            }
            return "false"
        }
}

async function getappointments(body){
    const {role,id} = body
    Appointment.belongsTo(Doctor,{foreignKey:"doc_id"})
    Appointment.belongsTo(Clinic,{foreignKey:"cli_id"})
    Appointment.belongsTo(Patient,{foreignKey:"pat_id"})
    Doctor.hasMany(Appointment,{foreignKey:"doc_id"})
    Patient.hasMany(Appointment,{foreignKey:"pat_id"})
    Clinic.hasMany(Appointment,{foreignKey:"cli_id"})
    if(role==="doctor"){
        const ans = await Appointment.findAll({attributes:["app_id"],where:{doc_id:id},include:[Patient]})
        const result = ans.map(s=>(s.patient))
        return result
     }
     else if(role==="clinic"){
        const ans = await Appointment.findAll({attributes:["app_id"],where:{cli_id:id},include:[Patient]})
        const result = ans.map(s=>(s.patient))
        return result
     }
     else if(role==="patient"){
        const ans = await Appointment.findAll({attributes:['app_id'],where:{pat_id:id},include:[Doctor,Clinic]})
        const result = ans.map(res1=>{
            if(res1.clinic){
                return res1.clinic
            }
            else if(res1.doctor){
              return res1.doctor
            }
        })
        return result
     }
}

async function patientdelete(body){
    const {role,id,pat_id} =body
    if(role==="doctor"){
        const ans = await Appointment.destroy({where:{pat_id,doc_id:id}})
        return ans
     }
     else if(role==="clinic"){
         const ans = await Appointment.destroy({where:{pat_id,cli_id:id}})
         return ans
     }
}

async function docclidelete(body){
    const {pat_id,role,id} = body
    if(role==="doctor"){
        const ans = await Appointment.destroy({where:{pat_id,doc_id:id}})
        return ans
     }
     else if(role==="clinic"){
         const ans = await Appointment.destroy({where:{pat_id,cli_id:id}})
         return ans
     }
}

async function imageupload(body){
    const {role,id} = body.query
    const file= body.files.file
    const ree = path.join(__dirname,"../public/uploads")
    file.mv(`${ree}\\${file.name}`)
    const path1 = `${file.name}`
        if(role==="doctor"){
            const ans = await Doctor.update({image:path1},{where:{doc_id:id}})
            return ans
         }
         else if(role==="clinic"){
            const ans = await Clinic.update({image:path1},{where:{cli_id:id}})
             return ans
         }
         else if(role==="patient"){
            const ans = await Patient.update({image:path1},{where:{pat_id:id}})
             return ans
         }
}
module.exports = {
    signupdoc,
    signuppat,
    signupcli,
    login,
    getdoc,
    getclinic,
    updatetime,
    getspecialization,
    postspecialization,
    createappointment,
    getappointments,
    patientdelete,
    docclidelete,
    imageupload
}