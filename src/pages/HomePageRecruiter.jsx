import React, { useEffect, useState } from "react";
// import "../style/HomePageRecruiter.css";
import { Link } from "react-router-dom";
import styles from "../module/Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import nojobs from "../assets/nojobs.png";

import {
  faBriefcase,
  faIndustry,
  faUserGroup,
  faGlobe,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FaLinkedinIn } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaBolt, FaFireAlt, FaCrown } from "react-icons/fa";
import { BsFillCalendarCheckFill } from "react-icons/bs";

export default function HomePageRecruiter() {
  const [jobs, setjobs] = useState([]);
  const [profile, setProfile] = useState();
  function formatToDayMonthYear(isoString) {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  const [aapli, setappli] = useState([]);
  useEffect(() => {
    const fetchAllApplication = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/recruiter/getAllApplication`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setappli((data.applications || []).slice(0, 2));
        console.log(data.applications);
        if (res.ok) {
          // alert(data.message);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllApplication();
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
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
          throw new Error("Failed to fetch jobs");
        }
        if (data && data.jobs) {
          // Process the jobs data as needed
          console.log("Jobs fetched successfully:", data.jobs);
        }
        if (response.status === 403) {
          throw new Error(
            "You are not authorized to view posted jobs, please login as a recruiter"
          );
        }
        setjobs(data.jobs || []);
        console.log("Jobs:", data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/recruiter/getprofile`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfile(data.recruiter);
        if (response.status === 404) {
          throw new Error("You need to login before accessing your profile");
        }
      } catch (err) {
        console.log(err.message);
        console.log(err.message);
      }
    };
    fetchProfile();
  }, []);

  const jobslength = jobs.length;
  const applength = aapli.length;
  const accept = aapli.filter((p) => p.status === "Applied");
  const reject = aapli.filter((p) => p.status === "Rejected");
  const acceptlen = accept.length;
  const rejectlen = reject.length;
  const threejobs = [...jobs].reverse().slice(0, 2);

  return (
    <>
      <div className={styles.container}>
        {/* Sidebar */}

        {/* Main Section */}
        <div className={styles.main}>
          <div className={styles.topbar}>
            <h2>{profile?.name}'s Dashboard</h2>
            <FontAwesomeIcon icon={faBriefcase} className={styles.icon2} />
          </div>
          <div className={styles.statusBar}>
            <div>
              {" "}
              <h3>{jobslength}</h3>
              <p>Jobs Posted</p>
            </div>
            <div>
              {" "}
              <h3>{applength}</h3>
              <p>Applications Received</p>
            </div>
            <div>
              {" "}
              <h3>{acceptlen}</h3>
              <p>Applications Accepted</p>
            </div>
            <div>
              <h3>{rejectlen}</h3>
              <p>Applications rejected</p>
            </div>
          </div>

          <div className={styles.content}>
            {/* Left */}
            <div className={styles.left}>
              <section>
                <h3>Recently Posted Jobs</h3>
                {threejobs.length <= 0 && (
                  <>
                    <div className={styles.nojobs}>
                      <h3>No Jobs Uploaded</h3>
                      <img className={styles.nojobsimg} src={nojobs} alt="" />
                    </div>
                  </>
                )}
                <div className={styles.jobsRow}>
                  {threejobs.map((job, i) => (
                    <div key={i} className={styles.jobCard}>
                      <FontAwesomeIcon
                        icon={faBriefcase}
                        className={styles.icon}
                      />
                      <h4>{job.jobTitle}</h4>
                      <p>
                        {job.jobType} | {job.place}
                        <br />
                        {job.location}
                      </p>
                      <p>Salary: {job.salaryRange}</p>
                      {/* <span className={styles[status.toLowerCase().replace(/\s/g, "")]}>{status}</span> */}
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3> Recent Applications</h3>
                <div className={styles.cardcontainer}>
                  {aapli.length <= 0 && (
                    <>
                      <div className={styles.nojobs}>
                        <h3>No Recent Applications</h3>
                        <img className={styles.nojobsimg} src={nojobs} alt="" />
                      </div>
                    </>
                  )}
                  {aapli.map((app, i) => (
                    <div className={styles.card} key={i}>
                      <div className={styles.header}>
                        {!app?.applicantProfile && (
                          <>
                            <FontAwesomeIcon icon={faBriefcase} />
                          </>
                        )}
                        <img
                          className={styles.avatar2}
                          src={`${import.meta.env.VITE_API_URL}/${app.applicantProfile}`}
                          alt="Profile"
                        />
                        <div className={styles.info}>
                          <p className={styles.name}>{app.jobTitle}</p>
                          <h2 className={styles.name}>{app.applicantName}</h2>
                          <div className={styles.details}>
                            <div className={styles.location}>
                              <FontAwesomeIcon icon={faLocationDot} />
                              {app.applicantlocation}
                            </div>
                            <div
                              className={styles.role}
                              style={{
                                fontFamily: "DM sans",
                                fontSize: "13px",
                              }}
                            >
                              <FontAwesomeIcon icon={faBriefcase} />{" "}
                              {app.applicantCurrentprof}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.tags} key={i}>
                        {app.applicantskills.map((skill) => (
                          <span>{skill}</span>
                        ))}{" "}
                      </div>

                      <div className={styles.footer2}>
                        <p className={styles.rate}> Status : {app.status}</p>
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resume
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right */}
            <div className={styles.right}>
              <div style={{ textAlign: "center" }}>
                <div className={styles.profileHeader}>
                  <div className={styles.avatar}>
                    {!profile?.companyLogo?.trim() ? (
                      <FontAwesomeIcon
                        icon={faBriefcase}
                        className={styles.iconnn}
                      />
                    ) : (
                      <>
                        <img
                          src={profile?.companyLogo}
                          alt=""
                        />
                      </>
                    )}
                  </div>
                  <div className={styles.innerprofile}>
                    <h2 className={styles.name}> {profile?.name}</h2>
                    <p className={styles.username}> {profile?.email}</p>
                    <div className={styles.meta}>
                      <BsFillCalendarCheckFill />{" "}
                      <span>
                        Joined {formatToDayMonthYear(profile?.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <Link to="/main-recruiter/recruiterprofile-edit">
                  <button
                    className={styles.followBtn}
                    style={{ border: "none", outline: "none" }}
                  >
                    EDIT
                  </button>
                </Link>
              </div>
              <p className={styles.require}>{profile?.companyDescription}</p>
              <div className={styles.stats}>
                <div className={styles.statBox}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.icon3}
                  />
                  <div>
                    <p className={styles.statNumber}>COMPANY NAME</p>
                    <p className={styles.statLabel}>{profile?.name}</p>
                  </div>
                </div>
                <div className={styles.statBox}>
                  <FontAwesomeIcon icon={faIndustry} className={styles.icon3} />
                  <div>
                    <p className={styles.statNumber}>INDUSTRY</p>
                    <p className={styles.statLabel}>{profile?.industry}</p>
                  </div>
                </div>
                <div className={styles.statBox}>
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    className={styles.icon3}
                  />
                  <div>
                    <p className={styles.statNumber}>COMPANY SIZE</p>
                    <p className={styles.statLabel}>
                      {profile?.companysize} employees
                    </p>
                  </div>
                </div>
                <div className={styles.statBox}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.icon3}
                  />
                  <div>
                    <p className={styles.statNumber}>LOCATION</p>
                    <p className={styles.statLabel}>
                      {profile?.companyLocation}
                    </p>
                  </div>
                </div>
                <div className={styles.statBox}>
                  <FontAwesomeIcon icon={faGlobe} className={styles.icon3} />
                  <div>
                    <p className={styles.statNumber}>COMPANY WEBSITE</p>
                    <p className={styles.statLabel}>
                      {profile?.companyWebsite}
                    </p>
                  </div>
                </div>
                <div className={styles.statBox}>
                  <FaLinkedinIn className={styles.icon3} />
                  <div>
                    <p className={styles.statNumber}>LINKEDIN</p>
                    <p className={styles.statLabel}>{profile?.linkedIn}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
