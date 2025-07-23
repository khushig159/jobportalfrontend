import React, { useEffect, useState } from "react";
import styles from "../module/Details.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowLeft, FaLinkedinIn } from "react-icons/fa";
import {
  faIndustry,
  faCircleExclamation,
  faClock,
  faLocationDot,
  faBriefcase,
  faLaptop,
  faMoneyCheckDollar,
  faRankingStar,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";

export default function Jobdetails({ show, jobid, onClose }) {
  function formatToDayMonthYear(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  const [job, setjob] = useState(null);
  console.log(jobid);
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/seeker/getjobs`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch jobs");

        const data = await res.json();
        const job = data.jobs.find((j) => j._id === jobid);
        if (!job) {
          console.log("job not found");
        }
        console.log(job);
        setjob(job);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJob();
  }, [jobid]);
  const stats = [
    {
      label: "INDUSTRY",
      value: job?.industry,
      icon: faIndustry,
    },
    {
      label: "JOB TYPE",
      value: job?.jobType,
      icon: faClock,
    },
    {
      label: "WORK MODE",
      value: job?.place,
      icon: faLaptop,
    },
    {
      label: "LOCATION",
      value: job?.location,
      icon: faLocationDot,
    },
    {
      label: "EXPERIENCE LEVEL",
      value: job?.experienceLevel,
      icon: faRankingStar,
    },
    {
      label: "COMPANY SIZE",
      value: job?.postedBy?.companysize,
      icon: faUserGroup,
    },
    {
      label: "SALARY RANGE",
      value: job?.salaryRange,
      icon: faMoneyCheckDollar,
    },
    {
      label: "APPLICATION DEADLINE",
      value: formatToDayMonthYear(job?.applicationDeadline),
      icon: faCircleExclamation,
    },
  ];

  return (
    <>
      {job && (
        <aside className={`${styles.filters} ${!show ? styles.hide : ""}`}>
          <button
            className={styles.backbutton}
            style={{
              backgroundColor: "transparent",
              outline: "none",
              border: "none",
            }}
            onClick={onClose}
          >
            <FaArrowLeft />
          </button>
          <div className={styles.detailcontainer}>
            <div className={styles.div}>
              {job.postedBy.companyLogo === "" || job.postedBy.companyLogo ? (
                <FontAwesomeIcon icon={faBriefcase} className={styles.iconnn} />
              ) : (
                <>
                  <img
                    src={job.postedBy.companyLogo}
                    alt=""
                  />
                </>
              )}
              <h2>{job.jobTitle}</h2>
              <h4>Posted By {job?.postedBy.name}</h4>
            </div>
            <div
              className={styles.deatildes}
              style={{ marginBottom: "20px", marginTop: "10px" }}
            >
              <h4
                style={{
                  marginTop: "0px",
                  fontFamily: "DM sans",
                  color: "#3e3e3e",
                  marginBottom: "2px",
                }}
              >
                Description
              </h4>
              <p
                style={{
                  fontFamily: "DM sans",
                  color: "#888",
                  marginBottom: "2px",
                  fontSize: "15px",
                }}
              >
                {job.jobDescription}
              </p>
            </div>
            <div className={styles.deatildes}>
              <h4
                style={{
                  marginTop: "0px",
                  fontFamily: "DM sans",
                  color: "#3e3e3e",
                  marginBottom: "2px",
                }}
              >
                Requirements
              </h4>
              <p
                style={{
                  fontFamily: "DM sans",
                  color: "#888",
                  marginBottom: "2px",
                  fontSize: "15px",
                }}
              >
                {job.requirements}
              </p>
            </div>{" "}
          </div>

          <div className={styles.stats}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statbox}>
                <FontAwesomeIcon icon={stat.icon} className={styles.icon3} />
                <div>
                  <p className={styles.statnumber}>{stat.label}</p>
                  <p className={styles.statLabel}>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      ) }
    </>
  );
}
