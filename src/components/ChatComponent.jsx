import React, { useEffect, useState, useRef } from "react";
import styles from "../module/chat.module.css";
import { FaArrowLeft } from "react-icons/fa";

import { getSocket } from "../socket";

const ChatComponent = ({ currentUserId, chatWithUserId, show, onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const socket = useRef(null); // store in ref to avoid re-renders
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    socket.current = getSocket();
    socket.current.emit("join", currentUserId); //Emits a "join" event with your user ID, telling the server "I’m online!"

    socket.current.on("receiveMessage", (msg) => {
      //WhatsApp-style: You receive a message and it appears instantly.
      setMessages((prev) => [...prev, msg]);
    });

    socket.current.on("typing", () => setIsTyping(true));
    socket.current.on("stopTyping", () => setIsTyping(false));

    return () => {
      socket.current.off("receiveMessage");
      socket.current.off("typing");
      socket.current.off("stopTyping");
      // socket.current.disconnect(); // Optional but clean
    };
  }, [currentUserId]);

  useEffect(() => {
    if (!chatWithUserId) return;

    const fetchMessages = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/messages/${currentUserId}/${chatWithUserId}`
      );
      const data = await res.json();
      setMessages(data.messages);

      // mark as seen
      await fetch(`${import.meta.env.VITE_API_URL}/messages/seen`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: chatWithUserId,
          receiverId: currentUserId,
        }),
      });
    };

    fetchMessages();
  }, [chatWithUserId, currentUserId]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      senderId: currentUserId,
      receiverId: chatWithUserId,
      content: message,
    };

    console.log("Sending message with:", newMessage);

    socket.current.emit("sendMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    socket.current.emit("stopTyping", {
      from: currentUserId,
      to: chatWithUserId,
    });
  };

  const handleTyping = (e) => {
    const text = e.target.value;
    setMessage(text);

    socket.current.emit("typing", {
      from: currentUserId,
      to: chatWithUserId,
    });

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.current.emit("stopTyping", {
        from: currentUserId,
        to: chatWithUserId,
      });
    }, 1000);
  };

  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

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
        <div
          className={styles.messagecontainer}
          style={{ height: "85%", overflowY: "auto", padding: 30 }}
        >
          {messages.map((msg, idx) => {
            const isMe = msg.senderId === currentUserId;
            return (
              <div
                key={idx}
                style={{
                  textAlign: isMe ? "right" : "left",
                  margin: "0px 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isMe ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    backgroundColor: isMe ? "#dcf8c6" : "#f0f0f0",
                    padding: "8px 12px",
                    borderRadius: "15px",
                    maxWidth: "60%",
                    wordWrap: "break-word",
                  }}
                >
                  {msg.content}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    fontFamily: "DM sans",
                    color: "#888",
                    marginTop: "3px",
                  }}
                >
                  {formatTime(msg.timestamp || new Date())}{" "}
                  {isMe && (msg.seen ? "✓✓ Seen" : "✓ Sent")}
                </div>
              </div>
            );
          })}
          {isTyping && (
            <div>
              <em style={{ fontFamily: "DM sans",fontSize:'10px', color:"#888" }}>Typing...</em>
            </div>
          )}
        </div>

        <div style={{ display: "flex", marginTop: 10, marginLeft: "50px" }}>
          <input
            type="text"
            value={message}
            onChange={handleTyping}
            placeholder="Type your message"
            style={{ width: "70%", padding: "5px" }}
          />
          <button
            onClick={sendMessage}
            style={{
              marginLeft: 5,
              fontFamily: "DM sans",
              color: "#888",
              fontSize: "15px",
            }}
          >
            Send
          </button>
        </div>
      </aside>
    </>
  );
};

export default ChatComponent;
