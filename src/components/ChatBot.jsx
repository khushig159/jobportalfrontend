import React, { useEffect, useRef, useState } from "react";
import styles from "../module/ChatBot.module.css";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperclip,
 
} from "@fortawesome/free-solid-svg-icons";
import { getAiResponse } from "./openai";

export default function ChatBot() {
   const msgend = useRef(null);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([
    {
      text: "Hi there! I am here to help you with anything career-related. Upload your resume or just type a question!",
      isBot: true,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const allSuggestions = [
    "What are some good resume tips?",
    "How can I improve my LinkedIn profile?",
    "What are trending jobs in AI?",
    "Tips for cracking a technical interview?",
    "Best online platforms to learn programming?",
    "How do I write a cover letter?",
    "Internship opportunities for 2nd-year students?",
    "How to handle job rejection positively?",
    "What's the difference between frontend and backend roles?",
    "How do I switch careers into tech?",
    "Best certifications for software engineers?",
    "How to ask for a recommendation letter?",
    "Difference between a job and a career?",
    "How to network effectively on LinkedIn?",
    "What are freelance career options for students?",
    "How do I negotiate my salary?",
    "How to build a strong GitHub profile?",
    "What skills do startups look for?",
    "How do I make a career in cybersecurity?",
    "How to find remote jobs as a fresher?",
    "Top mistakes freshers make in interviews",
    "What is the STAR method in interviews?"
  ];
  const getRandomSuggestions = () => {
    const shuffled = [...allSuggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };
  const [suggestions, setSuggestions] = useState(getRandomSuggestions());


  useEffect(() => {
    msgend.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (textOverride = null) => {
    const text = typeof textOverride === "string" ? textOverride : input;

    if (!text.trim() && !file) return;

    setInput("");
    setMessages((prev) => [
      ...prev,
      { text: text || "Uploaded resume", isBot: false },
    ]);
    setLoading(true);


    try {
      const res = await getAiResponse(text, file);
      const safeRes = typeof res === "string" ? res : JSON.stringify(res); // 🔒 Fix here
      setMessages((prev) => [...prev, { text: safeRes, isBot: true }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Error: " + err.message, isBot: true },
      ]);
    }

    setLoading(false);
    setFile(null);
    setSuggestions(getRandomSuggestions()); // update after send

  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  return (
    <>
      <main className={ styles.chatMain} >
        <div className={styles.chatHeader}>
          <h2 className={styles.chatHeading}>Career AI Assistant</h2>
        </div>
        {messages.map((message, index) => (
          <div
            className={
              message.isBot ? styles.chatBubbleLeft : styles.chatBubbleRight
            }
            key={index}
          >
            
            <div
              className={
                message.isBot
                  ? styles.bubbleContent
                  : `${styles.bubbleContent} ${styles.right}`
              }
            >
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => (
                    <p
                      className={
                        message.isBot
                          ? styles.msg
                          : `${styles.msg} ${styles.msgRight}`
                      }
                      {...props}
                    />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className={styles.strong} {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className={styles.list} {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className={styles.listItem} {...props} />
                  ),
                  // Add more markdown elements here as needed
                }}
              >
                {message.text}
              </ReactMarkdown>
            </div>
            
          </div>
        ))}
        {loading && (
          <div className={styles.chatBubbleLeft}>
            <div className={styles.bubbleContent}>
              <div className={`${styles.msg} ${styles.typingDots}`}>
                <span>•</span>
                <span>•</span>
                <span style={{fontSize:'15px',color:'green'}}>•</span>
              </div>
            </div>
          </div>
        )}
       
        <div className={styles.suggestions}>
          {suggestions.map((question, i) => (
            <button key={i} onClick={() => handleSend(question)}>
              {question}
            </button>
          ))}
        </div>
        <div ref={msgend}></div>
        <div className={styles.chatInput}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
            placeholder="Type your message or upload resume..."
          />
          <label className={styles.uploadBtn}>
            <FontAwesomeIcon icon={faPaperclip} />
            <input
              type="file"
              style={{ display: "none" }}
              accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <button className={styles.sendBtn} onClick={() => handleSend()}>
            Send
          </button>
          {file && (
          <div style={{ marginLeft: "1rem", fontSize: "12px", color: "gray" }}>
             {file.name}
          </div>
        )}
        </div>
       
      </main>
    </>
  );
}
