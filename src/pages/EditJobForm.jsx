import React, { useRef, useEffect ,useState} from "react";
import "../style/JobPost.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen,faExclamation } from "@fortawesome/free-solid-svg-icons";

const EditJobForm = () => {
  const [message, setmessage] = useState([]);
  const { jobId } = useParams();
  const navigate = useNavigate();

  const jobTitle = useRef();
  const place = useRef();
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

  useEffect(() => {
    console.log("Job ID:", jobId);
    const fetchJobs = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/recruiter/postedjobs`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for authentication
        }
      );
      const data = await response.json();
      console.log("Fetched Jobs:", data);
      const job = data.jobs.find((j) => j._id === jobId);
      if (job) {
        console.log("Job found:", job);
        place.current.value = job.place;
        jobTitle.current.value = job.jobTitle;
        industry.current.value = job.industry;
        jobDescription.current.value = job.jobDescription;
        requirements.current.value = job.requirements;
        jobType.current.value = job.jobType;
        location.current.value = job.location;
        salaryRange.current.value = job.salaryRange;
        experienceLevel.current.value = job.experienceLevel;
        applicationDeadline.current.value = job.applicationDeadline;
      }
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
    };
    fetchJobs();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedJobData = {
      place: place.current.value,
      jobTitle: jobTitle.current.value,
      industry: industry.current.value,
      jobDescription: jobDescription.current.value,
      requirements: requirements.current.value,
      jobType: jobType.current.value,
      location: location.current.value,
      salaryRange: salaryRange.current.value,
      experienceLevel: experienceLevel.current.value,
      applicationDeadline: applicationDeadline.current.value,
    };
    console.log("Job Data:", updatedJobData);
    try {
      if (
        applicationDeadline.current.value <
        new Date().toISOString().split("T")[0]
      ) {
        addmessage("Application deadline cannot be in the past");
      }
      if (
        !jobTitle.current.value.trim() ||
        !industry.current.value.trim() ||
        !jobDescription.current.value.trim()
      ) {
        addmessage("Please fill in all required fields.");
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/recruiter/editjob/${jobId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(updatedJobData),
        }
      );
      const data = await response.json();
      console.log("Response Data:", data);

      if (!response.ok) {
        addmessage(data.message || "Failed to post job, try again");
      }
      if (response.status === 403) {
        addmessage(
          "You are not authorized to edit this job, please login as a recruiter"
        );
      }
      if (response.status === 401) {
        console.log("You are not logged in, please login to edit a job");
      }
      if (response.status === 422) {
        addmessage("Validation error: Please check your input fields.");
      }
      if (response.status === 404) {
        addmessage("Job not found, please check the job ID");
      }
      if (response.status === 200) {
        console.log("Job updated successfully");
        place.current.value = "";
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
            <FontAwesomeIcon icon={faPen} alt="Harper Logo" className="logo3" />
            <h3>Update Job</h3>
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
          <h3>Refine Your Listing with Workora</h3>
          <p>Make Updates to Keep Your Opportunity Fresh and Relevant</p>

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
                <label>Application deadline</label>
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
                  <option value="1-10">Full-time</option>
                  <option value="11-50">Part-time</option>
                  <option value="51-200">Internship</option>
                </select>
              </div>
              <div className="input-group4">
                <label>Experience Level</label>
                <select ref={experienceLevel} defaultValue="">
                  <option value="" disabled>
                    Select Experience Level
                  </option>
                  <option value="fresher">Fresher</option>
                  <option value="0-1">0 - 1 year</option>
                  <option value="1-3">1 - 3 years</option>
                  <option value="3-5">3 - 5 years</option>
                  <option value="5+">5+ years</option>
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
                  <option value="onsite">Onsite</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div className="input-group4">
                <label>Salary Range</label>
                <select ref={salaryRange}>
                <option value="" disabled>
                  Min-Max
                </option>
                <option value="50k - 1L PA">50k - 1L PA</option>
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

            <button type="submit">Update Job</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditJobForm;
