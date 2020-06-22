const router = require("express").Router()
const tokencheck = require("../middleware/tokencheck")
const controller = require("../controllers/Controller")
//Signup routes
//doc signup
router.post("/signupdoc",async (req,res)=>{
    try {
        const result = await controller.signupdoc(req.body)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})
//patient signup
router.post("/signuppat",async (req,res)=>{
    try {
        const result = await controller.signuppat(req.body)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})
//clinic signup
router.post("/signupcli",async (req,res)=>{
    try {
        const result = await controller.signupcli(req.body)
         res.json(result)
    } catch (error) {
        res.json(error)
    }
})
//login route
router.post("/login",async(req,res)=>{
    try {
        const result = await controller.login(req.body)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})
//get all doctors
router.get("/doc",async(req,res)=>{
    try {
        const result = await controller.getdoc()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
  
})
//get all clinics
router.get("/clinics",async(req,res)=>{
    try {
       const clinics = await controller.getclinic()
        res.json(clinics)
    } catch (error) {
        res.json(error)
    }
})
//update timings
router.put("/updatetime",tokencheck,async(req,res)=>{ 
    try {
        const result = await controller.updatetime(req.body)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})
//specialization
//create specialization
router.post("/specializations",async(req,res)=>{
   try {
       const result = await controller.postspecialization(req.body)
       res.json(result)
   } catch (error) {
       res.json(error)
   }
})
//get specialization
router.get("/specializations",async(req,res)=>{
    try {
        const result = await controller.getspecialization()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})
//appointments
//create appointments
router.post("/appointments",async(req,res)=>{
   try {
       const result = await controller.createappointment(req.body)
       if(result==="false"){
           res.json("false")
       }
       res.json(result)
   } catch (error) {
       res.json(error)
   }
})
//get appointments
router.get("/appointments",tokencheck,async(req,res)=>{
    try {
        const result = await controller.getappointments(req.query)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})
//delete appoitnments
router.delete("/patientdelete",tokencheck,async(req,res)=>{
    try {
        const result = await controller.patientdelete(req.query)
    } catch (error) {
        res.json(error)
    }
})
router.delete("/docclidelete",tokencheck,async(req,res)=>{
    try {
        const result = await controller.docclidelete(req.query)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})
//image
router.post("/image",async(req,res)=>{
try {
    const result = await controller.imageupload(req)
    res.json(result)
} catch (error) {
    res.json(error)
}
})
//messages
//post message
router.post("/message",async(req,res)=>{
    try {
        const result = await controller.postmessage(req.body)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})
//get messages by id
router.get("/message",async(req,res)=>{
    try {
        const result = await controller.getmessages(req.query)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})
//get message by roomname
router.get("/messagebyroomname",async(req,res)=>{
    try {
        const result = await controller.getmessagesbyroomname(req.query)
        res.json(result)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router