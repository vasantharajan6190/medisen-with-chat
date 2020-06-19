import React,{useState,useEffect,useContext} from  "react"
import "./Chat.css"
import {toast} from "react-toastify"
import {createcontext} from "../../App"
import io, { Socket } from "socket.io-client"
import moment from "moment"
let socket
function Chat(){
    const main = useContext(createcontext)
    const [message,setmessage] = useState("") 
    const [messages,setmessages] = useState([])
    let name
    let roomname
    const [room,setroom] = main.room
    const endpoint = "localhost:5000/chat"
    const [currentuser,setcurrentuser] = main.currentuser
    const [loggedin,setloggedin] = main.loggedin
    if(loggedin===false)
    {window.location = "/login"}
    useEffect(()=>{
       // if(loggedin){
        socket = io(endpoint)
      name = currentuser.name
      roomname = room
      socket.emit("join",{name,roomname},()=>{
      })
      
      return()=>{
          socket.emit("disconnect");
          socket.off()
     // }
    }
    },[endpoint,currentuser,room])
    useEffect(()=>{
      //  if(loggedin){
       socket.on("message",(message)=>{
        console.log(message)
           setmessages([...messages,message]) 
       },()=>{

       })
   // }
    },[endpoint,messages])
   function onsubmit(e){
        e.preventDefault()
        if(message===""){
           return toast.error("Blank message not allowed",{className:"text-center font-weight-bold font-italic px-4 mt-5 rounded"})
        }
        name = currentuser.name
        roomname = room 
        const img = `http://localhost:5000/uploads/${currentuser.image}`
        socket.emit("sendmessage",{message,name,roomname,img},()=>{
            setmessage("")
        })
       
   }
   
    return(
        <div className="chat">
        {loggedin?
        <div>
        <div className="container d-flex justify-content-center">
     <h1 className="mess pt-5 font-weight-bold display-4 text-center" style={{color:"#000000"}}>Welcome to Chat Section </h1>
     </div>
     <div className="pt-5 d-flex justify-content-center">
     <div className="container main border rounded p-5 col-8">
     {messages.map(res=>{
        return (<div className=" mb-5">
        <div className="back">
        <p className="mess mb-0 font-weight-bold font-italic" style={{fontSize:"13px"}}><img src={res.img} width="20" style={{borderRadius:"20px"}}/>-({res.user.toUpperCase()})<span className="ml-1" style={{fontSize:"12px"}}>{res.time}</span></p>
        <h5 className="mess1 m-0 font-weight-normal ml-4">{res.text}</h5>
        </div>
        </div>)
     })}
     <div className="d-flex mt-5">
     <input required onKeyPress={e=>e.key==="Enter"?onsubmit(e):null} value={message} onChange={e=>setmessage(e.target.value)} className="form-control col-lg-10"  type="text" placeholder="Type The message"/>
     <button onClick={onsubmit} className="btn ml-2 btn-dark font-weight-bold border-dark rounded px-4-sm px-lg-5">Send</button>
     </div>
     </div>
     </div>
     </div>:
     <h1 className="text-center font-italic pt-5 display-4 font-weight-bold">Please Login to view chat section</h1>}
        </div>
    )
}

export default Chat