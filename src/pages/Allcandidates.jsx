import React, { useEffect, useState, useRef } from "react";
import styles from "../module/Candidates.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faRightFromBracket,
  faSliders,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";
import { FaMapMarkerAlt, FaGem } from "react-icons/fa";
import Spinner from "../components/Loading";
export default function Allcandidates() {
  const [loading,setloading]=useState(false)
  const [error, setError] = useState(null);
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
      setloading(true)
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/recruiter/getAllCandidates`,
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data && data.user) {
          setuser(data.user);
          setFilteredJobs(data.user);
          console.log(data.user);
        }
        else{
          setuser([])
        }
      } catch (err) {
        console.log(err.message);
        setError(
          "Could not fetch Candidates. Please check your internet connection."
        );
        setuser([])
      }
      finally{
        setloading(false)
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

    const filtered = users.filter((user) => {
      const userQual = user.qualification?.toLowerCase() || "";
      const userProf = user.currentProfession?.toLowerCase() || "";
      const userSkills = (user.skills || [])
        .map((s) => s.toLowerCase())
        .join(", ");
      const userLocation = user.location?.toLowerCase() || "";
      const userAge = calculateAge(user.dob);
      const userName = user.name?.toLowerCase() || "";

      const combinedFields = [
        userName,
        userLocation,
        userQual,
        userProf,
        userSkills,
        user.cgpa?.toString() || "",
        user.linkedin?.toLowerCase() || "",
        user.github?.toLowerCase() || "",
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
    console.log("Filtered Jobs:", filtered);
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
  let displayusers = users;
  if(filteredJobs.length === 0){
    displayusers = users;
  }
  else{
    displayusers = filteredJobs;
  }
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
      ) : (
        <div className={styles.container2}>
          <div className={styles.innercontainer}>
            <div className={styles.upperbar}>
              <div>
                <h2>Browse Talents</h2>
                <p> Keep reaching out to secure the best talent!</p>
              </div>
              <div className={styles.upperbarinner}>
                <div className={styles.searchbox}>
                  <span className={styles.searchicon}>
                    <FontAwesomeIcon
                      className={styles.icon}
                      icon={faMagnifyingGlass}
                      style={{ marginRight: "4px" }}
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
              {filteredJobs.length === 0 ? (
                <p className={styles.filterno}>
                  Oops! Looks like no jobs match your filters. Try adjusting
                  them!
                </p>
              ):(
              <div className={styles.jobs2}>
                {displayusers.map((u) => (
                  <div className={styles.card2}>
                    <div className={styles.topSection}>
                      {!u.profilephoto?.trim() ? (
                        <FontAwesomeIcon
                          icon={faUser}
                          className={styles.nouser}
                        />
                      ) : (
                        <img
                          src={u.profilephoto}
                          className={styles.avatar}
                        />
                      )}

                      <div>
                        <h3 className={styles.name}>{u.name}</h3>
                        <p className={styles.p}>{u.email}</p>
                        <div
                          className={styles.details}
                          style={{ marginTop: "8px" }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <FaMapMarkerAlt
                              className={styles.icon}
                              style={{ marginRight: "4px" }}
                            />
                            <span>{u.location}</span>
                          </div>
                          <div>
                            <FaGem
                              style={{ marginRight: "4px" }}
                              className={`${styles.icon} ${styles.gem}`}
                            />
                            <span>{u.currentProfession}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className={styles.about}> */}
                    {/* <p> {u.about}</p> */}
                    {/* </div> */}
                    <div className={styles.skills}>
                      {u.skills.map((skill) => (
                        <span>{skill}</span>
                      ))}
                    </div>

                    <div className={styles.bottomSection}>
                      <span className={styles.topTalent}>{u.linkedin}</span>
                      <span className={styles.rate}>
                        {u.resumeUrl? (<button
                        onClick={()=>window.open(u.resumeUrl, '_blank')}
                        style={{backgroundColor:'#fff', fontSize:'12px', fontFamily:'Work sans', color:'#888', border:'none', outline:'none'}}
                        >
                          View Resume
                        </button>) : <p>No Resume Uploaded</p>}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </main>
          </div>
        </div>
        )}
    
        <aside className={`${styles.filters} ${!show ? styles.hide : ""}`}>
          <button
            className={styles.showfilter}
            style={{
              outline: "none",
              border: "none",
              background: "transparent",
              color: "#888",
            }}
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
            <div className={styles.inputgroup}>
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
                backgroundColor: "#f0d2a1",
                outline: "none",
                border: "none",
              }}
              type="submit"
            >
              Apply
            </button>
          </form>
        </aside>
    </>
  );
}
