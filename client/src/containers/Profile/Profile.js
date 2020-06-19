import React,{useContext,useState} from "react"
import "./Profile.css"
import {createcontext} from "../../App"
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { FaWindows } from "react-icons/fa";
function Profile(){
    const main  = useContext(createcontext)
    const [currentuser,setcurrentuser] = main.currentuser
    const [loggedin,setloggedin] = main.loggedin
    if(loggedin===false)
    {window.location = "/login"}
   let role = currentuser.role
    let id = 0
    if(role==="doctor"){
        id = currentuser.doc_id
      }
      else if(role==="clinic"){
          id = currentuser.cli_id
      }
      else if(role==="patient"){
          id= currentuser.pat_id
      }
    return(
        <div className="profile">
        <div className="pt-5">
        {loggedin?
            <div className=" container text-center font-weight-bold font-italic">
            <p className="font-weight-bold display-4 font-italic text-center text-white">Your Profile</p>
            <div className="d-flex justify-content-center pt-4">
            <div className="text-left">
            <img className="mb-3 img-thumbnail bg-secondary rounded mx-auto d-block" src={`http://localhost:5000/uploads/${currentuser.image}`}width="290" height="200"/>
           <label>Edit Profile Image : </label>
            <FilePond server={`http://localhost:5000/image?role=${role}&id=${id}`} name="file"/>
            <h5><span >Name : </span><span>{currentuser.name}</span></h5>
            <h5><span >Address : </span><span>{currentuser.address}</span></h5>
            <h5><span >Role : </span><span>{currentuser.role}</span></h5>
            <h5><span >email : </span><span>{currentuser.email}</span></h5>
           </div>
           </div>
            </div>
            :
            <p className="text-center font-weight-bold font-italic display-4">Please Login to view profile</p>}
        </div>
        </div>
    )
}

export default Profile