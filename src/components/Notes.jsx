import React, { useState, useRef, useEffect } from "react";
import styles from "../module/UserProfile.module.css";
import Modal from "../../UI/Modal";
import { FaTrash } from "react-icons/fa";

export default function Notes() {
  const notesref = useRef(null);
  const [Modalopen, setModalisopen] = useState(false);
  const [notes, setnotes] = useState(()=>{
    const savedNotes = localStorage.getItem("notes");
    return savedNotes? JSON.parse(savedNotes):[]
  });


  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function Add(e) {
    e.preventDefault();
    const note = notesref.current.value.trim();
    if (!note) return;
    setnotes((prev) => [...prev, note]);
    notesref.current.value = "";
  }
  useEffect(() => {
    console.log("Updated notes:", notes);
  }, [notes]);
const handleDelete=(id)=>{
    setnotes(prev => prev.filter((_, index) => index !== id));
}
  return (
    <>
      {Modalopen && (
        <Modal open={Modalopen}>
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 8px 24px rgba(133, 133, 133, 0.15)",
            width: "430px",
            maxHeight: "80vh",
            overflowY: "auto",
            fontFamily: "DM Sans",
            position: "relative",
            
          }}
          className={styles.notecon}
        >
          <h2 style={{ marginBottom: "12px", color: "#333", fontSize: "20px" ,fontFamily:'DM sans'}}>
            🗒️ Your Saved Notes
          </h2>
      
          {notes.length === 0 ? (
            <p style={{ color: "#777", fontSize: "14px" }}>
              No notes saved yet. Add some thoughts for future reference!
            </p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, marginBottom: "16px" }}>
              {notes.map((n, i) => (
                <li
                  key={i}
                  style={{
                    background: "#f9f9f9",
                    borderRadius: "8px",
                    padding: "12px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                    color: "#444",
                  }}
                >
                  <span style={{ wordBreak: "break-word", flex: 1,color:'#888',fontSize:'14px' }}>{n}</span>
                  <FaTrash
                    onClick={() => handleDelete(i)}
                    style={{
                      marginLeft: "10px",
                      color: "#e74c3c",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                    title="Delete note"
                  />
                </li>
              ))}
            </ul>
          )}
      
          <button
            onClick={() => setModalisopen(false)}
            style={{
              background: "#888",
              color: "#fff",
              padding: "8px 19px",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              cursor: "pointer",
              transition: "0.2s ease-in-out",
              marginLeft:'155px',
              outline:'none',
            }}
          >
            Close
          </button>
        </div>
      </Modal>
      
      )}
      <div className={styles.notes}>
        <form onSubmit={Add}>
          <label
            style={{
              outline: "none",
              border: "none",
              fontFamily: "DM sans",
              fontSize: "15px",
              color: "#888",
              fontWeight: "500",
              
            }}
          >
            Add Notes
          </label>
          <textarea
            placeholder="Add notes for future reference"
            ref={notesref}
          />
          <button
            style={{ fontFamily: "DM sans", fontSize: "15px" }}
            type="submit"
          >
            Add Note
          </button>
        </form>
        {notes.length > 0 && (
          <button
            onClick={() => setModalisopen(true)}
            style={{
              outline: "none",
              border: "none",
              ontFamily: "DM sans",
              fontSize: "12px",
              backgroundColor: "#eee",
              color: "#888",
              padding: "4px",
              textAlign:'center'
            }}
          >
            View notes
          </button>
        )}
      </div>
    </>
  );
}
