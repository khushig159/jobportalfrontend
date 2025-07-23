import React, { useEffect, useState } from "react";
import styles from "../module/JobListing.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Modal from "../../UI/Modal";
import { Link } from "react-router-dom";
import nojobs from "../assets/nojobs.png";
import Spinner from "../components/Loading";

export default function JobListing() {
  const [loading, setloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      setError(null); // reset error at the start
      setloading(true);
      try {
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
        console.log(data);
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error(
              "You are not authorized to view posted jobs, please login as a recruiter"
            );
          }
          throw new Error("Failed to fetch jobs");
        }
        if (data && data.jobs) {
          // Process the jobs data as needed

          console.log("Jobs fetched successfully:", data.jobs);
          setJobs(data.jobs);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError(
          "Could not fetch jobs. Please check your internet connection."
        );
        setJobs([]);
      } finally {
        setloading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/recruiter/deletejob/${jobId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies for authentication
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete job");
      }
      if (response.status === 403) {
        throw new Error(
          "You are not authorized to delete this job, please login as a recruiter"
        );
      }
      if (response.status === 404) {
        throw new Error("Job not found");
      }
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
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
  const name = jobs.map((j) => j.postedBy.name)[0];
  const onConfirm = () => {
    handleDeleteJob(jobIdToDelete);
    setIsModalOpen(false);
    setJobIdToDelete(null);
  };
  return (
    <>
      {isModalOpen && (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setJobIdToDelete(null);
          }}
          open={isModalOpen}
        >
          <div className={styles.modal}>
            <p>
              Are you sure you want to delete this job? This action cannot be
              undone.
            </p>
            <div className={styles.modalbutton}>
              <button style={{border:'none',outline:'none'}} onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button style={{border:'none',outline:'none'}} onClick={onConfirm} className="confirm-btn">
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
      {loading ? (
        <Spinner />
      ) : error ? (
        <div
          className={styles.errordiv}
        >
          <h3>{error}</h3>
        </div>
      ) : jobs.length === 0 ? (
        <div className={styles.noapp}>
          <h3>You haven't Posted any jobs</h3>
          <img src={nojobs}></img>
        </div>
      ) : (
        <div className={styles.suppercontainer}>
          <div className={styles.container}>
            <div className={styles.innercontainer}>
              <div className={styles.upperbar}>
                <div>
                  <h2>Hello, {name}!</h2>
                  <p>
                    These are your job listings. Keep posting to attract top
                    talent!
                  </p>
                </div>
              </div>
              <main className={styles.main}>
                <div className={styles.jobs}>
                  {jobs.map((job) => (
                    <div className={styles.card} key={job._id}>
                      <div className={styles.Header}>
                        <div className={styles.innerheader}>
                          {!job.postedBy?.companyLogo?.trim() ? (
                            <FontAwesomeIcon
                              icon={faBriefcase}
                              className={styles.iconnn}
                            />
                          ) : (
                            <>
                              <img
                                className={styles.logoimage}
                                src={job.postedBy?.companyLogo}
                                alt=""
                              />
                            </>
                          )}

                          <div className={styles.innerheadercontent}>
                            <h3>{job.jobTitle}</h3>
                            <div className={styles.innerheadercontent2}>
                              <span>{job.jobType}</span> •{" "}
                              <span>{job.industry}</span>
                            </div>
                          </div>
                        </div>
                        <div className={styles.action}>
                          <button
                            onClick={() => {
                              setIsModalOpen(true);
                              setJobIdToDelete(job._id);
                            }}
                          >
                            <FontAwesomeIcon
                              className={styles.icon4}
                              icon={faTrash}
                            />
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/main-recruiter/edit-job/${job._id}`)
                            }
                          >
                            <FontAwesomeIcon
                              className={styles.icon4}
                              icon={faEdit}
                            />
                          </button>
                        </div>
                      </div>
                      <div className={styles.jobdes}>
                        <p>{job.jobDescription}</p>
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
                        <p>{job.requirements}</p>
                        <div className={styles.icongrp}>
                          <Link to={`/main-recruiter/applicants/${job._id}`}>
                            <button className={styles.button2}>
                              Applicants{" "}
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
