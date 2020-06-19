const express =require("express")
const cors = require("cors")
const http = require("http")
const app = express()
const moment = require("moment")
const server = http.createServer(app)
var socketio = require('socket.io');
const io = socketio(server)
const fileUpload = require('express-fileupload')
const port = process.env.PORT || 5000
const db = require("./config/db")
app.use(cors())
app.use(express.json())
app.use(express.static("public"))
app.use(fileUpload())
db.authenticate()
.then(res=>console.log("database connected"))
.catch(err=>console.log(err))
app.use("/",require("./routes/index"))


    io.of('/chat').on("connection",(socket)=>{
        let currentuser
        let currentroom 
        socket.on("join",({name,roomname},callback)=>{
            currentuser = name
            currentroom = roomname
            socket.emit("message",{user:"admin",text:`${name} welcome to the room ${roomname}`,time:moment().format('MMMM Do dddd, h:mm a')})
            socket.broadcast.to(roomname).emit("message",{user:"admin",text:`${name} has joined`,time:moment().format('MMMM Do dddd, h:mm a')})
            socket.join(roomname)
            callback()
        })
        socket.on("sendmessage",({message,roomname,name,img},callback)=>{
            socket.emit("message",{user:name,text:message,time:moment().format('MMMM Do dddd, h:mm a'),img})
            socket.to(roomname).emit("message",{user:name,text:message,time:moment().format('MMMM Do dddd, h:mm a'),img})
            callback()
        })
        socket.on("disconnect",()=>{
            socket.to(currentroom).emit("message",{user:"Admin",text:`${currentuser} has left the room`,time:moment().format('MMMM Do dddd, h:mm a')})
        })
    })
server.listen(port,()=>{
    console.log(`server started at ${port}`)
})