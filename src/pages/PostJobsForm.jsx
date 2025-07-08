import React, { useRef, useState } from "react";
import "../style/JobPost.css";
import "../style/SignUpform.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const PostJobsForm = () => {
  const [message, setmessage] = useState([]);
  const navigate = useNavigate();
  const place = useRef();
  const jobTitle = useRef();
  const industry = useRef();
  const jobDescription = useRef();
  const requirements = useRef();
  const jobType = useRef();
  const location = useRef();
  const salaryRange = useRef();
  const experienceLevel = useRef();
  const applicationDeadline = useRef();

  const addmessage = (message) => {
    setmessage((prev) => [...prev, message]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData = {
      jobTitle: jobTitle.current.value,
      place: place.current.value,
      industry: industry.current.value,
      jobDescription: jobDescription.current.value,
      requirements: requirements.current.value,
      jobType: jobType.current.value,
      location: location.current.value,
      salaryRange: salaryRange.current.value,
      experienceLevel: experienceLevel.current.value,
      applicationDeadline: applicationDeadline.current.value,
    };
    console.log("Job Data:", jobData);
    try {
      if (
        !jobTitle.current.value.trim() ||
        !industry.current.value.trim() ||
        !jobDescription.current.value.trim()
      ) {
        addmessage("Please fill in all required fields.");
        return;
      }
      if (
        applicationDeadline.current.value <
        new Date().toISOString().split("T")[0]
      ) {
        addmessage("Application deadline cannot be in the past");
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/recruiter/postjob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(jobData),
      });
      const data = await response.json();
      console.log("Response Data:", data);

      if (!response.ok) {
        addmessage(data.message || "Failed to post job, try again");
      }
      if (response.status === 403) {
        addmessage(
          "You are not authorized to post a job, please login as a recruiter"
        );
      }
      if (response.status === 401) {
        console.error("You are not logged in, please login to post a job");
      }
      if (response.status === 422) {
        addmessage("Validation error: Please check your input fields.");
      }
      if (response.status === 201) {
        console.log("Job posted successfully");
        jobTitle.current.value = "";
        industry.current.value = "";
        jobDescription.current.value = "";
        requirements.current.value = "";
        jobType.current.value = "";
        location.current.value = "";
        salaryRange.current.value = "";
        experienceLevel.current.value = "";
        applicationDeadline.current.value = "";
        navigate("/main-recruiter/view-jobs");
      }
    } catch (err) {
      console.log(err.message);
      return;
    }
  };

  return (
    <>
      <div className="container5">
        <div className="left-panel2">
          <div className="title-sec">
            <FontAwesomeIcon
              icon={faPlus}
              alt="Harper Logo"
              className="logo3"
            />
            <h3>Create Job</h3>
          </div>
          <p className="des">Define Details, budget and outline preferences</p>
          <div className="title-job">
            <h3>1. Job Details</h3>
            <p className="des2">Please use a descriptive title.</p>
          </div>
          <div className="title-comp">
            <h3>2. Compensation</h3>
            <p className="des3">
              Include pay details and benefit/perks your company offers.
            </p>
          </div>
        </div>

        <div className="right-panel3">
          <h3>Get Started with Hiring on Workora</h3>
          <p>Post Your Job and Attract Top Talent Instantly</p>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <label>Job title</label>
              <input
                ref={jobTitle}
                type="text"
                placeholder="e.g. Software Engineer"
              />
            </div>

            <div className="name-fields3">
              <div className="input-group6">
                <label>Job description</label>
                <textarea ref={jobDescription} type="text" />
              </div>
              <div className="input-group6">
                <label>Requirements</label>
                <textarea ref={requirements} type="text" />
              </div>
            </div>
            <div className="name-fields3">
              <div className="input-group">
                <label>Industry</label>
                <input
                  ref={industry}
                  type="text"
                  placeholder="e.g. Technology, Finance.."
                />
              </div>
              <div className="input-group">
                <label>Location</label>
                <input
                  ref={location}
                  type="text"
                  placeholder="e.g. Mumbai, Delhi, .."
                />
              </div>
              <div className="input-group">
                <label>Deadline</label>
                <input ref={applicationDeadline} type="date" />
              </div>
            </div>
            <br />
            <br />
            <br />

            <div className="name-fields3">
              <div className="input-group4">
                <label>Job-Type</label>
                <select ref={jobType} defaultValue="">
                  <option value="" disabled>
                    Select Job Type
                  </option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="input-group4">
                <label>Experience Level</label>
                <select ref={experienceLevel} defaultValue="">
                  <option value="" disabled>
                    Select Experience Level
                  </option>
                  <option value="fresher">Fresher</option>
                  <option value="0-1 year">0 - 1 year</option>
                  <option value="1-3 years">1 - 3 years</option>
                  <option value="3-5 years">3 - 5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
            </div>
            <div className="name-fields3">
              <div className="input-group4">
                <label>Work Mode</label>
                <select ref={place} defaultValue="">
                  <option value="" disabled>
                    Select Work mode
                  </option>
                  <option value="onSite">Onsite</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="input-group4">
                <label>Salary Range(rupees/annum)</label>
                <select ref={salaryRange}>
                <option value="" disabled>
                  Min-Max
                </option>
               <option value="1-2 LPA">1 - 2 LPA</option>
                <option value="2-3 LPA">2 - 3 LPA</option>
                <option value="3-4 LPA">3 - 4 LPA</option>
                <option value="4-5 LPA">4 - 5 LPA</option>
                <option value="5-6 LPA">5 - 6 LPA</option>
                <option value="6-7 LPA">6 - 7 LPA</option>
                <option value="7-8 LPA">7 - 8 LPA</option>
                <option value="8-9 LPA">8 - 9 LPA</option>
                <option value="9-10 LPA">9 - 10 LPA</option>
                <option value="10-12 LPA">10 - 12 LPA</option>
                <option value="12-15 LPA">12 - 15 LPA</option>
                <option value="15+ LPA">15+ LPA</option>
              </select>
              </div>
            </div>
            {message.map((message) => (
              <p style={{ margin: "0px", color: "red" }}>
                <FontAwesomeIcon icon={faExclamation} /> {message}
              </p>
            ))}

            <button type="submit">Post Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostJobsForm;
