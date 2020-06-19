import React,{useState,useContext} from "react"
import {useHistory} from "react-router-dom"
import Displaycard from "../../components/displaycard/displaycard"
import "./Appointments.css"
import {createcontext} from "../../App"
import { toast } from "react-toastify"
import {unregister} from "../../Interceptor"
function Appointments(props){
    const history = useHistory()
    const main = useContext(createcontext)
    const [loggedin,setloggedin] = main.loggedin
    if(loggedin===false)
    {window.location = "/login"}
    const [appointments,setappointments] = main.appointments
    const [currentuser,setcurrentuser] = main.currentuser
    const [changed,setchanged] = useState({})
    function onchange(e){
       setchanged({...changed,[e.target.name]:e.target.value})
    }
    async function onsubmit(e){
        e.preventDefault()
        const {from,to,limit} = changed
        const role = currentuser.role
        let id=0
        if(role==="doctor"){
          id=currentuser.doc_id
        }
        else if(role==="clinic"){
          id=currentuser.cli_id
        }
        const body = {from,to,role,id,limit}
        await fetch("http://localhost:5000/updatetime",{
          method:"PUT",
          headers:{},
          body:JSON.stringify(body)
        })
        setcurrentuser({...currentuser,...changed})
        toast.success("Successfully altered consulting settings",{className:"text-center font-weight-bold font-italic mt-5 rounded"})
        history.push("/homepage")
    }
    return(
        <div className="appointments pt-5">
        {currentuser.role==="patient"?
        <div>
        {
            appointments.map((res,index)=>(
                <Displaycard key ={index} res={res}/>
            ))
        }
          </div>:
          <div className=" d-flex mt-5 justify-content-center container">
          <form className="justify-content-center" onSubmit={e=>onsubmit(e)}>
          <div className="d-flex">
          <div className="form-group mb-2">
            <label htmlFor="staticEmail2" className="font-weight-bold font-italic mr-3" style={{fontSize:"20px"}}>From:</label>
            <input type="time" name="from" onChange={e=>onchange(e)} className="form-control mr-3" id="staticEmail2" placeholder={currentuser.from}/>
          </div>
          <div className="form-group ml-3 mb-2">
            <label htmlFor="inputPassword2" className="font-weight-bold font-italic mr-3" style={{fontSize:"20px"}}>To:</label>
            <input type="time" name="to" onChange={e=>onchange(e)} className="form-control" id="inputPassword2" placeholder={currentuser.to}/>
          </div>
          </div>
          <div className="form-group my-3">
          <label htmlFor="limit" className="font-weight-bold font-italic mr-3" style={{fontSize:"20px"}}>Patients Limit Per Day</label>
          <input type="text" name="limit" onChange={e=>onchange(e)} className="form-control" id="limit" placeholder={currentuser.limit}/>
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-dark font-weight-bold border my-4  border-white px-5 ml-3 mb-2">Save</button>
          </div>
          </form>
          </div>
    }
    </div>
    )
}

export default Appointments