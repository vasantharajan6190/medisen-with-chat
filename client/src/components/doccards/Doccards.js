import React,{useContext} from "react"
import {toast} from "react-toastify"
import {Link,useHistory,useLocation} from "react-router-dom"
import { FaHandHoldingHeart,FaCheck } from 'react-icons/fa';
import {createcontext} from "../../App"
import axios from "axios"
import {unregister} from "../../Interceptor"
import "./Doccards.css"
function Doccards({res}){
    const history = useHistory()
    const location = useLocation()
    const routename = location.pathname
    const main = useContext(createcontext)
    const [currentuser,setcurrentuser] = main.currentuser
    const [docappointments,setdocappointments] = main.docappointments
    const [room,setroom] = main.room
    async function onclick(e){
        e.preventDefault()
        const pat_id = res.pat_id
        const role = currentuser.role
        let id=0
        if(role==="doctor"){
          id = currentuser.doc_id
        }
        else if(role==="clinic"){
            id = currentuser.cli_id
        }
        const ans = await fetch(`http://localhost:5000/docclidelete?pat_id=${pat_id}&role=${role}&id=${id}`,{
        method:"DELETE",  
        headers:{}
        })        
        let indexto= 0
        docappointments.map((result,index)=>{
            if(result.name===res.name){
                indexto=index
            }
        })
        docappointments.splice(indexto,1)
        toast.success("Completed the appointment",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
        history.push(routename)
    }
    async function gotochat(e){
         e.preventDefault()
         const roomname = (currentuser.name+res.name).trim()
         setroom(roomname)
         history.push("/chat")
    }
    return(
        <div className="container">
        <div className="card" style={{marginBottom:"20px"}}>
        <h3 className="card-header font-italic font-weight-bold text-white bg-dark">
          {res.name}
        </h3>
        <div className="card-body" style={{backgroundColor:"aliceblue"}}>
        <img src={`http://localhost:5000/uploads/${res.image}`} className="img-thumbnail" alt="..." width="220"/>
          <h5 className="card-title  font-italic  font-weight-bold">Age : {res.age}</h5>
          <p className="card-text font-weight-bold"><h5 className="font-italic font-weight-bold">Address : </h5>{res.address}</p>
          <div className="d-flex justify-content-start mb-3">
          <h6 className="font-weight-bold"><span className="font-weight-bold font-italic">Blood Pressure : </span>{res.bloodpressure}</h6>
          <h6 className="ml-3 font-weight-bold"><span className="font-weight-bold font-italic">Sugar Level : </span>{res.sugarlevel}</h6>
          <h6 className="ml-3 font-weight-bold"><span className="font-weight-bold font-italic">Blood Group : </span>{res.bloodgroup}</h6>
          </div>
          <button onClick={e=>onclick(e)} className="btn btn-warning font-weight-bold"><FaCheck/> Completed</button>
           <button onClick={(e)=>gotochat(e)} className="btn btn-warning ml-3 font-weight-bold">Chat With patient</button>
          </div>
      </div>
        </div>
    )
}

export default Doccards