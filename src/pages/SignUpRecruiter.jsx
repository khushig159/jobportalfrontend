import React from "react";
import { useRef, useState } from "react";
import "../style/SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/SignUpform.css";
import logoImage from "../assets/logo.jpg";
import {
  faBrain,
  faBullhorn,
  faNoteSticky,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";

export default function SignUpRecruiter() {
    const [loading,setloading]=useState(false)
  const [message, setmessage] = useState([]);
  const navigate = useNavigate();
  const refs = {
    name: useRef(),
    password: useRef(),
    email: useRef(),
    companyLocation: useRef(),
    industry: useRef(),
    companysize: useRef(),
  };

  const addmessage = (message) => {
    setmessage((prev) => [...prev, message]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setmessage([]);

    const formdata = {
      name: refs.name.current.value,
      password: refs.password.current.value,
      email: refs.email.current.value,
      companyLocation: refs.companyLocation.current.value,
      industry: refs.industry.current.value,
      companysize: refs.companysize.current.value,
    };

    setloading(true)

    // If all validations pass, proceed with form submission
    try {
      if (
        !formdata.name ||
        !formdata.password ||
        !formdata.email ||
        !formdata.companyLocation ||
        !formdata.industry ||
        !formdata.companysize
      ) {
        addmessage("All fields are required");
      }
      if (!/^\S+@\S+\.\S+$/.test(formdata.email)) {
        addmessage("Invalid email format");
        setloading(false); // ✅ stop loader
      }
      if (formdata.password.length < 8) {
        addmessage("Password must be at least 8 characters long");
        setloading(false);
      }
      if (!formdata.companyLocation) {
        addmessage("Company location is required");
        setloading(false);
      }
      if (!formdata.industry) {
        addmessage("Industry is required");
        setloading(false);
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signuprecruiter`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formdata),
        }
      );

      const data = await response.json();

     
      if (response.status === 422) {
        addmessage("Email already exists, please use a different email");
        setloading(false);
      }
      if (!data || !data.userId) {
        addmessage("failed to sign up, please try again");
        setloading(false);
        return;
      }
      console.log(data.message);
      setloading(false)

      navigate("/recruiter-login");
      return data.message;
    } catch (error) {
      setloading(false)
      console.error("Error during form submission, try again later or check network connection");
      console.error(error.message);

      return;
    }

    //Example: navigate("/success");
  };

  return (
    <>
      <div
        className="container2"
      >
        {" "}
        <div className="left-panel">
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
            <div className="name-fields3">
              <div className="input-group">
                <label htmlFor="name">Comapany Name</label>
                <input
                  ref={refs.name}
                  type="text"
                  id="name"
                  placeholder="John"
                />
              </div>
              <div className="input-group">
                <label htmlFor="companyLocation">Comapny Location</label>
                <input
                  ref={refs.companyLocation}
                  type="text"
                  id="companyLocation"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="name-fields3">
              <div className="input-group">
                <label htmlFor="companysize">Company Size</label>
                <select ref={refs.companysize} id="companysize" defaultValue="">
                  <option value="" disabled>
                    Company size
                  </option>
                  <option value="1-10">1–10</option>
                  <option value="11-50">11–50</option>
                  <option value="51-200">51–200</option>
                  <option value="201-500">201–500</option>
                  <option value="501-1000">501–1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="industry">Industry</label>
                <input
                  type="text"
                  ref={refs.industry}
                  id="industry"
                  placeholder="Technology,Finance"
                />
              </div>
            </div>
            <div className="name-fields3">
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  ref={refs.email}
                  id="email"
                  placeholder="email@example.com"
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
            </div>
            {message.map((message) => (
              <p style={{ margin: "0px", color: "red" }}>
                <FontAwesomeIcon icon={faExclamation} /> {message}
              </p>
            ))}

{loading ? <button className='signupbutton' type="submit">
                  <div className="loader"></div>
            </button>:            
            <button className='signupbutton' type="submit">Create my account</button>
}

            <p className="login-link">
              Already have an account? <Link to="/recruiter-login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
