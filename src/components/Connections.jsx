import React, { useEffect, useState } from "react";
import styles from "../module/connections.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FetchConnectionData from "../../UI/util2";
import {
  faUserGraduate,
  faUser,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaGem } from "react-icons/fa";
import noapp from "../assets/noapp.png";
import ChatComponent from "./ChatComponent";

export default function Connections({ show, onClose }) {
  const[sendUser,setsendUser]=useState('')
  const[showmessage,setshowmessage]=useState(false)
  const[currentUser,setcurrentUser]=useState('')
  const [connections, setConnections] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [state, setstate] = useState("connections");
  useEffect(() => {
    FetchConnectionData({
      setConnections,
      setSentRequests,
      setIncomingRequests,
    });
  }, []);

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
  const handleReject = async (userId) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/seeker/request-reject/${userId}`,
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
  };

  const handleRemove = async (userId) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/seeker/remove-connection/${userId}`,
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
    setConnections((prev) => prev.filter((u) => u._id !== userId));
  };

  const handleunrequest = async (userId) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/seeker/unrequest/${userId}`,
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
    setSentRequests((prev) => prev.filter((u) => u._id !== userId));
  };

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

    function handleChat(userId){
      setshowmessage(true)
      setsendUser(userId)
    }

    const invitelen=incomingRequests.length

  return (
    <>
      <aside className={`${styles.filters} ${!show ? styles.hide : ""}`}>
        <button
          className={styles.backbutton}
          style={{
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
          }}
          onClick={onClose}
        >
          <FaArrowLeft />
        </button>

        <div className={styles.connections}>
          <div className={styles.connectbuttons}>
            <button
              onClick={() => setstate("connections")}
              className={`${styles.connectbutton} ${
                state === "connections" ? styles.active : ""
              }`}
            >
              Connections
            </button>
            <button
              onClick={() => setstate("invite")}
              className={`${styles.connectbutton} ${
                state === "invite" ? styles.active : ""
              }`}
            >
              Invitations {invitelen>0 && ({invitelen})}
            </button>
            <button
              onClick={() => setstate("request")}
              className={`${styles.connectbutton} ${
                state === "request" ? styles.active : ""
              }`}
            >
              Requested
            </button>
          </div>
          {state === "connections" && (
            <>
              {connections.length <= 0 && (
                <>
                  <h4 className={styles.noapph3}>
                    You haven't connected to any peer
                  </h4>
                  <img src={noapp} alt="" className={styles.noappimg} />
                </>
              )}
              <div className={styles.connectcardcontainer}>
                {connections.map((u) => (
                  <div className={styles.card2}>
                    <div className={styles.topSection}>
                      {u.profilephoto === "" || u.profilephoto ? (
                        <FontAwesomeIcon
                          icon={faUser}
                          className={styles.nouser}
                        />
                      ) : (
                        <img
                          src={u.profilephoto} // Sample image
                          alt="Felix Lee"
                          className={styles.avatar}
                        />
                      )}

                      <div style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <h3 className={styles.name}>{u.name}</h3>
                          <button
                            onClick={() => handleRemove(u._id)}
                            style={{
                              outline: "none",
                              border: "none",
                              fontFamily: "DM sans",
                              backgroundColor: "#eeeee",
                              fontSize: "13px",
                              marginRight: "0px",
                              padding: "3px 12px",
                            }}
                          >
                            Remove
                          </button>
                        </div>
                        <div
                          className={styles.details}
                          style={{ marginTop: "8px" }}
                        >
                          <FaMapMarkerAlt className={styles.icon} />
                          <span>{u.location}</span>
                          <FaGem className={`${styles.icon} ${styles.gem}`} />
                          <span>{u.currentProfession}</span>
                        </div>
                        <div style={{ marginTop: "5px", marginLeft: "2px" }}>
                          <p style={{ fontSize: "13px" }}>
                            <FontAwesomeIcon
                              icon={faUserGraduate}
                              style={{ marginRight: "7px" }}
                            />
                            {u.qualification}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.bottomSection}>
                      <span className={styles.topTalent}>{u.linkedin}</span>
                      <div>
                      <button className={styles.rate} 
                       style={{
                        outline: "none",
                        border: "none"}}
                      onClick={()=>handleChat(u._id)}>
                          <FontAwesomeIcon icon={faPaperPlane}/>
                        </button>
                      <span className={styles.rate}>
                        <Link to={`/main/usersprofile/${u._id}`}>
                          View Profile
                        </Link>
                      </span></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {state === "invite" && (
            <>
              {incomingRequests.length <= 0 && (
                <>
                  <h4 className={styles.noapph3}>There are no invitations</h4>
                  <img src={noapp} alt="" className={styles.noappimg} />
                </>
              )}
              <div className={styles.connectcardcontainer}>
                {incomingRequests.map((u) => (
                  <div className={styles.card2}>
                    <div className={styles.topSection}>
                      {u.profilephoto === "" || u.profilephoto ? (
                        <FontAwesomeIcon
                          icon={faUser}
                          className={styles.nouser}
                        />
                      ) : (
                        <img
                          src={u.profilephoto}// Sample image
                          alt="Felix Lee"
                          className={styles.avatar}
                        />
                      )}

                      <div style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <h3 className={styles.name}>{u.name}</h3>
                          <div>
                            <button
                              onClick={() => handleAccept(u._id)}
                              style={{
                                outline: "none",
                                border: "none",
                                fontFamily: "DM sans",
                                backgroundColor: "#eeeee",
                                fontSize: "13px",
                                marginRight: "5px",
                                padding: "3px 12px",
                              }}
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(u._id)}
                              style={{
                                outline: "none",
                                border: "none",
                                fontFamily: "DM sans",
                                backgroundColor: "#eeeee",
                                fontSize: "13px",
                                marginRight: "0px",
                                padding: "3px 12px",
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                        <div
                          className={styles.details}
                          style={{ marginTop: "8px" }}
                        >
                          <FaMapMarkerAlt className={styles.icon} />
                          <span>{u.location}</span>
                          <FaGem className={`${styles.icon} ${styles.gem}`} />
                          <span>{u.currentProfession}</span>
                        </div>
                        <div style={{ marginTop: "5px", marginLeft: "2px" }}>
                          <p style={{ fontSize: "13px" }}>
                            <FontAwesomeIcon
                              icon={faUserGraduate}
                              style={{ marginRight: "7px" }}
                            />
                            {u.qualification}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.bottomSection}>
                      <span className={styles.topTalent}>{u.linkedin}</span>
                      <div>
                      <button className={styles.rate} 
                       style={{
                        outline: "none",
                        border: "none"}}
                      onClick={()=>handleChat(u._id)}>
                          <FontAwesomeIcon icon={faPaperPlane}/>
                        </button>
                      <span className={styles.rate}>
                        <Link to={`/main/usersprofile/${u._id}`}>
                          View Profile
                        </Link>
                      </span></div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {state === "request" && (
            <>
              {sentRequests.length <= 0 && (
                <>
                  <h4 className={styles.noapph3}>There are no invitations</h4>
                  <img src={noapp} alt="" className={styles.noappimg} />
                </>
              )}
              <div className={styles.connectcardcontainer}>
                {sentRequests.map((u) => (
                  <div className={styles.card2}>
                    <div className={styles.topSection}>
                      {u.profilephoto === "" || u.profilephoto ? (
                        <FontAwesomeIcon
                          icon={faUser}
                          className={styles.nouser}
                        />
                      ) : (
                        <img
                          src={u.profilephoto}// Sample image
                          alt="Felix Lee"
                          className={styles.avatar}
                        />
                      )}

                      <div style={{ width: "100%" }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <h3 className={styles.name}>{u.name}</h3>
                          <button
                            onClick={() => handleunrequest(u._id)}
                            style={{
                              outline: "none",
                              border: "none",
                              fontFamily: "DM sans",
                              backgroundColor: "#eeeee",
                              fontSize: "13px",
                              marginRight: "0px",
                              padding: "3px 12px",
                            }}
                          >
                            Requested
                          </button>
                        </div>
                        <div
                          className={styles.details}
                          style={{ marginTop: "8px" }}
                        >
                          <FaMapMarkerAlt className={styles.icon} />
                          <span>{u.location}</span>
                          <FaGem className={`${styles.icon} ${styles.gem}`} />
                          <span>{u.currentProfession}</span>
                        </div>
                        <div style={{ marginTop: "5px", marginLeft: "2px" }}>
                          <p style={{ fontSize: "13px" }}>
                            <FontAwesomeIcon
                              icon={faUserGraduate}
                              style={{ marginRight: "7px" }}
                            />
                            {u.qualification}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={styles.bottomSection}>
                      <span className={styles.topTalent}>{u.linkedin}</span>
                      <div>
                      <button className={styles.rate} onClick={()=>handleChat(u._id)}>
                          <FontAwesomeIcon icon={faPaperPlane}/>
                        </button>
                        <span className={styles.rate}>
                          <Link to={`/main/usersprofile/${u._id}`}>
                            View Profile
                          </Link>
                        </span>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </aside>
      <ChatComponent currentUserId={currentUser} chatWithUserId={sendUser} show={showmessage} onClose={()=>setshowmessage(false)}/>
    </>
  );
}
