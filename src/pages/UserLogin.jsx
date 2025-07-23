import React, { useRef, useState } from "react";
import "../style/login.css";
import { Link, useNavigate } from "react-router-dom";
import "../style/SignUpform.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logoImage from "../assets/logo.jpg";
import {
  faBell,
  faBrain,
  faCalendar,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

export default function UserLogin() {
  const [loading, setloading] = useState(false);

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
    setloading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login-seeker`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(LoginIndata),
      });

      const data = await response.json();

    if (response.status === 400) {
      addmessage("Verify your email to continue login");
      setloading(false);
    }
    if (response.status === 403) {
      addmessage("Email not registered, please sign up");
      setloading(false);
    }
    if (response.status === 401) {
      addmessage("Wrong password, please try again");
      setloading(false);
    }
    if (!data || !data.userId) {
      console.log("User not found");
      setloading(false);
      return;
    }
      Cookies.set("useraccessToken", `${data.accessToken}`, { expires: 1 }); // Set access token with 1 day expiration
      Cookies.set("userrefreshToken", `${data.refreshToken}`, { expires: 7 }); // Set refresh token with 7 days expiration
      setloading(false);
      navigate("/main");
    } catch (err) {
      console.log(err.message);
      addmessage(
        "Internal server error, please try again later or check your network connection"
      );
      setloading(false);
      return;
    }
    console.log(LoginIndata);
    navigate("/main");
  };
  return (
    <>
      <div className="container2">
        {/* Your message rendering logic here */}

        <div className="left-panel">
          <div
            className="title-sec"
            style={{ marginBottom: "0px", marginTop: "0px" }}
          >
            <img src={logoImage} alt="Harper Logo" className="logo2" />
            <h3>Workora</h3>
          </div>
          <h2 style={{ margin: "0px" }}>
            Unlock Better Career Opportunities with Workora
          </h2>

          <div className="feature" style={{ margin: "0px" }}>
            <div
              className="feature-in"
              style={{ display: "flex", alignItems: "center", margin: "0px" }}
            >
              <span role="img" aria-label="calendar">
                <FontAwesomeIcon
                  className="icon3"
                  icon={faCalendar}
                ></FontAwesomeIcon>
              </span>
              <strong>Apply & Save with Ease </strong>
            </div>
            <p>
              Browse, save, and apply to jobs seamlessly—everything is just a
              click away, so you never lose track of your dream opportunities.
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
                  icon={faBrain}
                ></FontAwesomeIcon>
              </span>
              <strong> Ask AI, Anytime</strong>
            </div>
            <p>
              Got a question about a role, company, or how to craft your resume?
              Workora’s built-in AI assistant is ready 24/7 to help you stand
              out.
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
                  icon={faBell}
                ></FontAwesomeIcon>
              </span>
              <strong> Stay Instantly Updated</strong>
            </div>
            <p>
              Receive real-time notifications about job openings, application
              status, and upcoming interviews—no more guessing games.
            </p>
          </div>
        </div>

        <div className="right-panel">
          <h3>Get started with Workora</h3>
          <p>See How Workora Can Transform Your Job Search Journey</p>

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
            <Link to="/forgot-paasword">
              <p style={{ textAlign: "right", color: "black" }}>
                Forgot password?
              </p>
            </Link>
            {loading ? (
              <button className="signupbutton" type="submit">
                <div className="loader"></div>
              </button>
            ) : (
              <button className="signupbutton" type="submit">
                Login to my account
              </button>
            )}
            <p className="login-link">
              Do not have a account?{" "}
              <Link to="/user-signup">
                <span>Create Account</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
