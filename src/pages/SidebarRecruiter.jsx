// Sidebar.js
import React from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

import "../module/MainNavigation2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGroup,
  faPlus,
  // faMagnifyingGlass,
  faBriefcase,
  faHome,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.jpg";
import { Link,useLocation } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";


export default function Sidebar() {
  const navigate=useNavigate()
  const handleLogout=async()=>{
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout-recruiter`, {
        method: "POST",
        credentials: "include", // Important to send cookies
      })
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      const data = await response.json();
      console.log(data.message);
  
      // Clear cookies manually (since they were set manually)
      Cookies.remove("refreshToken", { path: '/' });
      Cookies.remove("accessToken", { path: '/' });
      navigate("/");
    } catch (error) {
      console.log("Error logging out: " + error.message);
    }
  };
    const location=useLocation()
  return (
    <div className="sidebar">
      <div className="sidebartopest">
        <div className="sidebartop">
          <img src={logo} alt="" />
          <h2>Workora</h2>
        </div>

        <div className="menu">
          <Link to='/main-recruiter' className={location.pathname === "/main-recruiter" ? "active" : ""}
          >
            <FontAwesomeIcon className='side-icon'icon={faHome} /><span className='link-label'style={{color:'#a7a5a5'}} >Home</span>  
          </Link>
          <Link to='/main-recruiter/view-jobs' className={location.pathname === "/main-recruiter/view-jobs" ? "active" : ""}
          >
            <FontAwesomeIcon className='side-icon'icon={faBriefcase} /> <span className='link-label'style={{color:'#a7a5a5'}} >Your Jobs</span> 
          </Link>
          <Link to='/main-recruiter/allcandidates' className={location.pathname === "/main-recruiter/allcandidates" ? "active" : ""}
          >
            <FontAwesomeIcon className='side-icon'icon={faUserGroup} /><span className='link-label'style={{color:'#a7a5a5'}} >Candidates</span> 
          </Link>
          <Link to='/main-recruiter/post-jobs' className={location.pathname === "/main-recruiter/post-jobs" ? "active" : ""}
          >
            <FontAwesomeIcon className='side-icon'icon={faPlus} /> <span className='link-label'style={{color:'#a7a5a5'}} >Create Job</span> 
          </Link>
        </div>
      </div>
      <button style={{outline:'none', border:'none'}}className="logout" onClick={handleLogout}>
      <FontAwesomeIcon icon={faArrowRightFromBracket} className='side-icon'/> <span className='logouttext' style={{color:'#666'}}>Log Out</span>
      </button>
    </div>
  );
}
