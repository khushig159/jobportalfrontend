// components/SavedJobs.jsx
import React, { useEffect, useState } from "react";
import styles from "../module/JobBoard.module.css";
// import { Link } from "react-router-dom";
import PerformJobAction from "../../UI/util";
import nojobs from '../assets/nojobs.png'
import Spinner from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faCircleInfo,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import Jobdetails from "../components/Jobdetails";
const SavedJobs = () => {
  const[loading,setloading]=useState(false)
    const [error, setError] = useState(null);
  
  const [jobId, setJobId] = useState("");
  const [detailshow, setdetailshow] = useState(false);
  const [savedJobs, setsavedJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      setError(null); // Reset error at the start
      setloading(true);
  
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/seeker/savedJobs`, {
          credentials: "include",
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch saved jobs.");
        }
  
        const data = await response.json();
  
        if (response.status === 200 && data.jobs) {
          console.log("job fetched");
          console.log(data.jobs);
          setsavedJobs(data.jobs);
        } else {
          setsavedJobs([]);
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError("Could not fetch applied jobs. Please check your internet connection.");
      } finally {
        setloading(false);
      }
    };
  
    fetchJobs();
  }, []);
  
  const handleunsave = async (jobId) => {
    await PerformJobAction({
      url: `${import.meta.env.VITE_API_URL}/seeker/unsavejob/${jobId}`,
      method: "DELETE",
      successCallback: (data) => console.log(data.message),
      updateStateCallback: setsavedJobs,
      jobId,
    });
  };
  const handleApply = async (jobId) => {
    await PerformJobAction({
      url: `${import.meta.env.VITE_API_URL}/seeker/applyjob/${jobId}`,
      method: "POST",
      // successCallback: () => alert("Applied to job successfully"),
    });
  };
  function getDaysAgo(createdAt) {
    const createdDate = new Date(createdAt);
    const today = new Date();

    // Get the difference in milliseconds
    const diffInMs = today - createdDate;

    // Convert milliseconds to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    return diffInDays;
  }
  function getPostedText(createdAt) {
    const days = getDaysAgo(createdAt);
    if (days === 0) return "Posted today";
    if (days === 1) return "Posted yesterday";
    return `Posted ${days} days ago`;
  }

  function handleDetails(jobId) {
    // navigate(`/main/jobdetail/${jobId}`)
    setdetailshow(true);
    setJobId(jobId);
  }
  console.log("loading:", loading);
console.log("error:", error);
console.log("savedJobs:", savedJobs);

  return (
    <>
    {loading ? (
        <Spinner />
      ) : error ? (
        <div
          className={styles.errordiv}
        >
          <h3>{error}</h3>
        </div>
      ) : savedJobs.length === 0 ? (
        <div className={styles.noapp}>
          <h3>You haven't saved any jobs</h3>
          <img src={nojobs}></img>
        </div>
      ) : (
      <div className={styles.container3}>
        <div className={styles.innercontainer}>
          <div className={styles.upperbar2}>
            <div>
              <h2>Your Job Wishlist</h2>
              <p>
                Here are the jobs you’ve saved. Ready to explore them again or
                apply?
              </p>
            </div>
            <div className={styles.upperbarinner}></div>
          </div>
          <main className={styles.main}>
            <div className={styles.jobs}>
              {savedJobs.map((job) => (
                <div className={styles.card2} key={job._id}>
                  <div className={styles.Header}>
                    <div className={styles.innerheader}>
                      {!job.postedBy.companyLogo.trim() ? (
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          className={styles.iconnn}
                        />
                      ) : (
                        <>
                          <img
                            src={job.postedBy.companyLogo}
                            alt=""
                          />
                        </>
                      )}
                      <div className={styles.innerheadercontent}>
                        <p>{job.postedBy.name}</p>
                        <h3>{job.jobTitle}</h3>
                        <div className={styles.innerheadercontent2}>
                          <span>{job.jobType}</span> {" "}
                          <span>{job.industry}</span> 
                          <p>{getPostedText(job.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                    <button className={styles.savedbutton }onClick={() => handleunsave(job._id)}>
                      <FontAwesomeIcon
                        className={styles.icon4}
                        icon={faBookmark}
                      />
                    </button>
                  </div>
                  <div className={styles.details}>
                    <div className={styles.detail}>
                      <p>Salary</p>
                      <h5>{job.salaryRange}</h5>
                    </div>
                    <div className={styles.detail}>
                      <p>Location</p>
                      <h5>{job.location}</h5>
                    </div>
                    <div className={styles.detail}>
                      <p>Experience</p>
                      <h5>{job.experienceLevel} Years </h5>
                    </div>

                    <div className={styles.detail}>
                      <p>Work Mode</p>
                      <h5>{job.place}</h5>
                    </div>
                  </div>
                  <div className={styles.require}>
                    <p style={{ fontWeight: "450", fontSize: "14px" }}>
                      {job.requirements}
                    </p>
                    <div className={styles.icongrp}>
                      <button
                        style={{
                          outline: "none",
                          border: "none",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => handleDetails(job._id)}
                      >
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          style={{ fontSize: "17px" }}
                        />
                      </button>
                      <button
                        onClick={() => handleApply(job._id)}
                        className={styles.button}
                      >
                        Apply
                      </button>
                      <button className={styles.savedbutton2 }onClick={() => handleunsave(job._id)}>
                      <FontAwesomeIcon
                        className={styles.icon4}
                        icon={faBookmark}
                      />
                    </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
       )}
      <Jobdetails
        show={detailshow}
        jobid={jobId}
        onClose={() => setdetailshow(false)}
      />
    </>
  );
};

export default SavedJobs;
