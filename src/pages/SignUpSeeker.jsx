import React, { useRef, useState } from "react";
import "../style/SignUp.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../style/SignUpform.css";
import logoImage from "../assets/logo.jpg";
import { faBell, faBrain, faCalendar,faExclamation } from "@fortawesome/free-solid-svg-icons";

export default function SignUpSeeker() {
  const [loading,setloading]=useState(false)
  const[message,setmessage]=useState([])
  const navigate = useNavigate();
  const refs = {
    firstName: useRef(),
    lastName: useRef(),
    phone: useRef(),
    email: useRef(),
    password: useRef(),
  };

  const addmessage=(message)=>{
    setmessage(prev=>[...prev,message])
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setmessage([])
    const firstname = refs.firstName.current.value;
    const lastname = refs.lastName.current.value;
    const fullname = `${firstname} ${lastname}`.trim(); // spacing between names
    const formdata = {
      // name: refs.name.current.value,
      name: fullname,
      phone: refs.phone.current.value,
      email: refs.email.current.value,
      password: refs.password.current.value,
    };
    setloading(true)
    try {
      if (
        !firstname ||
        !lastname ||
        !formdata.phone ||
        !formdata.email ||
        !formdata.password
      ) {
        addmessage("All fields are required");
      }
      if (!/^\S+@\S+\.\S+$/.test(formdata.email)) {
        addmessage("Invalid email format");
      }
      if (!/^\d{10}$/.test(formdata.phone)) {
        addmessage("Phone number must be 10 digits long");
      }
      if (formdata.password.length < 8) {
        addmessage("Password must be at least 8 characters long");
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup-seeker`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formdata),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up");
      }
      if (response.status !== 201) {
       addmessage("Failed to sign up, please try again");
      }
      if (response.status === 422) {
        addmessage("Email already exists, please use a different email");
      }
      const data = await response.json();
      if (!data || !data.userId) {
        addmessage("User ID not returned from server");
      }
      console.log(data.message);
      setloading(false)
      navigate("/user-login");
      return data.message;
    } catch (error) {
      console.error("Error during form submission:", error);
      addmessage('Internal serbver error, please try again later or check your network connection');
      setloading(false)
      return;
    }
  };
  return (
    <>
      <div className="container2">
        <div className="left-panel3"  >
          <div className="title-sec" style={{marginTop:'0px'}}>
            <img src={logoImage} alt="Harper Logo" className="logo2" />
            <h3>Workora</h3>
          </div>
          <h2 style={{}}>Unlock Better Career Opportunities with Workora</h2>

          <div className="feature" style={{marginTop:'15px'}}>
            <div className="feature-in"  style={{display:'flex',alignItems:'center',margin:"0px"}}>
              <span role="img" aria-label="calendar">
                <FontAwesomeIcon
                  className="icon3"
                  icon={faCalendar}
                ></FontAwesomeIcon>
              </span>
              <strong>Apply & Save with Ease </strong>
            </div>
            <p style={{fontSize:'15px'}}>
              Browse, save, and apply to jobs seamlessly—everything is just a
              click away, so you never lose track of your dream opportunities.
            </p>
          </div>

          <div className="feature" style={{marginTop:'35px'}}>
            <div className="feature-in"  style={{display:'flex',alignItems:'center'}}>
              <span role="img" aria-label="graph">
                <FontAwesomeIcon
                  className="icon3"
                  icon={faBrain}
                ></FontAwesomeIcon>
              </span>
              <strong> Ask AI, Anytime</strong>
            </div>
            <p style={{fontSize:'15px'}}>
              Got a question about a role, company, or how to craft your resume?
              Workora’s built-in AI assistant is ready 24/7 to help you stand
              out.
            </p>
          </div>

          <div className="feature"  style={{marginTop:'35px'}}>
            <div className="feature-in"  style={{display:'flex',alignItems:'center'}}>
              <span role="img" aria-label="check">
                <FontAwesomeIcon
                  className="icon3"
                  icon={faBell}
                ></FontAwesomeIcon>
              </span>
              <strong> Stay Instantly Updated</strong>
            </div>
            <p style={{fontSize:'15px'}}>
              Receive real-time notifications about job openings, application
              status, and upcoming interviews—no more guessing games.
            </p>
          </div>

        </div>

        <div className="right-panel" >
          <h3 style={{marginTop:'60px'}}>Get started with Workora</h3>
          <p style={{marginBottom:'40px'}}>See How Workora Can Transform Your Job Search Journey</p>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="name-fields3">
              <div className="input-group" >
                <label htmlFor="firstName">First Name</label>
                <input
                  ref={refs.firstName}
                  type="text"
                  id="firstName"
                  placeholder="John"
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  ref={refs.lastName}
                  type="text"
                  id="lastName"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email">Work Email</label>
              <input
                type="email"
                ref={refs.email}
                id="email"
                placeholder="email@example.com"
              />
            </div>

            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input

                type="tel"
                ref={refs.phone}
                id="phone"
                placeholder="+1 (___) ___-____"
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                ref={refs.password}
                id="password"
                placeholder="••••••••"
              />
              
            </div>
            <div className="messagelist">
            {message.map((message)=>(
              <p style={{margin:'0px',color:'red'}}><FontAwesomeIcon icon={faExclamation}/> {message}</p>
            ))}</div>
            {loading ? <button className='signupbutton' type="submit">
                  <div className="loader"></div>
            </button>:            
            <button className='signupbutton' type="submit">Create my account</button>
}

            <p className="login-link">
              Already have an account? <Link to="/user-login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
