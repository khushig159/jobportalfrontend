// components/SavedJobs.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../module/JobBoard.module.css";
// import { Link } from "react-router-dom";
import nojobs from '../assets/nojobs.png'
import Spinner from "../components/Loading";
import PerformJobAction from "../../UI/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Jobdetails from "../components/Jobdetails";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

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

const AppliedJobs = () => {
   const[loading,setloading]=useState(false)
      const [error, setError] = useState(null);
  const [jobId, setJobId] = useState("");
  const [detailshow, setdetailshow] = useState(false);
  const [appliedJobs, setappliedJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setloading(true)
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/seeker/appliedJobs`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch saved jobs.");
        }
  
        const data = await response.json();
  
        if (response.status === 200 && data.jobs) {
          console.log("job fetched");
          console.log(data.jobs);
          setappliedJobs(data.jobs);
        } else {
          setappliedJobs([]);
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError("Could not fetch saved jobs. Please check your internet connection.");
      } finally {
        setloading(false);
      }
    };
  
    fetchJobs();
  }, []);

  function handleDetails(jobId) {
    // navigate(`/main/jobdetail/${jobId}`)
    setdetailshow(true);
    setJobId(jobId);
  }

  const handledelete = async (jobId) => {
    await PerformJobAction({
      url: `${import.meta.env.VITE_API_URL}/seeker/deleteApplication/${jobId}`,
      method: "DELETE",
      successCallback: (data) => console.log(data.message),
      updateStateCallback: setappliedJobs,
      jobId,
    });
  };

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
      ) : appliedJobs.length === 0 ? (
        <div className={styles.noapp}>
          <h3>You haven't applied to any jobs</h3>
          <img src={nojobs}></img>
        </div>
      ) : (
      <div className={styles.container3}>
        <div className={styles.innercontainer}>
          <div className={styles.upperbar2}>
            <h2>Your Job Applications</h2>
            <div className={styles.upper}>
              <p>
                Here's your application trail. Stay tuned for updates from
                recruiters!
              </p>
            </div>
            <div className={styles.upperbarinner}></div>
          </div>
          <main className={styles.main}>
            <div className={styles.jobs}>
              {appliedJobs.map((job) => (
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
                    <button className={styles.deletebutton}onClick={() => handledelete(job._id)}>
                      <FontAwesomeIcon
                        className={styles.icon4}
                        icon={faTrash}
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
                      <h5>{job.experienceLevel} </h5>
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
                    <div className={styles.icongrp2}>
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
                      <button className={styles.deletebutton2}onClick={() => handledelete(job._id)}>
                      <FontAwesomeIcon
                        className={styles.icon4}
                        icon={faTrash}
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

export default AppliedJobs;
