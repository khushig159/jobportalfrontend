import React, { useState, useEffect } from "react";
import styles from "../module/UserProfile.module.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faUserGraduate,
  faHandHoldingHeart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Notes from "./Notes";
import Connections from "./Connections";
import Spinner from "./Loading";

export default function UserProfile() {
  const [showconnection, setshowconnection] = useState(false);
  const navigate = useNavigate();
  const [profile, setProfile] = useState();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/seeker/getprofile`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfile(data.seeker);

        if (response.status === 404) {
          throw new Error("You need to login before accessing your profile");
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProfile();
  }, []);
  if (!profile) return <Spinner />;
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
  const formatMonthYear = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  console.log(profile.profilephoto);
  return (
    <>
      <div className={styles.container}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          {profile.profilephoto === "" ? (
            <FontAwesomeIcon className={styles.profileImage2} icon={faUser} />
          ) : (
            <img
              className={styles.profileImage}
              src={profile.profilephoto}
              // alt="profile"
            />
          )}
          <h2>{profile.name}</h2>
          <p>{profile.currentProfession}</p>
          <p className={styles.description}>{profile.about}</p>
          <h3>Skills</h3>
          <div className={styles.skills}>
            {profile.skills.map((skill, index) => (
              <span key={index}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.main}>
          <div className={styles.basicInfo}>
            <div>
              <strong>AGE</strong>
              <p>{calculateAge(profile.dob)} years</p>
            </div>
            <div>
              <strong>HIGHEST QUALIFICATION</strong>
              <p>{profile.qualification}</p>
            </div>
            <div>
              <strong>PHONE</strong>
              <p>{profile.phone}</p>
            </div>
            <div>
              <strong>COURSE</strong>
              <p>{profile.course}</p>
            </div>
            <div>
              <strong>LOCATION</strong>
              <p>{profile.location}</p>
            </div>
            <div>
              <strong>EMAIL</strong>
              <p>{profile.email}</p>
            </div>
            <div className={styles.buttons} style={{ width: "100%" }}>
              <button
                onClick={() => window.open(profile.resumeUrl, "_blank")}
                style={{ color: "#fff" }}
              >
                View Resume
              </button>

              <button
                onClick={() => navigate("/main/userprofile-edit")}
                className={styles.email}
              >
                Edit Profile
              </button>
              <button
                onClick={() => setshowconnection(true)}
                className={styles.email}
              >
                My Network
              </button>
            </div>
          </div>
          <div className={styles.buttons2} style={{ width: "100%" }}>
          <button
                onClick={() => window.open(profile.resumeUrl, "_blank")}
              >
                Resume
              </button>

            <button
              onClick={() => navigate("/main/userprofile-edit")}
              className={styles.email}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setshowconnection(true)}
              className={styles.email}
            >
              My Network
            </button>
          </div>

          <div className={styles.dropdownSection}>
            <details>
              <summary>
                <p>Education</p>
              </summary>
              <div className={styles.job}>
                <div
                  className={styles.icon}
                  style={{ backgroundColor: "#D95CE9" }}
                >
                  <FontAwesomeIcon icon={faUserGraduate} />
                </div>
                <div>
                  <strong>{profile.course}</strong>
                  <p>{profile.college}</p>
                  <p>
                    {profile.cgpa} | {profile.graduationYear}
                  </p>
                </div>
              </div>
              <div className={styles.job}>
                <div
                  className={styles.icon}
                  style={{ backgroundColor: "#D95CE9" }}
                >
                  <FontAwesomeIcon icon={faUserGraduate} />
                </div>
                <div>
                  <strong>SSC</strong>
                  <p>{profile.tenthSchool}</p>
                  <p>
                    {profile.tenthPercent} | {profile.tenthPassout}
                  </p>
                </div>
              </div>
              <div className={styles.job}>
                <div
                  className={styles.icon}
                  style={{ backgroundColor: "#D95CE9" }}
                >
                  <FontAwesomeIcon icon={faUserGraduate} />
                </div>
                <div>
                  <strong>HSC</strong>
                  <p>{profile.twelveSchool}</p>
                  <p>
                    {profile.twelfthPercent} | {profile.twelvePassout}
                  </p>
                </div>
              </div>
            </details>
            {profile.jobExperiences.length > 0 && (
              <>
                <details>
                  <summary>
                    <p>Job Experience</p>
                  </summary>
                  {profile.jobExperiences.map((job, index) => (
                    <div className={styles.job} key={index}>
                      <div
                        className={styles.icon}
                        style={{ backgroundColor: "#F5A623" }}
                      >
                        <FontAwesomeIcon icon={faBriefcase} />
                      </div>
                      <div>
                        <strong>{job.company}</strong>
                        <p>{job.title}</p>
                        <p>
                          {formatMonthYear(job.from)} –{" "}
                          {job.to ? formatMonthYear(job.to) : "Present"}
                        </p>
                      </div>
                    </div>
                  ))}
                </details>{" "}
              </>
            )}
            {profile.jobExperiences.length > 0 && (
              <>
                <details>
                  <summary>
                    <p>Internship Experience</p>
                  </summary>
                  {profile.internExperiences.map((job, index) => (
                    <div className={styles.job} key={index}>
                      <div
                        className={styles.icon}
                        style={{ backgroundColor: "#F5A623" }}
                      >
                        <FontAwesomeIcon icon={faBriefcase} />
                      </div>
                      <div>
                        <strong>{job.company}</strong>
                        <p>{job.title}</p>
                        <p>
                          {formatMonthYear(job.from)} –{" "}
                          {job.to ? formatMonthYear(job.to) : "Present"}
                        </p>
                      </div>
                    </div>
                  ))}
                </details>
              </>
            )}
            {profile.socialExperiences.length > 0 && (
              <>
                <details>
                  <summary>
                    <p>Social Work / Extra-Curricular</p>
                  </summary>
                  {profile.socialExperiences.map((job, index) => (
                    <div className={styles.job} key={index}>
                      <div
                        className={styles.icon}
                        style={{ backgroundColor: "#F5A623" }}
                      >
                        <FontAwesomeIcon icon={faHandHoldingHeart} />
                      </div>
                      <div>
                        <strong>{job.company}</strong>
                        <p>{job.role}</p>
                        <p>
                          {formatMonthYear(job.from)} –{" "}
                          {job.to ? formatMonthYear(job.to) : "Present"}
                        </p>
                      </div>
                    </div>
                  ))}
                </details>
              </>
            )}
          </div>
          <div className={styles.link}>
            <strong>LinkedIn</strong>
            <a
              href={
                profile?.linkedin?.startsWith("http")
                  ? profile.linkedin
                  : `https://${profile.linkedin}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.linkedin}
            </a>
          </div>

          <div className={styles.link}>
            <strong>GitHub</strong>
            <a
              href={
                profile?.github?.startsWith("http")
                  ? profile.github
                  : `https://${profile.github}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile.github}
            </a>
          </div>
        </div>
      </div>
      <Connections
        show={showconnection}
        onClose={() => setshowconnection(false)}
      />
    </>
  );
}
