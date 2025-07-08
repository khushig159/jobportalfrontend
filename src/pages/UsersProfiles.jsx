import React, { useState, useEffect } from "react";
import styles from "../module/UserProfile.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FetchConnectionData from "../../UI/util2";
import ChatComponent from "../components/ChatComponent";
import {
  faBriefcase,
  faUserGraduate,
  faHandHoldingHeart,
  faUser,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/Loading";

export default function UsersProfiles() {
    const[sendUser,setsendUser]=useState('')
    const[currentUser,setcurrentUser]=useState('')
    const[showmessage,setshowmessage]=useState(false)
  
  const [requestedUserIds, setRequestedUserIds] = useState([]);
  const [ConnectedIds, setConnectedIds] = useState([]);
  const [incomereqIds, setincomereqIds] = useState([]);
  const [connections, setConnections] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();
  const [profile, setProfile] = useState();

  useEffect(() => {
    FetchConnectionData({
      setConnections,
      setSentRequests,
      setIncomingRequests,
    });
  }, []);

   useEffect(() => {
        const fetchName = async () => {
          try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/seeker/getname`, {
              credentials: "include",
            });
            const data = await res.json();
            setcurrentUser(data.userId);
          } catch (err) {
            console.log(err);
          }
        };
        fetchName();
      }, []);
  

  useEffect(() => {
    if (sentRequests.length > 0) {
      const sentIds = sentRequests.map((u) => u._id);
      setRequestedUserIds(sentIds);
    }

    if (connections.length > 0) {
      const connIds = connections.map((u) => u._id);
      setConnectedIds(connIds);
    }

    if (incomingRequests.length > 0) {
      const incomingIds = incomingRequests.map((u) => u._id);
      setincomereqIds(incomingIds);
    }
  }, [sentRequests, connections, incomingRequests]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/seeker/users/${id}`,
          {
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await response.json();
        setProfile(data.targetUser);
        console.log(data.targetUser);

        if (response.status === 404) {
          throw new Error("You need to login before accessing your profile");
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <Spinner/>;
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
  const handleConnect = async (userId) => {
    console.log(userId);
    const res = await fetch(`${import.meta.env.VITE_API_URL}/seeker/connect/${userId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setRequestedUserIds((prev) => [...prev, userId]);
  };
  const handleAccept = async (userId) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/seeker/request-accept/${userId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    setIncomingRequests((prev) => prev.filter((u) => u._id !== userId));
    setConnections((prev) => [
      ...prev,
      incomingRequests.find((u) => u._id === userId),
    ]);
  };
  //   console.log(profile.profilephoto);
  function handleChat(userId){
    setshowmessage(true)
    setsendUser(userId)
  }
  return (
    <>
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        {profile.profilephoto === "" || profile.profilephoto ? (
          <FontAwesomeIcon className={styles.profileImage2} icon={faUser} />
        ) : (
          <img
            className={styles.profileImage}
            src={`${import.meta.env.VITE_API_URL}/${profile.profilephoto}`}
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
          <div className={styles.buttons} style={{width:'100%'}}>
            {ConnectedIds.includes(profile._id) ? (
              <button disabled className={styles.connectedBtn}>
                Connected
              </button>
            ) : requestedUserIds.includes(profile._id) ? (
              <button disabled className={styles.requestedBtn}>
                Requested
              </button>
            ) : incomereqIds.includes(profile._id) ? (
              <button
                onClick={() => handleAccept(profile._id)}
                className={styles.acceptBtn}
              >
                Accept
              </button>
            ) : (
              <button
                onClick={() => handleConnect(profile._id)}
                className={styles.connectBtn}
              >
                Connect +
              </button>
            )}

            {ConnectedIds.includes(profile._id) && (
              <button className={styles.connectedBtn} onClick={()=>handleChat(profile._id)} style={{width:'50px'}}>
                <FontAwesomeIcon icon={faPaperPlane}/>
              </button>
            )
              }
          </div>
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
          <ChatComponent currentUserId={currentUser} chatWithUserId={sendUser} show={showmessage} onClose={()=>setshowmessage(false)}/>
</>
  );
}
