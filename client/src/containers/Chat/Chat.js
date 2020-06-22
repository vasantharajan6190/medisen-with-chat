import React,{useState,useEffect,useContext} from  "react"
import "./Chat.css"
import {toast} from "react-toastify"
import {createcontext} from "../../App"
import io, { Socket } from "socket.io-client"
import ScrollToBottom from 'react-scroll-to-bottom';
import $ from "jquery"
import moment from "moment"
let socket
function Chat(){
    const main = useContext(createcontext)
    const [message,setmessage] = useState("") 
    let [messages,setmessages] = useState([])
    let name
    let roomname
    const [room,setroom] = main.room
    let endpoint = "localhost:5000/chat"
    const [currentuser,setcurrentuser] = main.currentuser
    const [loggedin,setloggedin] = main.loggedin
    const [sendto,setsendto] = main.sendto
    let sample = {}
    const [click,setclick] = useState(true)
    if(loggedin===false)
    {window.location = "/login"}
    async function getmessages(){
       const ans = await fetch(`http://localhost:5000/messagebyroomname?roomname=${room}`,{headers:{}})
       const res = await ans.json()
       const result = res.map(s=>{
           const x = {}
           x.user = s.createdby
           x.text = s.message
           x.time = s.time
           x.img = s.profileimg
           return x 
       })
        setmessages(result)
    }
    useEffect(()=>{
        console.log("getmessage useEffect")
      getmessages()
    },[])
    useEffect(()=>{
       // if(loggedin){
        socket = io(endpoint)
      name = currentuser.name
      roomname = room
      socket.emit("join",{name,roomname},()=>{
      })
    //   return()=>{
    //       socket.emit("disconnect");
    //       socket.off()
    //  // }
    // }
    },[endpoint,currentuser,room])
   async function samplee(){
        if(message){
            let sendid
            const receiveid = sendto.id
            const role = currentuser.role
            const receiver = sendto.role
            const roomname = room
            const time =   moment().format('MMMM Do dddd, h:mm a')
            const createdby = currentuser.name
            const profileimg = "http://localhost:5000/uploads/"+currentuser.image
            const sender = role
            if(role==="doctor"){
                sendid = currentuser.doc_id
            } 
            if(role==="clinic"){
             sendid = currentuser.cli_id
         }
         if(role==="patient"){
             sendid = currentuser.pat_id
         }
         const body = {sendid,receiveid,sender,receiver,roomname,time,profileimg,message,createdby}
         const ans  = await fetch("http://localhost:5000/message",{
             method:"POST",
             headers:{},
             body:JSON.stringify(body)
         })
     }
    }
    
    useEffect(()=>{
         
       socket.on("message",(mess)=>{
        sample.text=mess.text
        setmessages([...messages,mess]) 
       })
samplee()
    $('.scrollbottom').animate({
        scrollTop: $('.scrollbottom').get(0).scrollHeight
    },3)
    },[messages])
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
       setclick(!click)
   }

    return(
        <div className="chat">
        {loggedin?
            <ScrollToBottom>
        <div>
        <div className="container d-flex justify-content-center">
     <h1 className="mess pt-5 font-weight-bold display-4 text-center" style={{color:"#000000"}}>Welcome to Chat Section </h1>
     </div>
     <div  className="d-flex justify-content-center mb-0 mt-3" style={{height:"60px"}}>
     <div className="bg-primary m-0 col-8">
     <p className="m-0 text-left pt-2">{sendto.img?<img src={`http://localhost:5000/uploads/${sendto.img}`} width="30" style={{borderRadius:"20px"}}/>:null}<span className="pl-2 font-italic font-weight-bold" style={{fontSize:"20px",color:"#000000",paddingTop:"1px"}}>{sendto.name}</span></p>
     </div>
     </div>
     <div className="mt-0 d-flex justify-content-center pb-5">
     <div className="container main border rounded p-5 col-8" >
     <div className="scrollbottom" style={{overflowY:"scroll",maxHeight:"500px",scrollBehavior:"smooth",overflowAnchor:"none"}}>
     {messages.map(res=>{
        return (
            <div className=" mb-5" style={{overflowAnchor:"auto"}}>
        <div className="back">
        <p className="mess mb-0 font-weight-bold font-italic" style={{fontSize:"13px"}}><img src={res.img} width="20" style={{borderRadius:"20px"}}/>-({res.user.toUpperCase()})<span className="ml-1" style={{fontSize:"12px"}}>{res.time}</span></p>
        <h5 className="mess1 m-0 font-weight-normal ml-4">{res.text}</h5>
        </div>
        </div>)
     })}
     </div>
     <div className="d-flex mt-5">
     <input required onKeyPress={e=>e.key==="Enter"?onsubmit(e):null} value={message} onChange={e=>setmessage(e.target.value)} className="form-control col-lg-10"  type="text" placeholder="Type The message"/>
     <button onClick={onsubmit} className="btn ml-2 btn-dark font-weight-bold border-dark rounded px-4-sm px-lg-5">Send</button>
     </div>
     </div>
     </div>
     </div>
     </ScrollToBottom>:
     <h1 className="text-center font-italic pt-5 display-4 font-weight-bold">Please Login to view chat section</h1>}
        </div>
    )
}

export default Chat