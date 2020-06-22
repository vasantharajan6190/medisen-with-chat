import React,{useState, useEffect,useContext} from "react"
import {useHistory} from "react-router-dom"
import "./chats.css"
import {createcontext} from "../../App"
import {unregister} from "../../Interceptor"
import io from "socket.io-client"
let socket
function Chats(){
    const endpoint = "localhost:5000/chat"
    const main = useContext(createcontext)
    const history = useHistory()
    const [loggedin,setloggedin] = main.loggedin
    const [currentuser,setcurrentuser] = main.currentuser
    const [users,setusers] = main.users
    const [room,setroom] = main.room
    const [online,setonline] = main.online
    const [sendto,setsendto] = main.sendto
    if(loggedin===false)
    {window.location = "/login"}
    function onsubmit(e){
       e.preventDefault()
       const clickedname = e.target.innerText
       users.map(e=>{
           if(e.name===clickedname){
               return setsendto(e)
           }
       })
       let roomname
       if(currentuser.role==="patient"){
         roomname = (e.target.innerText+currentuser.name).trim()
       }
       else{
       roomname = (currentuser.name+e.target.innerText).trim()
       }
       setroom(roomname)
       history.push("/chat")
    }
    async function getusers(){
        const role = currentuser.role
        let id
        if(role==="doctor"){
            id= currentuser.doc_id
        }
        if(role==="clinic"){
            id= currentuser.cli_id
        }
        if(role==="patient"){
            id= currentuser.pat_id
        }
        const ans = await fetch(`http://localhost:5000/message?id=${id}&role=${role}`,{headers:{}})
        const res = await ans.json()
        setusers(res)
    }
    useEffect(()=>{
      getusers()
    },[loggedin])
    return(
        <div className="chats">
        <div className="container d-flex justify-content-center">
        <h1 className="mess pt-5 font-weight-bold display-4 text-center" style={{color:"#000000"}}>Your Chats </h1>
        </div>
        <div className="pt-5 d-flex justify-content-center">
        <div className="container main border rounded p-5 col-8">
        {users.map(s=>{
            return(
                <div className="users d-flex border-bottom border-primary container mb-3 pb-3">
                {s.img?<img src={`http://localhost:5000/uploads/${s.img}`} className="rounded-circle border border-warning" width="40" height="50px"/>:null}
                <h5 className="ml-2 mt-3 font-weight-bold font-italic text-dark" onClick={e=>onsubmit(e)}>{s.name}</h5>
                {online.indexOf(s.name)!==-1?<div className="bg-success" style={{width:"10px",height:"10px",marginTop:"25px",marginLeft:"10px",borderRadius:"50%"}}></div>:null}
                </div>
            )
        })}
        </div>
        </div>
        </div>
    )
}

export default Chats