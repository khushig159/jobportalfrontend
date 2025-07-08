import React, { useRef,useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import Cookies from 'js-cookie';
import "../style/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/SignUpform.css";
import logoImage from "../assets/logo.jpg";
import {
  faBrain,
  faBullhorn,
  faNoteSticky,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function RecruiterLogin() {
  const [loading,setloading]=useState(false)
  const [message, setmessage] = useState([]);
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const addmessage = (message) => {
    setmessage((prev) => [...prev, message]);
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setmessage([]);

    const LoginIndata = {
      email: email.current.value,
      password: password.current.value,
    };
    setloading(true)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login-recruiter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(LoginIndata),
        }
      );
      const data = await response.json();
     
      if (response.status !== 200) {
        addmessage("Failed to login, please try again later");
      }
      if (response.status === 403) {
        addmessage("Email not registered, please sign up");
      }
      if (response.status === 401) {
        addmessage("Wrong password, please try again");
      }
      if (response.status === 400) {
        addmessage("Please verify your email before logging in.");
      }
      if (!data || !data.userId) {
        throw new Error("User ID not returned from server");
      }
      console.log(data.message);
      setloading(false)

      navigate("/main-recruiter");
    } catch (err) {
      console.log(err.message);
      setloading(false)

      return;
    }
    console.log(LoginIndata);
    navigate("/main-recruiter");
  };
  return (
  
    <div
    className="container2"
  >      <div className="left-panel">
        <div
          className="title-sec"
          style={{ marginBottom: "0px", marginTop: "0px" }}
        >
          <img src={logoImage} alt="Harper Logo" className="logo2" />
          <h3>Workora</h3>
        </div>
        <h2 style={{ marginTop: "0px", marginBottom: "0px" }}>
          Empower Your Recruitment Process with Workora
        </h2>

        <div className="feature">
          <div
            className="feature-in"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span role="img" aria-label="calendar">
              <FontAwesomeIcon
                className="icon3"
                icon={faBullhorn}
              ></FontAwesomeIcon>
            </span>
            <strong>Post Jobs Effortlessly </strong>
          </div>
          <p style={{ fontSize: "15px" }}>
            Reach top talent quickly with an intuitive job posting interface
            that simplifies the entire process.
          </p>
        </div>

        <div className="feature">
          <div
            className="feature-in"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span role="img" aria-label="graph">
              <FontAwesomeIcon
                className="icon3"
                icon={faNoteSticky}
              ></FontAwesomeIcon>
            </span>
            <strong>Streamline Application Management</strong>
          </div>
          <p style={{ fontSize: "15px" }}>
            Review and track candidates with ease using a clean, organized
            dashboard tailored for efficiency.
          </p>
        </div>

        <div className="feature">
          <div
            className="feature-in"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span role="img" aria-label="check">
              <FontAwesomeIcon
                className="icon3"
                icon={faBrain}
              ></FontAwesomeIcon>
            </span>
            <strong> AI-Powered Recruitment Assistance</strong>
          </div>
          <p style={{ fontSize: "15px" }}>
            Let AI help you screen resumes and draft job descriptions—saving
            time and improving decision-making.
          </p>
        </div>
      </div>

      <div className="right-panel">
        <h3>Get started with Workora</h3>
        <p>See How Workora Can Transform Your Hiring Journey</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="email">Work Email</label>
            <input
              type="email"
              ref={email}
              id="email"
              placeholder="email@example.com"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              ref={password}
              id="password"
              placeholder="••••••••"
            />
          </div>
          {message.map((message) => (
            <p style={{ margin: "0px", color: "red" }}>
              <FontAwesomeIcon icon={faExclamation} /> {message}
            </p>
          ))}

          <Link to="/forgot-paaswordrec">
            <p style={{ textAlign: "right", color: "black" }}>
              Forgot password?
            </p>
          </Link>

          {loading ? <button className='signupbutton' type="submit">
                  <div className="loader"></div>
            </button>:            
            <button className='signupbutton' type="submit">Login to my account</button>
}
          <p className="login-link">
            Do not have a account?{" "}
            <Link to="/recruiter-signup">
              <span>Create Account</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
