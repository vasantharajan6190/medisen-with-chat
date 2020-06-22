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

var client =[]
    io.of('/chat').on("connection",(socket)=>{
        let currentuser
        let currentroom 
        socket.on("login",(name)=>{
             currentuser=name.name
            console.log("newuser",name.name)
            if(client.indexOf(name.name)===-1){
           client.push(name.name)
            }
            socket.broadcast.emit("online",{name:client})
        })
       
        socket.on("join",({name,roomname},callback)=>{
            currentuser = name
            currentroom = roomname
            socket.emit("message",{user:"admin",text:`welcome ${name}`,time:moment().format('MMMM Do dddd, h:mm a')})
            socket.broadcast.to(roomname).emit("message",{user:"admin",text:`${name} has joined`,time:moment().format('MMMM Do dddd, h:mm a')})
            socket.join(roomname)
            callback()
        })
        socket.on("sendmessage",({message,roomname,name,img},callback)=>{
            socket.emit("message",{user:name,text:message,time:moment().format('MMMM Do dddd, h:mm a'),img})
            socket.to(roomname).emit("message",{user:name,text:message,time:moment().format('MMMM Do dddd, h:mm a'),img})
            callback()
        })
        socket.once("disconnect",()=>{
            var index = client.indexOf(currentuser);
            if (index !== -1) 
            {
                client.splice(index, 1);
            }
            socket.broadcast.emit("online",{name:client})
            socket.to(currentroom).emit("message",{user:"Admin",text:`${currentuser} has left the chat`,time:moment().format('MMMM Do dddd, h:mm a')})
         
        })
    })
server.listen(port,()=>{
    console.log(`server started at ${port}`)
})