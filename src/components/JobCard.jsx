// components/JobCard.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faBriefcase, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import styles from "../module/JobBoard.module.css"; // adjust the path

const JobCard = ({ job, savedJobIds, appliedJobIds, handleSave, handleunsave, handleApply, handleDetails, getPostedText }) => {
  return (
    <div className={styles.card}>
      <div className={styles.Header}>
        <div className={styles.innerheader}>
          {!job.postedBy.companyLogo.trim() ? (
            <FontAwesomeIcon icon={faBriefcase} className={styles.iconnn} />
          ) : (
            <img src={`${import.meta.env.VITE_API_URL}/${job.postedBy.companyLogo}`} alt="" />
          )}

          <div className={styles.innerheadercontent}>
            <p>{job.postedBy.name}</p>
            <h3>{job.jobTitle}</h3>
            <div className={styles.innerheadercontent2}>
              <span>{job.jobType}</span>
              <span>{job.industry}</span>
              <p>{getPostedText(job.createdAt)}</p>
            </div>
          </div>
        </div>

        <button className={styles.savebutton} onClick={() =>
          savedJobIds.includes(job._id) ? handleunsave(job._id) : handleSave(job._id)
        }>
          <FontAwesomeIcon
            className={savedJobIds.includes(job._id) ? styles.icon4 : styles.icon3}
            icon={faBookmark}
          />
        </button>
      </div>

      <div className={styles.details}>
        <div className={styles.detail}><p>Salary</p><h5>{job.salaryRange}</h5></div>
        <div className={styles.detail}><p>Location</p><h5>{job.location}</h5></div>
        <div className={styles.detail}><p>Experience</p><h5>{job.experienceLevel}</h5></div>
        <div className={styles.detail}><p>Work Mode</p><h5>{job.place}</h5></div>
      </div>

      <div className={styles.require}>
        <p style={{ fontWeight: "450", fontSize: "14px" }}>{job.requirements}</p>
        <div className={styles.icongrp}>
          <button style={{ backgroundColor: "transparent", border: "none", outline: "none" }} onClick={() => handleDetails(job._id)}>
            <FontAwesomeIcon icon={faCircleInfo} style={{ fontSize: "17px" }} />
          </button>

          {appliedJobIds.includes(job._id) ? (
            <button disabled className={styles.requestedBtn}>Applied</button>
          ) : (
            <button className={styles.button} onClick={() => handleApply(job._id)}>Apply</button>
          )}

          <button className={styles.savebutton2} onClick={() =>
            savedJobIds.includes(job._id) ? handleunsave(job._id) : handleSave(job._id)
          }>
            <FontAwesomeIcon
              className={savedJobIds.includes(job._id) ? styles.icon4 : styles.icon3}
              icon={faBookmark}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
