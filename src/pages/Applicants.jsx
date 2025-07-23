
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import styles from "../module/Candidates.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import nojobs from '../assets/nojobs.png'

import {
  faMagnifyingGlass,
  faRightFromBracket,
  faSliders,
  faEraser,
  faIndustry,
  faClock,
  faLocationDot,
  faMoneyCheckDollar,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons";
import { FaMapMarkerAlt, FaGem } from "react-icons/fa";
export default function Applicants() {
  const [applicants, setapplicants] = useState([]);
  const [status, setstatus] = useState('Applied');
  const [job, setjob] = useState([]);
  const { jobId } = useParams();
  const fetchAll = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/recruiter/postedjobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch jobs");

      const data = await res.json();
      const job = data.jobs.find((j) => j._id === jobId);
      console.log(job);
      setjob(job);

      if (job) {
        const applicantRes = await fetch(
          `${import.meta.env.VITE_API_URL}/recruiter/getApplications/${jobId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!applicantRes.ok) throw new Error("Failed to fetch applicants");

        const applicantData = await applicantRes.json();
        setapplicants(applicantData.applicants || []);
        //   console.log(applicantData.applicants || []);
      }
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [jobId]);

  const handleAccept = async (status, applicantId) => {
    setapplicants((prev) =>
      prev.map((app) =>
        app.applicant._id === applicantId ? { ...app, status: status } : app
      )
    );
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/recruiter/updateStatus/${jobId}/${applicantId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      }
    );
    if (!response.ok) {
      console.error("Update failed");
    } else {
      fetchAll();
      setstatus(status);
    }
  };
  const filteredApplicants = useMemo(
    () => applicants.filter((app) => app.status === status),
    [status, applicants]
  );

  const applicantsnumber = applicants.length;

  const searchref = useRef();
  const qualification = useRef();
  const currentprof = useRef();
  const agerange = useRef();
  const skills = useRef();
  const location = useRef();
  const hasResumeRef = useRef(null);
  const [users, setuser] = useState([]);
  const [show, setshow] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchCand = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/recruiter/getAllCandidates`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        setuser(data.user);
        setFilteredJobs(data.user);
        console.log(data.user);
        if (res.ok) {
          console.log(data.message);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCand();
  }, []);

  function showFilter() {
    setshow((prevState) => !prevState);
  }
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const qual = qualification.current.value.toLowerCase();
    const prof = currentprof.current.value.toLowerCase();
    const skillInput = skills.current.value.toLowerCase();
    const loc = location.current.value.toLowerCase();
    const hasResume = hasResumeRef.current.checked;
    const ageRange = agerange.current.value;
    const searchTerm = searchref.current.value.toLowerCase();

    let minAge = 0;
    let maxAge = 100;

    if (ageRange.includes("-")) {
      const [min, max] = ageRange.split("-").map(Number);
      minAge = isNaN(min) ? 0 : min;
      maxAge = isNaN(max) ? 100 : max;
    }

    const filtered = applicants.filter((user) => {
      const userQual = user.applicant.qualification?.toLowerCase() || "";
      const userProf = user.applicant.currentProfession?.toLowerCase() || "";
      const userSkills = (user.applicant.skills || [])
        .map((s) => s.toLowerCase())
        .join(", ");
      const userLocation = user.applicant.location?.toLowerCase() || "";
      const userAge = calculateAge(user.applicant.dob);
      const userName = user.applicant.name?.toLowerCase() || "";

      const combinedFields = [
        userName,
        userLocation,
        userQual,
        userProf,
        userSkills,
        user.applicant.cgpa?.toString() || "",
        user.applicant.linkedin?.toLowerCase() || "",
        user.applicant.github?.toLowerCase() || "",
      ].join(" ");

      return (
        (qual === "" || userQual.includes(qual)) &&
        (prof === "" || userProf.includes(prof)) &&
        (skillInput === "" || userSkills.includes(skillInput)) &&
        (loc === "" || userLocation.includes(loc)) &&
        (!hasResume || user.resumeUrl) &&
        (ageRange === "" || (userAge >= minAge && userAge <= maxAge)) &&
        (searchTerm === "" || combinedFields.includes(searchTerm))
      );
    });

    console.log("Filters applied");
    setFilteredJobs(filtered);
  };
  function handleClear() {
    qualification.current.value = "";
    currentprof.current.value = "";
    skills.current.value = "";
    location.current.value = "";
    hasResumeRef.current.checked = false;
    agerange.current.value = "";

    setFilteredJobs(users); // Reset to full user list
  }
  return (
    <>
    {applicants.length <= 0 && (
      
      <div className={styles.noapp}>
              <h3>No Applicants For this Job</h3>
              <img src={nojobs}></img>
            </div>
          )}
          {applicants.length>0 &&<>
      <div className={styles.suppercontainer}>
        <div className={styles.container3}>
          <div className={styles.innercontainer}>
            <div className={styles.upperbar}>
              <div>
                <h2>{job.jobTitle}</h2>
                <div className={styles.para}>
                  <p style={{ marginTop: "-5px" }}>{job.jobDescription}</p>
                </div>
                <h3 className={styles.hhh}>
                  {" "}
                  <FontAwesomeIcon
                    className={styles.icon5}
                    icon={faIndustry}
                  />{" "}
                  {job.industry} |{" "}
                  <FontAwesomeIcon className={styles.icon5} icon={faClock} />{" "}
                  {job.jobType} |{" "}
                  <FontAwesomeIcon
                    className={styles.icon5}
                    icon={faLocationDot}
                  />{" "}
                  {job.place} |{" "}
                  <FontAwesomeIcon
                    className={styles.icon5}
                    icon={faMoneyCheckDollar}
                  />{" "}
                  {job.salaryRange} |{" "}
                  <FontAwesomeIcon
                    className={styles.icon5}
                    icon={faUserGroup}
                  />{" "}
                  {applicantsnumber} Applicants
                </h3>
              </div>
              <div className={styles.upperbarinner}>
                <div className={styles.searchbox}>
                  <span className={styles.searchicon} >
                    <FontAwesomeIcon
                      className={styles.icon}
                      icon={faMagnifyingGlass}
                      style={{marginRight:'10px'}}
                    />
                  </span>
                  <input
                    type="text"
                    placeholder="Search Candidates..."
                    ref={searchref}
                  />
                  <button onClick={handleSubmit}>go</button>
                </div>
                <button onClick={showFilter}>
                  {show ? (
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className={styles.icon6}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faSliders}
                      className={styles.icon6}
                    />
                  )}
                </button>
              </div>
            </div>
            <main className={styles.main}>
              {filteredJobs.length <= 0 && (
                <p className={styles.filterno} style={{marginBottom:'15px',marginTop:'-5px'}}>
                  Oops! Looks like no jobs match your filters/search. Try adjusting
                  them!
                </p>
              )}
              <div className={styles.showbutton}>
                <button
                  className={status === "Applied" ? styles.active : ""}
                  onClick={() => setstatus("Applied")}
                  
                >
                  Applied
                </button>
                <button
                  className={status === "Accepted" ? styles.active : ""}
                  onClick={() => setstatus("Accepted")}
                  
                >
                  Accepted
                </button>
                <button
                  className={status === "Rejected" ? styles.active : ""}
                  onClick={() => setstatus("Rejected")}
                 
                >
                  Rejected
                </button>
              </div>
              <br />
              <div className={styles.jobs}>
                {filteredApplicants.map((u) => (
                  <div className={styles.card2}>
                    <div className={styles.topSection}>
                      <img
                        src={`${import.meta.env.VITE_API_URL}/${u.applicant.profilephoto}`} // Sample image
                        alt="Felix Lee"
                        className={styles.avatar}
                      />
                      <div>
                        <p style={{ marginBottom: "5px" }}>
                          Applied at{" "}
                          {new Date(u.applicationDate).toLocaleDateString(
                            "en-GB"
                          )}{" "}
                        </p>
                        <div className={styles.namediv}>
                          <h3 className={styles.name}>{u.applicant.name}</h3>
                          <p>{u.status}</p>
                        </div>
                        <p className={styles.p}>{u.applicant.email}</p>
                        <div className={styles.details2}>
                          <div style={{display:'flex', alignItems:'center',gap:'5px'}}>
                          <FaMapMarkerAlt className={styles.icon} />
                          <span>{u.applicant.location}</span></div>
                          <div style={{display:'flex', alignItems:'center',gap:'5px'}}>
                          <FaGem className={`${styles.icon} ${styles.gem}`} />
                          <span>{u.applicant.currentProfession}</span></div>
                        </div>
                      </div>
                    </div>
                    {/* <div className={styles.about}>
                      <p> {u.about}</p>
                    </div> */}
                    <div className={styles.skills}>
                      {u.applicant.skills.map((skill) => (
                        <span>{skill}</span>
                      ))}
                    </div>

                    <div className={styles.bottomSection}>
                      <span className={styles.topTalent}>
                        {u.applicant.linkedin}
                      </span>
                      <span className={styles.rate}>
                        <a
                          href={u.applicant.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Resume
                        </a>
                      </span>
                    </div>
                    <div className={styles.statusbutton}>
                      {u.status === "Applied" ? (
                        <>
                          <button
                            style={{
                              padding: "7px 30px",
                              backgroundColor: "#f0f0f0",
                              fontSize: "14px",
                              fontFamily: "DM sans",
                              color: "#888",
                              marginTop: "5px",
                            }}
                            onClick={() =>
                              handleAccept("Accepted", u.applicant._id)
                            }
                          >
                            Accept
                          </button>
                          <button
                            style={{
                              padding: "7px 30px",
                              backgroundColor: "#f0f0f0",
                              fontSize: "15px",
                              fontFamily: "DM sans",
                              color: "#888",
                              marginTop: "5px",
                            }}
                            onClick={() =>
                              handleAccept("Rejected", u.applicant._id)
                            }
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            style={{
                              padding: "7px 30px",
                              backgroundColor: "#f0f0f0",
                              fontSize: "15px",
                              fontFamily: "DM sans",
                              color: "#888",
                              marginTop: "5px",
                            }}
                            onClick={() =>
                              handleAccept("Applied", u.applicant._id)
                            }
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
        <aside
          className={`${styles.filters} ${!show ? styles.hide : ""}`}
        >
            <button 
                      className={styles.showfilter}
                      style={{ outline:'none',border:'none',background: "transparent", color: "#888" }}
                      onClick={showFilter}
                    >
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className={styles.icon6}
                      />
                    </button>
          <form onSubmit={handleSubmit}>
            <div>
              <h3>
                Filters{" "}
                <FontAwesomeIcon
                  onClick={handleClear}
                  className={styles.icon7}
                  icon={faEraser}
                  style={{ marginBottom: "0px" }}
                />
              </h3>
              <label>Qualification</label>
              <input
                type="text"
                placeholder="Btech,Msc.."
                ref={qualification}
              />
            </div>
            <div>
              <label>Current Profession</label>
              <input
                type="text"
                placeholder="Student,Intern.."
                ref={currentprof}
              />
            </div>
            <div>
              <label>Skills</label>
              <input type="text" placeholder="React.js,Html.." ref={skills} />
            </div>
            <div>
              <label>Location</label>
              <input type="text" placeholder="Mumbai,Delhi.." ref={location} />
            </div>
            <div className={styles.inputgroup} style={{ marginBottom: "7px" }}>
              <label> Resume Uploaded</label>
              <input type="checkbox" ref={hasResumeRef} />
              {/* Resume Uploaded */}
            </div>
            <div>
              <label>Age Range</label>
              <input type="text" placeholder="20-25.." ref={agerange} />
            </div>

            <button
              style={{
                padding: "7px 60px",
                // marginTop: "-10px",
                fontFamily: "DM sans",
                backgroundColor:'#f0d2a1',
                outline:'none',
                border:'none'
              }}
              type="submit"
            >
              Apply
            </button>
          </form>
        </aside>
      </div></>}
    </>
  );
}
