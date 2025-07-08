// Sidebar.js
import React from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

import "../style/MainNavigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBriefcase,
  faBookmark,
  faUser,
  faArrowRightFromBracket,
  faCompass,
  faRobot
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.jpg";
import { Link,useLocation } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";


export default function Sidebar() {
  const navigate=useNavigate()
  const handleLogout=async()=>{
    try{
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout-seeker`, {
        method: "POST",
        credentials: "include", // Important to send cookies
      })
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      const data = await response.json();
      console.log(data.message);
  
      // Clear cookies manually (since they were set manually)
      Cookies.remove("useraccessToken", { path: '/' });
      Cookies.remove("userrefreshToken", { path: '/' });
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
          <Link to='/main' className={location.pathname === "/main" ? "active" : ""}
          >
            <FontAwesomeIcon className='side-icon'icon={faMagnifyingGlass} /> <span className='link-label'style={{color:'#a7a5a5'}} >Search Jobs</span> 
          </Link>
          <Link to='/main/appliedjobs' className={location.pathname === "/main/appliedjobs" ? "active" : ""}
          >
            <FontAwesomeIcon className='side-icon'icon={faBriefcase} /> <span className='link-label'style={{color:'#a7a5a5'}} >Applied Jobs</span> 
          </Link>
          <Link to='/main/savedjobs' className={location.pathname === "/main/savedjobs" ? "active" : ""}
          >
            <FontAwesomeIcon style={{height:'20px'}} className='side-icon'icon={faBookmark} /> <span className='link-label' style={{color:'#a7a5a5'}}>Saved Jobs</span> 
          </Link>
          <Link to='/main/allusers' className={location.pathname === "/main/allusers" ? "active" : ""}
          >
            <FontAwesomeIcon className='side-icon'icon={faCompass} />  <span className='link-label' style={{color:'#a7a5a5'}}>Explore Peers</span> 
          </Link>
          <Link to='/main/chatbot' className={location.pathname === "/main/chatbot" ? "active" : ""}
          >
            <FontAwesomeIcon className='side-icon'icon={faRobot} />  <span className='link-label' style={{color:'#a7a5a5'}}>Chat with AI</span> 
          </Link>
          <Link to='/main/userprofile' className={location.pathname === "/main/userprofile" ? "active" : ""}
          >
            <FontAwesomeIcon className='side-icon'icon={faUser} />  <span className='link-label' style={{color:'#a7a5a5'}}>My Profile</span> 
          </Link>
         
         
        </div>
      </div>
      <button style={{outline:'none', border:'none'}}className="logout" onClick={handleLogout}>
        <FontAwesomeIcon icon={faArrowRightFromBracket} className='side-icon'/> <span className='logouttext' style={{color:'#666'}}>Log Out</span>
      </button>
    </div>
  );
}
